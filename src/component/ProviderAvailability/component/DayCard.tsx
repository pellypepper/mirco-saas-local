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
}

export default function DayCard({
  date,
  today,
  daySlots,
  newSlot,
  setNewSlot,
  addCustomSlot,
  removeSlot,
}: DayCardProps) {
  const dateStr = date.toISOString().split("T")[0];
  const slots = daySlots[dateStr] || [];
  const isToday = date.toDateString() === today.toDateString();
  const isPast = date < today && !isToday;

  return (
    <Card
      className={`relative p-0 bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border-2 ${
        isToday 
          ? "border-chart-2/10 hover:shadow-2xl" 
          : isPast
          ? "border-gray-200 opacity-60"
          : "border-gray-200 hover:border-violet-200 hover:shadow-xl"
      }`}
    >
      {/* Gradient Header */}
      <CardHeader className={`relative  p-5  border-b-0 ${
        isToday 
          ? "bg-gradient-to-br from-chart-2/80 to-chart-3/80" 
          : "bg-gradient-to-r from-gray-700 to-gray-800"
      }`}>
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative  flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isToday ? 'bg-white/20' : 'bg-white/10'}`}>
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-white font-bold text-lg">
                {date.toLocaleDateString("en-US", { weekday: "long" })}
              </CardTitle>
              <p className="text-white/80 text-sm mt-0.5">
                {date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
          
          {isToday && (
            <span className="bg-white/30 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/40">
              Today
            </span>
          )}
        </div>

        {/* Slot Count Badge */}
        {slots.length > 0 && (
          <div className="relative mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <Clock size={14} className="text-white" />
            <span className="text-white text-sm font-semibold">
              {slots.length} {slots.length === 1 ? 'slot' : 'slots'}
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-5">
        {/* Add Slot Form */}
        {!isPast && (
          <SlotForm
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
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-2">
                <Clock className="text-gray-400" size={24} />
              </div>
              <p className="text-sm text-gray-400 font-medium">No slots added yet</p>
            </div>
          ) : (
            slots.map((slot) => (
              <div
                key={slot.id}
                className="group flex items-center justify-between bg-gradient-to-br from-chart-2/10 to-chart-3/10 border-2 border-chart-2/10 rounded-xl p-4 transition-all duration-300 hover:shadow-md hover:border-chart-2/10"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-chart-2/20 p-2 rounded-lg">
                    <Clock size={16} className="text-chart-2" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">{slot.label}</span>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeSlot(dateStr, slot.id)}
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-300 opacity-0 group-hover:opacity-100 rounded-lg"
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