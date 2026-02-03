"use client";

import { BookingCustomer } from "@/types/type";
import { AlertCircle, Calendar, User, XCircle } from "lucide-react";
import { useCustomerModal } from "@/hooks/useModal";
import SuccessModal from "@/component/SuccessModal";
import { useMainNavBar } from "@/hooks/MainNavContext";

const CancelModal = ({
  booking,
  onClose,
  onCancel,
}: {
  booking: BookingCustomer;
  onClose: () => void;
  onCancel: () => void;
}) => {
  const { isDarkMode } = useMainNavBar();

  const {
    reason,
    setReason,
    setSuccessOpen,
    successOpen,
    loading,
    handleCancel,
  } = useCustomerModal({ onCancel, onClose, booking });

  /* THEME TOKENS */
  const surface = isDarkMode ? "bg-zinc-800" : "bg-white";
  const surfaceSoft = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const surfaceInner = isDarkMode ? "bg-zinc-900" : "bg-white";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-200";

  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-400" : "text-zinc-600";
  const textMuted = "text-zinc-500";

  return (
   <div className={`${isDarkMode ? "bg-black/50" : "bg-white/50"} fixed inset-0  backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300`}>
      <div
        className={`rounded-3xl max-w-md w-full shadow-2xl animate-in zoom-in duration-500 border-2 ${surface} ${border}`}
      >
        {/* HEADER */}
        <div className="relative bg-chart-1 p-6 overflow-hidden rounded-t-3xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl font-black text-white">
              Cancel Booking?
            </h2>
            <p className="text-white/90 mt-2">
              Are you sure you want to cancel{" "}
              <span className="font-bold">
                {booking.services.title}
              </span>
              ?
            </p>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">
          {/* BOOKING SUMMARY */}
          <div
            className={`rounded-2xl p-5 space-y-4 border-2 ${surfaceSoft} ${border}`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-2 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`text-xs font-bold uppercase ${textMuted}`}>
                  Date
                </p>
                <p className={`font-bold ${textPrimary}`}>
                  {new Date(booking.booking_date).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-4 rounded-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`text-xs font-bold uppercase ${textMuted}`}>
                  Provider
                </p>
                <p className={`font-bold ${textPrimary}`}>
                  {booking.provider.full_name}
                </p>
              </div>
            </div>
          </div>

          {/* CANCELLATION REASON */}
          <div>
            <label
              className={`block text-sm font-bold uppercase tracking-wider mb-3 ${textPrimary}`}
            >
              Reason for cancellation (optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Let us know why you're cancelling..."
              rows={4}
              className={`w-full px-4 py-3 rounded-xl font-medium resize-none transition-all duration-300 focus:outline-none focus:border-chart-1 border-2 placeholder-zinc-500 ${surfaceInner} ${border} ${textPrimary}`}
            />
          </div>

          {/* ACTION BUTTONS */}
          <div
            className={`flex gap-3 pt-4 border-t-2 ${border}`}
          >
            <button
              onClick={onClose}
              className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all duration-300 border-2 ${surfaceInner} ${border} ${textPrimary}`}
            >
              Keep Booking
            </button>

            <button
              onClick={handleCancel}
              disabled={loading}
              className={`group flex-1 px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden ${
                loading
                  ? `${surfaceInner} ${border} text-zinc-400 cursor-not-allowed border-2`
                  : "bg-chart-1 text-white hover:bg-chart-1/90"
              }`}
            >
              {!loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              )}
              <XCircle size={18} className="relative" />
              <span className="relative">
                {loading ? "Cancelling..." : "Yes, Cancel"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {successOpen && (
        <SuccessModal
          open={successOpen}
          title="Booking Cancelled"
          message="Your booking has been successfully cancelled."
          onClose={() => {
            setSuccessOpen(false);
            onClose();
          }}
        />
      )}
    </div>
  );
};

export default CancelModal;
