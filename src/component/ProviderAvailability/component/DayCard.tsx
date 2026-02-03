"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimeSlot } from "@/types/type";
import SlotForm from "./SlotForm";


interface DayCardProps {
  date: Date;
  today: Date;
  daySlots: Record<string, TimeSlot[]>;
  newSlot: Record<string, { start: string; end: string }>;
  setNewSlot: React.Dispatch<
    React.SetStateAction<Record<string, { start: string; end: string }>>
  >;
  addCustomSlot: (date: string) => void;
  removeSlot: (date: string, id: string) => void;
  isDarkMode: boolean;
}

export default function DayCard({
  date,
  today,
  daySlots,
  newSlot,
  setNewSlot,
  addCustomSlot,
  removeSlot,
  isDarkMode,
}: DayCardProps) {

  
  const dateStr = date.toISOString().split("T")[0];
  const slots = daySlots[dateStr] || [];
  const isToday = date.toDateString() === today.toDateString();
  const isPast = date < today && !isToday;

  /* THEME TOKENS */
  const cardBg = isDarkMode ? "bg-chart-2/20" : "bg-white";
  const cardBorder = isToday 
    ? "border-chart-2/20 hover:shadow-2xl hover:border-chart-2/70" 
    : isPast
    ? isDarkMode ? "border-zinc-700" : "border-zinc-300"
    : isDarkMode ? "border-zinc-700 hover:border-chart-4/20" : "border-zinc-200 hover:border-chart-2/20";
  
  const headerBg = isToday 
    ? "bg-chart-2" 
    : isDarkMode ? "bg-zinc-700" : "bg-zinc-700";
  
  const slotBg = isDarkMode ? "bg-zinc-900" : "bg-zinc-50";
  const slotBorder = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const slotHoverBorder = isDarkMode ? "hover:border-chart-2" : "hover:border-chart-2";
  
  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-500" : "text-zinc-600";
  const textMuted = isDarkMode ? "text-zinc-600" : "text-zinc-400";
  
  const emptyIconBg = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const emptyIconBorder = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const emptyIconColor = isDarkMode ? "text-zinc-600" : "text-zinc-400";

  return (
    <Card
      className={`relative p-0 ${cardBg} rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border-2 ${cardBorder} ${
        isPast ? "opacity-60" : ""
      }`}
    >
      {/* Gradient Header */}
      <CardHeader className={`relative p-5 border-b-0 ${headerBg}`}>
        {/* Decorative Pattern Overlay */}
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] ${
          isToday ? "opacity-20" : isDarkMode ? "opacity-10" : "opacity-5"
        }`}></div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${
              isToday 
                ? 'bg-white/30 border-white/30' 
                : isDarkMode 
                ? 'bg-white/20 border-white/30' 
                : 'bg-white/50 border-zinc-300'
            } backdrop-blur-sm border`}>
              <Calendar className={`w-5 h-5 ${isToday || isDarkMode ? 'text-white' : 'text-zinc-700'}`} />
            </div>
            <div>
              <CardTitle className={`font-black text-base md:text-lg ${
                isToday || isDarkMode ? 'text-white' : 'text-white'
              }`}>
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </CardTitle>
              <p className={`text-xs md:text-sm font-medium ${
                isToday 
                  ? 'text-white/90' 
                  : isDarkMode 
                  ? 'text-white/90' 
                  : 'text-white'
              }`}>
                {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            </div>
          </div>
          
          {isToday && (
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50 animate-pulse"></div>
              <span className="relative bg-white text-chart-2 text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                Today
              </span>
            </div>
          )}
        </div>

        {/* Slot Count */}
        {slots.length > 0 && (
          <div className={`relative mt-3 inline-flex items-center gap-2 backdrop-blur-sm px-3 py-1.5 rounded-full border ${
            isToday 
              ? 'bg-white/20 border-white/30' 
              : isDarkMode 
              ? 'bg-white/20 border-white/30' 
              : 'bg-white/60 border-zinc-300'
          }`}>
            <Clock size={12} className={isToday || isDarkMode ? 'text-white' : 'text-zinc-700'} />
            <span className={`text-xs font-bold ${isToday || isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              {slots.length} {slots.length === 1 ? 'slot' : 'slots'}
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent className="relative p-5 space-y-4">
        {/* Add Slot Form */}
        {!isPast && (
          <SlotForm
               isDarkMode={isDarkMode}
            dateStr={dateStr}
            newSlot={newSlot}
            setNewSlot={setNewSlot}
            addCustomSlot={addCustomSlot}
          />
        )}

        {/* Time Slots */}
        <div className="space-y-2">
          {slots.length === 0 ? (
            <div className="text-center py-8">
              <div className={`inline-flex p-4 ${emptyIconBg} rounded-full border-2 ${emptyIconBorder} mb-3`}>
                <Clock className={emptyIconColor} size={24} />
              </div>
              <p className={`text-sm ${textSecondary} font-medium`}>No slots yet</p>
            </div>
          ) : (
            slots.map((slot, index) => (
              <div
                key={slot.id}
                className={`group/slot relative flex items-center justify-between ${slotBg} border-2 ${slotBorder} rounded-xl p-4 transition-all duration-300 ${slotHoverBorder} hover:shadow-lg`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-chart-2 opacity-0 group-hover/slot:opacity-5 rounded-xl transition-opacity"></div>
                
                <div className="relative flex items-center gap-3">
                  <div className={`p-2 ${isDarkMode ? 'bg-chart-2/20 border-chart-2/30' : 'bg-chart-2/10 border-chart-2/20'} rounded-lg border`}>
                    <Clock size={14} className="text-chart-2" />
                  </div>
                  <span className={`text-sm font-bold ${textPrimary}`}>{slot.label}</span>
                </div>
                
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeSlot(dateStr, slot.id)}
                  className={`relative ${textMuted} hover:text-red-400 ${
                    isDarkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'
                  } transition-all duration-300 opacity-0 group-hover/slot:opacity-100 rounded-lg`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}