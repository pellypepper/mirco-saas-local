"use client";

import { Calendar,  Clock, Trash2, User , MapPin, MoreVertical } from "lucide-react";
import DeleteModal from "./customerBookingModal/DeleteModal";
import SuccessModal from "../SuccessModal";
import { useRef, useEffect } from "react";
import { set } from "react-hook-form";
import { useRouter } from "next/navigation";




export const CustomerBookingsGrid = ({filteredBookings, successMessage, setSuccessMessage, setOpenMenuId,openMenuId, onConfirm, cancelDeleteModal, handleBookAgain, getStatusConfig, openDelete, formatDate, setOpenDelete, formatAmount, handleViewDetails, handleReschedule, handleCancel}:
  {
    filteredBookings: any[];
    formatDate: (dateStr: string) => string;
    formatTime: (dateStr: string) => string;
 formatAmount: (amount: number, currency: string) => string; 
    getStatusConfig: (status: string)=> any;
    handleViewDetails: (booking: any)=> void;
    handleReschedule: (booking: any)=> void;
    handleCancel: (booking: any)=> void;
    handleBookAgain: (booking: any)=> void;
    openDelete: boolean;
    setOpenDelete: (open: boolean)=> void;
    cancelDeleteModal: ()=> void;
    onConfirm: (booking: any)=> void;
    setOpenMenuId: (id: string | null)=> void;
    openMenuId: string | null;
    successMessage: string;
    setSuccessMessage: (message: string)=> void;
  }
)=>{

  
   const router = useRouter();

const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (openMenuId) {
      const dropdownEl = dropdownRefs.current.get(openMenuId);
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




  return(
        <div className="space-y-4">
              {filteredBookings.map((booking) => {
                const statusConfig = getStatusConfig(booking.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                       <div className={`h-1.5 ${statusConfig.badge} opacity-80`}></div>
                    <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 group">


  <div className="flex-1 space-y-4">


    <div className="flex relative  items-start justify-between gap-4 w-full">

   
      <div className="flex-1">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
          {booking.services.title}
        </h3>
        <p className="text-slate-600 leading-relaxed">
          {booking.services.description}
        </p>
      </div>

 
      <div className="flex items-center gap-2">

      
        <span className={`flex items-center gap-2 px-4 text-[12px] md:text-[14px] py-2 rounded-full border font-medium whitespace-nowrap ${statusConfig.color}`}>
          <StatusIcon className="w-4 h-4" />
          {statusConfig.label}
        </span>

        {/* Three-dot menu button */}
      <div className="relative">
    <button
                            onClick={() => setOpenMenuId(openMenuId === booking.id ? null : booking.id)}
                            className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                          >
                            <MoreVertical className="w-5 h-5 text-slate-600" />
                          </button>
        </div>
      </div>
{openMenuId === booking.id && (
  <div
    ref={(el) => {
      if (el) dropdownRefs.current.set(booking.id, el);
      else dropdownRefs.current.delete(booking.id);
    }}
    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-10"
  >
    <button
      onClick={() => {
        setOpenDelete(true);
        setOpenMenuId(null);
      }}
      className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
    >
      <Trash2 className="w-4 h-4" />
      <span className="font-medium">Delete Booking</span>
    </button>
  </div>
)}


                          <SuccessModal
  open={!!successMessage}
  message={successMessage}
  onClose={() => setSuccessMessage("")}
/>

        {openDelete && (
      <DeleteModal 
      onCancel={cancelDeleteModal}
      onConfirm={onConfirm}
      booking={booking}
 
      
      />
     )}

    </div>

    {/* Details grid */}
    <div className="grid sm:grid-cols-2 gap-4">

      {/* Date & Time */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-chart-3" />
        </div>
        <div>
          <p className="text-xs md:text-sm text-slate-500">Date & Time</p>
          <p className="font-semibold text-sm text-slate-900">
            {formatDate(booking.availability.date)}
          </p>
          <p className="text-xs md:text-sm text-slate-600">
            {booking.availability.start_time.slice(0,5)} - {booking.availability.end_time.slice(0,5)}
          </p>
        </div>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
          <Clock className="w-5 h-5 text-chart-2" />
        </div>
        <div>
          <p className="text-xs md:text-sm text-slate-500">Duration</p>
          <p className="font-semibold text-sm text-slate-900">
            {booking.services.duration_minutes} minutes
          </p>
        </div>
      </div>

      {/* Provider */}
      <div onClick={()=> router.push(`/dashboard/provider/${booking.provider.id}`)} className=" cursor-pointer flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
          <User className="w-5 h-5 text-chart-2/60" />
        </div>
        <div>
          <p className="text-xs md:text-sm text-slate-500">Provider</p>
          <p className="font-semibold text-sm text-slate-900">
            {booking.provider.full_name}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <p className="text-xs md:text-sm text-slate-500">Location</p>
          <p className="font-semibold text-sm text-slate-900">
            {booking.provider.location}
          </p>
          <p className="text-sm text-slate-600">
            {booking.provider.country}
          </p>
        </div>
      </div>

    </div>
    
  </div>


  <div className="lg:text-right">
    <div className="inline-flex flex-col items-end bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-6 border border-indigo-100">
      <p className="text-xs text-slate-600 mb-1">Total Amount</p>

      <p className="text-xl md:text-2xl font-bold text-chart-2">
        {formatAmount(booking.amount, booking.currency)}
      </p>
    </div>
  </div>

   

</div>


                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-100">
                      <button onClick={()=> handleViewDetails(booking)} className="px-6 py-2.5 bg-gradient-to-r from-chart-2 to-chart-3 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                        View Details
                      </button>
                      {booking.status === 'confirmed' && (
                        <>
                          <button onClick={()=> handleReschedule(booking)} className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                            Reschedule
                          </button>
                          <button onClick={()=> handleCancel(booking)} className="px-6 py-2.5 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors">
                            Cancel Booking
                          </button>
                        </>
                      )}
                      {booking.status === 'cancelled' && (
                        <button
                        onClick={() => handleBookAgain(booking)}
                        className="px-6 py-2.5 bg-emerald-50 text-emerald-600 rounded-lg font-medium hover:bg-emerald-100 transition-colors">
                          Book Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
  )
}



