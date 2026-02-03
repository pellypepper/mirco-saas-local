"use client";

import { ArrowLeft} from "lucide-react";

import AvailabilityCalendar from "./component/AvailabilityCalendar";
import About from "./component/About";
import BackgroundDesign from "./component/BackgroundDesign";
import { useMainNavBar } from "@/hooks/MainNavContext";

export function ProviderProfile({
  provider,
  availability,
  onBookClick,
  onBack,
}:  {
  provider: any;
  availability: any[];
  onBookClick: (slot: any) => void;
  onBack: () => void;
}) {
  const groupedSlots = availability.reduce((acc, slot) => {
    const dateKey = slot.date;
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(slot);
    return acc;
  }, {} as Record<string, any[]>);

  const avatarSrc =
    provider.avatar_url && provider.avatar_url.trim() !== ""
      ? provider. avatar_url
      : "https://api.dicebear.com/7.x/initials/svg?seed=" +
        encodeURIComponent(provider.full_name);
const { isDarkMode } = useMainNavBar();
  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-zinc-900" : "bg-white"}`}>
      {/* Sticky Header with Glass Effect */}
      <div className={`${isDarkMode ? "bg-zinc-900/80 border-b-2 border-zinc-800" : "bg-white/80 border-b-2 border-gray-300"} backdrop-blur-xl sticky top-0 z-40 shadow-2xl`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <button
            onClick={onBack}
            className={`group flex items-center gap-3 ${isDarkMode ? "hover:text-white" : "hover:text-chart-2"} text-zinc-400 font-bold transition-all duration-300 hover:gap-4`}
          >
            <div className={`p-2 rounded-xl border-2 ${isDarkMode ? "bg-zinc-800 border-zinc-700 group-hover:border-white " : "bg-white border-gray-300 group-hover:border-chart-2  "}  transition-colors duration-300`}>
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
            </div>
            <span className="">Back to Search</span>
          </button>
        </div>
      </div>

      <div className="max-w-8xl mx-auto py-8 px-4">

        <div className={` rounded-3xl shadow-2xl overflow-hidden mb-8 border-2 ${isDarkMode ? "border-zinc-700 bg-zinc-800" : "border-gray-300 bg-white"}`}>
      
          {/*  Header Design */}
          <BackgroundDesign avatarSrc={avatarSrc} provider={provider} />

          {/* Spacing for floating content */}
          <div className="h-32 md:h-40"></div>

          {/* About Section */}
          <div className="px-4 mt-[180px] md:mt-0 sm:px-8 pb-8">
            <About provider={provider} />
          </div>
        </div>

        {/* Availability Calendar */}
        <AvailabilityCalendar
          groupedSlots={groupedSlots}
          onBookClick={onBookClick}
          availability={availability}
        />
      </div>
    </div>
  );
}