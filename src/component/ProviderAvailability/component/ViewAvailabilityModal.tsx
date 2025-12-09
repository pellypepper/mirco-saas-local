"use client";
import { X, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewAvailabilityModalProps {
  open: boolean;
  onClose: () => void;
  daySlots: Record<string, { start: string; end: string; label: string }[]>;
}

export default function ViewAvailabilityModal({ open, onClose, daySlots }: ViewAvailabilityModalProps) {
  if (!open) return null;

  const sortedDates = Object.keys(daySlots).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] md:w-[70%] lg:w-[50%] max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200  bg-gradient-to-br from-chart-2/20 to-chart-3/20">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-chart-3" />
            <h2 className="text-lg font-semibold text-gray-800">All Saved Availability</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5 text-gray-600" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {sortedDates.length === 0 ? (
            <p className="text-center text-gray-500">No availability saved yet.</p>
          ) : (
            <div className="space-y-4">
              {sortedDates.map((date) => (
                <div key={date} className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {daySlots[date].map((slot) => (
                      <div
                        key={slot.label}
                        className="px-3 py-1 bg-gradient-to-r from-chart-2/80 to-chart-3/80 text-white text-sm font-medium rounded-lg shadow-sm"
                      >
                        {slot.label}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end bg-gray-50">
          <Button onClick={onClose} className="bg-chart-2 hover:bg-chart-3 text-white">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
