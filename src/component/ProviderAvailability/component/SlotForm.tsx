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
}

export default function SlotForm({
  dateStr,
  newSlot,
  setNewSlot,
  addCustomSlot,
}: SlotFormProps) {
  return (
    <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-gray-500" />
        <span className="text-[12px] font-medium text-gray-700">Add Time Slot</span>
      </div>

      {/* Time Inputs */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Input
            type="time"
            value={newSlot[dateStr]?.start || ""}
            onChange={(e) =>
              setNewSlot((prev) => ({
                ...prev,
                [dateStr]: { ...prev[dateStr], start: e.target.value },
              }))
            }
            className="flex-1 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-400 font-medium">to</span>
          <Input
            type="time"
            value={newSlot[dateStr]?.end || ""}
            onChange={(e) =>
              setNewSlot((prev) => ({
                ...prev,
                [dateStr]: { ...prev[dateStr], end: e.target.value },
              }))
            }
            className="flex-1 text-sm border-gray-300 focus:ring-2 focus:ring-chart-2"
          />
        </div>

        {/* Add Button */}
        <Button
          size="sm"
          onClick={() => addCustomSlot(dateStr)}
          className="w-full text-white text-[12px] flex items-center justify-center"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Slot
        </Button>
      </div>
    </div>
  );
}
