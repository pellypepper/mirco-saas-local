"use client";

import { useEffect, useState } from "react";
import { adminDashboardService } from "@/services/adminDashboard";

export function useAdminDashboard() {
  const [overview, setOverview] = useState({
    totalRevenue: 0,
    revenueChange: 0,
    totalBookings: 0,
    bookingsChange: 0,
    totalCustomers: 0,
    customersChange: 0,
    totalProviders: 0,
    providersChange: 0,
    activeBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    avgOrderValue: 0,
    conversionRate: 0,
    customerSatisfaction: 0,
  });

  const [revenueData, setRevenueData] = useState<Array<{ month: string; revenue: number; bookings: number }>>([]);
  const [bookingStatus, setBookingStatus] = useState<Array<{ name: string; value: number; color: string }>>([]);
  const [topProviders, setTopProviders] = useState<Array<{ id: any; name: any; revenue: number; bookings: number; rating: any; location: any }>>([]);
  const [recentCustomers, setRecentCustomers] = useState<Array<{ id: any; name: any; email: any; joined: any; bookings: number; spent: number }>>([]);
  const [categoryData, setCategoryData] = useState<Array<{ category: any; bookings: number; revenue: number }>>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: bookingsData } = await adminDashboardService.getBookings();
        const { data: customersData } = await adminDashboardService.getCustomers();
        const { data: providersData } = await adminDashboardService.getProviders();
        const { data: servicesData } = await adminDashboardService.getServices();

        if (!bookingsData || !customersData || !providersData || !servicesData) return;

        // -----------------------------
        // Overview Metrics
        // -----------------------------
        const totalRevenue = bookingsData.reduce((sum, b) => sum + b.amount, 0);
        const totalBookings = bookingsData.length;

        setOverview(prev => ({
          ...prev,
          totalRevenue,
          totalBookings,
          totalCustomers: customersData.length,
          totalProviders: providersData.length,
          activeBookings: bookingsData.filter(b => b.status === "confirmed").length,
          completedBookings: bookingsData.filter(b => b.status === "completed").length,
          cancelledBookings: bookingsData.filter(b => b.status === "cancelled").length,
          pendingBookings: bookingsData.filter(b => b.status === "pending").length,
        }));

        // -----------------------------
        // Revenue Last 6 Months
        // -----------------------------
        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const revenueLast6Months = Array.from({ length: 6 }).map((_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - (5 - i));
          const m = date.getMonth();
          const y = date.getFullYear();

          const monthlyBookings = bookingsData.filter(b => {
            const d = new Date(b.booking_date);
            return d.getMonth() === m && d.getFullYear() === y;
          });

          return {
            month: monthNames[m],
            revenue: monthlyBookings.reduce((s, b) => s + b.amount, 0),
            bookings: monthlyBookings.length
          };
        });

        setRevenueData(revenueLast6Months);

        // -----------------------------
        // Booking Status Distribution
        // -----------------------------
        setBookingStatus([
          { name: "Confirmed", value: bookingsData.filter(b => b.status === "confirmed").length, color: "#009689" },
          { name: "Pending", value: bookingsData.filter(b => b.status === "pending").length, color: "#eab308" },
          { name: "Cancelled", value: bookingsData.filter(b => b.status === "cancelled").length, color: "#f54900" }
        ]);

        // -----------------------------
        // Top Providers
        // -----------------------------
        const providerRevenueMap: Record<string, number> = {};
        bookingsData.forEach(b => {
          providerRevenueMap[b.provider_id] = (providerRevenueMap[b.provider_id] || 0) + b.amount;
        });

        const topProvidersList = providersData
          .map(p => ({
            id: p.id,
            name: p.full_name,
            revenue: providerRevenueMap[p.id] || 0,
            bookings: bookingsData.filter(b => b.provider_id === p.id).length,
            rating: p.rating || 0,
            location: p.location
          }))
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5);

        setTopProviders(topProvidersList);

        // -----------------------------
        // Recent Customers
        // -----------------------------
        const recentCustomerList = customersData
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5)
          .map(c => {
            const customerBookings = bookingsData.filter(b => b.customer_id === c.id);
            return {
              id: c.id,
              name: c.full_name,
              email: c.email,
              joined: c.created_at,
              bookings: customerBookings.length,
              spent: customerBookings.reduce((sum, b) => sum + b.amount, 0),
            };
          });

        setRecentCustomers(recentCustomerList);

        // -----------------------------
        // Category Performance
        // -----------------------------
        const categoryPerf = servicesData.map(s => {
          const svcBookings = bookingsData.filter(b => b.services_id === s.id);
          return {
            category: s.title,
            bookings: svcBookings.length,
            revenue: svcBookings.reduce((sum, b) => sum + b.amount, 0)
          };
        });

        setCategoryData(categoryPerf);

      } catch (error) {
        console.error("Admin Dashboard Load Error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    overview,
    revenueData,
    bookingStatus,
    topProviders,
    recentCustomers,
    categoryData,
  };
}
