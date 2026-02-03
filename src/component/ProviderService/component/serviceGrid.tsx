"use client";

import { Button } from "@/components/ui/button";
import { Trash2, DollarSign, Clock, Briefcase, Edit2, Sparkles } from "lucide-react";


const ServiceGrid = ({ 
  services, 
  currencies, 
  handleEditService, 
  handleDeleteService ,
  isDarkMode
}: { 
  services: any[]; 
  currencies: {code: string; symbol: string}[]; 
  handleEditService: (service: any) => void; 
  handleDeleteService: (serviceId: string) => void; 
  isDarkMode: boolean;
}) => {
  

  /* THEME TOKENS */
  const cardBg = isDarkMode ? "bg-zinc-800" : "bg-white";
  const cardBorder = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const cardHoverBorder = isDarkMode ? "hover:border-chart-2" : "hover:border-chart-2";
  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-400" : "text-zinc-600";
  const infoBg = isDarkMode ? "bg-zinc-900" : "bg-zinc-50";
  const infoBorder = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const dividerBorder = isDarkMode ? "border-zinc-700" : "border-zinc-300";
  const emptyCardBg = isDarkMode ? "bg-zinc-800" : "bg-white";
  const emptyIconBg = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const emptyIconBorder = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const emptyIconColor = isDarkMode ? "text-zinc-600" : "text-zinc-400";
  const editBtnBg = isDarkMode ? "bg-chart-2" : "bg-chart-2";
  const editBtnHover = isDarkMode ? "hover:bg-chart-2/90" : "hover:bg-chart-2/90";
  const deleteBtnBg = isDarkMode ? "bg-chart-1/20" : "bg-red-50";
  const deleteBtnBorder = isDarkMode ? "border-chart-1/30" : "border-red-200";
  const deleteBtnHover = isDarkMode ? "hover:bg-chart-1/30 hover:border-chart-1" : "hover:bg-red-100 hover:border-red-300";
  const perSessionText = isDarkMode ? "text-gray-300" : "text-zinc-600";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.length === 0 ? (
        <div className={`col-span-full ${emptyCardBg} border-2 ${cardBorder} rounded-3xl shadow-2xl p-16 text-center`}>
          <div className={`inline-flex p-8 ${emptyIconBg} rounded-3xl border-2 ${emptyIconBorder} mb-6`}>
            <Briefcase className={`w-16 h-16 ${emptyIconColor}`} />
          </div>
          <p className={`${textPrimary} text-2xl font-black mb-2`}>No services yet</p>
          <p className={`${textSecondary} text-base font-medium`}>
            Create your first service using the form above to get started
          </p>
        </div>
      ) : (
        services.map((service, index) => {
          const currencyObj = currencies.find(c => c.code === service.currency) || currencies[0];
          return (
            <div
              key={service.id}
              className={`group relative ${cardBg} rounded-3xl shadow-xl border-2 ${cardBorder} overflow-hidden hover:shadow-2xl ${cardHoverBorder} transition-all duration-500 hover:-translate-y-1`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative p-6 space-y-5">
                {/* Service Header */}
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className={`text-xl font-black ${textPrimary} leading-tight group-hover:text-chart-2 transition-colors flex-1`}>
                      {service.title}
                    </h3>
                    <div className={`p-1.5 ${isDarkMode ? 'bg-chart-4/20 border-chart-4/30' : 'bg-chart-4/10 border-chart-4/20'} rounded-lg border`}>
                      <Sparkles className="w-4 h-4 text-chart-4" />
                    </div>
                  </div>
                  {service.description && (
                    <p className={`${textSecondary} text-sm leading-relaxed font-medium`}>
                      {service.description}
                    </p>
                  )}
                </div>
                
                {/* Price & Duration Card */}
                <div className={`relative ${infoBg} border-2 ${infoBorder} rounded-2xl p-5 space-y-4`}>
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-chart-2 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
                  
                  <div className="relative">
                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <div className={`p-2 ${isDarkMode ? 'bg-chart-2/20' : 'bg-chart-2/10'} rounded-lg`}>
                        <DollarSign className="w-5 h-5 text-chart-2" />
                      </div>
                      <span className={`text-4xl font-black ${textPrimary}`}>
                        {currencyObj.symbol}{service.price.toFixed(2)}
                      </span>
                      <span className={`text-sm text-[#008800] font-black px-2 py-1 ${isDarkMode ? 'bg-[#008800]/10 border-[#008800]/30' : 'bg-green-50 border-green-200'} rounded-lg border`}>
                        {service.currency}
                      </span>
                    </div>
                    
                    {/* Duration */}
                    <div className={`flex items-center gap-3 pb-4 border-b ${dividerBorder}`}>
                      <div className={`p-2 ${isDarkMode ? 'bg-chart-1/20' : 'bg-red-50'} rounded-lg`}>
                        <Clock className="w-4 h-4 text-chart-1" />
                      </div>
                      <span className={`font-bold ${textPrimary} text-sm`}>
                        {service.duration_minutes} minutes
                      </span>
                    </div>
                    
                    {/* Per Session Label */}
                    <div className="pt-3">
                      <p className={`${perSessionText} text-xs font-black uppercase tracking-wider`}>
                        Per Session
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button 
                    size="sm"
                    className={`flex-1 h-11 ${editBtnBg} text-white font-bold ${editBtnHover} transition-all rounded-xl`}
                    onClick={() => handleEditService(service)}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    className={`h-11 px-4 ${deleteBtnBg} border-2 ${deleteBtnBorder} text-chart-1 ${deleteBtnHover} font-bold rounded-xl transition-all`}
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ServiceGrid;