"use client";
import { 

  Activity, Clock, CheckCircle, XCircle, ArrowUpRight, ArrowDownRight,
 Bell
} from 'lucide-react';


const FooterStats = ({ overview }: { overview: any }) => {
  return (
     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-chart-2/80 to-chart-2/80 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8"/>
              <ArrowUpRight className="w-6 h-6"/>
            </div>
            <p className="font-semibold">Completed Bookings</p>
            <p className="text-2xl font-bold">{overview.completedBookings}</p>
          </div>
          <div className="bg-gradient-to-br from-chart-1/80 to-chart-1/80 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8"/>
              <Clock className="w-6 h-6"/>
            </div>
            <p className="font-semibold">Active Bookings</p>
            <p className="text-2xl font-bold">{overview.activeBookings}</p>
          </div>
             <div className="bg-gradient-to-br from-chart-3/80 to-chart-3/80 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
                              <Bell className="w-8 h-8 " />
              <Clock className="w-6 h-6"/>
            </div>
            <p className="font-semibold">Pending Bookings</p>
            <p className="text-2xl font-bold">{overview.pendingBookings}</p>
          </div>
          <div className="bg-gradient-to-br from-chart-5/80 to-chart-5/80 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <XCircle className="w-8 h-8"/>
              <ArrowDownRight className="w-6 h-6"/>
            </div>
            <p className="font-semibold">Cancelled Bookings</p>
            <p className="text-2xl font-bold">{overview.cancelledBookings}</p>
          </div>
        </div>
  )
}

export default FooterStats
