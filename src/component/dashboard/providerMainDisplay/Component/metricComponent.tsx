"use client";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
 TrendingUp, TrendingDown,

} from "lucide-react";


export function CardGradient({ children }: { children: any }) {
  return (
    <div className="cursor-pointer rounded-2xl p-4 md:p-5 bg-primary-white shadow-lg border border-gray-100 hover:scale-[1.03] transition-all duration-150 backdrop-blur-sm">
      {children}
    </div>
  );
}

export function StatIcon({ Icon, color }: { Icon: any; color: string }) {
  return (
    <span className="p-3 rounded-xl" style={{ background: color + "20" }}>
      <Icon style={{ color }} className="w-4 h-4 md:w-7 md:h-7 drop-shadow" />
    </span>
  );
}

export function TrendPercent({ percent }: { percent: number }) {
  const Up = <TrendingUp className="text-chart-2 inline w-3 h-3 -mt-0.5" />;
  const Down = <TrendingDown className="text-red-500 inline w-3 h-3 -mt-0.5" />;
  if (!percent) return null;
  return (
    <div className={`text-xs font-bold flex flex-col items-center ${percent >= 0 ? "text-chart-2" : "text-red-600"} gap-1`}>
      {percent >= 0 ? Up : Down}
      {percent > 0 ? "+" : ""}
      {percent}%
    </div>
  );
}

export function ProgressCircle({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-8 h-8">
      <CircularProgressbar
        value={value}
        maxValue={100}
        text={`${Math.round(value / 20)}/5`}
        styles={buildStyles({
          textSize: "26px",
          pathColor: color,
          trailColor: "#eee",
          textColor: color,
        })}
      />
    </div>
  );
}