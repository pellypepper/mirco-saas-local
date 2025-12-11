"use client";


import { 
  BarChart, Bar, PieChart as XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
} from 'recharts';

const Performance = ({
    categoryData
    }: {
    categoryData: Array<{ category: string; bookings: number; revenue: number }>;
}) => {
  return (
     <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Category Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="category" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
              <Bar dataKey="bookings" fill="#6366f1" radius={[8, 8, 0, 0]}/>
              <Bar dataKey="revenue" fill="#009689" radius={[8, 8, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
  )
}

export default Performance

