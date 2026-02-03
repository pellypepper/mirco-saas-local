"use client";

import { Calendar, Clock, Sparkles, CheckCircle } from "lucide-react";
import Loader from "@/component/Spinner";
import ErrorModal from "@/component/ErrorModal";
import { useBookAgain } from "@/hooks/useModal";
import SuccessModal from "@/component/SuccessModal";
import { useMainNavBar } from "@/hooks/MainNavContext";

const BookAgainModal = ({
  booking,
  onClose,
  onSuccess,
}:  {
  booking: any;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { 
    loading, 
    success, 
    setSuccess, 
    slots, 
    selectedSlot, 
    setSelectedSlot, 
    selectedDate,
    setError, 
    setSelectedDate, 
    error,
    handleConfirm 
  } = useBookAgain({booking, onSuccess, onClose});

  const { isDarkMode } = useMainNavBar();

    /* THEME TOKENS */
  const surface = isDarkMode ? "bg-zinc-800" : "bg-white";
  const surfaceSoft = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const surfaceInner = isDarkMode ? "bg-zinc-900" : "bg-white";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-300";

  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-400" : "text-zinc-600";
  const textMuted = "text-zinc-500";

  return (
    <>
      {loading && <Loader message="Checking availability..." />}

      {error && (
        <ErrorModal open={!! error} message={error} onClose={() => setError("")} />
      )}

      {success && (
        <SuccessModal
          open={!! success}
          message={success}
          onClose={() => {
            setSuccess(""); 
            onSuccess();    
            onClose();     
          }}
        />
      )}

      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className={`${surface} ${border} rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-500`}>
          
          {/* Header */}
          <div className="relative bg-chart-2 p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Book Again</h2>
                <p className="text-white/90 text-sm font-medium">Select your preferred time slot</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Service Info */}
            <div className={`rounded-2xl p-5 ${surfaceSoft}`}>
              <p className="text-zinc-400 text-sm mb-2">Booking for: </p>
              <p className={`${textPrimary} font-black text-lg mb-1`}>{booking.services.title}</p>
              <p className="text-zinc-400 text-sm">
                with <span className="text-chart-2 font-bold">{booking.provider.full_name}</span>
              </p>
            </div>

            {/* Date Picker */}
            <div>
              <label className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-chart-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className={`font-bold ${textPrimary} uppercase tracking-wider text-sm`}>Select Date</span>
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={`w-full px-4 py-3 ${surfaceInner} ${border} rounded-xl ${textPrimary} border-2 font-semibold focus:outline-none focus:border-chart-2 transition-all duration-300`}
              />
            </div>

            {/* Slots */}
            {slots.length === 0 ? (
              <div className="text-center py-12">
                <div className={`inline-flex p-4 ${surfaceSoft} rounded-full ${border} mb-3`}>
                  <Clock size={32} className="text-zinc-600" />
                </div>
                <p className="text-zinc-500 font-medium">No available slots for this date. </p>
              </div>
            ) : (
              <div>
                <label className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-chart-4 rounded-lg">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-white uppercase tracking-wider text-sm">Available Times</span>
                </label>
                <div className="space-y-3 max-h-80 overflow-auto custom-scrollbar">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedSlot?. id === slot.id
                          ? "border-chart-2 bg-chart-2/10"
                          : "border-zinc-700 hover:border-chart-2 bg-zinc-900"
                      }`}
                    >
                      {selectedSlot?.id === slot.id && (
                        <div className="absolute inset-0 bg-chart-2 rounded-xl opacity-10 blur-lg"></div>
                      )}
                      
                      <div className="relative flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          selectedSlot?. id === slot.id ? "bg-chart-2" :  "bg-zinc-800"
                        }`}>
                          <Calendar className={`w-5 h-5 ${
                            selectedSlot?.id === slot.id ? "text-white" : "text-zinc-500"
                          }`} />
                        </div>
                        <div>
                          <p className={`font-bold ${
                            selectedSlot?.id === slot.id ? "text-white" : "text-zinc-300"
                          }`}>
                            {slot.date}
                          </p>
                          <p className="text-sm text-zinc-500 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {slot.start_time. slice(0, 5)}
                          </p>
                        </div>
                        
                        {selectedSlot?.id === slot.id && (
                          <CheckCircle className="ml-auto w-6 h-6 text-[#008800]" fill="currentColor" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t-2 border-zinc-700">
              <button
                onClick={onClose}
                className={`flex-1 px-6 py-3 ${surfaceInner} ${border} border-2 ${textPrimary} rounded-xl font-bold hover:border-zinc-600 transition-all duration-300`}
              >
                Cancel
              </button>
              <button
                disabled={! selectedSlot}
                onClick={handleConfirm}
                className={`group flex-1 px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 relative overflow-hidden ${
                  selectedSlot
                    ? "bg-chart-4 hover:shadow-chart-4/20"
                    : `${surfaceInner} ${border} border ${textPrimary} cursor-not-allowed`
                }`}
              >
              
                <span className="relative">Confirm Booking</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #27272a;
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
    </>
  );
};

export default BookAgainModal;