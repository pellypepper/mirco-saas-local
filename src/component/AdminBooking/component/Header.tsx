"use client";
import { 
  Calendar,
  CalendarCheck,

  CheckCircle2, 
  XCircle, 
  Clock, 

  DollarSign,

  Download
} from "lucide-react";

const Header = ({ totalBookings, confirmedBookings, completedBookings, pendingBookings, cancelledBookings, totalRevenue }: { totalBookings: number; confirmedBookings: number; completedBookings: number; pendingBookings: number; cancelledBookings: number; totalRevenue: number }) => {
  return (
    <div>
           <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-chart-2 to-chart-3 rounded-xl shadow-lg">
                <CalendarCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-800">Booking Management</h1>
                <p className="text-slate-500 mt-1">Monitor and manage all bookings</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-slate-100 rounded-lg">
                <Calendar className="w-4 h-4 text-slate-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{totalBookings}</p>
            <p className="text-xs text-slate-500 mt-1">Total</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-chart-2/20 rounded-lg">
                <CalendarCheck className="w-4 h-4 text-chart-2" />
              </div>
            </div>
            <p className="text-2xl font-bold text-chart-2">{confirmedBookings}</p>
            <p className="text-xs text-slate-500 mt-1">Confirmed</p>
          </div>


          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-chart-4/20 rounded-lg">
                <Clock className="w-4 h-4 text-chart-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-chart-4">{pendingBookings}</p>
            <p className="text-xs text-slate-500 mt-1">Pending</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-chart-1/20 rounded-lg">
                <XCircle className="w-4 h-4 text-chart-1" />
              </div>
            </div>
            <p className="text-2xl font-bold text-chart-1">{cancelledBookings}</p>
            <p className="text-xs text-slate-500 mt-1">Cancelled</p>
          </div>

          <div className="bg-gradient-to-br from-chart-2/80 to-chart-3/80 rounded-xl p-5 shadow-lg text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-purple-100 mt-1">Revenue</p>
          </div>
        </div>
    </div>
  )
}

export default Header
