"use client";

import {
  Calendar,
  Search,
  
  Filter,
  CheckCircle,
  XCircle,
  Clock,

  TrendingUp,

} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/component/Spinner";
import DetailsModal from "@/component/ProviderBooking/providerBookingModal/detailModal";
import ConfirmModal from "@/component/ProviderBooking/providerBookingModal/confirmModal";
import CancelModal from "@/component/ProviderBooking/providerBookingModal/cancelModal";
import {ProviderBookingGrid} from "./component/Bookinggrid";

import SuccessModal from "@/component/SuccessModal";
import {useProviderBooking} from "@/hooks/useBooking";


export default function BookingsPage({ user }: { user: any }) {
  const {
    search,
    setSearch,
    onConfirmDelete,
    cancelDeleteModal,
    openDelete,
    loading,
    filteredBookings,
    bookingStats,
    formatDate,
    formatTime,
    handleViewDetails,
    selectedBooking,
    showDetailsModal,
    setShowDetailsModal,
    showConfirmModal,
    setShowConfirmModal,
    handleConfirmBooking,
    showCancelModal,
    setShowCancelModal,
    handleCancelBooking,
    setSelectedBooking,
    setOpenDelete,
    successMessage,
    setSuccessMessage,
  } = useProviderBooking({ user });



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Loader message="Loading bookings..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen  b p-4 md:p-8">
      <div className=" mx-auto">
        {/* HERO HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-chart-2/80 to-chart-3/80 p-2.5 rounded-xl shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl  md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Bookings Dashboard
              </h1>
              <p className="text-gray-600 text-xs md:text-sm mt-0.5">
                Manage your appointments and client schedule
              </p>
            </div>
          </div>
        </div>

        {/* STATS CARDS */}
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {/* Total Bookings */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 md:p-6 border-2 border-gray-100 hover:border-chart-2/20 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gradient-to-br from-violet-100 to-purple-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-5 h-5 text-chart-2" />
              </div>
              <TrendingUp className="w-4 h-4 text-chart-2" />
            </div>
            <p className="text-xs md:text-sm font-bold text-gray-600 mb-1 uppercase tracking-wide">
              Total Bookings
            </p>
            <p className="text-3xl md:text-4xl font-black text-gray-900">
              {bookingStats.total}
            </p>
          </div>

          {/* Confirmed */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 md:p-6 border-2 border-gray-100 hover:border-chart-3/20 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="bg-green-100 px-2.5 py-1 rounded-full">
                <span className="text-xs font-bold text-green-700">Active</span>
              </div>
            </div>
            <p className="text-xs md:text-sm font-bold text-gray-600 mb-1 uppercase tracking-wide">
              Confirmed
            </p>
            <p className="text-3xl md:text-4xl font-black text-gray-900">
              {bookingStats.confirmed}
            </p>
          </div>

          {/* Pending */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 md:p-6 border-2 border-gray-100 hover:border-blue-200 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gradient-to-br from-blue-100 to-sky-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="bg-blue-100 px-2.5 py-1 rounded-full">
                <span className="text-xs font-bold text-blue-700">Review</span>
              </div>
            </div>
            <p className="text-xs md:text-sm font-bold text-gray-600 mb-1 uppercase tracking-wide">
              Pending
            </p>
            <p className="text-3xl md:text-4xl font-black text-gray-900">
              {bookingStats.pending}
            </p>
          </div>

          {/* Cancelled */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 md:p-6 border-2 border-gray-100 hover:border-red-200 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gradient-to-br from-red-100 to-pink-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <p className="text-xs md:text-sm font-bold text-gray-600 mb-1 uppercase tracking-wide">
              Cancelled
            </p>
            <p className="text-3xl md:text-4xl font-black text-gray-900">
              {bookingStats.cancelled}
            </p>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-8 border-2 border-gray-100">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-chart-2 transition-colors" />
              <Input
                placeholder="Search by client name or service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 md:h-14 border-2 border-gray-200 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 rounded-xl text-sm md:text-base font-medium transition-all shadow-sm hover:shadow-md"
              />
            </div>
            <Button 
              variant="outline" 
              className="h-12 md:h-14 px-6 md:px-8 text-white rounded-xl border-0 bg-gradient-to-br from-chart-2/80 to-chart-3/80 hover:to-chart-3/90 shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-sm md:text-base hover:scale-105"
            >
              <Filter className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Search Results Info */}
          {search && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 bg-violet-50 px-4 py-2 rounded-lg border border-violet-200">
              <Search size={14} className="text-chart-2" />
              <span>
                Found <strong className="text-chart-2">{filteredBookings.length}</strong> booking{filteredBookings.length !== 1 ? 's' : ''} matching "{search}"
              </span>
            </div>
          )}
        </div>


        {/* BOOKINGS GRID */}
       <ProviderBookingGrid
            filteredBookings={filteredBookings}
            formatDate={formatDate}
            formatTime={formatTime}
            setShowConfirmModal={setShowConfirmModal}
            setShowCancelModal={setShowCancelModal}
            handleViewDetails={handleViewDetails}
            setSelectedBooking={setSelectedBooking}
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
            cancelDeleteModal={cancelDeleteModal}
            onConfirm={onConfirmDelete}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
       />

        {/* DETAILS MODAL */}
        {selectedBooking && (
           <DetailsModal
            selectedBooking={selectedBooking}
            formatDate={formatDate}
            formatTime={formatTime}
            showDetailsModal={showDetailsModal}
            setShowDetailsModal={setShowDetailsModal}
          />
        )}

        {/* CONFIRM MODAL */}
        {showConfirmModal && selectedBooking && (
<ConfirmModal 
  showConfirmModal={showConfirmModal}
  setShowConfirmModal={setShowConfirmModal}
  selectedBooking={selectedBooking}
  handleConfirmBooking={handleConfirmBooking}
/>
        )}

        {/* CANCEL MODAL */}
        {showCancelModal && selectedBooking && (
         <CancelModal
            showCancelModal={showCancelModal}
            setShowCancelModal={setShowCancelModal}
            selectedBooking={selectedBooking}
            handleCancelBooking={handleCancelBooking}
          />
        )}


              {successMessage && (
        <SuccessModal
          open={!!successMessage}
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}
      </div>
    </div>
  );
}