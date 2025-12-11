"use client";
import { useState } from "react";
const TimeRange = () => {

      
      const [timeRange, setTimeRange] = useState('6m');
  return (
           <div className="bg-white rounded-xl grid grid-cols-2 md:inline-flex shadow-sm border border-slate-200 p-2 mb-8  gap-1">
          {['7d', '30d', '3m', '6m'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-chart-2 to-chart-3 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '3m' ? '3 Months' : range === '6m' ? '6 Months' : '1 Year'}
            </button>
          ))}
        </div>
  )
}

export default TimeRange
