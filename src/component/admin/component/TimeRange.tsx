'use client';
import { useState } from 'react';

const TimeRange = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [timeRange, setTimeRange] = useState('6m');

  const bg = isDarkMode ? 'bg-zinc-800' : 'bg-white';
  const border = isDarkMode ? 'border-zinc-700' : 'border-slate-200';
  const text = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  const hover = isDarkMode ? 'hover:bg-zinc-700' : 'hover:bg-slate-50';

  return (
    <div className={`${bg} rounded-xl grid grid-cols-2 md:inline-flex shadow-sm border ${border} p-2 mb-8 gap-1`}>
      {['7d', '30d', '3m', '6m'].map((range) => (
        <button
          key={range}
          onClick={() => setTimeRange(range)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            timeRange === range
              ? 'bg-gradient-to-r from-chart-2 to-chart-3 text-white shadow-lg'
              : `${text} ${hover}`
          }`}
        >
          {range === '7d'
            ? '7 Days'
            : range === '30d'
            ? '30 Days'
            : range === '3m'
            ? '3 Months'
            : '6 Months'}
        </button>
      ))}
    </div>
  );
};

export default TimeRange;