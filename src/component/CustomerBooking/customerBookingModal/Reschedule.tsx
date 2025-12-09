"use client";

import { X } from "lucide-react";
import { BookingCustomer } from "@/types/type";
import { useCustomerModal } from "@/hooks/useModal";
import SuccessModal from "@/component/SuccessModal";



const RescheduleModal = ({ booking, onClose, onReschedule }: { booking: BookingCustomer; onClose: () => void; onReschedule: () => void }) => {
 

  const { selectedDate, setSuccessOpen, successOpen, setSelectedDate, setAvailabilityId, availableSlots, selectedTime, setSelectedTime, loading,  handleReschedule } = useCustomerModal({ onReschedule, onClose, booking });


  


  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Reschedule Appointment</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Booking Info */}
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <p className="text-sm text-slate-600 mb-1">Current Appointment</p>
            <p className="font-semibold text-slate-900">{booking.services.title}</p>
            <p className="text-sm text-slate-700">
              {new Date(booking.booking_date).toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short', 
                day: 'numeric'
              })} at {new Date(booking.booking_date).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </p>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select New Date
            </label>
            <input
              type="date"
              min={minDate}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-chart-2 focus:border-chart-2"
            />
          </div>

          {/* Time Slots */}
  {selectedDate && (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-3">
      Select Available Time
    </label>
    {loading ? (
      <div className="text-center py-8">
        <div className="w-8 h-8 border-4 border-chart-2 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    ) : (
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {availableSlots
          .filter((slot) => !slot.is_booked) // only show unbooked
          .map((slot) => {
            // slot.start_time and slot.end_time are already "HH:MM:SS"
            // Convert to 24h HH:MM format
            const formatTime = (time: string) =>
              time.substring(0, 5); // "HH:MM"

            const startTime = formatTime(slot.start_time);
            const endTime = formatTime(slot.end_time);

            const slotLabel = `${startTime} - ${endTime}`;
    

            return (
              <button
                key={slot.id}
                onClick={() => {
                  setSelectedTime(slotLabel);
                  setAvailabilityId(String(slot.id));
                }}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  selectedTime === slotLabel
                    ? "bg-gradient-to-r from-chart-2 to-chart-3 text-white shadow-md"
                    : "bg-white border-2 border-slate-200 text-slate-700 hover:border-indigo-300"
                }`}
              >
                {slotLabel}
              </button>
            );
          })}
      </div>
    )}
  </div>
)}


          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleReschedule()}
              disabled={!selectedDate || !selectedTime || loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-chart-2 to-chart-3 hover:from-chart-2/70 hover:to-chart-3/70 cursor-pointertext-white rounded-lg font-medium hover:bg-chart-3 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            > 
              {loading ? 'Rescheduling...' : 'Confirm Reschedule'}
            </button>
          </div>
        </div>
      </div>

      {successOpen && (
  <SuccessModal
   open={successOpen} 
    title = "Success!"
    message="Booking rescheduled successfully!"
    onClose={() => setSuccessOpen(false)}
  />
)}
    </div>
  );
};


export default RescheduleModal
