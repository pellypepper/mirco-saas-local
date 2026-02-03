"use client";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
 TrendingUp, TrendingDown,

} from "lucide-react";


export function CardGradient({ children , isDarkMode }: { children: any, isDarkMode: boolean }) {
  return (
    <div className={`cursor-pointer rounded-2xl p-4 md:p-5 ${isDarkMode ? "bg-zinc-800 border-chart-2/20 hover:bg-chart-2/20" : "bg-white border-gray-300 hover:bg-gray-100"} shadow-lg border hover:scale-[1.03] transition-all duration-150 backdrop-blur-sm`}>
      {children}
    </div>
  );
}

export function StatIcon({ Icon, color }: { Icon: any; color: string }) {
  return (
    <span className="p-3 rounded-xl" style={{ background: color + "30" }}>
      <Icon style={{ color }} className="w-4 h-4 md:w-7 md:h-7 drop-shadow" />
    </span>
  );
}

export function TrendPercent({ percent, isDarkMode }: { percent: number, isDarkMode: boolean }) {
  const Up = <TrendingUp className="text-white inline w-3 h-3 -mt-0.5" />;
  const Down = <TrendingDown className="text-red-500 inline w-3 h-3 -mt-0.5" />;
  if (!percent) return null;
  return (
    <div className={`text-xs font-bold flex flex-col items-center ${percent >= 0 ? "text-chart-1" : "text-red-600"} gap-1`}>
      {percent >= 0 ? Up : Down}
      {percent > 0 ? "+" : ""}
      {percent}%
    </div>
  );
}

export function ProgressCircle({ value }: { value: number;}) {
  return (
    <div className="w-8 h-8">
      <CircularProgressbar
        value={value}
        maxValue={100}
        text={`${Math.round(value / 20)}/5`}
        styles={buildStyles({
          textSize: "30px",
          pathColor: "#fb8500",
          trailColor: "#f50000",
          textColor: "#fb8500",
        })}
      />
    </div>
  );
}