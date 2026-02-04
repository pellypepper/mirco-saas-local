"use client";
import { X, Calendar, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";


interface ViewAvailabilityModalProps {
  open: boolean;
  onClose: () => void;
  daySlots: Record<string, any[]>;
  isDarkMode: boolean;
}

export default function ViewAvailabilityModal({
  open,
  onClose,
  daySlots,
  isDarkMode,
}: ViewAvailabilityModalProps) {

  
  if (!open) return null;

  const sortedDates = Object.keys(daySlots).sort();

  /* THEME TOKENS */
  const bgPrimary = isDarkMode ? "bg-zinc-800" : "bg-white";
  const bgSecondary = isDarkMode ? "bg-zinc-900" : "bg-zinc-50";
  const bgCard = isDarkMode ? "bg-zinc-900" : "bg-white";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const cardHoverBorder = isDarkMode ? "hover:border-chart-2" : "hover:border-chart-2";
  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-500" : "text-zinc-600";
  const slotBg = isDarkMode ? "bg-zinc-800" : "bg-zinc-100";
  const slotBorder = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const slotHoverBorder = isDarkMode ? "hover:border-chart-2" : "hover:border-chart-2";
  const emptyIconBg = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const emptyIconBorder = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const emptyIconColor = isDarkMode ? "text-zinc-600" : "text-zinc-400";
  const scrollbarTrack = isDarkMode ? "#27272a" : "#f4f4f5";
  const scrollbarThumb = isDarkMode ? "#730071" : "#eb7323";
  const scrollbarThumbHover = isDarkMode ? "#390040" : "#c2591c";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className={`${bgPrimary} border-2 ${border} rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in duration-500 transition-colors`}>
        
        {/* Header */}
        <div className={`relative bg-chart-2 p-6 border-b-2 ${border}`}>
          {/* Decorative blob */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <Calendar size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white">All Availability</h2>
                <p className="text-white/80 text-sm font-medium">Complete schedule overview</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 hover:rotate-90 border border-white/30"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Stats */}
          <div className="relative flex gap-3 mt-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
              <Sparkles size={14} className="text-white" />
              <span className="text-white text-sm font-bold">
                {sortedDates.length} Days
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
              <Clock size={14} className="text-white" />
              <span className="text-white text-sm font-bold">
                {Object.values(daySlots).flat().length} Slots
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] custom-scrollbar">
          {sortedDates.length === 0 ? (
            <div className="text-center py-16">
              <div className={`inline-flex p-6 ${emptyIconBg} rounded-full border-2 ${emptyIconBorder} mb-4`}>
                <Calendar size={40} className={emptyIconColor} />
              </div>
              <p className={`${textSecondary} font-medium text-lg`}>No availability set yet</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {sortedDates.map((dateStr) => {
                const date = new Date(dateStr);
                const slots = daySlots[dateStr];

                return (
                  <div
                    key={dateStr}
                    className={`group relative ${bgCard} border-2 ${border} rounded-2xl p-5 ${cardHoverBorder} transition-all duration-300`}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-chart-2 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
                    
                    <div className="relative">
                      {/* Date Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 ${isDarkMode ? 'bg-chart-2/20 border-chart-2/30' : 'bg-chart-2/10 border-chart-2/20'} rounded-lg border`}>
                          <Calendar size={20} className="text-chart-2" />
                        </div>
                        <div>
                          <h3 className={`font-black ${textPrimary} text-lg`}>
                            {date.toLocaleDateString("en-US", { 
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </h3>
                          <p className={`${textSecondary} text-sm font-medium`}>
                            {slots.length} {slots.length === 1 ? "slot" : "slots"}
                          </p>
                        </div>
                      </div>

                      {/* Slots Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {slots.map((slot: any, index: number) => (
                          <div
                            key={slot.id}
                            className={`flex items-center gap-2 ${slotBg} border ${slotBorder} px-3 py-2 rounded-xl ${slotHoverBorder} transition-all`}
                            style={{ animationDelay: `${index * 30}ms` }}
                          >
                            <Clock size={14} className="text-[#c2c094]" />
                            <span className={`text-sm font-bold ${textPrimary}`}>{slot.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-6 border-t-2 ${border} ${bgSecondary}`}>
          <Button
            onClick={onClose}
            className="w-full bg-chart-2 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-[#0077b6]/50 transition-all duration-300"
          >
            Close Preview
          </Button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${scrollbarTrack};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${scrollbarThumb};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${scrollbarThumbHover};
        }
      `}</style>
    </div>
  );
}