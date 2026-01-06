"use client";
import { 
  Calendar,

  Eye
} from "lucide-react";

const Booking = ({ sortedBookings, toggleSort, SortIcon, setSelectedBooking, getStatusColor, getPaymentColor, getStatusIcon }:{ sortedBookings: any[], toggleSort: (key: string) => void, SortIcon: React.FC<{ column: string }>, setSelectedBooking: React.Dispatch<React.SetStateAction<any>>, getStatusColor: (status: string) => string, getPaymentColor: (status: string) => string, getStatusIcon: (status: string) => JSX.Element | null }) => {
  return (
     <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-chart-3/20 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        Booking Ref
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left cursor-pointer hover:bg-chart-3/20 transition-colors"
                      onClick={() => toggleSort("clientName")}>
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        Client
                        <SortIcon column="clientName" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left cursor-pointer hover:bg-chart-3/20 transition-colors"
                      onClick={() => toggleSort("providerName")}>
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        Provider
                        <SortIcon column="providerName" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="text-sm font-semibold text-slate-700">Service</div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left cursor-pointer hover:bg-chart-3/20 transition-colors"
                      onClick={() => toggleSort("date")}>
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        Date & Time
                        <SortIcon column="date" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-center cursor-pointer hover:bg-chart-3/20 transition-colors"
                      onClick={() => toggleSort("amount")}>
                      <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
                        Amount
                        <SortIcon column="amount" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center">
                      <div className="text-sm font-semibold text-slate-700">Status</div>
                    </th>
                    <th className="px-6 py-4 text-center">
                      <div className="text-sm font-semibold text-slate-700">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedBookings.map((booking) => (
                    <tr 
                      key={booking.id}
                      className="hover:bg-chart-2/20 cursor-pointer transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-chart-2">
                          {booking.bookingRef}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-800">{booking.clientName}</p>
                          <p className="text-xs text-slate-500">{booking.clientEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-chart-2 to-chart-3 flex items-center justify-center text-white text-xs font-semibold">
                            {booking.providerName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium text-slate-800">{booking.providerName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-slate-800">{booking.serviceName}</p>
                          <p className="text-xs text-slate-500">{booking.duration}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {new Date(booking.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                          <p className="text-xs text-slate-500">{booking.time}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div>
                          <p className="text-lg font-bold text-chart-3">
                            ${booking.amount}
                          </p>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getPaymentColor(booking.paymentStatus)}`}>
                            {booking.paymentStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-chart-2/20 text-chart-2 rounded-lg hover:bg-chart-2/30 transition-colors text-sm font-medium">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {sortedBookings.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No bookings found</p>
              </div>
            )}
          </div>
  )
}

export default Booking
