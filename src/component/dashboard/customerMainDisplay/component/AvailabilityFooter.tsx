"use client";
import { useAvailabilityFooter } from "@/hooks/useAvailability";


const AvailabilityFooter = ({
  availability,
  sortedDates
}: {
  availability: any[];
  sortedDates: string[];
}) => {

  const { totalSlots, availableDays, avg } = useAvailabilityFooter(availability, sortedDates);

  return (
    <div className="mt-8 grid grid-cols-3 gap-4">
      <div className="bg-white rounded-xl p-4 text-center shadow-md">
        <div className="text-xl md:text-3xl font-bold text-chart-2">{totalSlots}</div>
        <div className="text-xs text-gray-600 mt-1">Upcoming Slots</div>
      </div>

      <div className="bg-white rounded-xl p-4 text-center shadow-md">
        <div className="text-xl md:text-3xl font-bold text-chart-3">{availableDays}</div>
        <div className="text-xs text-gray-600 mt-1">Upcoming Days</div>
      </div>

      <div className="bg-white rounded-xl p-4 text-center shadow-md">
        <div className="text-xl md:text-3xl font-bold text-chart-4">{avg}</div>
        <div className="text-xs text-gray-600 mt-1">Avg per Day</div>
      </div>
    </div>
  );
};

export default AvailabilityFooter;
