import {
   Calendar,   Users, 
 Eye, Settings
} from "lucide-react";
import { useEffect, useState } from "react";
import BookingService from "@/services/bookingService";
import { supabase } from "@/libs/supabaseClient";
import { fetchAvailability } from "@/services/availabilityService";


const useProvideDashBoard = () => {

      const [loading, setLoading] = useState(true);
  const [providerId, setProviderId] = useState<string | null>(null);

  // === REAL DATA ===
  const [stats, setStats] = useState({
    todayBookings: 0,
    weeklyRevenue: 0,
    weeklyRevenueChange: 0, // percent vs last week
    monthlyClients: 0,
    monthlyClientsChange: 0, // percent vs last month
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
  const colorStyles = {
  "chart-2": {
    border: "border-chart-2",
    text: "text-chart-2"
  },
  "chart-3": {
    border: "border-chart-22",
    text: "text-chart-22"
  },
  "chart-22": {
    border:  "border-chart-2/50",
    text: "text-chart-2/50"
  },
  "chart-4": {
    border: "border-chart-1",
    text: "text-chart-1"
  }
};
  const [quickActions] = useState([
    { icon: Calendar, label: "View Availability", link: "/dashboard/availability", color: colorStyles["chart-2"]},
    { icon: Users, label: "Manage Bookings", link: "/dashboard/booking", color: colorStyles["chart-3"]},
    { icon: Settings, label: "Update Services", link: "/dashboard/services", color: colorStyles["chart-4"] }
  ]);
  const [tips, setTips] = useState<string>("");

  // ==========================
  // 🔥 FETCH PROVIDER SESSION
  // ==========================
  async function loadProvider() {
    const { data: { session } } = await supabase.auth.getSession();
    const providerId = session?.user?.id;
    setProviderId(providerId || null);
    return providerId;
  }

  // ==========================
  // 🔥 FETCH DASHBOARD DATA
  // ==========================
  async function loadDashboard(providerId: string) {
    try {
      setLoading(true);

      // Bookings & historical (dummy data for change/tips)
      const bookings = await BookingService.fetchBookingsByProvider(providerId);
      const lastWeekBookings = []; // Fetch or mock historical for analytics
      const lastMonthBookings = [];

      // Today
      const today = new Date().toISOString().split("T")[0];



const todaysAppointments = bookings.filter((b: any) => {
  // Normalize appointment date
  const apptDate = b.availability?.date
    ? new Date(b.availability.date).toISOString().split("T")[0]
    : null;

  // Return only if:
  // 1. Date matches today
  // 2. Booking is confirmed
  return apptDate === today && b.status === "confirmed";
});

      // Monthly clients
      const thisMonth = new Date().toISOString().slice(0, 7);
   const monthlyClientsMap = new Map<string, any>();

bookings.forEach((booking) => {
  const customerId = booking.customer.id;
  const isThisMonth = booking.booking_date.startsWith(thisMonth);

  if (isThisMonth && !monthlyClientsMap.has(customerId)) {
    monthlyClientsMap.set(customerId, booking.customer);
  }
});

const monthlyClients = Array.from(monthlyClientsMap.values());

console.log(monthlyClients);
      const lastMonth = new Date(
        new Date().setMonth(new Date().getMonth() - 1)
      ).toISOString().slice(0, 7);

      const monthlyClientsLast = lastMonthBookings.length || 5; // replace with real historical

      // Weekly revenue (current week)
      const weekRevenue = bookings
        .filter((b: any) => b.status === "approved")
        .reduce((sum: number, b: any) => sum + b.amount, 0);

      // Weekly revenue change (dummy)
      const lastWeekRevenue = 1700; // replace with historical

      // Change calculations
      const weeklyRevenueChange = lastWeekRevenue
        ? Math.round(((weekRevenue - lastWeekRevenue) / lastWeekRevenue) * 100)
        : 0;
      const monthlyClientsChange = monthlyClientsLast
        ? Math.round(((monthlyClients.length - monthlyClientsLast) / monthlyClientsLast) * 100)
        : 0;

      // Pending approvals
      const pending = bookings.filter((b: any) => b.status === "pending");

      // Recent activity
      const activity = bookings.slice(0, 5).map((b: any) => ({
        id: b.id,
        type: "booking",
        message: `New ${b.services?.title} booking from ${b.customer?.full_name}`,
        time: new Date(b.booking_date).toLocaleString(),
      }));

      // Review analytics
      const { data: reviews } = await supabase
        .from("reviews")
        .select("rating")
        .eq("provider_id", providerId);

      const avgRating =
        reviews && reviews.length > 0
          ? (reviews.reduce((a: number, b: any) => a + b.rating, 0) / reviews.length).toFixed(1)
          : 0;
      const ratingChange = reviews && reviews.length > 6
        ? Number(avgRating) - reviews.slice(0, -1).reduce((a, b) => a + b.rating, 0) / (reviews.length - 1)
        : 0;

      // Availability
      const availability = await fetchAvailability(providerId);
      const totalSlots = availability.length;
      const filledSlots = availability.filter((a) => a.is_booked).length;
      const availabilityFilled = totalSlots
        ? Math.round((filledSlots / totalSlots) * 100)
        : 0;

      // Change (dummy, can add logic)
      const lastWeekAvailability = 90;
      const availabilityChange = lastWeekAvailability 
        ? availabilityFilled - lastWeekAvailability
        : 0;

      // Smart tips
      let tip = "";
      if (weeklyRevenueChange > 20) tip = "Revenue is up 🟢 compared to last week!";
      else if (weeklyRevenueChange < -10) tip = "Revenue dropped last week. Check your service offering!";
      else tip = "Your dashboard is steady. Try adding new availability slots for more bookings.";

      setStats({
        todayBookings: todaysAppointments.length,
        weeklyRevenue: weekRevenue,
        weeklyRevenueChange,
        monthlyClients: monthlyClients.length,
        monthlyClientsChange,
        averageRating: Number(avgRating),
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
  }

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


  }
}

export default useProvideDashBoard
