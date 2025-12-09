"use client"

import {  X, Sliders, MapPin, Briefcase, TrendingUp } from "lucide-react";

// Modern Filter Panel Component
const ShowFilter = ({ 
  serviceFilter, 
  setServiceFilter, 
  locationFilter, 
  setLocationFilter, 
  serviceTypes, 
  locations,
  onClose 
}: { 
  serviceFilter: string, 
  setServiceFilter: (value: string) => void, 
  locationFilter: string, 
  setLocationFilter: (value: string) => void, 
  serviceTypes: string[], 
  locations: string[],
  onClose?: () => void 
}) => {
  const activeFilters = [
    serviceFilter !== "All Services" && serviceFilter,
    locationFilter !== "All Locations" && locationFilter
  ].filter(Boolean).length;

  const resetFilters = () => {
    setServiceFilter("All Services");
    setLocationFilter("All Locations");
  };

  return (
    <div className="w-full px-4 py-4 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-gray-200/50 overflow-hidden">
          {/* Elegant Header */}
          <div className="relative bg-gradient-to-r from-chart-2 via-chart-3 to-chart-3 px-8 py-6">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm ring-2 ring-white/30">
                  <Sliders className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl tracking-tight">Advanced Filters</h3>
                  <p className="text-violet-100 text-sm mt-1 flex items-center gap-2">
                    <TrendingUp size={14} />
                    {activeFilters > 0 ? `${activeFilters} active filter${activeFilters > 1 ? 's' : ''}` : 'Refine your search results'}
                  </p>
                </div>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-white/90 hover:text-white hover:bg-white/20 p-2.5 rounded-xl transition-all duration-200 hover:scale-110"
                  aria-label="Close filters"
                >
                  <X size={22} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Service Type Filter */}
              <div className="space-y-3 group">
                <label className="flex items-center justify-between text-sm font-bold text-gray-800 uppercase tracking-wide">
                  <span className="flex items-center gap-2">
                    <Briefcase size={16} className="text-chart-2" />
                    Service Type
                  </span>
                  {serviceFilter !== "All Services" && (
                    <span className="text-xs bg-gradient-to-r from-chart-2 to-chart-3 text-white px-3 py-1 rounded-full font-semibold shadow-lg animate-in zoom-in duration-300">
                      Active
                    </span>
                  )}
                </label>
                <div className="relative">
                  <select
                    className="w-full px-5 py-4 bg-primary-white border-2 border-gray-200 rounded-2xl text-gray-800 font-semibold appearance-none cursor-pointer transition-all duration-300 hover:border-chart-2/60 hover:shadow-lg focus:border-chart-2/60 focus:ring-4 focus:ring-chart-2/30 focus:outline-none group-hover:scale-[1.01]"
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                  >
                    {serviceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 group-hover:translate-y-[-45%]">
                    <svg className="w-5 h-5 text-chart-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Location Filter */}
              <div className="space-y-3 group">
                <label className="flex items-center justify-between text-sm font-bold text-gray-800 uppercase tracking-wide">
                  <span className="flex items-center gap-2">
                    <MapPin size={16} className="text-chart-2" />
                    Location
                  </span>
                  {locationFilter !== "All Locations" && (
                    <span className="text-xs bg-gradient-to-r from-chart-2 to-chart-3 text-white px-3 py-1 rounded-full font-semibold shadow-lg animate-in zoom-in duration-300">
                      Active
                    </span>
                  )}
                </label>
                <div className="relative">
                  <select
                    className="w-full px-5 py-4 bg-primary-white border-2 border-gray-200 rounded-2xl text-gray-800 font-semibold appearance-none cursor-pointer transition-all duration-300 hover:border-chart-2/60 hover:shadow-lg focus:border-chart-2/60 focus:ring-4 focus:ring-chart-2/30 focus:outline-none group-hover:scale-[1.01]"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 group-hover:translate-y-[-45%]">
                    <svg className="w-5 h-5 text-chart-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {activeFilters > 0 && (
              <div className="mt-8 flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 animate-in slide-in-from-bottom duration-300">
                <p className="text-sm text-gray-600 font-medium">
                  Showing filtered results
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-xl hover:from-gray-800 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  <X size={16} />
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowFilter;
