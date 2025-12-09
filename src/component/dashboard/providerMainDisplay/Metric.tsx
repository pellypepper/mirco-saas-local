"use client";
import {
  Calendar, DollarSign, Users, Star,

} from "lucide-react";
import { CardGradient, StatIcon, TrendPercent, ProgressCircle } from "./Component/metricComponent";


export default function MetricsGrid({ stats }: any) {
  // Colors for progress bars
  const colorMap: any = {
    violet: "#009689",
    green: "#0e524c",
    blue: "#104e64",
    yellow: "#ffb900",
    indigo: "#6366f1",
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
      <CardGradient>
        <div className="flex items-center gap-4">
          <StatIcon Icon={Calendar} color={colorMap.violet} />
          <div>
            <p className="font-semibold text-chart-2 text-xs md:text-sm mb-1">Today's Bookings</p>
            <p className="text-xl md:text-2xl font-black">{stats.todayBookings}</p>
          </div>
        </div>
      </CardGradient>
      <CardGradient>
        <div className="flex items-center gap-4">
          <StatIcon Icon={DollarSign} color={colorMap.green} />
          <div>
            <p className="font-semibold text-chart-22 text-xs md:text-sm mb-1">This Week Revenue</p>
            <div className="flex items-center gap-2">
              <p className="text-xl md:text-2xl font-black">${stats.weeklyRevenue}</p>
              <TrendPercent percent={stats.weeklyRevenueChange} />
            </div>
          </div>
        </div>
      </CardGradient>
      <CardGradient>
        <div className="flex items-center gap-4">
          <StatIcon Icon={Users} color={colorMap.blue} />
          <div>
            <p className="font-semibold text-chart-3 text-xs md:text-sm mb-1">This Month's Clients</p>
            <div className="flex items-center gap-2">
              <p className="text-xl md:text-2xl font-black">{stats.monthlyClients}</p>
              <TrendPercent percent={stats.monthlyClientsChange} />
            </div>
          </div>
        </div>
      </CardGradient>
      <CardGradient>
        <div className="flex items-center gap-4">
          <StatIcon Icon={Star} color={colorMap.yellow} />
          <div>
            <p className="font-semibold text-yellow-700 text-xs md:text-sm mb-1">Avg. Rating</p>
            <div className="flex gap-2 items-center">
              <ProgressCircle
                value={stats.averageRating * 20} // out of 5
                color={colorMap.yellow}
              />
              <span className="font-black text-xl">{stats.averageRating}</span>
            </div>
          </div>
        </div>
      </CardGradient>
    </div>
  );
}

