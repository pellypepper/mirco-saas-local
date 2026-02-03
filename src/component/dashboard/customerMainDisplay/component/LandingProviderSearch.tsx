"use client"
import { useState } from "react";
import { Search, Filter} from "lucide-react";

import ProviderGrid from "./ProviderGrid";
import ShowFilter from "./ShowFilter";
import Loader from "@/component/Spinner";
import { useMainNavBar } from "@/hooks/MainNavContext";

export function LandingProviderSearch({ providers, loading, onSelectProvider }: { providers: any[], loading:  boolean, onSelectProvider: (provider: any) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [showFilters, setShowFilters] = useState(false);
  const { isDarkMode } = useMainNavBar();

  const serviceTypes = ["All Services", ... Array.from(new Set(providers. map(p => p.service_type)))];
  const locations = ["All Locations", ...Array.from(new Set(providers.map(p => p.country)))];

  const filteredProviders = providers.filter(p => {
    const matchesSearch = p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.service_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = serviceFilter === "All Services" || p.service_type === serviceFilter;
    const matchesLocation = locationFilter === "All Locations" || p.country === locationFilter;
    return matchesSearch && matchesService && matchesLocation;
  });

  const activeFilterCount = [
    serviceFilter !== "All Services",
    locationFilter !== "All Locations"
  ].filter(Boolean).length;

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-zinc-900" : "bg-white"}`}>
      {/* Hero Section */}
      <div className={`relative ${isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"} py-20 px-4 md:px-8 mb-8 overflow-hidden`}>
        
   
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
       

            {/* Main Heading  */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className={`block ${isDarkMode ? "text-white" : "text-black"}`}>Find Your Perfect</span>
              <span className="block mt-2">
                <span className="text-chart-2">Service </span>
                <span className="text-chart-2">Provider</span>
              </span>
            </h1>
            
            <p className={`text-md md:text-xl ${isDarkMode ? "text-gray-400" : "text-zinc-700"} font-medium max-w-2xl mx-auto`}>
              Connect with elite professionals for exceptional service experiences
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch max-w-5xl mx-auto">
            {/* Search Input */}
            <div className="relative flex-grow group">
              <div className="absolute inset-0 bg-gradient-to-r from-chart-2 to-chart-3 rounded-2xl opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-chart-2 transition-colors duration-300 z-10" size={22} />
                <input
                  type="text"
                  placeholder="Search providers, services, specialties..."
                  className={`w-full pl-14 pr-6 py-5 rounded-2xl  font-medium border-2 ${isDarkMode ? "border-zinc-700 text-white bg-zinc-800 placeholder:text-gray-500" : "border-gray-300 bg-white placeholder:text-gray-700 text-black"} focus:outline-none focus:border-chart-2 transition-all duration-300 placeholder:text-zinc-500 hover:bg-zinc-750 relative`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e. target.value)}
                />
              </div>
            </div>
            
            {/* Filter Button with Counter Badge */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="relative px-8 py-5 bg-chart-2 text-white font-bold rounded-2xl hover:shadow-chart-2 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <span className="relative flex items-center gap-3">
                <Filter
                  className={`transition-all duration-500 ${showFilters ? "rotate-180 scale-110" : ""}`}
                  size={20}
                />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-zinc-900 text-white text-xs font-black px-3 py-1 rounded-full border-2 border-zinc-900 shadow-lg animate-pulse">
                    {activeFilterCount}
                  </span>
                )}
              </span>
            </button>
          </div>

      
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <ShowFilter 
          serviceFilter={serviceFilter} 
          setServiceFilter={setServiceFilter} 
          locationFilter={locationFilter} 
          setLocationFilter={setLocationFilter} 
          serviceTypes={serviceTypes} 
          locations={locations}
          onClose={() => setShowFilters(false)}
        /> 
      )}

      {/* Providers Grid */}
      <div className="mx-auto px-4 ">
        <div className="text-gray-500">
          {loading ?  (
            <Loader message="Loading Providers" />
          ) : (
            <ProviderGrid filteredProviders={filteredProviders} onSelectProvider={onSelectProvider} />
          )}
        </div>
      </div>
    </div>
  );
}