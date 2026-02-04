"use client"

import { X, Calendar, Clock, CheckCircle, ChevronDown, Sparkles, CreditCard, Shield } from "lucide-react";
import Image from "next/image";
import { AvailabilityRecord } from "@/types/type";
import { useBookingModal } from "@/hooks/useBooking";
import { useMainNavBar } from "@/hooks/MainNavContext";

interface Provider {
  id: string;
  avatar_url: string;
  full_name: string;
  service_type: string;
  hourly_rate: number;
}

interface BookingModalProps {
  provider:  Provider;
  slot: AvailabilityRecord;
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
  const { isDarkMode } = useMainNavBar();

  return (
    <div className={` fixed inset-0 ${isDarkMode ? "bg-black/20" : "bg-white/20"} backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300`}>
      <div className={`custom-scrollbar h-full w-full overflow-y-auto  ${isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-300"} border-2 rounded-3xl shadow-2xl max-w-lg  overflow-hidden animate-in zoom-in duration-500`}>
        
        {/* Header  */}
        <div className="relative bg-chart-2 p-8 text-white overflow-hidden">
  
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 hover:rotate-90 hover:scale-110 z-10"
          >
            <X size={20} />
          </button>

          {/* Header content */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <Sparkles size={20} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black">Confirm Booking</h3>
            </div>
            <p className="text-white/90 font-light">Review your appointment details</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Provider Info Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-chart-2 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>
            <div className={`relative flex items-center gap-4 p-5 ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-gray-300"} border-2 rounded-2xl hover:border-[#eb7323]/50 transition-all duration-300`}>
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-chart-2 rounded-xl blur-md opacity-50"></div>
                <div className="relative w-20 h-20 bg-chart-2 rounded-xl flex items-center justify-center overflow-hidden border-2 border-zinc-700">
                  <Image
                    unoptimized
                    src={avatarSrc}
                    alt={provider.full_name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <div className={`font-black ${isDarkMode ? "text-white" : "text-zinc-700"} text-lg`}>{provider.full_name}</div>
                <div className={`text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-400"} font-medium`}>{provider.service_type}</div>
              </div>
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-3">
            <label className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
              <div className="w-1 h-4 bg-chart-2 rounded-full"></div>
              Select Service
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full p-5 ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-gray-300"} border-2 rounded-2xl flex items-center justify-between hover:border-chart-2 transition-all duration-300 group`}
              >
                <div className="text-left flex-1">
                  {selectedService ? (
                    <>
                      <div className={`font-bold ${isDarkMode ? "text-white" : "text-zinc-900"}`}>{selectedService. title}</div>
                      <div className={`text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"} mt-1`}>
                        {selectedService.duration_minutes} min • <span className="text-chart-2 font-bold">{selectedService.price}</span>
                      </div>
                    </>
                  ) : (
                    <div className={`${isDarkMode ? "text-zinc-400" : "text-zinc-700"} font-medium`}>Choose a service...</div>
                  )}
                </div>
                <ChevronDown
                  size={20}
                  className={`text-zinc-400 group-hover:text-chart-2 transition-all duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className={`absolute top-full left-0 right-0 mt-2 ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-gray-300"} border-2 rounded-2xl shadow-2xl z-20 max-h-64 overflow-y-auto animate-in slide-in-from-top duration-300`}>
                  {services && services.length > 0 ?  (
                    services.map((service) => (
                      <button
                        key={service.id || service.title}
                        onClick={() => {
                          setSelectedService(service);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full p-5 text-left  transition-all duration-300 border-b border-zinc-700 last:border-b-0 group/item ${isDarkMode ? "text-white hover:bg-zinc-800" : "text-zinc-900 hover:bg-zinc-800/10"}`}
                      >
                        <div className={`font-bold ${isDarkMode ? "text-white" : "text-zinc-900"} group-hover/item:text-chart-2 transition-colors duration-300`}>{service.title}</div>
                        <div className={`text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"} mt-1`}>
                          {service.duration_minutes} minutes • <span className={`font-bold ${isDarkMode ? "text-white" : "text-zinc-900"}`}>{service.price}</span> {service.currency}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <div className={`inline-flex p-4 ${isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-300"} rounded-full border-2  mb-3`}>
                        <Calendar size={24} className={`${isDarkMode ? "text-zinc-600" : "text-chart-2"}`} />
                      </div>
                      <p className="text-zinc-500 font-medium">No services available</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Appointment Details */}
          <div className="grid grid-cols-1 gap-4">
            {/* Date Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-chart-2 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500"></div>
              <div className={`relative p-5 ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-gray-300"} border-2 rounded-2xl hover:border-chart-2 transition-all duration-300`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 ${isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-300"} rounded-lg border`}>
                    <Calendar className={`text-chart-2`} size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 font-bold uppercase mb-1">Date</div>
                    <div className={`font-bold ${isDarkMode ? "text-white" : "text-zinc-900"} text-sm`}>{formattedDate}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-chart-3 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500"></div>
              <div className={`relative p-5 ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-gray-300"} border-2 rounded-2xl hover:border-chart-3 transition-all duration-300`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 ${isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-300"} rounded-lg border`}>
                    <Clock className={`text-chart-2`} size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 font-bold uppercase mb-1">Time</div>
                    <div className={`font-bold ${isDarkMode ? "text-white" : "text-zinc-900"} text-sm`}>{formattedTime}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Display */}
          {selectedService && (
            <div className="relative overflow-hidden">
    
            
              
              <div className={`relative p-6 border-2 rounded-2xl ${isDarkMode ? "border-white/20" : "border-gray-300"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-300"} backdrop-blur-sm rounded-lg`}>
                      <CreditCard size={20} className={`${isDarkMode ? "text-white" : "text-chart-2"}`} />
                    </div>
                    <div className={`font-bold text-sm md:text-base ${isDarkMode ? "text-white/90" : "text-zinc-900"}`}>Session Fee</div>
                  </div>
                  <div className={`text-2xl md:text-4xl font-black ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                  {selectedService.currency}  {selectedService.price}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={!selectedService}
            className={`group w-full py-5 rounded-2xl font-black text-lg transition-all duration-300 shadow-xl flex items-center justify-center gap-3 ${
              selectedService
                ? `${isDarkMode ? "bg-chart-2" : "bg-chart-2"} text-white hover:shadow-chart-2/30 hover:scale-105`
                : `${isDarkMode ? "bg-zinc-900 border-2 border-zinc-700 text-zinc-600 cursor-not-allowed" : "bg-zinc-100 border-2 border-zinc-300 text-zinc-600 cursor-not-allowed"}`
            }`}
          >
            <CheckCircle size={22} className={selectedService ? "group-hover:scale-110 transition-transform" : ""} />
            Confirm & Pay
         
          </button>

          {/* Security Notice */}
          <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
            <Shield size={16} className={`${isDarkMode ? "text-white/90" : "text-chart-3"}`} />
            <p className="font-medium">Secure payment powered by Stripe</p>
          </div>
        </div>
      </div>

          <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        . custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 150, 137, 0.5);
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb: hover {
          background: rgba(0, 150, 137, 0.8);
        }
        
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color:  rgba(0, 150, 137, 0.5) rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default BookingModal;