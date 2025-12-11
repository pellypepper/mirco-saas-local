"use client";
import { 
  TrendingUp, TrendingDown,

} from 'lucide-react';

 const StatCard = ({ title, value, change, icon: Icon, color, prefix='', suffix='' }: { title: string; value: number; change: number; icon: React.ElementType; color: string; prefix?: string; suffix?: string }) => {
    const isPositive = change >= 0;
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white"/>
          </div>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${isPositive?'bg-emerald-50 text-emerald-700':'bg-rose-50 text-rose-700'}`}>
            {isPositive?<TrendingUp className="w-3 h-3"/>:<TrendingDown className="w-3 h-3"/>}
            {Math.abs(change)}%
          </div>
        </div>
        <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-900">{prefix}{value.toLocaleString()}{suffix}</p>
      </div>
    )
  };

    export default StatCard;