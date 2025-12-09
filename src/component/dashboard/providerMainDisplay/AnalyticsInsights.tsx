"use client";
import {
 TrendingUp,   Users, Star,

} from "lucide-react";
import GlassInsightCard from "./Component/GlassInsightCard";


export default function AnalyticsInsights({ stats }: any) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-10">
      <GlassInsightCard
        icon={<TrendingUp className="text-chart-2" />}
        label="Revenue Trend"
        value={stats.weeklyRevenueChange >= 0 ? "Increasing" : "Falling"}
        desc={`This week's revenue is ${stats.weeklyRevenueChange > 0 ? "up" : "down"} by ${stats.weeklyRevenueChange}% vs last week.`}
      />
      <GlassInsightCard
        icon={<Users className="text-chart-3" />}
        label="Client Growth"
        value={stats.monthlyClientsChange >= 0 ? "Growing" : "Dropping"}
        desc={`You gained ${stats.monthlyClientsChange}% more clients vs last month.`}
      />
      <GlassInsightCard
        icon={<Star className="text-chart-4" />}
        label="Satisfaction"
        value={`${stats.averageRating}/5`}
        desc={`With ${stats.totalReviews} reviews. ${stats.averageRating > 4.5 ? "Excellent!" : "Good job!"}`}
      />
    </div>
  );
}


