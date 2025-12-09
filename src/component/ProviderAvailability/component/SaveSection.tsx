import { Save, Eye, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SaveSectionProps {
  handleSave: () => void;
  getTotalSlots: () => number;
  daySlots: Record<string, any>;
  setShowAvailabilityModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SaveSection({
  handleSave,
  setShowAvailabilityModal,
  getTotalSlots,
  daySlots,
}: SaveSectionProps) {
  const totalSlots = getTotalSlots();
  const totalDays = Object.keys(daySlots).length;

  return (
    <div className="sticky bottom-6 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6 backdrop-blur-sm animate-in slide-in-from-bottom duration-500">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Section - Info */}
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-chart-2/80 to-chart-3/80 p-3 rounded-xl shadow-lg">
            <Calendar size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Ready to Save Your Availability?
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Review your schedule and save when you're ready
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-violet-50 px-3 py-1.5 rounded-lg border border-violet-200">
                <Clock size={14} className="text-chart-2" />
                <span className="text-xs font-bold text-gray-700">
                  {totalSlots} {totalSlots !== 1 ? "Slots" : "Slot"}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200">
                <Calendar size={14} className="text-chart-3" />
                <span className="text-xs font-bold text-gray-700">
                  {totalDays} {totalDays !== 1 ? "Days" : "Day"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <Button
            onClick={() => setShowAvailabilityModal(true)}
            variant="outline"
            size="lg"
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:border-chart-2/50 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <Eye size={18} />
            Preview All
          </Button>
          
          <Button
            onClick={handleSave}
            size="lg"
            className="px-8 py-3 bg-gradient-to-br from-chart-2 to-chart-3 text-white rounded-xl font-bold hover:from-chart-2/90 hover:to-chart-3/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 border-0 hover:scale-105"
          >
            <Save size={18} />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}