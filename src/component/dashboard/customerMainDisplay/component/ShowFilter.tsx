"use client";

import { X, Sliders, MapPin, Briefcase, RotateCcw, Sparkles } from "lucide-react";
import { useMainNavBar } from "@/hooks/MainNavContext";

const ShowFilter = ({
  serviceFilter,
  setServiceFilter,
  locationFilter,
  setLocationFilter,
  serviceTypes,
  locations,
  onClose,
}: {
  serviceFilter:  string;
  setServiceFilter:  (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  serviceTypes:  string[];
  locations: string[];
  onClose?:  () => void;
}) => {
  const activeFilters = [
    serviceFilter !== "All Services" && serviceFilter,
    locationFilter !== "All Locations" && locationFilter,
  ].filter(Boolean).length;

  const resetFilters = () => {
    setServiceFilter("All Services");
    setLocationFilter("All Locations");
  };

  const { isDarkMode } = useMainNavBar();

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Filter Panel */}
      <div className="relative w-full max-w-2xl animate-in slide-in-from-top duration-500">
        <div className={`rounded-3xl overflow-hidden ${isDarkMode ? "bg-zinc-800 border-zinc-700 shadow-2xl" : "bg-white border-gray-300 shadow-lg"}`}>
          
          {/* Header with Geometric Design */}
          <div className="relative bg-chart-2 px-8 py-6 ">
            {/* Background accent shapes */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-chart-2 opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-chart-3 opacity-10 rounded-full blur-3xl"></div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Icon with animated border */}
                <div className="relative">
                  <div className="absolute inset-0 bg-chart-2 rounded-2xl blur-md opacity-50 animate-pulse"></div>
                  <div className="relative bg-chart-2 p-3 rounded-2xl">
                    <Sliders className={`${isDarkMode ? "text-white" : "text-white"}`} size={24} />
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-black text-2xl tracking-tight flex items-center gap-2">
                    Filter 
                    <Sparkles size={20} className="text-chart-2" />
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    {activeFilters > 0
                      ? `${activeFilters} filter${activeFilters > 1 ? "s" :  ""} applied`
                      : "Refine your search results"}
                  </p>
                </div>
              </div>

              {onClose && (
                <button
                  onClick={onClose}
                  className="text-white hover:text-white hover:bg-zinc-700 p-2.5 rounded-xl transition-all duration-200 hover:rotate-90 border border-zinc-200 hover:border-chart-2"
                  aria-label="Close filters"
                >
                  <X size={22} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Content */}
          <div className="p-8">
            <div className="grid gap-6">
              {/* Service Type Filter */}
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className={`flex items-center gap-3 text-sm font-bold ${isDarkMode ? "text-white" : "text-black"} uppercase tracking-wider`}>
                    <div className="p-2 bg-chart-2 rounded-lg border border-chart-2/30">
                      <Briefcase size={16} className={`${isDarkMode ? "text-white" : "text-white"}`} />
                    </div>
                    Service Type
                  </span>
                  {serviceFilter !== "All Services" && (
                    <span className={`flex items-center gap-1.5 text-xs bg-chart-3 text-white px-3 py-1.5 rounded-full font-bold shadow-lg animate-in zoom-in duration-300`}>
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      Active
                    </span>
                  )}
                </label>

                <div className="relative group">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-chart-2 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                  
                  <select
                    className={`relative w-full px-5 py-4 ${isDarkMode ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-gray-300 text-black"} border rounded-2xl font-semibold appearance-none cursor-pointer transition-all duration-300 hover:border-chart-2 focus:border-chart-2 focus:outline-none focus: ring-4 focus:ring-chart-2/20`}
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target. value)}
                  >
                    {serviceTypes.map((type) => (
                      <option key={type} value={type} className={`${isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"}`}>
                        {type}
                      </option>
                    ))}
                  </select>

                  {/* Custom arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-chart-2"></div>
                  </div>
                </div>
              </div>

              {/* Location Filter */}
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className={`flex items-center gap-3 text-sm font-bold ${isDarkMode ? "text-white" : "text-black"} uppercase tracking-wider`}>
                    <div className="p-2 bg-chart-2 rounded-lg border border-chart-2/30">
                      <MapPin size={16} className={`${isDarkMode ? "text-white" : "text-white"}`} />
                    </div>
                    Location
                  </span>
                  {locationFilter !== "All Locations" && (
                    <span className={`flex items-center gap-1.5 text-xs bg-chart-3 text-white px-3 py-1.5 rounded-full font-bold shadow-lg animate-in zoom-in duration-300`}>
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      Active
                    </span>
                  )}
                </label>

                <div className="relative group">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-chart-2 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                  
                  <select
                    className={`relative w-full px-5 py-4 ${isDarkMode ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-gray-300 text-black"} border-2 rounded-2xl font-semibold appearance-none cursor-pointer transition-all duration-300 hover:border-chart-2 focus:border-chart-2 focus:outline-none focus:ring-4 focus:ring-chart-2/20`}
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc} className={`${isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"}`}>
                        {loc}
                      </option>
                    ))}
                  </select>

                  {/* Custom arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-chart-3"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {activeFilters > 0 && (
              <div className={`mt-8 ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-gray-300"} border-2 rounded-2xl p-6 animate-in slide-in-from-bottom duration-300`}>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse"></div>
                    <p className={`text-sm ${isDarkMode ? "text-zinc-300" : "text-zinc-700"} font-semibold`}>
                      Showing filtered results
                    </p>
                  </div>

                  <button
                    onClick={resetFilters}
                    className="group/reset px-6 py-3 bg-chart-2 hover:bg-chart-3 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(235,115,35,0.3)] hover:scale-105 flex items-center gap-2 border-2 border-zinc-600 hover:border-transparent"
                  >
                    <RotateCcw
                      size={16}
                      className="group-hover/reset:rotate-180 transition-transform duration-500"
                    />
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowFilter;