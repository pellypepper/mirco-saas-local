"use client";
import { useAvailabilityFooter } from "@/hooks/useAvailability";
import { Calendar, TrendingUp, Clock } from "lucide-react";
import { useMainNavBar } from "@/hooks/MainNavContext";

const AvailabilityFooter = ({
  availability,
  sortedDates
}: {
  availability: any[];
  sortedDates: string[];
}) => {

  const { totalSlots, availableDays, avg } = useAvailabilityFooter(availability, sortedDates);
  const { isDarkMode } = useMainNavBar();

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Total Slots Card */}
      <div className="group relative">
      <div className={`relative ${isDarkMode ? "bg-zinc-900 border-zinc-700 hover:border-chart-2" : "bg-white border-gray-300 hover:border-chart-2"} border-2 rounded-2xl p-6 shadow-xl transition-all duration-300 overflow-hidden`}>
       
          <div className="relative text-center">
            {/* Icon */}
            <div className="inline-flex p-3 bg-gradient-to-br from-chart-2/20 to-chart-2/10 rounded-xl border border-chart-2/30 mb-3 group-hover: scale-110 transition-transform duration-300">
              <Clock size={24} className="text-chart-2" />
            </div>
            
            {/* Value */}
            <div className="text-4xl md:text-5xl font-black text-transparent bg-chart-2 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
              {totalSlots}
            </div>
            
            {/* Label */}
            <div className={`text-xs md:text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"} font-bold uppercase tracking-wider`}>
              Available Slots
            </div>
          </div>

      
               </div>
      </div>

      {/* Available Days Card */}
      <div className="group relative">
        {/* Glow effect */}
   
        <div className={`relative ${isDarkMode ? "bg-zinc-900 border-zinc-700 hover:border-chart-4" : "bg-white border-gray-300 hover:border-chart-4"} border-2 rounded-2xl p-6 shadow-xl transition-all duration-300 overflow-hidden`}>
      
          <div className="relative text-center">
            {/* Icon */}
            <div className={`inline-flex p-3 bg-gradient-to-br from-chart-4/20 to-chart-4/10 rounded-xl border border-chart-4/30 mb-3 group-hover:scale-110 transition-transform duration-300`}>
              <Calendar size={24} className="text-chart-4" />
            </div>
            
            {/* Value */}
            <div className="text-4xl md:text-5xl font-black text-transparent bg-chart-4 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
              {availableDays}
            </div>
            
            {/* Label */}
            <div className={`text-xs md:text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"} font-bold uppercase tracking-wider`}>
              Available Days
            </div>
          </div>



        </div>
      </div>

      {/* Average per Day Card */}
      <div className="group relative">
    
        <div className={`relative ${isDarkMode ? "bg-zinc-900 border-zinc-700 hover:border-chart-1" : "bg-white border-gray-300 hover:border-[#eb7323]"} border-2 rounded-2xl p-6 shadow-xl transition-all duration-300 overflow-hidden`}>
       
          <div className="relative text-center">
            {/* Icon */}
            <div className={`inline-flex p-3 bg-chart-1/10 rounded-xl border border-chart-1/20 mb-3 group-hover: scale-110 group-hover:border-chart-1 transition-all duration-300`}>
              <TrendingUp size={24} className=" text-chart-1 bg-clip-text" />
            </div>
            
            {/* Value */}
            <div className="text-4xl md:text-5xl font-black text-transparent bg-chart-1 bg-clip-text mb-2 group-hover: scale-110 transition-transform duration-300">
              {avg}
            </div>
            
            {/* Label */}
            <div className={`text-xs md:text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"} font-bold uppercase tracking-wider`}>
              Average Per Day
            </div>
          </div>


                </div>
      </div>
    </div>
  );
};

export default AvailabilityFooter;