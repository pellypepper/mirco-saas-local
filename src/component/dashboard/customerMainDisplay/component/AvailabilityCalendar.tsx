"use client";

import { Calendar, ChevronLeft, ChevronRight, Zap, TrendingUp } from "lucide-react";
import AvailabilityGrid from "./AvailabilityGrid";
import AvailabilityFooter from "./AvailabilityFooter";
import { useAvailabilityCalendar } from "@/hooks/useAvailability";
import { useMainNavBar } from "@/hooks/MainNavContext";

const AvailabilityCalendar = ({
  groupedSlots,
  onBookClick,
  availability,
}: {
  groupedSlots: Record<string, any[]>;
  onBookClick: (slot: any) => void;
  availability: any[];
}) => {
  const {
    getTimePeriod,
    viewMode,
    setViewMode,
    weekOffset,
    setWeekOffset,
    hasPrevWeek,
    hasNextWeek,
    weekDates,
    sortedDates,
    displayDates,
    groupSlotsByPeriod,
  } = useAvailabilityCalendar(groupedSlots);

  const { isDarkMode } = useMainNavBar();

  /* THEME TOKENS */
  const surface = isDarkMode ? "bg-zinc-800" : "bg-white";
  const surfaceSoft = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-200";

  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-400" : "text-zinc-600";

  return (
    <div className="relative">
      <div className={`relative border-2 rounded-3xl shadow-2xl p-6 md:p-8 ${surface} ${border}`}>
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            {/* TITLE */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-chart-2 rounded-2xl">
                <Calendar size={28} className="text-white" />
              </div>
              <div>
                <h2 className={`text-xl md:text-3xl font-black flex items-center gap-2 ${textPrimary}`}>
                  Available Appointments
                  <Zap size={24} className="text-chart-4" />
                </h2>
                <p className={`mt-1 text-sm md:text-base font-medium ${textSecondary}`}>
                  Choose your preferred time slot
                </p>
              </div>
            </div>

            {/* VIEW TOGGLE */}
            <div className={`flex w-full md:w-auto items-center gap-2 p-1 rounded-2xl border-2 shadow-lg ${surfaceSoft} ${border}`}>
              {["week", "month"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`relative px-3 py-2 rounded-xl font-bold transition ${
                    viewMode === mode
                      ? "text-white"
                      : isDarkMode
                      ? "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      : "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                  }`}
                >
                  {viewMode === mode && (
                    <div className={`absolute inset-0 rounded-xl ${mode === "week" ? "bg-chart-2" : "bg-chart-3"}`} />
                  )}
                  <span className="relative flex items-center gap-2 text-sm">
                    {mode === "week" ? "Week View" : "Month View"}
                    {viewMode === mode && <TrendingUp size={16} />}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* WEEK NAVIGATION */}
          {viewMode === "week" && (
            <div className="relative">
              <div className={`flex items-center justify-between p-5 rounded-2xl border-2 shadow-lg ${surfaceSoft} ${border}`}>
                <button
                  onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
                  disabled={!hasPrevWeek}
                  className={`p-2 rounded-xl transition ${
                    hasPrevWeek
                      ? `${isDarkMode ? "bg-zinc-800/50 text-zinc-100 hover:bg-chart-2 hover:text-white border-2 border-zinc-700/50" : `bg-white border-gray-300 hover:bg-chart-2 hover:text-white` 
                      
                      }`
                      : "opacity-50 cursor-not-allowed"
                  } ${border}`}
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="text-center">
                  <div className={`text-xs uppercase font-bold ${textSecondary}`}>
                    Viewing Week
                  </div>
                  <div className={`text-base md:text-xl font-black ${textPrimary}`}>
                    {new Date(weekDates[0]).toLocaleDateString("en-US", { month: "short", day: "numeric" })} —{" "}
                    {new Date(weekDates[6]).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <button
                  onClick={() => setWeekOffset(weekOffset + 1)}
                  disabled={!hasNextWeek}
                  className={`p-2 rounded-xl transition ${
                    hasNextWeek
                      ? `${isDarkMode ? "bg-zinc-800/50 text-zinc-600 hover:bg-chart-2 hover:text-white border-2 border-zinc-700/50" : "bg-white border-gray-300 hover:bg-chart-2 hover:text-white"}`
                      : "opacity-50 cursor-not-allowed"
                  } ${border}`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CONTENT */}
        {availability.length === 0 ? (
          <div className="text-center py-20">
            <Calendar size={64} className="mx-auto mb-4 text-zinc-400" />
            <p className={`text-2xl font-bold ${textPrimary}`}>No Available Slots</p>
            <p className={textSecondary}>Check back soon for new appointments</p>
          </div>
        ) : (
          <AvailabilityGrid
            getTimePeriod={getTimePeriod}
            displayDates={displayDates}
            groupSlotsByPeriod={groupSlotsByPeriod}
            groupedSlots={groupedSlots}
            onBookClick={onBookClick}
          />
        )}

        {availability.length > 0 && (
          <AvailabilityFooter availability={availability} sortedDates={sortedDates} />
        )}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
