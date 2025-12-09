"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import AvailabilityGrid from "./AvailabilityGrid";
import AvailabilityFooter from "./AvailabilityFooter"
import { useAvailabilityCalendar } from "@/hooks/useAvailability";

const AvailabilityCalendar = ({
  groupedSlots,
  onBookClick,
  availability
}: {
  groupedSlots: Record<string, any[]>,
  onBookClick: (slot: any) => void,
  availability: any[]
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
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl shadow-2xl p-8 border border-white/60">
      {/* Header */}
      <div className="mb-8 ">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-chart-2 to-chart-3 rounded-2xl shadow-lg">
              <Calendar className="text-white" size={22} />
            </div>
            <div>
              <h2 className="md:text-3xl text-xl font-bold text-gray-900">
                Available Appointments
              </h2>
              <p className="text-gray-600 mt-1 text-[13px] md:text-sm">
                Choose your preferred time slot
              </p>
            </div>
          </div>

          {/* View Toggle */}
          <div className="mt-3 md:mt-0 flex items-center gap-2 bg-primary-white rounded-xl p-1 shadow-md">
            <button
              onClick={() => setViewMode("week")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === "week"
                  ? "bg-gradient-to-r from-chart-2 to-chart-3 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode("month")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === "month"
                  ? "bg-gradient-to-r from-chart-2 to-chart-3 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Month
            </button>
          </div>
        </div>

        {/* Week Navigation */}
        {viewMode === "week" && (
          <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-md">
            <button
              onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
              disabled={!hasPrevWeek}
              className={`p-2 rounded-lg transition-all ${
                hasPrevWeek ? "hover:bg-gray-100 text-gray-700" : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={24} />
            </button>

            <div className="text-center">
              <div className="text-sm font-medium text-gray-600">Viewing Week</div>
              <div className="text-sm md:text-lg font-bold text-gray-900">
                {new Date(weekDates[0]).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                })}
                {" - "}
                {new Date(weekDates[6]).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })}
              </div>
            </div>

            <button
              onClick={() => setWeekOffset(weekOffset + 1)}
              disabled={!hasNextWeek}
              className="p-2 rounded-lg transition-all hover:bg-gray-100 text-gray-700"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      {/* Calendar */}
      {availability.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4">
            <Calendar size={56} className="text-gray-400" />
          </div>
          <p className="text-xl font-medium text-gray-600 mb-2">
            No Available Slots
          </p>
          <p className="text-gray-500">Check back soon for new appointments</p>
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
  );
};

export default AvailabilityCalendar;
