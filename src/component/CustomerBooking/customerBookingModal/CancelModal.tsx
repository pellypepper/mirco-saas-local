"use client";

import { BookingCustomer } from "@/types/type";
import { AlertCircle, Calendar, User } from "lucide-react";
import { useCustomerModal } from "@/hooks/useModal";
import SuccessModal from "@/component/SuccessModal";


const CancelModal = ({ booking, onClose, onCancel }: { booking: BookingCustomer; onClose: () => void; onCancel: () => void }) => {
  const { reason, setReason, setSuccessOpen, successOpen, loading, handleCancel } = useCustomerModal({ onCancel, onClose, booking });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Cancel Booking?</h2>
          <p className="text-slate-600 text-center mb-6">
            Are you sure you want to cancel your appointment for <strong>{booking.services.title}</strong>?
          </p>

          {/* Booking Summary */}
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-slate-600" />
              <span className="text-sm text-slate-900">
                {new Date(booking.booking_date).toLocaleDateString('en-US', { 
                  weekday: 'short',
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-slate-600" />
              <span className="text-sm text-slate-900">{booking.provider.full_name}</span>
            </div>
          </div>

          {/* Cancellation Reason */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Reason for cancellation (optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Let us know why you're cancelling..."
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            >
              Keep Booking
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Cancelling...' : 'Yes, Cancel'}
            </button>
          </div>
        </div>
      </div>

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
export default CancelModal
