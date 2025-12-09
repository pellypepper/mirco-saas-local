"use client";
import {
   Clock,
Sparkles, 
} from "lucide-react";

import MetricsGrid from "./Metric";
import "react-circular-progressbar/dist/styles.css";
import MainPanels from "./MainPanel";
import AnalyticsInsights from "./AnalyticsInsights";
import Loader from "@/component/Spinner";
import BottomPanels from "./BottomPanel";
import useProvideDashBoard from "@/hooks/useProvideDashBoard";

export default function ProviderDashboard({profile}: {profile: any}) {

  const {
    stats,
    upcomingBookings,
    recentActivity,
    quickActions,
    tips,
    loading,
  } = useProvideDashBoard();

  if (loading) {
    return (
      <Loader  message="Loading dashboard..."/>
   
    );
  }

  return (
    <div className="min-h-screen   p-4 md:p-8">
      <div className=" mx-auto">

        {/* HERO HEADER */}
        <div className="mb-8 relative">
          <div className="bg-gradient-to-r from-chart-2/80 to-chart-3/80 rounded-3xl shadow-2xl px-10 py-11 text-white backdrop-blur-xl border border-violet-100/30">
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-4xl  font-black mb-1 tracking-tight drop-shadow">Welcome Back! {profile.full_name}</h1>
                <p className="text-white/90 text-md md:text-lg">Today's Analytics at a Glance</p>
                <p className="text-white/70 text-xs md:text-sm">{new Date().toDateString()}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-7 py-3 rounded-xl border border-white/30 flex flex-col items-center">
                <span className="text-white/80 text-xs mb-1 flex items-center gap-1">
                  <Clock size={16} className="inline" /> Appointments Today
                </span>
                <span className="text-2xl md:text-4xl font-bold">{stats.upcomingToday}</span>
              </div>
            </div>
            <div className="absolute bottom-3 right-5 hidden md:flex items-center gap-2">
              <Sparkles size={20} className="text-white animate-bounce" />
              <span className="italic text-sm text-white">{tips}</span>
            </div>
          </div>
        </div>

        {/* METRICS GRID */}
        <MetricsGrid stats={stats} />

        {/* PANELS */}
        <MainPanels upcoming={upcomingBookings} quickActions={quickActions} />

        {/* ANALYTICS INSIGHTS */}
        <AnalyticsInsights stats={stats} />

        {/* ALERTS + ACTIVITY */}
        <BottomPanels stats={stats} recentActivity={recentActivity} />

      </div>
    </div>
  );
}











