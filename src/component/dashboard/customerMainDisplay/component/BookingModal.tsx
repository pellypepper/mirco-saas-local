"use client"

import { X, Calendar, Clock, CheckCircle, ChevronDown } from "lucide-react";
import Image from "next/image";
import { AvailabilityRecord } from "@/types/type";
import { useBookingModal } from "@/hooks/useBooking";

interface Provider {
  id: string;
  avatar_url: string;
  full_name: string;
  service_type: string;
  hourly_rate: number;
}





interface BookingModalProps {
  provider: Provider;

  slot: AvailabilityRecord ;
 onConfirm: (data: {
    servicesId: string;
    amount: number;
    currency: string;
  }) => void;
  onClose: () => void;
}

const BookingModal = ({ provider, slot, onConfirm, onClose }: BookingModalProps) => {
  const {
    services,
    selectedService,
    setSelectedService,
    isDropdownOpen,
    setIsDropdownOpen,
    formattedDate,
    formattedTime,
    avatarSrc,
    handleConfirm
  } = useBookingModal({ provider, slot, onConfirm });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-chart-2 to-chart-3 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <X size={18} />
          </button>
          <h3 className="text-2xl font-bold mb-1">Confirm Booking</h3>
          <p className="text-indigo-100">Review your appointment details</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Provider Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-chart-2 to-chart-3 rounded-xl flex items-center justify-center overflow-hidden">
              <Image
                unoptimized
                src={avatarSrc}
                alt={provider.full_name}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-gray-900">{provider.full_name}</div>
              <div className="text-sm text-gray-600">{provider.service_type}</div>
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Select Service</label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-between hover:border-indigo-300 transition"
              >
                <div className="text-left">
                  {selectedService ? (
                    <>
                      <div className="font-semibold text-gray-900">{selectedService.title}</div>
                      <div className="text-sm text-gray-600">
                        {selectedService.duration_minutes} min • ${selectedService.price}
                      </div>
                    </>
                  ) : (
                    <div className="text-gray-500">Choose a service...</div>
                  )}
                </div>
                <ChevronDown
                  size={20}
                  className={`text-gray-400 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
                  {services && services.length > 0 ? (
                    services.map((service) => (
                      <button
                        key={service.id || service.title}
                        onClick={() => {
                          setSelectedService(service);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full p-4 text-left hover:bg-indigo-50 transition border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-semibold text-gray-900">{service.title}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {service.duration_minutes} minutes • ${service.price} {service.currency}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">No services available</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl">
              <Calendar className="text-chart-2" size={20} />
              <div>
                <div className="text-sm text-gray-600">Date</div>
                <div className="font-semibold text-gray-900">{formattedDate}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
              <Clock className="text-chart-3" size={20} />
              <div>
                <div className="text-sm text-gray-600">Time</div>
                <div className="font-semibold text-gray-900">{formattedTime}</div>
              </div>
            </div>
          </div>

          {/* Price */}
          {selectedService && (
            <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
              <div className="flex items-center justify-between">
                <div className="text-gray-600">Session Fee</div>
                <div className="text-3xl font-bold text-gray-900">
                  ${selectedService.price}
                </div>
              </div>
            </div>
          )}

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={!selectedService}
            className={`w-full py-4 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 ${
              selectedService
                ? "bg-gradient-to-r from-chart-2 to-chart-3 text-white hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <CheckCircle size={20} />
            Confirm & Pay
          </button>

          <p className="text-center text-sm text-gray-500">
            You'll be redirected to secure payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;