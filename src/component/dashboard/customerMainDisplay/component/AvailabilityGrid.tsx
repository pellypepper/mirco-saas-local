"use client"
import { Clock, Sparkles } from "lucide-react";

const AvailabilityGrid = ({
  getTimePeriod,
  displayDates,
  groupSlotsByPeriod,
  groupedSlots,
  onBookClick
}: {
  getTimePeriod: (timeString: string) => { label: string; color: string };
  displayDates: string[];
  groupSlotsByPeriod: (slots: any[]) => Record<string, any[]>;
  groupedSlots: Record<string, any[]>;
  onBookClick: (slot: any) => void;
}) => {

  return (
    <div className="space-y-6">
      {displayDates.map((date) => {
        const slots = groupedSlots[date] ?? [];      
        const firstSlot = slots[0];

        // If no slots exist for this date, create a placeholder date object
        const dateObj = firstSlot
          ? new Date(`${firstSlot.date}T${firstSlot.start_time}`)
          : new Date(date);

        const isToday = new Date().toDateString() === dateObj.toDateString();
        const groupedByPeriod = groupSlotsByPeriod(slots);

        return (
          <div
            key={date}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent hover:border-indigo-200 transition-all duration-300"
          >
            {/* Date Header */}
            <div
              className={`px-6 py-4 ${
                isToday
                  ? "bg-gradient-to-br from-chart-2/80 to-chart-3/80"
                  : "bg-gradient-to-r from-gray-700 to-gray-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  {isToday && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                      <Sparkles size={14} className="text-white" />
                      <span className="text-[12px] font-semibold text-white uppercase tracking-wide">
                        Today
                      </span>
                    </div>
                  )}
                  <div className="text-white">
                    <div className="text-xl md:text-2xl font-bold">
                      {dateObj.toLocaleDateString("en-US", { weekday: "long" })}
                    </div>
                    <div className="text-sm opacity-90">
                      {dateObj.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </div>
                  </div>
                </div>

                {/* Slot count */}
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <div className="text-white text-[12px] font-medium">
                    {slots.length} {slots.length === 1 ? "slot" : "slots"}
                  </div>
                </div>
              </div>
            </div>

            {/* Time Slots by Period */}
            <div className="p-5 space-y-6">

              {/* If no slots, show empty message */}
              {slots.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  No available slots on this date
                </div>
              )}

              {slots.length > 0 &&
                Object.entries(groupedByPeriod).map(([period, periodSlots]) => {
                  if (periodSlots.length === 0) return null;
                  const periodInfo = getTimePeriod(periodSlots[0].start_time);

                  return (
                    <div key={period}>
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={`w-1 h-6 rounded-full bg-gradient-to-b ${periodInfo.color}`}
                        ></div>
                        <h4 className="font-semibold text-gray-700">{period}</h4>
                        <div className="flex-1 h-px bg-gray-200"></div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {periodSlots.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => onBookClick(slot)}
                            className="group relative overflow-hidden"
                          >
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${periodInfo.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                            ></div>

                            <div className="relative px-4 py-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 shadow-sm group-hover:shadow-lg">
                              <div className="flex flex-col items-center gap-1.5">
                                <Clock
                                  size={18}
                                  className="text-gray-600 group-hover:text-dark transition-colors"
                                />
                                <span className="font-semibold text-gray-900">
                                  {new Date(
                                    `${slot.date}T${slot.start_time}`
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                  })}
                                </span>
                              </div>
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
