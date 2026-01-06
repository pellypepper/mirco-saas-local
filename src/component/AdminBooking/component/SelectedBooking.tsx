import React from 'react'
import { 

  User,

  MapPin,

} from "lucide-react";

const SelectedBooking = ({ selectedBooking, setSelectedBooking, getStatusColor, getPaymentColor, getStatusIcon }: { selectedBooking: any, setSelectedBooking: React.Dispatch<React.SetStateAction<any>>, getStatusColor: (status: string) => string, getPaymentColor: (status: string) => string, getStatusIcon: (status: string) => JSX.Element | null }) => {
  return (
     <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedBooking(null)}>
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-chart-2 to-chart-3 px-8 py-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-mono font-semibold">
                        {selectedBooking.bookingRef}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedBooking.status)} bg-white/70`}>
                        {getStatusIcon(selectedBooking.status)}
                        {selectedBooking.status}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold">{selectedBooking.serviceName}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all">
                    <span className="text-2xl leading-none">✕</span>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto p-8">
                {/* Client & Provider Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-chart-2 rounded-full mr-3"></span>
                      Client Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-800 font-medium">{selectedBooking.clientName}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-slate-500">Email:</span>
                        <span className="text-slate-800">{selectedBooking.clientEmail}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-chart-4 rounded-full mr-3"></span>
                      Provider Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-chart-2 to-chart-3 flex items-center justify-center text-white text-xs font-semibold">
                          {selectedBooking.providerName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-slate-800 font-medium">{selectedBooking.providerName}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-800">{selectedBooking.location ? selectedBooking.location : "Location not available"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-chart-2 rounded-full mr-3"></span>
                    Booking Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-slate-500 text-sm mb-1">Service</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedBooking.serviceName}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-slate-500 text-sm mb-1">Duration</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedBooking.duration}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-slate-500 text-sm mb-1">Date</p>
                      <p className="text-lg font-semibold text-slate-800">
                        {new Date(selectedBooking.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-slate-500 text-sm mb-1">Time</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedBooking.time}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-slate-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-chart-2 rounded-full mr-3"></span>
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-slate-500 text-sm mb-1">Amount</p>
                      <p className="text-3xl font-bold text-chart-3">
                        ${selectedBooking.amount}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-slate-500 text-sm mb-1">Payment Status</p>
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getPaymentColor(selectedBooking.paymentStatus)}`}>
                        {selectedBooking.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-chart-4 rounded-full mr-3"></span>
                    Additional Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-slate-500">Booking Created:</span>
                      <span className="text-slate-800 font-medium">
                        {new Date(selectedBooking.createdAt).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-slate-500">Location:</span>
                      <span className="text-slate-800 font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {selectedBooking.location}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-slate-500">Booking Reference:</span>
                      <span className="text-slate-800 font-mono font-semibold">
                        {selectedBooking.bookingRef}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default SelectedBooking
