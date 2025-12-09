"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Clock, Eye,  Trash2, User } from "lucide-react";
import DeleteModal from "../../CustomerBooking/customerBookingModal/DeleteModal";
import SuccessModal from "@/component/SuccessModal";

export  const ProviderBookingGrid = ({ openDelete, successMessage, setSuccessMessage, setOpenDelete, cancelDeleteModal, onConfirm, filteredBookings, formatDate, setSelectedBooking, formatTime, setShowConfirmModal, setShowCancelModal, handleViewDetails }:
    {
        openDelete: boolean;
        setOpenDelete: (open: boolean) => void;
        cancelDeleteModal: () => void;
        onConfirm: (booking: any) => void;
        filteredBookings: any[];
        formatDate: (dateStr: string) => string;
        setSelectedBooking: any;
        formatTime: (dateStr: string) => string;
        setShowConfirmModal: (show: boolean) => void;
        setShowCancelModal: (show: boolean) => void;
        handleViewDetails: (booking: any) => void;
        successMessage: string;
        setSuccessMessage: (message: string) => void;
    }
) => {


  return (
     <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBookings.length === 0 && (
            <div className="col-span-full bg-white rounded-2xl shadow-sm p-16 text-center border border-gray-100">
              <div className="bg-gradient-to-br from-gray-100 to-gray-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}

          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-indigo-200"
            >
              {/* Header with Status */}
              <div className="flex items-start justify-between mb-5">
                <Badge
                  variant={
                    booking.status === "confirmed"
                      ? "default"
                      : booking.status === "pending"
                      ? "outline"
                      : "destructive"
                  }
                  className={`
                    ${booking.status === "confirmed" ? "bg-green-100 text-chart-2 border-green-200" : ""}
                    ${booking.status === "pending" ? "bg-blue-100 text-blue-700 border-blue-200" : ""}
                    ${booking.status === "cancelled" ? "bg-red-100 text-red-700 border-red-200" : ""}
                    px-3 py-1 text-xs font-semibold rounded-full
                  `}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
                <button
                 onClick={() => setOpenDelete(!openDelete)}
                className="opacity-0 group-hover:opacity-100 transition-opacity">
             <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                </button>
              </div>

                 {openDelete && (
      <DeleteModal 
      onCancel={cancelDeleteModal}
      onConfirm={onConfirm}
      booking={booking}
      
      />
     )}

     
<SuccessModal
  open={!!successMessage}
  message={successMessage}
  onClose={() => setSuccessMessage("")}
/>


              {/* Client Info */}
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-chart-2/80 to-chart-3/80 w-12 h-12 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      {booking.customer.full_name}
                    </h3>
                    <p className="text-sm text-gray-500 leading-tight mt-0.5">
                      {booking.services.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 mb-5 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-chart-2" />
                    <span className="text-sm font-semibold">
                      {formatDate(booking.booking_date)}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 text-chart-2" />
                    <span className="text-sm font-semibold">
                      {formatTime(booking.booking_date)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(booking)}
                  className="flex-1 rounded-xl border-chart-2 hover:border-chart-3 hover:bg-chart-3/10 hover:text-chart-3"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>

                {booking.status === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowConfirmModal(true);
                    }}
                    className="flex-1 rounded-xl bg-gradient-to-r from-chart-2 to-chart-3 hover:from-chart-2 hover:to-chart-3"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm
                  </Button>
                )}

                {booking.status !== "cancelled" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowCancelModal(true);
                    }}
                    className="rounded-xl border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                  >
                   Cancel
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
  )
}
