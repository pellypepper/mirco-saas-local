"use client";

import { Plus, Clock, Edit2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const ServiceMain = ({  
  handleAddService,
  serviceName,
  setServiceName,
  servicePrice,
  setServicePrice,
  serviceDescription,
  setServiceDescription,
  editingId,
  serviceCurrency,
  setServiceCurrency,
  serviceDuration,
  setServiceDuration,
  selectedCurrency,
  currencies,
  cancelEdit,
  isDarkMode,
} : {
  handleAddService: () => void;
  serviceName: string;
  setServiceName: (name: string) => void;
  servicePrice: string;
  setServicePrice: (price: string) => void;
  serviceDescription: string;
  setServiceDescription: (description: string) => void;
  editingId: string | null;
  serviceCurrency: string;
  setServiceCurrency: (currency: string) => void;
  serviceDuration: string;
  setServiceDuration: (duration: string) => void;
  currencies: {code: string; symbol: string}[];
  selectedCurrency: {code: string; symbol: string};
  cancelEdit: () => void;
  isDarkMode: boolean;
}) => {


  /* THEME TOKENS */
  const bgPrimary = isDarkMode ? "bg-zinc-800" : "bg-white";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-500" : "text-zinc-600";
  const inputBg = isDarkMode ? "bg-zinc-900" : "bg-zinc-50";
  const inputBorder = isDarkMode ? "border-zinc-700" : "border-zinc-300";
  const inputText = isDarkMode ? "text-white" : "text-zinc-900";
  const inputPlaceholder = isDarkMode ? "placeholder:text-zinc-500" : "placeholder:text-zinc-400";
  const selectBg = isDarkMode ? "bg-zinc-900" : "bg-white";
  const cancelBtnBg = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const cancelBtnBorder = isDarkMode ? "border-zinc-700" : "border-zinc-300";
  const cancelBtnHover = isDarkMode ? "hover:bg-zinc-700 hover:border-zinc-600" : "hover:bg-zinc-200 hover:border-zinc-400";
  const disabledBg = isDarkMode ? "bg-zinc-900" : "bg-zinc-200";
  const disabledBorder = isDarkMode ? "border-zinc-700" : "border-zinc-300";
  const disabledText = isDarkMode ? "text-zinc-600" : "text-zinc-400";

  return (
    <div className={`${bgPrimary} border-2 ${border} rounded-3xl shadow-2xl overflow-hidden transition-colors duration-300`}>
      {/* Header */}
      <div className={`relative bg-chart-2 px-8 py-6 border-b-2 ${border}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <h2 className="relative text-2xl font-black text-white flex items-center gap-3">
          {editingId ? (
            <>
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <Edit2 className="w-5 h-5 text-white" />
              </div>
              <span>Edit Service</span>
            </>
          ) : (
            <>
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <span>Add New Service</span>
            </>
          )}
        </h2>
      </div>
      
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Service Name */}
          <div className="space-y-3">
            <label className={`text-sm font-bold ${textPrimary} flex items-center gap-2 uppercase tracking-wider`}>
              <div className="w-1 h-4 bg-chart-2 rounded-full"></div>
              Service Name
              <span className="text-chart-2">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-chart-2 rounded-xl opacity-0 group-focus-within:opacity-20 blur-md transition-opacity"></div>
              <Input
                placeholder="e.g., Initial Consultation"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className={`relative h-12 text-base ${inputBg} border-2 ${inputBorder} ${inputText} ${inputPlaceholder} focus:border-chart-2 focus:ring-0 rounded-xl font-semibold`}
              />
            </div>
          </div>
          
          {/* Service Price */}
          <div className="space-y-3">
            <label className={`text-sm font-bold ${textPrimary} flex items-center gap-2 uppercase tracking-wider`}>
              <div className="w-1 h-4 bg-chart-2 rounded-full"></div>
              Service Price
              <span className="text-chart-2">*</span>
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1 group">
                <div className="absolute inset-0 bg-chart-2 rounded-xl opacity-0 group-focus-within:opacity-20 blur-md transition-opacity"></div>
                <span className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${textSecondary} font-black text-lg z-10`}>
                  {selectedCurrency.symbol}
                </span>
                <Input
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  value={servicePrice}
                  onChange={e => setServicePrice(e.target.value)}
                  className={`relative pl-10 h-12 text-base ${inputBg} border-2 ${inputBorder} ${inputText} ${inputPlaceholder} focus:border-[#730071] focus:ring-0 rounded-xl font-semibold`}
                />
              </div>
              <select
                value={serviceCurrency}
                onChange={e => setServiceCurrency(e.target.value)}
                className={`h-12 rounded-xl px-4 border-2 ${inputBorder} ${selectBg} ${textPrimary} font-bold focus:border-[#730071] focus:ring-0 outline-none transition-all`}
              >
                {currencies.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Duration */}
          <div className="space-y-3">
            <label className={`text-sm font-bold ${textPrimary} flex items-center gap-2 uppercase tracking-wider`}>
              <div className="w-1 h-4 bg-chart-2 rounded-full"></div>
              Duration
              <span className="text-chart-2">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-chart-2 rounded-xl opacity-0 group-focus-within:opacity-20 blur-md transition-opacity"></div>
              <Clock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${textSecondary} z-10`} />
              <Input
                placeholder="e.g., 60"
                type="number"
                min={0}
                value={serviceDuration}
                onChange={e => setServiceDuration(e.target.value)}
                className={`relative pl-12 pr-24 h-12 text-base ${inputBg} border-2 ${inputBorder} ${inputText} ${inputPlaceholder} focus:border-chart-2 focus:ring-0 rounded-xl font-semibold`}
              />
              <span className={`absolute right-4 top-1/2 -translate-y-1/2 ${textSecondary} text-sm font-bold`}>minutes</span>
            </div>
          </div>
          
          {/* Description */}
          <div className="space-y-3">
            <label className={`text-sm font-bold ${textPrimary} flex items-center gap-2 uppercase tracking-wider`}>
              <div className="w-1 h-4 bg-chart-2 rounded-full"></div>
              Description
              <span className={`${textSecondary} font-normal normal-case`}>(Optional)</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-chart-4 rounded-xl opacity-0 group-focus-within:opacity-20 blur-md transition-opacity"></div>
              <Input
                placeholder="Brief description of the service"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                className={`relative h-12 text-base ${inputBg} border-2 ${inputBorder} ${inputText} ${inputPlaceholder} focus:border-[#390040] focus:ring-0 rounded-xl font-semibold`}
              />
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className={`flex gap-3 pt-4 border-t-2 ${border}`}>
          <Button 
            onClick={handleAddService}
            disabled={!serviceName || !servicePrice || !serviceDuration}
            className={`group h-12 px-8 font-bold text-white shadow-lg transition-all duration-300 rounded-xl relative overflow-hidden ${
              !serviceName || !servicePrice || !serviceDuration
                ? `${disabledBg} border-2 ${disabledBorder} ${disabledText} cursor-not-allowed`
                : "bg-chart-2 hover:shadow-2xl hover:shadow-[#730071]/50"
            }`}
          >
            {serviceName && servicePrice && serviceDuration && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            )}
            <span className="relative flex items-center gap-2">
              {editingId ? (
                <>
                  <Edit2 className="w-5 h-5" />
                  Update Service
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add Service
                </>
              )}
            </span>
          </Button>
          
          {editingId && (
            <Button 
              onClick={cancelEdit}
              className={`h-12 px-8 ${cancelBtnBg} border-2 ${cancelBtnBorder} ${textPrimary} font-bold ${cancelBtnHover} rounded-xl transition-all`}
            >
              <X className="w-5 h-5 mr-2" />
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceMain;