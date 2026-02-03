"use client";

import { Calendar, Users, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import BookingService from "@/services/bookingService";
import { supabase } from "@/libs/supabaseClient";
import { fetchAvailabilityProvider } from "@/services/availabilityService";

import {
  normalizeDate,
  getMonthStr,
  getWeekRange,
} from "@/lib/dashboardDateUtils";

import {
  calculatePercentageChange,
  formatActivityMessage,
} from "@/hooks/dashboardCalculations";

const useProvideDashBoard = () => {
  const [loading, setLoading] = useState(true);
  const [providerId, setProviderId] = useState<string | null>(null);

  const [stats, setStats] = useState({
    todayBookings: 0,
    weeklyRevenue: 0,
    weeklyRevenueChange: 0,
    monthlyClients: 0,
    monthlyClientsChange: 0,
    averageRating: 0,
    ratingChange: 0,
    totalReviews: 0,
    upcomingToday: 0,
    pendingApprovals: 0,
    availabilityFilled: 0,
    availabilityChange: 0,
  });

  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [tips, setTips] = useState<string>("");

  const colorStyles = {
    "chart-2": { border: "border-chart-2", text: "text-chart-2" },
    "chart-4": { border: "border-chart-4", text: "text-chart-4" },
    "chart-3": { border: "border-chart-3/50", text: "text-chart-3/50" },
    "chart-5": { border: "border-chart-5", text: "text-chart-5" },
  };

  const [quickActions] = useState([
    {
      icon: Calendar,
      label: "View Availability",
      link: "/dashboard/Providers/availability",
      color: colorStyles["chart-2"],
    },
    {
      icon: Users,
      label: "Manage Bookings",
      link: "/dashboard/Providers/booking",
      color: colorStyles["chart-2"],
    },
    {
      icon: Settings,
      label: "Update Services",
      link: "/dashboard/Providers/services",
      color: colorStyles["chart-2"],
    },
  ]);

  // ------------------------------
  const loadProvider = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const id = session?.user?.id || null;
    setProviderId(id);
    return id;
  };

  // ------------------------------
  const loadDashboard = async (providerId: string) => {
    try {
      setLoading(true);

      const bookings = await BookingService.fetchBookingsByProvider(providerId);

      const todayStr = normalizeDate(new Date().toISOString());
      const currentWeek = getWeekRange(0);
      const lastWeek = getWeekRange(1);
      const thisMonth = getMonthStr(0);
      const lastMonth = getMonthStr(1);

      let currentWeekRevenue = 0;
      let lastWeekRevenue = 0;

      const monthlyClientsMap = new Map();
      const lastMonthClientsMap = new Map();

      const todaysAppointments: any[] = [];
      const pending: any[] = [];
      const activity: any[] = [];

      bookings.forEach((b: any) => {
        if (!b.booking_date || !b.customer?.id) return;

        const bookingDateObj = new Date(b.booking_date);
        const bookingDateStr = normalizeDate(b.booking_date);
        const bookingMonth = `${bookingDateObj.getUTCFullYear()}-${String(
          bookingDateObj.getUTCMonth() + 1
        ).padStart(2, "0")}`;

        const customer = Array.isArray(b.customer)
          ? b.customer[0]
          : b.customer;

        // Today bookings
        if (bookingDateStr === todayStr && b.status === "confirmed")
          todaysAppointments.push(b);

        // Weekly revenue
        if (b.status === "confirmed") {
          if (
            bookingDateObj >= currentWeek.start &&
            bookingDateObj <= currentWeek.end
          )
            currentWeekRevenue += b.amount;

          if (
            bookingDateObj >= lastWeek.start &&
            bookingDateObj <= lastWeek.end
          )
            lastWeekRevenue += b.amount;
        }

        // Monthly clients
        if (bookingMonth === thisMonth)
          monthlyClientsMap.set(customer.id, customer);

        if (bookingMonth === lastMonth)
          lastMonthClientsMap.set(customer.id, customer);

        if (b.status === "pending") pending.push(b);

        activity.push({
          id: b.id,
          message: formatActivityMessage(b, customer),
          time: bookingDateObj.toLocaleString(),
        });
      });

      // Only latest 5
      activity.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      );
      activity.splice(5);

      // Weekly revenue change
      const weeklyRevenueChange = calculatePercentageChange(
        currentWeekRevenue,
        lastWeekRevenue
      );

      // Monthly client change
      const monthlyClientsChange = calculatePercentageChange(
        monthlyClientsMap.size,
        lastMonthClientsMap.size
      );

      // Reviews
      const { data: reviews } = await supabase
        .from("reviews")
        .select("rating")
        .eq("provider_id", providerId);

      const avgRating = reviews?.length
        ? Number(
            (
              reviews.reduce((a, b) => a + b.rating, 0) / reviews.length
            ).toFixed(1)
          )
        : 0;

      const ratingChange =
        reviews && reviews.length > 1
          ? avgRating -
            reviews
              .slice(0, -1)
              .reduce((a, b) => a + b.rating, 0) /
              (reviews.length - 1)
          : 0;

      // Availability
      const availability = await fetchAvailabilityProvider(providerId);
      const totalSlots = availability.length;
      const filledSlots = availability.filter((a) => a.is_booked).length;

      const availabilityFilled = totalSlots
        ? Math.round((filledSlots / totalSlots) * 100)
        : 0;

      // Last week availability
      const { data: lastWeekAvailabilityData } = await supabase
        .from("availability")
        .select("*")
        .eq("provider_id", providerId)
        .gte("date", lastWeek.start.toISOString())
        .lte("date", lastWeek.end.toISOString());

      const lastWeekTotal = lastWeekAvailabilityData?.length || 0;
      const lastWeekFilled =
        lastWeekAvailabilityData?.filter((a) => a.is_booked).length || 0;

      const lastWeekFillRate = lastWeekTotal
        ? Math.round((lastWeekFilled / lastWeekTotal) * 100)
        : 0;

      const availabilityChange = availabilityFilled - lastWeekFillRate;

      // Tips
      let tip = "";
      if (weeklyRevenueChange > 20)
        tip = "Revenue is up 🟢 compared to last week!";
      else if (weeklyRevenueChange < -10)
        tip = "Revenue dropped last week. Check your service offering!";
      else
        tip =
          "Your dashboard is steady. Try adding new availability slots for more bookings.";

      // Set dashboard stats
      setStats({
        todayBookings: todaysAppointments.length,
        weeklyRevenue: currentWeekRevenue,
        weeklyRevenueChange,
        monthlyClients: monthlyClientsMap.size,
        monthlyClientsChange,
        averageRating: avgRating,
        ratingChange,
        totalReviews: reviews?.length || 0,
        upcomingToday: todaysAppointments.length,
        pendingApprovals: pending.length,
        availabilityFilled,
        availabilityChange,
      });

      setUpcomingBookings(todaysAppointments);
      setRecentActivity(activity);
      setTips(tip);
    } catch (error) {
      console.error("Dashboard load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProvider().then((pid) => {
      if (pid) loadDashboard(pid);
    });
  }, []);

  return {
    stats,
    upcomingBookings,
    recentActivity,
    quickActions,
    tips,
    loading,
  };
};

export default useProvideDashBoard;
