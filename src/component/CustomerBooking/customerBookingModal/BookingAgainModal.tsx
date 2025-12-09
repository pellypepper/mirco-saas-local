"use client";

import { Calendar, Clock } from "lucide-react";
import Loader from "@/component/Spinner";
import ErrorModal from "@/component/ErrorModal";
import { useBookAgain } from "@/hooks/useModal";
import SuccessModal from "@/component/SuccessModal";


const BookAgainModal = ({
  booking,
  onClose,
  onSuccess,
}: {
  booking: any;
  onClose: () => void;
  onSuccess: () => void;
}) => {
 
  const { loading, success, setSuccess, slots, selectedSlot, setSelectedSlot, selectedDate,setError, setSelectedDate, error,handleConfirm } = useBookAgain({booking, onSuccess, onClose});

  return (
    <>
      {loading && <Loader message="Checking availability..." />}

      {error && (
        <ErrorModal open={!!error} message={error} onClose={() => setError("")} />
      )}

     {success && (
  <SuccessModal
    open={!!success}
    message={success}
    onClose={() => {
      setSuccess(""); 
      onSuccess();    
      onClose();     
    }}
  />
)}

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Book Again</h2>
          <p className="text-slate-600 mb-6">
            Choose a new slot to book <strong>{booking.services.title}</strong> with{" "}
            <strong>{booking.provider.full_name}</strong>
          </p>

          {/* DATE PICKER */}
          <label className="block mb-3 font-medium text-slate-700 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-chart-2" />
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 bg-slate-50"
          />

          {/* SLOTS */}
          {slots.length === 0 ? (
            <p className="text-slate-500 text-center">
              No available slots for this date.
            </p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-auto">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center gap-4 transition ${
                    selectedSlot?.id === slot.id
                      ? "border-chart-3 bg-chart-3/10"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Calendar className="w-5 h-5 text-chart-2" />
                  <div>
                    <p className="font-semibold">{slot.date}</p>
                    <p className="text-sm text-slate-600">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {slot.start_time.slice(0, 5)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200"
            >
              Close
            </button>
            <button
              disabled={!selectedSlot}
              onClick={handleConfirm}
              className={`px-5 py-2 rounded-lg font-medium text-white ${
                selectedSlot
                  ? "bg-gradient-to-r from-chart-2 to-chart-3 hover:opacity-90"
                  : "bg-slate-400 cursor-not-allowed"
              }`}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAgainModal;
