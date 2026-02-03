"use client";
import { Clock, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


interface SlotFormProps {
  dateStr: string;
  newSlot: Record<string, { start: string; end: string }>;
  setNewSlot: React.Dispatch<
    React.SetStateAction<Record<string, { start: string; end: string }>>
  >;
  addCustomSlot: (date: string) => void;
  isDarkMode: boolean;
}

export default function SlotForm({
  dateStr,
  newSlot,
  setNewSlot,
  addCustomSlot,
  isDarkMode,
}: SlotFormProps) {


  /* THEME TOKENS */
  const formBg = isDarkMode ? "bg-zinc-900" : "bg-white";
  const formBorder = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const formHoverBorder = isDarkMode ? "hover:border-chart-2/50" : "hover:border-chart-2/50";
  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-200" : "text-zinc-700";
  const inputBg = isDarkMode ? "bg-zinc-800" : "bg-white";
  const inputBorder = isDarkMode ? "border-zinc-700" : "border-zinc-300";
  const inputText = isDarkMode ? "text-white" : "text-zinc-900";

  return (
    <div className="relative group/form">
      <div className={`relative p-4 ${formBg} border-2 ${formBorder} rounded-2xl ${formHoverBorder} transition-all duration-300`}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-zinc-800 rounded-lg">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <span className={`text-xs font-bold ${textPrimary} uppercase tracking-wider`}>Add Time Slot</span>
        </div>

        {/* Time Inputs */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative group/input">
              <div className="absolute inset-0 bg-chart-2 rounded-xl opacity-0 group-focus-within/input:opacity-20 blur-md transition-opacity"></div>
              <Input
                type="time"
                value={newSlot[dateStr]?.start || ""}
                onChange={(e) =>
                  setNewSlot((prev) => ({
                    ...prev,
                    [dateStr]: { ...prev[dateStr], start: e.target.value },
                  }))
                }
                className={`relative text-sm ${inputBg} border-2 ${inputBorder} ${inputText} focus:border-chart-2 focus:ring-0 rounded-xl transition-all font-semibold`}
              />
            </div>
            
            <span className={`${textSecondary} font-bold text-sm`}>to</span>
            
            <div className="flex-1 relative group/input">
              <div className="absolute inset-0 bg-chart-2 rounded-xl opacity-0 group-focus-within/input:opacity-20 blur-md transition-opacity"></div>
              <Input
                type="time"
                value={newSlot[dateStr]?.end || ""}
                onChange={(e) =>
                  setNewSlot((prev) => ({
                    ...prev,
                    [dateStr]: { ...prev[dateStr], end: e.target.value },
                  }))
                }
                className={`relative text-sm ${inputBg} border-2 ${inputBorder} ${inputText} focus:border-chart-2 focus:ring-0 rounded-xl transition-all font-semibold`}
              />
            </div>
          </div>

          {/* Add Button */}
          <Button
            size="sm"
            onClick={() => addCustomSlot(dateStr)}
            className="group w-full bg-chart-2 text-white text-sm font-bold flex items-center justify-center gap-2 rounded-xl hover:shadow-lg hover:shadow-chart-2/50 transition-all duration-300 py-2.5 relative overflow-hidden"
          >
        
            <PlusCircle className="w-4 h-4 relative" />
            <span className="relative">Add Slot</span>
          </Button>
        </div>
      </div>
    </div>
  );
}