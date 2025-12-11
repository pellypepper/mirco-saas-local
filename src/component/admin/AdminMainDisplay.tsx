"use client";
import { useState, useMemo } from "react";

import AdminHeader from "./component/AdminHeader";
import TimeRange from "./component/TimeRange";
import OverviewStat from "./component/OverviewStat";
import ChartsRow from "./component/ChartsRow";
import Performance from "./component/Performance";
import TransactionsRow from "./component/TransactionRows";
import SecondaryMetrics from "./component/SecondaryMetric";
import FooterStats from "./component/FooterStats";
import StatCard from "./component/StatsCard";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";



export default function AdminDashboard() {
  const {
    overview,
    revenueData,
    bookingStatus,
    topProviders,
    recentCustomers,
    categoryData
  } = useAdminDashboard();


  // HANDLERS FOR ADMIN HEADER
  // -------------------------------
 







 




  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ⭐ Admin Header with full functionality */}
        <AdminHeader 

        />

     

        {/* Time Range Selector */}
        <TimeRange />

        {/* Overview Stats */}
        <OverviewStat overview={overview} StatCard={StatCard} />

        {/* Charts Row */}
        <ChartsRow 
          revenueData={revenueData} 
          bookingStatus={bookingStatus}
        />

        {/* Category Performance */}
        <Performance categoryData={categoryData} />

        {/* Tables Row */}
        <TransactionsRow 
          topProviders={topProviders} 
          recentCustomers={recentCustomers}
        />

        {/* Secondary Metrics */}
        <SecondaryMetrics overview={overview} StatCard={StatCard} />

        {/* Footer Stats */}
        <FooterStats overview={overview} />
      </div>

     
    </div>
  );
}


