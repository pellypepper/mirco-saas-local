
import { Calendar,} from 'lucide-react';
import Loader from '@/component/Spinner';
import ErrorModal from '@/component/ErrorModal';
import { useCustomerBooking } from '@/hooks/useBooking';
import DetailsModal from '@/component/CustomerBooking/customerBookingModal/DetailsModal';
import RescheduleModal from '@/component/CustomerBooking/customerBookingModal/Reschedule';
import CancelModal from '@/component/CustomerBooking/customerBookingModal/CancelModal';
import {CustomerBookingsGrid} from "@/component/CustomerBooking/BookingGrid"
import BookAgainModal from '@/component/CustomerBooking/customerBookingModal/BookingAgainModal';






const CustomerBookings = ({ user }: { user: any }) => {


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
  successMessage } = useCustomerBooking({ user });

 


  const statusCounts = {
    all: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };

  if (loading) {
    return <Loader message="Loading your bookings..." />;
  }

  if (error) {
    
    return (
      <ErrorModal open={!!error} message={error} onClose={() => {}} onConfirm={() => {window.location.reload()}} confirmText="Retry" />
     
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2">My Bookings</h1>
            <p className="text-slate-600 text-md md:text-lg">Manage and track your appointments</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 mb-8">
            <div className="flex flex-wrap gap-2">
              {(['all', 'confirmed', 'pending', 'cancelled'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`flex-1 min-w-[120px] px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    filter === status
                      ? 'bg-gradient-to-br from-chart-2/80 to-chart-3/80 text-white shadow-md shadow-chart-3'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="capitalize">{status}</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-white/20">
                    {statusCounts[status]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
              <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No bookings found</h3>
              <p className="text-slate-600">You don't have any {filter !== 'all' ? filter : ''} bookings yet.</p>
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