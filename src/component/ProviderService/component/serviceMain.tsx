"use client";

import {  Plus, Clock, Edit2} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ServiceMain = ({  handleAddService,
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
  cancelEdit} : {
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
  }) => {
  return (
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-chart-2/10 to-chart-3/10 px-8 py-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              {editingId ? (
                <>
                  <div className="bg-chart-3 p-2 rounded-lg">
                    <Edit2 className="w-5 h-5 text-white" />
                  </div>
                  <span>Edit Service</span>
                </>
              ) : (
                <>
                  <div className="bg-chart-2 p-2 rounded-lg">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <span>Add New Service</span>
                </>
              )}
            </h2>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  Service Name
                  <span className="text-chart-2">*</span>
                </label>
                <Input
                  placeholder="e.g., Initial Consultation"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  Service Price
                  <span className="text-chart-2">*</span>
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-lg">
                      {selectedCurrency.symbol}
                    </span>
                    <Input
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      value={servicePrice}
                      onChange={e => setServicePrice(e.target.value)}
                      className="pl-10 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={serviceCurrency}
                    onChange={e => setServiceCurrency(e.target.value)}
                    className="h-12 rounded-xl px-4 border border-gray-300 bg-white text-gray-700 font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  >
                    {currencies.map(c => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  Duration
                  <span className="text-chart-2">*</span>
                </label>
                <div className="relative flex items-center">
                  <Clock className="absolute left-4 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="e.g., 60"
                    type="number"
                    min={0}
                    value={serviceDuration}
                    onChange={e => setServiceDuration(e.target.value)}
                    className="pl-12 pr-20 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="absolute right-4 text-gray-500 text-sm font-medium">minutes</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Description <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <Input
                  placeholder="Brief description of the service"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button 
                onClick={handleAddService}
                disabled={!serviceName || !servicePrice || !serviceDuration}
                className="h-12 px-8 bg-gradient-to-r from-chart-2 to-chart-3 hover:from-chart-2/90 hover:to-chart-3/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {editingId ? (
                  <>
                    <Edit2 className="w-5 h-5 mr-2" />
                    Update Service
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Add Service
                  </>
                )}
              </Button>
              {editingId && (
                <Button 
                  variant="outline" 
                  onClick={cancelEdit}
                  className="h-12 px-8  border-2 font-semibold"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
  )
}

export default ServiceMain