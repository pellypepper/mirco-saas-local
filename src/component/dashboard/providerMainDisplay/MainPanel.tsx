"use client";
import {
   Clock, 
  ArrowRight,  Sparkles
} from "lucide-react";
import { CardGlass } from "./Component/CardGlass";
import { useMainNavBar } from "@/hooks/MainNavContext";

export default function MainPanels({ upcoming, quickActions }: any) {

  const { isDarkMode } = useMainNavBar();

  return (
    <div className="grid lg:grid-cols-3 gap-6 mb-10">
      <CardGlass isDarkMode={isDarkMode} className="lg:col-span-2">
        <h2 className={`text-xl font-extrabold flex items-center gap-3 mb-5 ${isDarkMode ? "text-white" : "text-black"}`}>
          <Clock className="w-5 h-5" />
          Today's Appointments
        </h2>
        <div className="space-y-3">
          {upcoming.length === 0 ? (
            <p className={`text-gray-500 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>No appointments today.</p>
          ) : upcoming.map((b: any) => (
            <div
              key={b.id}
              className="p-4 bg-chart-3/10 rounded-xl border border-chart-3/20"
            >
              <p className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>{b.customer?.full_name}</p>
              <p className={`text-sm ${isDarkMode ? "text-chart-2" : "text-chart-2"}`}>{b.services?.title}</p>
            </div>
          ))}
        </div>
      </CardGlass>
      <CardGlass isDarkMode={isDarkMode}>
        <h2 className={`text-xl font-extrabold mb-5 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-black"}`}>
          <Sparkles className="w-5 h-5" />
          Quick Actions
        </h2>
        <div className="space-y-3">
          {quickActions.map((a: any, i: number) => (
        
            <a
              key={i}
              href={a.link}
              className={`hover:bg-chart-3 w-full p-4 bg-chart-2 text-white rounded-xl border border-chart-3/20 flex justify-between hover:scale-[1.02] transition-transform items-center gap-2 shadow-sm`}
            >
              <span className="flex items-center gap-3">
                <a.icon className={`text-white w-5 h-5`} />
                <span className="font-semibold">{a.label}</span>
              </span>
              <ArrowRight className={`text-white w-4 h-4`} />
            </a>
          ))}
        </div>
      </CardGlass>
    </div>
  );
}

