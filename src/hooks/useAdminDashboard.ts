"use client"; 

import { useEffect, useState } from "react";
import { adminDashboardService } from "@/services/adminDashboard";

export function useAdminDashboard(timeRange: string = '6m') {
  const [overview, setOverview] = useState({
    totalRevenue:  0,
    revenueChange: 0,
    totalBookings: 0,
    bookingsChange: 0,
    totalCustomers: 0,
    customersChange: 0,
    totalProviders: 0,
    providersChange:  0,
    activeBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    avgOrderValue:  0,
    conversionRate: 0,
    customerSatisfaction: 0,
  });

  const [revenueData, setRevenueData] = useState<Array<{ month:  string; revenue: number; bookings: number }>>([]);
  const [bookingStatus, setBookingStatus] = useState<Array<{ name: string; value: number; color: string }>>([]);
  const [topProviders, setTopProviders] = useState<Array<{ id: any; name: any; revenue: number; bookings: number; rating: any; location: any }>>([]);
  const [recentCustomers, setRecentCustomers] = useState<Array<{ id: any; name: any; email: any; joined: any; bookings: number; spent: number }>>([]);
  const [categoryData, setCategoryData] = useState<Array<{ category: any; bookings:  number; revenue: number }>>([]);

  // Helper:  Get date range based on timeRange
  const getDateRange = (range: string) => {
    const now = new Date();
    const start = new Date();

    switch (range) {
      case '7d':
        start.setDate(now.getDate() - 7);
        break;
      case '30d': 
        start.setDate(now.getDate() - 30);
        break;
      case '3m':
        start.setMonth(now.getMonth() - 3);
        break;
      case '6m':
        start.setMonth(now.getMonth() - 6);
        break;
      default:
        start.setMonth(now.getMonth() - 6);
    }

    return { start, end: now };
  };

  // Helper: Filter data by date range
  const filterByDateRange = (data: any[], dateField: string, range: string) => {
    const { start, end } = getDateRange(range);
    return data.filter(item => {
      const itemDate = new Date(item[dateField]);
      return itemDate >= start && itemDate <= end;
    });
  };

  // Helper: Get number of periods for chart
  const getPeriodsCount = (range: string) => {
    switch (range) {
      case '7d':
        return 7;
      case '30d': 
        return 30;
      case '3m':
        return 3;
      case '6m':
        return 6;
      default:
        return 6;
    }
  };

  // Helper: Get period label
  const getPeriodLabel = (range: string, index: number, date: Date) => {
    if (range === '7d' || range === '30d') {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return monthNames[date.getMonth()];
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: allBookingsData } = await adminDashboardService.getBookings();
        const { data: allCustomersData } = await adminDashboardService.getCustomers();
        const { data: providersData } = await adminDashboardService.getProviders();
        const { data: servicesData } = await adminDashboardService.getServices();

        if (!allBookingsData || !allCustomersData || !providersData || !servicesData) return;

        // Filter bookings by time range
        const bookingsData = filterByDateRange(allBookingsData, 'booking_date', timeRange);
        const customersData = filterByDateRange(allCustomersData, 'created_at', timeRange);

        // -----------------------------
        // Overview Metrics
        // -----------------------------
        const totalRevenue = bookingsData.reduce((sum, b) => sum + b.amount, 0);
        const totalBookings = bookingsData.length;
        const avgOrderValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

        // Calculate previous period for comparison
        const { start:  prevStart } = getDateRange(timeRange);
        const periodLength = new Date().getTime() - prevStart.getTime();
        const prevPeriodStart = new Date(prevStart.getTime() - periodLength);
        
        const prevBookings = allBookingsData.filter(b => {
          const d = new Date(b.booking_date);
          return d >= prevPeriodStart && d < prevStart;
        });
        
        const prevRevenue = prevBookings.reduce((sum, b) => sum + b.amount, 0);
        const revenueChange = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0;
        const bookingsChange = prevBookings.length > 0 ? ((totalBookings - prevBookings.length) / prevBookings.length) * 100 : 0;

        setOverview({
          totalRevenue,
          revenueChange,
          totalBookings,
          bookingsChange,
          totalCustomers: customersData.length,
          customersChange: 0, // Calculate if needed
          totalProviders: providersData.length,
          providersChange: 0, // Calculate if needed
          activeBookings: bookingsData.filter(b => b.status === "confirmed").length,
          completedBookings: bookingsData.filter(b => b.status === "completed").length,
          cancelledBookings: bookingsData.filter(b => b.status === "cancelled").length,
          pendingBookings: bookingsData.filter(b => b.status === "pending").length,
          avgOrderValue,
          conversionRate: 0, // Calculate if needed
          customerSatisfaction: 0, // Calculate if needed
        });

        // -----------------------------
        // Revenue Over Time
        // -----------------------------
        const periodsCount = getPeriodsCount(timeRange);
        const isDaily = timeRange === '7d' || timeRange === '30d';

        const revenueOverTime = Array.from({ length: periodsCount }).map((_, i) => {
          const date = new Date();
          
          if (isDaily) {
            date.setDate(date. getDate() - (periodsCount - 1 - i));
            const dayStart = new Date(date.setHours(0, 0, 0, 0));
            const dayEnd = new Date(date.setHours(23, 59, 59, 999));

            const dayBookings = bookingsData.filter(b => {
              const d = new Date(b.booking_date);
              return d >= dayStart && d <= dayEnd;
            });

            return {
              month: getPeriodLabel(timeRange, i, date),
              revenue: dayBookings.reduce((s, b) => s + b.amount, 0),
              bookings: dayBookings.length
            };
          } else {
            date.setMonth(date.getMonth() - (periodsCount - 1 - i));
            const m = date.getMonth();
            const y = date.getFullYear();

            const monthlyBookings = bookingsData.filter(b => {
              const d = new Date(b.booking_date);
              return d.getMonth() === m && d.getFullYear() === y;
            });

            return {
              month: getPeriodLabel(timeRange, i, date),
              revenue: monthlyBookings.reduce((s, b) => s + b.amount, 0),
              bookings: monthlyBookings.length
            };
          }
        });

        setRevenueData(revenueOverTime);

        // -----------------------------
        // Booking Status Distribution
        // -----------------------------
        setBookingStatus([
          { 
            name: "Confirmed", 
            value: bookingsData.filter(b => b.status === "confirmed").length, 
            color: "#009689" 
          },
          { 
            name: "Pending", 
            value: bookingsData. filter(b => b.status === "pending").length, 
            color: "#eab308" 
          },
          { 
            name: "Cancelled", 
            value: bookingsData. filter(b => b.status === "cancelled").length, 
            color: "#f54900" 
          }
        ]);

        // -----------------------------
        // Top Providers (in selected time range)
        // -----------------------------
        const providerRevenueMap: Record<string, number> = {};
        const providerBookingsMap: Record<string, number> = {};
        
        bookingsData.forEach(b => {
          providerRevenueMap[b.provider_id] = (providerRevenueMap[b.provider_id] || 0) + b.amount;
          providerBookingsMap[b. provider_id] = (providerBookingsMap[b.provider_id] || 0) + 1;
        });

        const topProvidersList = providersData
          .map(p => ({
            id: p.id,
            name: p.full_name,
            revenue: providerRevenueMap[p.id] || 0,
            bookings: providerBookingsMap[p.id] || 0,
            rating: p.rating || 0,
            location: p.location
          }))
          .filter(p => p.revenue > 0) // Only include providers with bookings in this period
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5);

        setTopProviders(topProvidersList);

        // -----------------------------
        // Recent Customers (in selected time range)
        // -----------------------------
        const recentCustomerList = customersData
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5)
          .map(c => {
            const customerBookings = bookingsData. filter(b => b.customer_id === c.id);
            return {
              id: c. id,
              name: c. full_name,
              email:  c.email,
              joined: c.created_at,
              bookings: customerBookings.length,
              spent: customerBookings.reduce((sum, b) => sum + b.amount, 0),
            };
          });

        setRecentCustomers(recentCustomerList);

        // -----------------------------
        // Category Performance (in selected time range)
        // -----------------------------
        const categoryPerf = servicesData.map(s => {
          const svcBookings = bookingsData.filter(b => b.services_id === s.id);
          return {
            category: s.title,
            bookings: svcBookings.length,
            revenue: svcBookings.reduce((sum, b) => sum + b.amount, 0)
          };
        }).filter(c => c.bookings > 0) // Only show categories with bookings
          .sort((a, b) => b.revenue - a.revenue);

        setCategoryData(categoryPerf);

      } catch (error) {
        console.error("Admin Dashboard Load Error:", error);
      }
    };

    fetchDashboardData();
  }, [timeRange]); // Re-run when timeRange changes

  return {
    overview,
    revenueData,
    bookingStatus,
    topProviders,
    recentCustomers,
    categoryData,
  };
}