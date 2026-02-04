"use client";
import {
  AlertCircle, Activity, Bell, TrendingUp, Clock
} from "lucide-react";
import { CardGlass } from "./Component/CardGlass";
import { useMainNavBar } from "@/hooks/MainNavContext";

export default function BottomPanels({ stats, recentActivity }: any) {
  const { isDarkMode } = useMainNavBar();


  return (
    <div className="grid md:grid-cols-2 gap-6 ">
      {/* Needs Attention Panel */}
      <CardGlass isDarkMode={isDarkMode}>
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
         
            <div className="relative p-3 bg-chart-1 rounded-xl">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <h2 className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-black"}`}>Needs Attention</h2>
        </div>
        
        <div className="space-y-4">
          <AlertBox
       
            icon={<Bell className="w-5 h-5" />}
            label={`${stats.pendingApprovals} Pending Approvals`}
            description="Review your new booking requests asap."
            color="#0077b6"
            value={stats.pendingApprovals}
            progress={stats.pendingApprovals > 10 ? 80 : stats.pendingApprovals * 8}
          />
          <AlertBox
        
            icon={<TrendingUp className="w-5 h-5" />}
            label={`Availability ${stats.availabilityFilled}% Filled`}
            description="Stay flexible and add more slots to maximize bookings."
            color="#f50000"
            value={stats.availabilityFilled}
            progress={stats.availabilityFilled}
          />
        </div>
      </CardGlass>

      {/* Recent Activity Panel */}
      <CardGlass isDarkMode={isDarkMode}>
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
         
            <div className="relative p-3 bg-chart-2 rounded-xl">
              <Activity className="w-5 h-5 text-white" />
            </div>
          </div>
          <h2 className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-black"}`}>Recent Activity</h2>
        </div>
        
        <div className="space-y-3">
          {recentActivity. length === 0 ? (
            <div className="text-center py-12">
              <div className={`inline-flex p-4 ${isDarkMode ? "bg-zinc-900" : "bg-zinc-100"} rounded-full border ${isDarkMode ? "border-zinc-700" : "border-zinc-300"} mb-3`}>
                <Activity size={32} className="text-chart-2" />
              </div>
              <p className="text-zinc-500 font-medium">No recent activity.</p>
            </div>
          ) : (
            recentActivity.map((a: any, index: number) => (
              <div 
                key={a.id} 
                className={`group relative ${isDarkMode ? "bg-zinc-900" : "bg-white"}  flex gap-4 p-4  rounded-xl   hover:border-chart-2 transition-all duration-300`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
           
                {/* Icon container */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-chart-2 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  <div className={`relative p-3 bg-chart-3 rounded-full border-2 ${isDarkMode ? "border-zinc-700" : "border-white"} group-hover:border-chart-3 transition-colors`}>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className={`font-bold ${isDarkMode ? "text-white" : "text-black"} text-sm md:text-base mb-1 group-hover:text-chart-2 transition-colors`}>
                    {a.message}
                  </p>
                  <div className={`flex items-center gap-2 text-xs  ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <Clock size={12} />
                    <span>{a.time}</span>
                  </div>
                </div>

          
                          </div>
            ))
          )}
        </div>
      </CardGlass>
    </div>
  );
}

function AlertBox({ 
  icon, 
  label, 
  description, 
  color, 
  progress = 0 ,

}: { 
  icon: React.ReactNode;
  label: string;
  description: string;
  color:  string;
  value?: number;
  progress:  number;
 
}) {
   const { isDarkMode } = useMainNavBar();
  return (
    <div className="group relative">
   
      
      {/* Main card */}
      <div 
        className={`relative p-5 ${isDarkMode ? "bg-zinc-900" : "bg-white"} rounded-2xl hover:scale-[1.02] transition-all duration-300`}
        style={{ borderColor: `${color}40` }}
      >
        {/* Header with icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${color}20` }}
            >
              <div style={{ color: color }}>
                {icon}
              </div>
            </div>
            <div>
              <p className={`font-black ${isDarkMode ? "text-white" : "text-black"} text-base`}>{label}</p>
            </div>
          </div>
          
          {/* Percentage badge */}
          <div 
            className={`px-3 py-1 rounded-full  ${isDarkMode ? "text-[#008800] bg-[#008800]/10 border-[#008800]" : "text-[#008800]"} bg-[#008800]/10 text-xs font-black border-2`}
        
          >
            {progress}%
          </div>
        </div>

        {/* Progress bar */}
        <div className={`relative w-full h-3 mb-3 ${isDarkMode ? "bg-zinc-900" : "bg-zinc-100"} rounded-full overflow-hidden border border-zinc-700`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${color} 10px, ${color} 20px)`,
          }}></div>
          
          {/* Progress fill */}
          <div 
            className="h-full transition-all duration-1000 ease-out relative overflow-hidden" 
            style={{ 
              width: `${progress}%`, 
              backgroundColor: color 
            }}
          >
            {/* Shimmer effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
              style={{ animation: 'shimmer 2s infinite' }}
            ></div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
      </div>

      <style jsx>{`
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`}</style>
    </div>
  );
}