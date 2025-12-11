"use client";
import { 
  Users, UserCheck, Calendar, DollarSign
} from 'lucide-react';
const OverviewStat = ({ overview, StatCard }: { overview: any; StatCard: any }) => {

    
  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Revenue" value={overview.totalRevenue} change={overview.revenueChange} icon={DollarSign} color="from-chart-2 to-chart-2" prefix="£"/>
          <StatCard title="Total Bookings" value={overview.totalBookings} change={overview.bookingsChange} icon={Calendar} color="from-chart-4 to-chart-4"/>
          <StatCard title="Total Customers" value={overview.totalCustomers} change={overview.customersChange} icon={Users} color="from-chart-1 to-chart-1"/>
          <StatCard title="Total Providers" value={overview.totalProviders} change={overview.providersChange} icon={UserCheck} color="from-chart-3 to-chart-3"/>
        </div>
  )
}

export default OverviewStat
