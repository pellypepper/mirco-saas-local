'use client';
import { useMemo } from 'react';

import AdminHeader from './component/AdminHeader';
import TimeRange from './component/TimeRange';
import OverviewStat from './component/OverviewStat';
import ChartsRow from './component/ChartsRow';
import Performance from './component/Performance';
import TransactionsRow from './component/TransactionRows';
import SecondaryMetrics from './component/SecondaryMetric';
import FooterStats from './component/FooterStats';
import StatCard from './component/StatsCard';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { useMainNavBar } from '@/hooks/MainNavContext';
import Loader from '@/component/Spinner';

export default function AdminDashboard() {
  const { overview, loading, revenueData, bookingStatus, topProviders, recentCustomers, categoryData } =
    useAdminDashboard();
const memoizedOverview = useMemo(() => overview, [overview]);
    const { isDarkMode } = useMainNavBar();
  if (loading) return <Loader message="Loading dashboard data..." />;

  return (
    <div className={`min-h-screen  `}>
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ⭐ Admin Header */}
        <AdminHeader isDarkMode={isDarkMode} />

        {/* Time Range */}
        <TimeRange isDarkMode={isDarkMode} />

        {/* Overview */}
        <OverviewStat
          isDarkMode={isDarkMode}
          overview={memoizedOverview}
          StatCard={StatCard}
        />

        {/* Charts */}
        <ChartsRow
          isDarkMode={isDarkMode}
          revenueData={revenueData}
          bookingStatus={bookingStatus}
        />

        {/* Performance */}
        <Performance
          isDarkMode={isDarkMode}
          categoryData={categoryData}
        />

        {/* Tables */}
        <TransactionsRow
          isDarkMode={isDarkMode}
          topProviders={topProviders}
          recentCustomers={recentCustomers}
        />

        {/* Secondary */}
        <SecondaryMetrics overview={memoizedOverview} StatCard={StatCard} />

        {/* Footer */}
        <FooterStats overview={memoizedOverview} />
      </div>
    </div>
  );
}
