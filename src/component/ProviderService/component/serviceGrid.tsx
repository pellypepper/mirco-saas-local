"use client";

import { Button } from "@/components/ui/button";

import { Trash2, DollarSign, Clock, Briefcase, Edit2 } from "lucide-react";

const ServiceGrid = ({ services, currencies, handleEditService, handleDeleteService }: { services: any[]; currencies: {code: string; symbol: string}[]; handleEditService: (service: any) => void; handleDeleteService: (serviceId: string) => void; }) => {
  return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length === 0 ? (
            <div className="col-span-full bg-white rounded-3xl shadow-lg border border-gray-100 p-16 text-center">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                <Briefcase className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-900 text-xl font-semibold mb-2">No services yet</p>
              <p className="text-gray-500 text-base">
                Create your first service using the form above to get started
              </p>
            </div>
          ) : (
            services.map((service) => {
              const currencyObj = currencies.find(c => c.code === service.currency) || currencies[0];
              return (
                <div
                  key={service.id}
                  className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-gray-200 transition-all duration-300"
                >
                  <div className="p-6 space-y-4">
                    {/* Service Header */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-chart-2 transition-colors">
                        {service.title}
                      </h3>
                      {service.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                      )}
                    </div>
                    
                    {/* Price & Duration Card */}
                    <div className="bg-gradient-to-br from-chart-2/10 to-chart-3/10 rounded-2xl p-5 border border-chart-2/50 space-y-3">
                      <div className="flex items-baseline gap-2">
                        <DollarSign className="w-6 h-6 text-chart-2 flex-shrink-0" />
                        <span className="text-3xl font-bold text-chart-3">
                          {currencyObj.symbol}{service.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-emerald-700 font-semibold">{service.currency}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold text-sm">
                          {service.duration_minutes} minutes
                        </span>
                      </div>
                      
                      <div className="pt-2 border-t border-chart-2/50">
                        <p className="text-chart-2 text-xs font-semibold uppercase tracking-wide">
                          Per Session
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 h-11 border-2 font-semibold hover:bg-chart-2/10 hover:border-chart-2/50 hover:text-chart-2"
                        onClick={() => handleEditService(service)}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-11 px-4 bg-red-500 hover:bg-red-600 shadow-md"
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
  )
}

export default ServiceGrid