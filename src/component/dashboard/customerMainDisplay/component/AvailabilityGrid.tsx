"use client";

import { Clock, Sparkles, Zap } from "lucide-react";
import { useMainNavBar } from "@/hooks/MainNavContext";

const AvailabilityGrid = ({
  getTimePeriod,
  displayDates,
  groupSlotsByPeriod,
  groupedSlots,
  onBookClick,
}: {
  getTimePeriod: (timeString: string) => { label: string; color: string };
  displayDates: string[];
  groupSlotsByPeriod: (slots: any[]) => Record<string, any[]>;
  groupedSlots: Record<string, any[]>;
  onBookClick: (slot: any) => void;
}) => {
  const { isDarkMode } = useMainNavBar();

  const surface = isDarkMode ? "bg-zinc-900" : "bg-white";
  const surfaceSoft = isDarkMode ? "bg-zinc-700" : "bg-zinc-200";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-200";

  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-400" : "text-zinc-600";

  return (
    <div className="space-y-6">
      {displayDates.map((date) => {
        const slots = groupedSlots[date] ?? [];
        const dateObj = slots[0]
          ? new Date(`${slots[0].date}T${slots[0].start_time}`)
          : new Date(date);

        const isToday = new Date().toDateString() === dateObj.toDateString();
        const groupedByPeriod = groupSlotsByPeriod(slots);

        return (
          <div key={date} className={`rounded-2xl border-2 shadow-xl overflow-hidden ${surface} ${border}`}>
            {/* DATE HEADER */}
            <div className={`p-5 border-b-2 ${isToday ? "bg-chart-2" : surfaceSoft} ${border}`}>
              <div className="flex items-center justify-between">
                <div>
                  {isToday && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-xl mb-2">
                      <Sparkles size={14} className="text-white" />
                      <span className="text-xs font-bold text-white">Today</span>
                    </div>
                  )}
                  <div className={`text-lg md:text-2xl font-black  ${isToday && isDarkMode ? "text-white" : isToday ? "text-white" : textPrimary}`}>
                    {dateObj.toLocaleDateString("en-US", { weekday: "long" })}
                    {isToday && <Zap size={18} className="inline ml-2 chart-4" />}
                  </div>
                  <div className={`text-sm md:text-base ${isToday ? "text-white/90" : textSecondary}`}>
                    {dateObj.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className={`px-4 py-2 rounded-xl border-2 ${surfaceSoft} ${border}`}>
                  <span className={`font-bold ${textPrimary}`}>
                    {slots.length} {slots.length === 1 ? "slot" : "slots"}
                  </span>
                </div>
              </div>
            </div>

            {/* SLOTS */}
            <div className="p-6 space-y-6">
              {slots.length === 0 && (
                <div className="text-center py-12">
                  <Clock size={32} className="mx-auto mb-3 text-zinc-400" />
                  <p className={textSecondary}>No available slots on this date</p>
                </div>
              )}

              {Object.entries(groupedByPeriod).map(([period, periodSlots]) => {
                if (!periodSlots.length) return null;
                const periodInfo = getTimePeriod(periodSlots[0].start_time);

                return (
                  <div key={period} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-8 rounded-full bg-gradient-to-b ${periodInfo.color}`} />
                      <h4 className={`font-black uppercase ${textPrimary}`}>{period}</h4>
                      <div className="flex-1 h-px bg-zinc-300/30" />
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${surfaceSoft} ${border}`}>
                        {periodSlots.length} slots
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {periodSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => onBookClick(slot)}
                          className={`relative px-4 py-5 rounded-xl border-2 shadow-lg transition hover:scale-105 ${surfaceSoft} ${border}`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Clock size={18} className="text-zinc-400" />
                            <span className={`font-black text-sm ${textPrimary}`}>
                              {new Date(`${slot.date}T${slot.start_time}`).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AvailabilityGrid;
