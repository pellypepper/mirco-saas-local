'use client';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  color,
  prefix = '',
  suffix = '',
  isDarkMode,
}: {
  title: string;
  value: number;
  change: number;
  icon: React.ElementType;
  color: string;
  prefix?: string;
  suffix?: string;
  isDarkMode: boolean;
}) => {
  const isPositive = change >= 0;

  const bg = isDarkMode ? 'bg-zinc-800' : 'bg-white';
  const border = isDarkMode ? 'border-zinc-700' : 'border-slate-200';
  const textPrimary = isDarkMode ? 'text-white' : 'text-slate-900';
  const textSecondary = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  const badgeBg = isPositive
    ? isDarkMode
      ? 'bg-emerald-900/30 text-emerald-400'
      : 'bg-emerald-50 text-emerald-700'
    : isDarkMode
    ? 'bg-rose-900/30 text-rose-400'
    : 'bg-rose-50 text-rose-700';

  return (
    <div className={`rounded-2xl p-6 shadow-sm border ${bg} ${border} hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${badgeBg}`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>

      <p className={`${textSecondary} text-sm font-medium mb-1`}>
        {title}
      </p>

      <p className={`text-3xl font-bold ${textPrimary}`}>
        {prefix}
        {value.toLocaleString()}
        {suffix}
      </p>
    </div>
  );
};

export default StatCard;