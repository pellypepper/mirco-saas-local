import { Calendar} from 'lucide-react';
import Loader from '@/component/Spinner';
import ErrorModal from '@/component/ErrorModal';
import { useCustomerBooking } from '@/hooks/useBooking';
import DetailsModal from '@/component/CustomerBooking/customerBookingModal/DetailsModal';
import RescheduleModal from '@/component/CustomerBooking/customerBookingModal/Reschedule';
import CancelModal from '@/component/CustomerBooking/customerBookingModal/CancelModal';
import {CustomerBookingsGrid} from "@/component/CustomerBooking/BookingGrid"
import BookAgainModal from '@/component/CustomerBooking/customerBookingModal/BookingAgainModal';
import { useMainNavBar } from '@/hooks/MainNavContext';

const CustomerBookings = ({ user }: { user: any }) => {
  const { isDarkMode } = useMainNavBar();
  const {
    openDelete,
    setOpenDelete,
    cancelDeleteModal,
    onConfirmDelete,
    bookings,
    loading,
    error,
    filter,
    setFilter,
    filteredBookings,
    showDetailsModal,
    setShowDetailsModal,
    showRescheduleModal,
    setShowRescheduleModal,
    showCancelModal,
    setShowCancelModal,
    selectedBooking,
    handleViewDetails,
    handleReschedule,
    handleCancel,
    handleRescheduleSuccess,
    handleCancelSuccess,
    getStatusConfig,
    formatDate,
    formatTime,
    formatAmount,
    showBookAgainModal,
    setShowBookAgainModal,
    handleBookAgain,
    setOpenMenuId,
    openMenuId,
    handleBookAgainSuccess, 
    setSuccessMessage,
    successMessage 
  } = useCustomerBooking({ user });

  const statusCounts = {
    all: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b. status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };

  if (loading) {
    return <Loader message="Loading your bookings..." />;
  }

  if (error) {
    return (
      <ErrorModal 
        open={!!error} 
        message={error} 
        onClose={() => {}} 
        onConfirm={() => {window.location.reload()}} 
        confirmText="Retry" 
      />
    );
  }

  return (
    <>
      <div className={`min-h-screen relative overflow-hidden ${isDarkMode ? "bg-zinc-900" : "bg-white"}`}>
        {/* Ambient background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-chart-2 opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-chart-3 opacity-5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
             
                <div className="relative p-3 bg-chart-2 rounded-xl shadow-lg">
                  <Calendar className="text-white" size={28} />
                </div>
              </div>
              <div>
                <h1 className={`text-3xl md:text-5xl font-black ${isDarkMode ? "text-white" : "text-black"}`}>My Bookings</h1>
                <p className={`text-sm md:text-lg font-medium mt-1 ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>Manage and track your appointments</p>
              </div>
            </div>
            <div className="h-1 w-32 bg-chart-2 rounded-full"></div>
          </div>

          {/* Filter Tabs */}
          <div className={`rounded-2xl p-2 mb-8 shadow-xl ${isDarkMode ? "bg-zinc-800 border-2 border-zinc-700" : "border-chart-2/10 border-2"}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(['all', 'confirmed', 'pending', 'cancelled'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`relative px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
                    filter === status
                      ? 'text-white'
                      : `${isDarkMode ? "text-gray-300 hover:text-white hover:bg-chart-2/10" : "text-gray-500 hover:text-black hover:bg-chart-2/10"}`
                  }`}
                >
                  {filter === status && (
                    <>
                      <div className="absolute inset-0 bg-chart-2 rounded-xl"></div>
                      <div className="absolute inset-0 bg-chart-2 rounded-xl "></div>
                    </>
                  )}
                  <span className="relative flex items-center justify-center gap-2">
                    <span className="capitalize">{status}</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                      filter === status 
                        ? 'bg-white/20' 
                        : `${isDarkMode ? "bg-zinc-700 text-white" : "bg-gray-300 text-white"}`
                    }`}>
                      {statusCounts[status]}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredBookings.length === 0 ?  (
            <div className={`${isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-chart-2/20"} border-2 rounded-3xl p-16 text-center shadow-2xl`}>
              <div className="inline-flex p-6 bg-zinc-900 rounded-full border-2 border-zinc-700 mb-6">
                <Calendar className={`w-20 h-20 text-white`} />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">No bookings found</h3>
              <p className="text-zinc-400 text-lg">
                You don't have any {filter !== 'all' ?  filter : ''} bookings yet.
              </p>
            </div>
          ) : (
            <CustomerBookingsGrid 
              filteredBookings={filteredBookings}
              getStatusConfig={getStatusConfig}
              formatDate={formatDate}
              formatTime={formatTime}
              formatAmount={formatAmount}
              handleViewDetails={handleViewDetails}
              handleReschedule={handleReschedule}
              handleCancel={handleCancel}
              handleBookAgain={handleBookAgain}
              openDelete={openDelete}
              setOpenDelete={setOpenDelete}
              cancelDeleteModal={cancelDeleteModal}
              onConfirm={onConfirmDelete}
              setOpenMenuId={setOpenMenuId}
              openMenuId={openMenuId}
              successMessage={successMessage}
              setSuccessMessage={setSuccessMessage}
            />  
          )}
        </div>
      </div>

      {/* Modals */}
      {showDetailsModal && (
        <DetailsModal booking={selectedBooking} onClose={() => setShowDetailsModal(false)} />
      )}
      {showRescheduleModal && selectedBooking && (
        <RescheduleModal 
          booking={selectedBooking} 
          onClose={() => setShowRescheduleModal(false)}
          onReschedule={handleRescheduleSuccess}
        />
      )}
      {showBookAgainModal && selectedBooking && (
        <BookAgainModal
          booking={selectedBooking}
          onClose={() => setShowBookAgainModal(false)}
          onSuccess={handleBookAgainSuccess}
        />
      )}
      {showCancelModal && selectedBooking && (
        <CancelModal 
          booking={selectedBooking} 
          onClose={() => setShowCancelModal(false)}
          onCancel={handleCancelSuccess}
        />
      )}
    </>
  );
};

export default CustomerBookings;