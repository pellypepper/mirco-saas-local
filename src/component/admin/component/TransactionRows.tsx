"use client";
import { 
  Users, 
  Star, MapPin
} from 'lucide-react';


const TransactionRows = ({
    topProviders,
    recentCustomers
}: {
    topProviders: any[];
    recentCustomers: any[];
}) => {
  return (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Providers */}
       {/* Top Providers */}
<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="text-xl font-bold text-slate-900 mb-1">Top Providers</h3>
      <p className="text-slate-600 text-xs md:text-sm">Highest performing service providers</p>
    </div>
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-chart-1 to-chart-1 flex items-center justify-center shadow-lg">
      <Star className="w-4 h-4 md:w-5 md:h-5 text-white" />
    </div>
  </div>

  <div className="space-y-3">
    {topProviders.map((provider, index) => (
      <div 
        key={provider.id} 
        className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
      >
        {/* Rank */}
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-chart-2 to-chart-2 text-white font-bold shadow-lg">
          {index + 1}
        </div>

        {/* Provider Info */}
        <div className="flex-1">
          <p className="font-bold text-slate-900">{provider.name}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-slate-600 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {provider.location || 'N/A'}
            </span>
            <span className="text-xs hidden md:flex text-slate-600  items-center gap-1">
              <Star className="w-3 h-3 fill-chart-5 text-chart-5" />
              {provider.rating?.toFixed(1) || '0.0'}
            </span>
          </div>
        </div>

        {/* Revenue & Bookings */}
        <div className="text-right">
          <p className="font-bold text-slate-900">£{provider.revenue.toLocaleString()}</p>
          <p className="text-xs text-slate-600">{provider.bookings} bookings</p>
        </div>
      </div>
    ))}

    {/* Empty state */}
    {topProviders.length === 0 && (
      <p className="text-sm text-slate-500 text-center py-6">
        No provider data available.
      </p>
    )}
  </div>
</div>



    {/* Recent Customers */}
<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="text-xl font-bold text-slate-900 mb-1">Recent Customers</h3>
      <p className="text-slate-600 text-sm">Latest customer registrations</p>
    </div>
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-chart-2 to-chart-3 flex items-center justify-center shadow-lg">
      <Users className="w-5 h-5 text-white" />
    </div>
  </div>

  <div className="space-y-3">
    {recentCustomers.map((customer) => (
      <div 
        key={customer.id} 
        className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
      >
        {/* Avatar */}
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-chart-2 to-chart-2 flex items-center justify-center text-white font-bold shadow-lg">
          {customer.name.charAt(0).toUpperCase()}
        </div>

        {/* Customer Info */}
        <div className="flex-1">
          <p className="font-bold text-slate-900">{customer.name}</p>
          <p className="text-xs text-slate-600">{customer.email}</p>
        </div>

        {/* Spending & Bookings */}
        <div className="text-right">
          <p className="font-bold text-slate-900">£{customer.spent.toLocaleString()}</p>
          <p className="text-xs text-slate-600">{customer.bookings} bookings</p>
        </div>
      </div>
    ))}

    {/* Empty State */}
    {recentCustomers.length === 0 && (
      <p className="text-sm text-slate-500 text-center py-6">
        No recent customers found.
      </p>
    )}
  </div>
</div>

        </div>
  )
}

export default TransactionRows
