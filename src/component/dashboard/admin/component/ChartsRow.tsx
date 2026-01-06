"use client";


import { 
  PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const ChartsRow = ({
    revenueData,
    bookingStatus
    }: {
    revenueData: Array<{ month: string; revenue: number }>;
    bookingStatus: Array<{ name: string; value: number; color: string }>;
        
}) => {
  return (
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Revenue Overview</h3>
                <p className="text-slate-600 text-sm">Monthly revenue and bookings trend</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fill="url(#revenueGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Booking Status Pie Chart */}
        <div className="bg-primary-white rounded-2xl p-6 shadow-sm border border-slate-200">
  <h3 className="text-xl font-bold text-slate-900 mb-4">Booking Status</h3>
  <ResponsiveContainer width="100%" height={250}>
    <RePieChart>
      <Pie
        data={bookingStatus}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={90}
        paddingAngle={5}
      >
        {bookingStatus.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: '#fff',
          border: '1px solid #009689',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        }}
      />
    </RePieChart>
  </ResponsiveContainer>

  {/* Status Legend */}
  <div className="space-y-2 mt-4">
    {bookingStatus.map((status) => (
      <div key={status.name} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
          <span className="text-sm font-medium text-slate-700">{status.name}</span>
        </div>
        <span className="text-sm font-bold text-slate-900">{status.value}</span>
      </div>
    ))}
  </div>
</div>
        </div>
  )
}

export default ChartsRow
