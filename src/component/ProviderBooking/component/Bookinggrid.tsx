"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Clock, Eye, Trash2, User, XCircle } from "lucide-react";
import DeleteModal from "../../CustomerBooking/customerBookingModal/DeleteModal";
import SuccessModal from "@/component/SuccessModal";


export const ProviderBookingGrid = ({ 
  openDelete, 
  successMessage, 
  setSuccessMessage, 
  setOpenDelete, 
  cancelDeleteModal, 
  onConfirm, 
  filteredBookings, 
  formatDate, 
  setSelectedBooking, 
  formatTime, 
  setShowConfirmModal, 
  setShowCancelModal, 
  handleViewDetails ,
  isDarkMode,
}: {
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
  isDarkMode: boolean;
}) => {
  

  /* THEME TOKENS */
  const cardBg = isDarkMode ? "bg-zinc-800" : "bg-white";
  const cardBorder = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const cardHoverBorder = isDarkMode ? "hover:border-chart-4/20" : "hover:border-chart-2";
  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-400" : "text-zinc-600";
  const infoBg = isDarkMode ? "bg-zinc-900" : "bg-zinc-50";
  const infoBorder = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const deleteBtnBg = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const deleteBtnBorder = isDarkMode ? "border-zinc-700" : "border-zinc-300";
  const deleteBtnHoverBg = isDarkMode ? "hover:bg-chart-1/10" : "hover:bg-red-50";
  const emptyCardBg = isDarkMode ? "bg-zinc-800" : "bg-white";
  const emptyIconBg = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const emptyIconBorder = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const emptyIconColor = isDarkMode ? "text-zinc-600" : "text-zinc-400";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredBookings.length === 0 && (
        <div className={`col-span-full ${emptyCardBg} border-2 ${cardBorder} rounded-3xl shadow-xl p-16 text-center`}>
          <div className={`inline-flex p-6 ${emptyIconBg} rounded-2xl border-2 ${emptyIconBorder} mb-6`}>
            <Calendar className={`w-12 h-12 ${emptyIconColor}`} />
          </div>
          <h3 className={`text-2xl font-black ${textPrimary} mb-2`}>No bookings found</h3>
          <p className={`${textSecondary} font-medium`}>Try adjusting your search or filters</p>
        </div>
      )}

      {filteredBookings.map((booking, index) => (
        <div
          key={booking.id}
          className={`group relative ${cardBg} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 border-2 ${cardBorder} ${cardHoverBorder} hover:-translate-y-1`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-chart-2 opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500"></div>

          {/* Header with Status */}
          <div className="relative flex items-start justify-between mb-5">
            <Badge
              className={`
                px-4 py-2 text-xs font-black rounded-xl border-2
                ${booking.status === "confirmed" ? "bg-[#008000]/20 text-[#008000] border-[#008000]/30" : ""}
                ${booking.status === "pending" ? "bg-chart-2/20 text-chart-2 border-chart-2/30" : ""}
                ${booking.status === "cancelled" ? "bg-chart-1/20 text-chart-1 border-chart-1/30" : ""}
              `}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
            
            <button
              onClick={() => setOpenDelete(!openDelete)}
              className={`p-2 ${deleteBtnBg} border ${deleteBtnBorder} rounded-lg opacity-0 group-hover:opacity-100 hover:border-chart-1 ${deleteBtnHoverBg} transition-all`}
            >
              <Trash2 className="w-4 h-4 text-chart-1" />
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
          <div className="relative mb-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                
                <div className="relative bg-chart-2/90 w-12 h-12 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className={`text-lg font-black ${textPrimary} leading-tight`}>
                  {booking.customer.full_name}
                </h3>
                <p className={`text-sm ${textSecondary} leading-tight mt-1 font-medium`}>
                  {booking.services.title}
                </p>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className={`relative ${infoBg} border ${infoBorder} rounded-xl p-4 mb-5`}>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${textPrimary}`}>
                <div className={`p-1.5 ${isDarkMode ? 'bg-chart-2/20' : 'bg-chart-2/10'} rounded-lg`}>
                  <Calendar className="w-4 h-4 text-chart-2" />
                </div>
                <span className="text-sm font-bold">
                  {formatDate(booking.booking_date)}
                </span>
              </div>
              <div className={`w-px h-5 ${infoBorder}`}></div>
              <div className={`flex items-center gap-2 ${textPrimary}`}>
                <div className={`p-1.5 ${isDarkMode ? 'bg-chart-4/20' : 'bg-chart-4/10'} rounded-lg`}>
                  <Clock className="w-4 h-4 text-chart-4" />
                </div>
                <span className="text-sm font-bold">
                  {formatTime(booking.booking_date)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="relative flex gap-2">
            <Button
              size="sm"
              onClick={() => handleViewDetails(booking)}
              className="flex-1 rounded-xl bg-chart-2 text-white hover:bg-chart-2/90 transition-all"
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
                className="group flex-1 rounded-xl bg-[#008800] text-white hover:shadow-lg hover:shadow-[#008800]/50 transition-all relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <CheckCircle className="w-4 h-4 mr-2 relative" />
                <span className="relative">Confirm</span>
              </Button>
            )}

            {booking.status !== "cancelled" && (
              <Button
                size="sm"
                onClick={() => {
                  setSelectedBooking(booking);
                  setShowCancelModal(true);
                }}
                className={`rounded-xl ${isDarkMode ? 'bg-zinc-900' : 'bg-white'} border-2 border-chart-1/30 text-chart-1 hover:bg-chart-1/10 hover:border-chart-1 transition-all`}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};