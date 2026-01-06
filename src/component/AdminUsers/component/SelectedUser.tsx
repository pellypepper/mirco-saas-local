"use client";
import { 

  Calendar, 

  Mail, 
  Phone, 
  MapPin,
 
  DollarSign
} from "lucide-react";

const SelectedUser = ({ selectedUser, setSelectedUser, getStatusColor, getStatusIcon }: { selectedUser: any; setSelectedUser: (user: any) => void; getStatusColor: (status: string) => string; getStatusIcon: (status: string) => JSX.Element | null }) => {
  return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedUser(null)}>
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-chart-2 to-chart-3 px-8 py-6 text-white">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold">
                      {selectedUser.full_name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-1">{selectedUser.full_name}</h2>
                      <p className="text-blue-100 text-sm flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {selectedUser.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all">
                    <span className="text-2xl leading-none">✕</span>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto p-8">
                {/* Contact & Account Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-chart-2 rounded-full mr-3"></span>
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-800 font-medium">{selectedUser.phone_number ? selectedUser.phone_number : "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-800 font-medium">{selectedUser.location ? selectedUser.location : "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-chart-5 rounded-full mr-3"></span>
                      Account Details
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">User ID:</span>
                        <span className="text-slate-800 font-medium">#{selectedUser.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Member Since:</span>
                        <span className="text-slate-800 font-medium">
                          {new Date(selectedUser.joined).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Last Activity:</span>
                        <span className="text-slate-800 font-medium">
                          {new Date(selectedUser.lastBooking).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Statistics */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-chart-2 rounded-full mr-3"></span>
                    Booking Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                      <p className="text-slate-500 text-sm mb-1">Total</p>
                      <p className="text-3xl font-bold text-slate-800">{selectedUser.totalBookings}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                      <p className="text-slate-500 text-sm mb-1">Completed</p>
                      <p className="text-3xl font-bold text-chart-2">{selectedUser.completedBookings}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                      <p className="text-slate-500 text-sm mb-1">Pending</p>
                      <p className="text-3xl font-bold text-chart-3">{selectedUser.pendingBookings}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                      <p className="text-slate-500 text-sm mb-1">Cancelled</p>
                      <p className="text-3xl font-bold text-chart-1">{selectedUser.cancelledBookings}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-chart-3" />
                        <span className="text-slate-600 font-medium">Total Amount Spent</span>
                      </div>
                      <span className="text-3xl font-bold text-chart-3">
                        ${selectedUser.totalSpent.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking History */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-chart-2 rounded-full mr-3"></span>
                    Complete Booking History
                  </h3>
                  <div className="space-y-3">
                    { selectedUser.recentBookings && selectedUser.recentBookings.length > 0 ? selectedUser.recentBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-white rounded-lg p-4 border border-slate-200 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800 mb-1">{booking.provider.name}</p>
                            <p className="text-sm text-slate-600">{booking.service.name}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              {booking.status}
                            </span>
                            <p className="text-lg font-bold text-chart-3 mt-2">
                              ${booking.amount}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(booking.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    )) : (
                      <p className="text-sm text-slate-600">No bookings found for this user.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default SelectedUser
