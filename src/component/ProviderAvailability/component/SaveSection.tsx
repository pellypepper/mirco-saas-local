import { Save, Eye, Calendar, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";


interface SaveSectionProps {
  handleSave: () => void;
  getTotalSlots: () => number;
  daySlots: Record<string, any>;
  setShowAvailabilityModal: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
}

export default function SaveSection({
  handleSave,
  setShowAvailabilityModal,
  getTotalSlots,
  daySlots,
  isDarkMode,
}: SaveSectionProps) {

  
  const totalSlots = getTotalSlots();
  const totalDays = Object.keys(daySlots).length;

  /* THEME TOKENS */
  const bgPrimary = isDarkMode ? "bg-zinc-800" : "bg-white";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-300";
  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-400" : "text-zinc-600";
  const statBg = isDarkMode ? "bg-zinc-900" : "bg-zinc-50";
  const statBorder = isDarkMode ? "border-chart-2/30" : "border-chart-2/20";
  const statHoverBorder = isDarkMode ? "hover:border-chart-2" : "hover:border-chart-2/60";
  const previewBg = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const previewHoverBg = isDarkMode ? "hover:bg-zinc-700" : "hover:bg-zinc-200";
  const previewHoverBorder = isDarkMode ? "hover:border-chart-2" : "hover:border-chart-2";

  return (
    <div className={`sticky bottom-6 ${bgPrimary} border-2 ${border} rounded-3xl shadow-2xl p-6 backdrop-blur-xl animate-in slide-in-from-bottom duration-500 transition-colors`}>
      <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Section - Info */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-chart-2 rounded-2xl blur-lg opacity-50"></div>
            <div className="relative p-3 bg-chart-2 rounded-2xl shadow-lg">
              <Calendar size={24} className="text-white" />
            </div>
          </div>
          
          <div>
            <h3 className={`text-xl font-black ${textPrimary} mb-1 flex items-center gap-2`}>
              Ready to Save? 
              <Sparkles size={18} className="text-chart-4" />
            </h3>
            <p className={`text-sm ${textSecondary} mb-3 font-medium`}>
              Review your schedule and save when you're ready
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-3">
              <div className="group relative">
                <div className="absolute inset-0 bg-chart-2 rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity"></div>
                <div className={`relative flex items-center gap-2 ${statBg} border-2 ${statBorder} px-4 py-2 rounded-xl ${statHoverBorder} transition-all`}>
                  <Clock size={14} className="text-chart-2" />
                  <span className={`text-sm font-black ${textPrimary}`}>
                    {totalSlots} {totalSlots !== 1 ? "Slots" : "Slot"}
                  </span>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-chart-4 rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity"></div>
                <div className={`relative flex items-center gap-2 ${statBg} border-2 border-chart-4/30 px-4 py-2 rounded-xl hover:border-chart-4 transition-all`}>
                  <Calendar size={14} className="text-chart-4" />
                  <span className={`text-sm font-black ${textPrimary}`}>
                    {totalDays} {totalDays !== 1 ? "Days" : "Day"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <Button
            onClick={() => setShowAvailabilityModal(true)}
            size="lg"
            className={`px-6 py-3 ${previewBg} border-2 ${border} ${textPrimary} rounded-xl font-bold ${previewHoverBg} ${previewHoverBorder} transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl`}
          >
            <Eye size={18} />
            Preview All
          </Button>
          
          <Button
            onClick={handleSave}
            size="lg"
            className="group relative px-8 py-3 bg-chart-2 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#730071]/50 flex items-center justify-center gap-2 border-0 hover:scale-105 overflow-hidden"
          >
          
            <Save size={18} className="relative" />
            <span className="relative">Save Changes</span>
          </Button>
        </div>
      </div>
    </div>
  );
}