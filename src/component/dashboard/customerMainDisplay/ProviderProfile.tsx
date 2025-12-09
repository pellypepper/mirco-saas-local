"use client";

import { MapPin,   Award,  CheckCircle,  ArrowLeft } from "lucide-react";
import Image from "next/image";
import AvailabilityCalendar from "./component/AvailabilityCalendar";
import About from "./component/About";

export function ProviderProfile({ 
  provider, 
  availability, 
  onBookClick, 
  onBack 
}: { 
  provider: any, 
  availability: any[], 
  onBookClick: (slot: any) => void, 
  onBack: () => void 
}) {
  const groupedSlots = availability.reduce((acc, slot) => {
    const dateKey = slot.date;
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(slot);
    return acc;
  }, {} as Record<string, any[]>);

  const avatarSrc =
    provider.avatar_url && provider.avatar_url.trim() !== ""
      ? provider.avatar_url
      : "https://api.dicebear.com/7.x/initials/svg?seed=" +
        encodeURIComponent(provider.full_name);

  return (
    <div className="min-h-screen ">
      {/* Header Navigation */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Search
          </button>
        </div>
      </div>

      <div className=" mx-auto py-8">
        {/* Hero Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 border border-gray-100">
          {/* Cover Section with Avatar */}
          <div className="relative">
            {/* Gradient Background */}
            <div className="h-64 bg-gradient-to-br from-chart-2/80 to-chart-3/80 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              {/* Decorative Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Profile Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-6 transform translate-y-1/2">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="md:w-40 md:h-40 w-25 h-25 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                    <Image
                      unoptimized
                      src={avatarSrc}
                      alt={provider.full_name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Verification Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-chart-2 rounded-full p-2 border-4 border-white shadow-lg">
                    <CheckCircle size={15} className="text-white" />
                  </div>
                </div>

                {/* Name and Quick Info */}
                <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl border border-gray-100">
                  <h1 className="md:text-4xl text-2xl font-bold text-gray-900 mb-3">
                    {provider.full_name.toUpperCase()}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-lg border border-indigo-100">
                      <Award size={18} className="text-chart-2" />
                      <span className="font-semibold text-[12px] text-chart-2">
                        {provider.service_type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg border border-purple-100">
                      <MapPin size={18} className="text-purple-600" />
                      <span className="font-medium text-[12px] text-purple-900">
                        {provider.location}{provider.country ? `, ${provider.country}` : ""}
                      </span>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spacing for overlay */}
          <div className="md:h-24 h-50"></div>

          {/* About Section */}
          
          <About provider={provider} />
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