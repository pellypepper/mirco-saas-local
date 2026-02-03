"use client";

import {
  Calendar,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,

  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/component/Spinner";
import DetailsModal from "@/component/ProviderBooking/providerBookingModal/detailModal";
import ConfirmModal from "@/component/ProviderBooking/providerBookingModal/confirmModal";
import CancelModal from "@/component/ProviderBooking/providerBookingModal/cancelModal";
import { ProviderBookingGrid } from "./component/Bookinggrid";
import SuccessModal from "@/component/SuccessModal";
import { useProviderBooking } from "@/hooks/useBooking";
import { useMainNavBar } from "@/hooks/MainNavContext";

export default function BookingsPage({ user }: { user: any }) {
  const { isDarkMode } = useMainNavBar(); 
  
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

  /* THEME TOKENS */
  const bgPrimary = isDarkMode ? "bg-zinc-900" : "bg-zinc-50";
  const bgSecondary = isDarkMode ? "bg-zinc-800" : "bg-white";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-500" : "text-zinc-600";
  const inputBg = isDarkMode ? "bg-zinc-900" : "bg-white";
  const inputBorder = isDarkMode ? "border-zinc-700" : "border-zinc-300";
  const inputText = isDarkMode ? "text-white" : "text-zinc-900";
  const searchResultBg = isDarkMode ? "bg-chart-2/10" : "bg-chart-2/10";
  const searchResultBorder = isDarkMode ? "border-chart-2/30" : "border-chart-2/30";
  const searchResultText = isDarkMode ? "text-zinc-300" : "text-zinc-700";
  const ambientOpacity = isDarkMode ? "opacity-5" : "opacity-10";

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${bgPrimary}`}>
        <Loader message="Loading bookings..." />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgPrimary} p-4 md:p-8 transition-colors duration-300`}>
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-0 right-1/4 w-96 h-96 bg-chart-2 ${ambientOpacity} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-80 h-80 bg-chart-2 ${ambientOpacity} rounded-full blur-3xl`}></div>
      </div>

      <div className="relative mx-auto max-w-8xl">
        {/* HERO HEADER */}
        <div className="mb-8">
          <div className="relative bg-gradient-to-br from-chart-2 to-chart-3  rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-chart-2/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-chart-2/30 rounded-full -ml-24 -mb-24"></div>

            <div className="relative flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-chart-2 rounded-2xl blur-lg opacity-50"></div>
                <div className="relative p-3 md:p-4 bg-chart-2 rounded-2xl shadow-lg">
                  <Calendar className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-black text-white mb-1">
                  Bookings Dashboard
                </h1>
                <p className="text-white/80 text-sm md:text-base font-medium flex items-center gap-2">
                  <Users size={14} />
                  Manage your appointments and client schedule
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            {
              icon: Calendar,
              label: "Total Bookings",
              value: bookingStats.total,
              color: `${isDarkMode ? "#0077b6" : "#0077b6"}`,
              bgGradient: "from-[#0077b6]",
              badge: null,
            },
            {
              icon: CheckCircle,
              label: "Confirmed",
              value: bookingStats.confirmed,
              color: "#008000",
              bgGradient: "from-[#008000]",
              badge: "Active",
              badgeBg: "bg-[#008000]/20",
              badgeText: "text-[#008000]",
            },
            {
              icon: Clock,
              label: "Pending",
              value: bookingStats.pending,
              color: "#fb8500",
              bgGradient: "from-[#fb8500]",
              badge: "Review",
              badgeBg: "bg-[#fb8500]/20",
              badgeText: "text-[#fb8500]",
            },
            {
              icon: XCircle,
              label: "Cancelled",
              value: bookingStats.cancelled,
              color: "#f50000",
              bgGradient: "from-[#f50000]",
              badge: null,
            },
          ].map((stat, index) => (
            <div key={index} className="group relative">
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} to-transparent opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-opacity duration-500`}></div>

              <div 
                className={`relative ${bgSecondary} border-2 ${border} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-5 md:p-6 hover:border-opacity-50 hover:-translate-y-1`} 
                style={{ borderColor: `${stat.color}40` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="p-3 rounded-xl shadow-lg"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  {stat.badge ? (
                    <div className={`${stat.badgeBg} ${stat.badgeText} px-3 py-1 rounded-full border-2`} style={{ borderColor: `${stat.color}40` }}>
                      <span className="text-xs font-black">{stat.badge}</span>
                    </div>
                  ) : (
                    <TrendingUp className="w-4 h-4" style={{ color: stat.color }} />
                  )}
                </div>
                <p className={`text-xs md:text-sm font-bold ${textSecondary} mb-1 uppercase tracking-wider`}>
                  {stat.label}
                </p>
                <p className={`text-3xl md:text-4xl font-black ${textPrimary}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className={`${bgSecondary} border-2 ${border} rounded-2xl shadow-xl p-4 md:p-6 mb-8`}>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="relative flex-1 group">
              <div className="absolute inset-0 bg-chart-3/20 rounded-xl opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-500"></div>
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textSecondary} group-focus-within:text-chart-2 transition-colors z-10`} />
              <Input
                placeholder="Search by client name or service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`relative pl-12 h-12 md:h-14 border-2 ${inputBorder} ${inputBg} ${inputText} focus:border-chart-2 focus:ring-0 rounded-xl text-sm md:text-base font-medium transition-all placeholder:${textSecondary}`}
              />
            </div>
            <Button 
              className="group h-12 md:h-14 px-6 md:px-8 text-white rounded-xl bg-chart-2 hover:shadow-lg hover:shadow-chart-2/50 transition-all duration-300 font-bold text-sm md:text-base hover:scale-105 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Filter className="w-4 h-4 md:w-5 md:h-5 mr-2 relative" />
              <span className="relative">Filters</span>
            </Button>
          </div>

          {/* Search Results Info */}
          {search && (
            <div className={`mt-4 flex items-center gap-2 text-sm ${searchResultBg} border-2 ${searchResultBorder} px-4 py-3 rounded-xl`}>
              <Search size={14} className="text-chart-2" />
              <span className={searchResultText}>
                Found <strong className="text-chart-2 font-black">{filteredBookings.length}</strong> booking{filteredBookings.length !== 1 ? 's' : ''} matching "<strong className={textPrimary}>{search}</strong>"
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
          isDarkMode={isDarkMode}
        />

        {/* MODALS */}
        {selectedBooking && (
          <DetailsModal
            selectedBooking={selectedBooking}
            formatDate={formatDate}
            formatTime={formatTime}
            showDetailsModal={showDetailsModal}
            setShowDetailsModal={setShowDetailsModal}
          />
        )}

        {showConfirmModal && selectedBooking && (
          <ConfirmModal 
            showConfirmModal={showConfirmModal}
            setShowConfirmModal={setShowConfirmModal}
            selectedBooking={selectedBooking}
            handleConfirmBooking={handleConfirmBooking}
          />
        )}

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