"use client";

import { Calendar, Clock, Trash2, User, MapPin, MoreVertical, DollarSign, Eye, RefreshCw, XCircle, RotateCcw } from "lucide-react";
import DeleteModal from "./customerBookingModal/DeleteModal";
import SuccessModal from "../SuccessModal";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMainNavBar } from "@/hooks/MainNavContext";
import { stat } from "fs";

export const CustomerBookingsGrid = ({
  filteredBookings, 
  successMessage, 
  setSuccessMessage, 
  setOpenMenuId,
  openMenuId, 
  onConfirm, 
  cancelDeleteModal, 
  handleBookAgain, 
  getStatusConfig, 
  openDelete, 
  formatDate, 
  setOpenDelete, 
  formatAmount, 
  handleViewDetails, 
  handleReschedule, 
  handleCancel
}:  {
  filteredBookings:  any[];
  formatDate: (dateStr: string) => string;
  formatTime: (dateStr:  string) => string;
  formatAmount: (amount: number, currency: string) => string; 
  getStatusConfig: (status: string) => any;
  handleViewDetails: (booking: any) => void;
  handleReschedule: (booking: any) => void;
  handleCancel: (booking: any) => void;
  handleBookAgain: (booking: any) => void;
  openDelete: boolean;
  setOpenDelete: (open: boolean) => void;
  cancelDeleteModal: () => void;
  onConfirm: (booking: any) => void;
  setOpenMenuId: (id: string | null) => void;
  openMenuId: string | null;
  successMessage: string;
  setSuccessMessage: (message: string) => void;
}) => {
  const router = useRouter();
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const { isDarkMode } = useMainNavBar();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId) {
        const dropdownEl = dropdownRefs.current. get(openMenuId);
        if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
          setOpenMenuId(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId, setOpenMenuId]);

  return (
    <div className="space-y-6">
      {filteredBookings.map((booking) => {
        const statusConfig = getStatusConfig(booking.status);
        const StatusIcon = statusConfig.icon;

        return (
          <div
            key={booking.id}
            className={`group relative rounded-3xl border-2 shadow-xl transition-all duration-500 overflow-hidden ${isDarkMode ? "bg-zinc-800 border-zinc-700 hover:border-chart-2/20 hover:shadow-2xl" : "bg-white border-gray-300 hover:border-chart-2/20 hover:shadow-2xl"}`}
          >
       
       

            <div className="relative p-6 md:p-8">
              {/* Header Section */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h3 className={`text-xl md:text-2xl font-black mb-2 leading-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {booking.services. title}
                  </h3>
                  <p className={`text-xs md:text-base leading-relaxed ${isDarkMode ? "text-gray-400" : "text-zinc-400"}`}>
                    {booking.services.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status Badge */}
                  <span
                 
                  className={`
                
                    flex items-center gap-2 p-1  md:p-2 rounded-xl border-2 font-bold text-sm whitespace-nowrap ${statusConfig.color} `}>
                    <StatusIcon className="w-4 h-4"  />
                    {statusConfig.label}
                  </span>

                  {/* Menu Button */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === booking.id ? null : booking.id)}
                      className={`p-1.5 rounded-xl border-2 transition-all duration-300 ${isDarkMode ? "bg-zinc-900 border-zinc-700 hover:border-chart-2" : "bg-white border-gray-300 hover:border-chart-2"}`}
                    >
                      <MoreVertical className={`w-5 h-5 ${isDarkMode ? "text-zinc-400" : "text-gray-600"}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuId === booking.id && (
                      <div
                        ref={(el) => {
                          if (el) dropdownRefs.current.set(booking.id, el);
                          else dropdownRefs.current. delete(booking.id);
                        }}
                        className={`absolute right-0 mt-2 w-56 ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border border-gray-300"} rounded-2xl shadow-2xl py-2 z-20 animate-in slide-in-from-top duration-300`}
                      >
                        <button
                          onClick={() => {
                            setOpenDelete(true);
                            setOpenMenuId(null);
                          }}
                          className={`w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-colors font-bold`}
                        >
                          <Trash2 className={`w-5 h-5 ${isDarkMode ? "text-red-400" : "text-red-600"}`} />
                          <span>Delete Booking</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Date & Time */}
                <div className={`${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-zinc-200 border-2 border-gray-300"} rounded-2xl p-4 hover:border-chart-2 transition-all duration-300`}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-chart-4 rounded-lg">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className={`text-xs ${isDarkMode ? "text-zinc-500" : "text-gray-500"} font-bold uppercase mb-1`}>Date & Time</p>
                      <p className={`font-black ${isDarkMode ? "text-white" : "text-gray-700"} text-sm`}>
                        {formatDate(booking.availability.date)}
                      </p>
                      <p className={` text-sm mt-1" ${isDarkMode ? "text-zinc-400" : "text-gray-600"}`}>
                        {booking.availability.start_time. slice(0,5)} - {booking.availability. end_time.slice(0,5)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className={`${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-zinc-200 border-2 border-gray-300"} rounded-2xl p-4 hover:border-chart-3 transition-all duration-300`}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-chart-2 rounded-lg">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className={`text-xs ${isDarkMode ? "text-zinc-500" : "text-gray-500"} font-bold uppercase mb-1`}>Duration</p>
                      <p className={`font-black ${isDarkMode ? "text-white" : "text-gray-700"} text-sm`}>
                        {booking.services.duration_minutes} min
                      </p>
                    </div>
                  </div>
                </div>

                {/* Provider */}
                <div 
                  onClick={() => router.push(`/dashboard/provider/${booking.provider.id}`)} 
                  className={`${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-zinc-200 border-2 border-gray-300"} rounded-2xl p-4 hover:border-chart-2 transition-all duration-300 cursor-pointer group/card`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-chart-3 rounded-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className={`text-xs ${isDarkMode ? "text-zinc-500" : "text-gray-500"} font-bold uppercase mb-1`}>Provider</p>
                      <p className={`font-black ${isDarkMode ? "text-white" : "text-gray-900"} text-sm group-hover/card:text-chart-2 transition-colors`}>
                        {booking.provider.full_name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className={`${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-zinc-200 border-2 border-gray-300"} rounded-2xl p-4 hover:border-chart-3 transition-all duration-300`}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-chart-5 rounded-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className={`text-xs ${isDarkMode ? "text-zinc-500" : "text-gray-500"} font-bold uppercase mb-1`}>Location</p>
                      <p className={`font-black ${isDarkMode ? "text-white" : "text-gray-700"} text-sm`}>
                        {booking.provider.location}
                      </p>
                      <p className="text-zinc-400 text-sm">
                        {booking.provider. country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount Section */}
              <div className="mb-6">
                <div className="relative overflow-hidden  rounded-2xl p-6">

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-1 md:p-1.5  bg-chart-2 rounded-xl`}>
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className={`${isDarkMode ? "text-white/80" : "text-gray-500"} text-sm font-bold uppercase`}>Total Amount</p>
                        <p className={`text-xl md:text-3xl font-black text-white" ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {formatAmount(booking.amount, booking.currency)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`flex flex-wrap gap-3 pt-6 border-t-2 ${isDarkMode ? "border-zinc-700" : "border-zinc-300"}`}>
                <button 
                  onClick={() => handleViewDetails(booking)} 
                  className="group/btn relative p-3 bg-chart-4 text-white rounded-xl font-bold hover:shadow-chart-2 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative flex items-center gap-2">
                    <Eye size={18} />
                    View Details
                  </span>
                </button>

                {booking.status === 'confirmed' && (
                  <>
                    <button 
                      onClick={() => handleReschedule(booking)} 
                      className="px-6 py-3 bg-zinc-900 border-2 border-zinc-700 text-white rounded-xl font-bold hover:border-chart-2 transition-all duration-300 flex items-center gap-2"
                    >
                      <RefreshCw size={18} />
                      Reschedule
                    </button>
                    <button 
                      onClick={() => handleCancel(booking)} 
                      className="px-6 py-3 border-2 border-red-500/50 text-red-400 rounded-xl font-bold hover: bg-red-500/10 hover:border-red-500 transition-all duration-300 flex items-center gap-2"
                    >
                      <XCircle size={18} />
                      Cancel
                    </button>
                  </>
                )}

                {booking.status === 'cancelled' && (
                  <button
                    onClick={() => handleBookAgain(booking)}
                    className="px-6 py-3 bg-zinc-900  text-white rounded-xl font-bold hover:bg-zinc-200 hover:text-chart-2 hover:border-chart-2 hover:border-2 transition-all duration-300 flex items-center gap-2"
                  >
                    <RotateCcw size={18} />
                    Book Again
                  </button>
                )}
              </div>
            </div>

            {/* Delete Modal */}
            {openDelete && (
              <DeleteModal 
                onCancel={cancelDeleteModal}
                onConfirm={onConfirm}
                booking={booking}
              />
            )}

            {/* Success Modal */}
            <SuccessModal
              open={!! successMessage}
              message={successMessage}
              onClose={() => setSuccessMessage("")}
            />
          </div>
        );
      })}
    </div>
  );
};