"use client";
import {
  Calendar, DollarSign, Users, Star,

} from "lucide-react";
import { CardGradient, StatIcon, TrendPercent, ProgressCircle } from "./Component/metricComponent";
import { useMainNavBar } from "@/hooks/MainNavContext";


export default function MetricsGrid({ stats }: any) {

  const { isDarkMode } = useMainNavBar();
  // Colors for progress bars
  const colorMap: any = {
    green: "#008800",
    violet: "#0077b6",
    blue: "#fb8500",
    yellow:  "#f50000",
 
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
      <CardGradient isDarkMode={isDarkMode}>
        <div className="flex items-center gap-4">
          <StatIcon Icon={Calendar} color={colorMap.violet} />
          <div>
            <p className={`font-semibold ${isDarkMode ? "text-white" : "text-black"} text-xs md:text-sm mb-1`}>Today's Bookings</p>
            <p className={`text-sm md:text-2xl font-black ${isDarkMode ? "text-white" : "text-black"}`}>{stats.todayBookings}</p>
          </div>
        </div>
      </CardGradient>
      <CardGradient isDarkMode={isDarkMode}>
        <div className="flex items-center gap-4">
          <StatIcon Icon={DollarSign} color={colorMap.green} />
          <div className="flex flex-col">
            <p className={`font-semibold ${isDarkMode ? "text-white" : "text-black"} text-xs md:text-sm mb-1`}>This Week Revenue</p>
            <div className="flex items-center gap-2">
              <p className={`text-sm md:text-2xl font-black ${isDarkMode ? "text-white" : "text-black"}`}>${stats.weeklyRevenue}</p>
              <TrendPercent isDarkMode={isDarkMode} percent={stats.weeklyRevenueChange} />
            </div>
          </div>
        </div>
      </CardGradient>
      <CardGradient isDarkMode={isDarkMode}>
        <div className="flex items-center gap-4">
          <StatIcon Icon={Users} color={colorMap.blue} />
          <div>
            <p className={`font-semibold ${isDarkMode ? "text-white" : "text-black"} text-xs md:text-sm mb-1`}>This Month's Clients</p>
            <div className="flex items-center gap-2">
              <p className={`text-sm  md:text-2xl font-black ${isDarkMode ? "text-white" : "text-black"}`}>{stats.monthlyClients}</p>
              <TrendPercent isDarkMode={isDarkMode} percent={stats.monthlyClientsChange} />
            </div>
          </div>
        </div>
      </CardGradient>
      <CardGradient isDarkMode={isDarkMode}>
        <div className="flex items-center gap-4">
          <StatIcon Icon={Star} color={colorMap.yellow} />
          <div>
            <p className={`font-semibold ${isDarkMode ? "text-white" : "text-black"} text-xs md:text-sm mb-1`}>Avg. Rating</p>
            <div className="flex gap-2 items-center">
              <ProgressCircle
                value={stats.averageRating * 20} // out of 5
             
              />
              <span className={`font-black text-sm ${isDarkMode ? "text-white" : "text-black"}`}>{stats.averageRating}</span>
            </div>
          </div>
        </div>
      </CardGradient>
    </div>
  );
}

