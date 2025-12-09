"use client";
import { Clock, DollarSign, X, Star, MapPin, Mail, Phone, CheckCircle } from "lucide-react";
import { BookingCustomer } from "@/types/type";

const DetailsModal = ({ booking, onClose }: { booking: BookingCustomer | null; onClose: () => void }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Booking Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Service Details */}
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Service Information</h3>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-chart-2 ">{booking.services.title}</p>
              <p className="text-slate-700">{booking.services.description}</p>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-600" />
                  <span className="font-medium">{booking.services.duration_minutes} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-slate-600" />
                  <span className="font-medium">${(booking.amount / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Provider Details */}
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Provider Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xl font-bold">
                  {booking.provider.full_name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{booking.provider.full_name}</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{booking.provider.rating}</span>
                    <span className="text-sm text-slate-600">( reviews)</span>
                  </div>
                </div>
              </div>
            
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-chart-3" />
                  <span>{booking.provider.location}, {booking.provider.country}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-chart-3" />
                  <span>{booking.provider.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-chart-3" />
                  <span>{booking.provider.phone_number}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Appointment Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">Date</p>
                <p className="font-semibold text-slate-900">
                  {new Date(booking.booking_date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Time</p>
                <p className="font-semibold text-slate-900">
                  {new Date(booking.booking_date).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Status</p>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-chart-3font-medium text-sm">
                  <CheckCircle className="w-4 h-4" />
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Booking ID</p>
                <p className="font-mono text-sm text-slate-900">#{booking.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal
