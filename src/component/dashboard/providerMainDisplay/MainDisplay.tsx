"use client";
import {
   Clock,
Sparkles, 
Zap,   
} from "lucide-react";

import MetricsGrid from "./Metric";
import "react-circular-progressbar/dist/styles.css";
import MainPanels from "./MainPanel";
import AnalyticsInsights from "./AnalyticsInsights";
import Loader from "@/component/Spinner";
import BottomPanels from "./BottomPanel";
import useProvideDashBoard from "@/hooks/useProvideDashBoard";
import { useMainNavBar } from "@/hooks/MainNavContext";
import { Capitalize } from "@/lib/Capitalize";

export default function ProviderDashboard({profile}: {profile: any}) {

  const {
    stats,
    upcomingBookings,
    recentActivity,
    quickActions,
    tips,
    loading,
  } = useProvideDashBoard();
  const { isDarkMode } = useMainNavBar();

  const formattedName = profile?.full_name ? Capitalize(profile.full_name) : profile.full_name;

  if (loading) {
    return (
      <Loader  message="Loading dashboard..."/>
   
    );
  }

  return (
    <div className="min-h-screen   p-4 md:p-8">
      <div className=" mx-auto">

      <div className="mb-8">
          <div className={`relative ${isDarkMode ? "bg-gradient-to-br from-chart-2 to-chart-3  " : "bg-gradient-to-br from-chart-2 to-chart-3"} rounded-3xl shadow-2xl px-8 md:px-10 py-8 md:py-11 text-white overflow-hidden `}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24"></div>
            
            {/* Geometric pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                {/* Welcome Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
                  <Sparkles size={16} className="text-white" />
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Dashboard</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight drop-shadow-lg">
                  Welcome Back, {formattedName }!
                </h1>
                <p className="text-white/90 text-base md:text-lg font-medium mb-1">Today's Analytics at a Glance</p>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Clock size={14} />
                  <span>{new Date().toDateString()}</span>
                </div>
              </div>

              {/* Today's Appointments Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white rounded-2xl blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white/20 backdrop-blur-xl px-8 py-5 rounded-2xl border-2 border-white/30 shadow-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Clock size={20} className="text-white" />
                    </div>
                    <span className="text-white/90 text-sm font-bold uppercase tracking-wider">
                      Today
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">{stats.upcomingToday}</span>
                    <span className="text-white/70 text-sm font-medium">appointments</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="relative mt-6 flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="p-2 bg-chart-2 rounded-lg animate-pulse">
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-sm text-white font-medium italic">{tips}</span>
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











