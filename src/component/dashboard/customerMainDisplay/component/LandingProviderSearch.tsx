"use client"
import { useState } from "react";

import { Search,Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProviderGrid from "./ProviderGrid";
import ShowFilter from "./ShowFilter";
import Loader from "@/component/Spinner";

export function LandingProviderSearch({ providers, loading,  onSelectProvider }: { providers: any[], loading: boolean, onSelectProvider: (provider: any) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [showFilters, setShowFilters] = useState(false);

  const serviceTypes = ["All Services", ...Array.from(new Set(providers.map(p => p.service_type)))];
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
    <div className="min-h-screen">
      {/* Hero Section*/}
      <div className="relative bg-gradient-to-br from-chart-2/10 via-chart-3/10 to-chart-3/10 rounded-3xl text-dark py-16 px-4 md:px-8 mb-6 overflow-hidden">

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzkzMzNlYSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-chart-2 via-chart-3 to-chart-2 bg-clip-text text-transparent leading-tight">
              Find Your Perfect Service Provider
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 font-medium">
              Connect with experienced professionals for your wellness journey
            </p>
          </div>
          
          {/*  Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center max-w-4xl mx-auto">
            {/* Search Input */}
            <div className="relative flex-grow group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-chart-2 transition-colors duration-300" size={22} />
              <input
                type="text"
                placeholder="Search by name or service..."
                className="w-full pl-14 pr-6 py-5 rounded-2xl text-gray-900 font-medium bg-white shadow-xl border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-chart-2 focus:border-chart-2 transition-all duration-300 placeholder:text-gray-400 hover:shadow-2xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="relative px-8 py-5 bg-gradient-to-r from-chart-2 to-chart-3 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-chart-2 to-chart-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-white text-chart-2 text-xs font-black px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </span>
              <Filter
                className={`relative transition-transform duration-500 ${showFilters ? "rotate-180" : ""}`}
                size={20}
              />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-violet-100">
              <span className="font-semibold text-gray-700">
                {filteredProviders.length} {filteredProviders.length === 1 ? 'Service Provider' : 'Service Providers'} Found
              </span>
            </div>
            {activeFilterCount > 0 && (
              <div className="bg-gradient-to-r from-chart-2 to-chart-3 text-white px-6 py-3 rounded-full shadow-lg font-semibold animate-in zoom-in duration-300">
                {activeFilterCount} {activeFilterCount === 1 ? 'Filter' : 'Filters'} Active
              </div>
            )}
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

      {/* Providers Grid  */}
      <div className=" mx-auto px-4 py-8">
        <div className=" text-gray-500">
          {loading ? (
            <Loader message="Loading Providers" />
          ) : (
            <ProviderGrid filteredProviders={filteredProviders} onSelectProvider={onSelectProvider} />
          )}
        </div>
      </div>
    </div>
  );
}
