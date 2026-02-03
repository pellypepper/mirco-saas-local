"use client";

import { X, Calendar, Clock, RefreshCw, CheckCircle } from "lucide-react";
import { BookingCustomer } from "@/types/type";
import { useCustomerModal } from "@/hooks/useModal";
import SuccessModal from "@/component/SuccessModal";
import { useMainNavBar } from "@/hooks/MainNavContext";

const RescheduleModal = ({
  booking,
  onClose,
  onReschedule,
}: {
  booking: BookingCustomer;
  onClose: () => void;
  onReschedule: () => void;
}) => {
  const { isDarkMode } = useMainNavBar();

  const {
    selectedDate,
    setSuccessOpen,
    successOpen,
    setSelectedDate,
    setAvailabilityId,
    availableSlots,
    selectedTime,
    setSelectedTime,
    loading,
    handleReschedule,
  } = useCustomerModal({ onReschedule, onClose, booking });

  const minDate = new Date().toISOString().split("T")[0];

  /* THEME TOKENS */
  const surface = isDarkMode ? "bg-zinc-800" : "bg-white";
  const surfaceSoft = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const surfaceInner = isDarkMode ? "bg-zinc-900" : "bg-white";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-300";

  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-400" : "text-zinc-600";
  const textMuted = "text-zinc-500";

  return (
  <div className={`${isDarkMode ? "bg-black/50" : "bg-white/50"} fixed inset-0  backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300`}>
      <div
        className={`rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in duration-500 border-2 ${surface} ${border}`}
      >
        {/* HEADER */}
        <div className="bg-chart-2 p-6 border-b-2 border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <RefreshCw size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white">
                  Reschedule Appointment
                </h2>
                <p className="text-white/90 text-sm font-medium">
                  Choose a new date and time
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 hover:rotate-90 border border-white/30"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 space-y-6 custom-scrollbar">
          {/* CURRENT BOOKING */}
          <div className={`rounded-2xl p-5 border-2 ${surfaceSoft} ${border}`}>
            <p className={`text-xs font-bold uppercase mb-2 ${textMuted}`}>
              Current Appointment
            </p>
            <p className={`font-black text-xl mb-1 ${textPrimary}`}>
              {booking.services.title}
            </p>
            <p className={textSecondary}>
              {new Date(booking.booking_date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}{" "}
              at{" "}
              {new Date(booking.booking_date).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* DATE PICKER */}
          <div>
            <label className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-chart-2 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className={`font-bold uppercase tracking-wider text-sm ${textPrimary}`}>
                Select New Date
              </span>
            </label>
            <input
              type="date"
              min={minDate}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`w-full px-4 py-4 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:border-chart-2 border-2 ${surfaceInner} ${border} ${textPrimary}`}
            />
          </div>

          {/* TIME SLOTS */}
          {selectedDate && (
            <div>
              <label className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-chart-2 rounded-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <span className={`font-bold uppercase tracking-wider text-sm ${textPrimary}`}>
                  Select Available Time
                </span>
              </label>

              {loading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-chart-2 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className={`${textMuted} font-medium mt-4`}>
                    Loading available slots...
                  </p>
                </div>
              ) : availableSlots.filter((s) => !s.is_booked).length === 0 ? (
                <div className={`text-center py-12 rounded-2xl border-2 ${surfaceSoft} ${border}`}>
                  <div className={`inline-flex p-4 rounded-full border-2 mb-3 ${surfaceInner} ${border}`}>
                    <Clock size={32} className="text-zinc-500" />
                  </div>
                  <p className={textMuted}>No available slots for this date</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {availableSlots
                    .filter((slot) => !slot.is_booked)
                    .map((slot) => {
                      const start = slot.start_time.slice(0, 5);
                      const end = slot.end_time.slice(0, 5);
                      const label = `${start} - ${end}`;

                      return (
                        <button
                          key={slot.id}
                          onClick={() => {
                            setSelectedTime(label);
                            setAvailabilityId(String(slot.id));
                          }}
                          className={`group relative px-4 py-4 rounded-xl font-bold transition-all duration-300 border-2 ${
                            selectedTime === label
                              ? "bg-chart-2 text-white border-transparent"
                              : `${surfaceInner} ${border} ${textSecondary} hover:border-chart-2`
                          }`}
                        >
                          {selectedTime === label && (
                            <>
                              <div className="absolute inset-0 bg-chart-2 rounded-xl blur-lg opacity-50"></div>
                              <CheckCircle
                                className="absolute top-1 right-1 w-4 h-4 text-white"
                                fill="currentColor"
                              />
                            </>
                          )}
                          <span className="relative block text-center">
                            {label}
                          </span>
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className={`p-6 border-t-2 ${border} ${surfaceSoft}`}>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all duration-300 border-2 ${surfaceInner} ${border} ${textPrimary}`}
            >
              Cancel
            </button>
            <button
              onClick={handleReschedule}
              disabled={!selectedDate || !selectedTime || loading}
              className={`group flex-1 px-6 py-4 rounded-xl font-bold transition-all duration-300 relative overflow-hidden ${
                !selectedDate || !selectedTime || loading
                  ? `${surfaceInner} ${border} text-zinc-400 cursor-not-allowed border-2`
                  : "bg-chart-2 text-white hover:shadow-[0_0_30px_rgba(235,115,35,0.3)]"
              }`}
            >
              {!loading && selectedDate && selectedTime && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              )}
              <span className="relative flex items-center justify-center gap-2">
                <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                {loading ? "Rescheduling..." : "Confirm Reschedule"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {successOpen && (
        <SuccessModal
          open={successOpen}
          title="Success!"
          message="Booking rescheduled successfully!"
          onClose={() => setSuccessOpen(false)}
        />
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${isDarkMode ? "#27272a" : "#e5e7eb"};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #eb7323;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #009689;
        }
      `}</style>
    </div>
  );
};

export default RescheduleModal;
