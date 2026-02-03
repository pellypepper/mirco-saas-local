"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Award,  ArrowRight, Verified } from "lucide-react";
import Image from "next/image";
import { useMainNavBar } from "@/hooks/MainNavContext";

const ProviderGrid = ({
  filteredProviders,
  onSelectProvider,
}: {
  filteredProviders: any[];
  onSelectProvider: (provider: any) => void;
}) => {
  const { isDarkMode } = useMainNavBar();



  return (
    <div className={`rounded-3xl mx-auto px-6 py-12 ${isDarkMode ? "bg-zinc-900" : "bg-white"}`}>
      {/* Header with Gradient Underline */}
      <div className="mb-10">
        <h2 className={`text-xl md:text-3xl font-black ${isDarkMode ? "text-white" : "text-black"} mb-2`}>Available Providers</h2>
        <div className="flex items-center gap-3">
          <div className="h-1 w-10 md:w-20 bg-chart-2 rounded-full"></div>
          <p className={`text-zinc-400 font-medium text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            <span className="text-chart-2 font-bold text-base ">{filteredProviders.length}</span> service providers ready to help
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((p) => {
          const avatarSrc =
            p.avatar_url && p.avatar_url.trim() !== ""
              ? p. avatar_url
              : "https://api.dicebear.com/7.x/initials/svg?seed=" +
                encodeURIComponent(p.full_name);
         

          return (
            <div
              key={p.id}
              className={`group relative rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border hover:border-chart-3/10 hover:-translate-y-2 ${isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-300"}`}
              onClick={() => onSelectProvider(p)}
            >
    

              {/* Avatar Section with Diagonal Split */}
              <div className="relative h-48 bg-gradient-to-br from-zinc-700 to-zinc-800 overflow-hidden">
                {/* Diagonal accent */}
                <div className="absolute  inset-0 bg-chart-3/20"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-chart-3 opacity-30 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-chart-3 opacity-30 rounded-full -ml-12 -mb-12"></div>

                {/* Avatar */}
                <div className="absolute top-0  left-1/2  transform -translate-x-1/2 translate-y-1/2">
                  <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-4 border-zinc-800 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Image
                      src={avatarSrc}
                      alt={`${p.full_name} avatar`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    {/* Verified badge overlay */}
                    <div className="absolute bottom-1 right-1 bg-chart-3 rounded-full p-1">
                      <Verified size={12} className="text-white" fill="white" />
                    </div>
                  </div>
                </div>

      
           
              </div>

              {/* Content */}
              <div className="relative flex flex-col items-start px-6 pt-16 pb-6">
                {/* Name */}
                <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"} mb-3 text-center group-hover:text-chart-2 transition-colors duration-300`}>
                  {p. full_name}
                </h3>

                {/* Service Type Tag */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className={`border px-4 py-2 rounded-xl ${isDarkMode ? "border-chart-2/20" : "border-chart-2/20"}`}>
                    <div className="flex items-center gap-2">
                      <Award size={14} className={isDarkMode ? "text-chart-2" : "text-chart-2"} />
                      <span className={`text-sm font-bold ${isDarkMode ? "text-chart-2" : "text-chart-2"}`}>{p.service_type}</span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className={`flex items-center justify-center gap-2 text-sm mb-6 ${isDarkMode ? "text-white/80" : "text-zinc-400"}`}>
                  <MapPin size={14} className={isDarkMode ? "text-white" : "text-chart-2"} />
                  <span className={`${isDarkMode ? "text-white/80" : "text-zinc-700"}`}>{p.country}</span>
                </div>

                {/* Bio */}
                <div className={` rounded-xl p-4 mb-6 border ${isDarkMode ? "border-chart-2/20 bg-chart-3/20" : "border-chart-2/20 bg-chart-3/20" } `}>
                  <p className={`${isDarkMode ? "text-white/80" : "text-black"} text-sm line-clamp-3 leading-relaxed`}>
                    {p.bio || "Experienced professional ready to provide exceptional service. "}
                  </p>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full bg-chart-2 hover:chart-3 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-chart-3/40 transition-all duration-300 group/btn"
                  type="button"
                >
                  <span className="flex items-center justify-center gap-2">
                    View Full Profile
                    <ArrowRight
                      size={18}
                      className="group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </Button>
              </div>

              {/* Bottom accent line */}
                     </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProviderGrid;