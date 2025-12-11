"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Award, Heart } from "lucide-react";
import Image from "next/image";

const ProviderGrid = ({
  filteredProviders,
  onSelectProvider,
}: {
  filteredProviders: any[];
  onSelectProvider: (provider: any) => void;
}) => {
  const [favorited, setFavorited] = useState<Set<string>>(new Set());

  const toggleFavorite = (e: React.MouseEvent, providerId: string) => {
    e.stopPropagation();
    setFavorited((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(providerId)) {
        newSet.delete(providerId);
      } else {
        newSet.add(providerId); 
      }
      return newSet;
    });
  };
  return (
    <div className="bg-primary-white mt-6 rounded-xl mx-auto px-5 py-12">
      <div className="mb-6 text-gray-600">
        Found{" "}
        <span className="font-semibold text-chart-2">
          {filteredProviders.length}
        </span>{" "}
       service providers
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((p) => {
          const avatarSrc =
            p.avatar_url && p.avatar_url.trim() !== ""
              ? p.avatar_url
              : "https://api.dicebear.com/7.x/initials/svg?seed=" +
                encodeURIComponent(p.full_name);
      const isFavorited = favorited.has(p.id);
 
          return ( 
            <div 
              key={p.id} 
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border-2 border-chart-2/15 hover:border-chart-2/40 hover:-translate-y-2"
              onClick={() => onSelectProvider(p)} 
            > 
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-chart-2/0 via-chart-3/0 to-chart-2/0 group-hover:from-violet-chart-2/5 group-hover:via-chart-3/5 group-hover:to-chart-2/5 transition-all duration-500 pointer-events-none"></div>

              {/* Favorite Button */}
              <button
                onClick={(e) => toggleFavorite(e, p.id)}
                className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 group/fav"
              >
                <Heart 
                  size={18} 
                  className={`transition-all duration-300 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/fav:text-red-400'}`}
                />
              </button>

              {/* Avatar Header with Gradient Background */} 
              <div className="relative bg-gradient-to-br from-chart-2/80 to-chart-3/80 p-8 text-center overflow-hidden"> 
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative w-28 h-28 bg-white rounded-full mx-auto flex items-center justify-center shadow-2xl ring-4 ring-white/50 group-hover:scale-110 transition-transform duration-500"> 
                      <Image
                    src={avatarSrc}
                    alt={`${p.full_name} avatar`}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                      unoptimized
                  />
                </div>

                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm flex items-center gap-1">
                  <Star size={14} fill="currentColor" />
                  {p.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {p.full_name}
                </h3>
                <div className="flex items-center gap-2 text-chart-2 font-medium mb-2">
                  <Award size={16} />
                  {p.service_type}
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <MapPin size={14} />
                  {p.country}
                </div>
              <div className="text-gray-600 text-sm mb-4">
  <p className="font-semibold mb-1">Bio</p>
  <p className="line-clamp-2">{p.bio || "No bio available"}</p>
</div>


                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {/* <div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${p.hourly_rate}
                    </div>
                    <div className="text-xs text-gray-500">per hour</div>
                  </div> */}
             
                   <Button className=""   type="submit" >View Profile </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProviderGrid;
