"use client";

interface TimeRangeProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
}

const TimeRange = ({ timeRange, setTimeRange }: TimeRangeProps) => {
  const ranges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
  ];

  return (
    <div className="bg-white rounded-xl grid grid-cols-2 md:inline-flex shadow-sm border border-slate-200 p-2 mb-8 gap-1">
      {ranges. map((range) => (
        <button
          key={range. value}
          onClick={() => setTimeRange(range.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            timeRange === range.value
              ? 'bg-gradient-to-r from-chart-2 to-chart-3 text-white shadow-lg'
              :  'text-slate-600 hover:bg-slate-50'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRange;