
"use client";
import { 
  Users, 

  Calendar, 

  Activity,


} from "lucide-react";

const Header = ({ totalUsers, activeUsers,  totalBookings }: { totalUsers: number; activeUsers: number;totalBookings: number }) => {
  return (
    <div>
           {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-chart-2 to-chart-3 rounded-xl shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">User Management</h1>
              <p className="text-slate-500 mt-1">Monitor and manage all registered users</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-chart-2" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800">{totalUsers}</p>
            <p className="text-sm text-slate-500 mt-1">Total Users</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="w-5 h-5 text-chart-2/50" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800">{activeUsers}</p>
            <p className="text-sm text-slate-500 mt-1">Active Users</p>
          </div>

      

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-chart-5/10 rounded-lg">
                <Calendar className="w-5 h-5 text-chart-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800">{totalBookings}</p>
            <p className="text-sm text-slate-500 mt-1">Total Bookings</p>
          </div>
        </div>
    </div>
  )
}

export default Header
