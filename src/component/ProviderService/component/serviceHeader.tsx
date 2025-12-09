"use client";
import {  Briefcase,TrendingUp } from "lucide-react";

const ServiceHeader = ({services, totalRevenue, selectedCurrency, serviceCurrency}: {services: any[], totalRevenue: number, selectedCurrency: {symbol: string}, serviceCurrency: string}) => {
  return (
        <div className="relative overflow-hidden bg-white rounded-3xl shadow-lg border border-gray-100">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-chart-2/10 to-chart-3/10 rounded-full -mr-48 -mt-48" />
          <div className="relative p-8 md:p-10">
            <div className="flex items-start justify-between flex-wrap gap-6">
              <div className="flex flex-col md:flex-row items-start gap-5">
                <div className="bg-gradient-to-br from-chart-2 to-chart-3 p-4 rounded-2xl shadow-lg">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
                    Service Management
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Configure and manage your professional service offerings
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl px-4 md:px-8 py-4 border border-blue-200/50 shadow-sm">
                  <p className="text-chart-2 text-xs font-semibold uppercase tracking-wide mb-1">Total Services</p>
                  <p className="text-2xl md:text-3xl font-bold text-chart-2">{services.length}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl px-4 md:px-8 py-4 border border-emerald-200/50 shadow-sm">
                  <p className="text-chart-2/700 text-xs font-semibold uppercase tracking-wide mb-1 flex items-center gap-1">
                    <TrendingUp className="w-2 h-2 md:w-3 md:h-3" />
                    Avg. Price
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-emerald-900">
                    {selectedCurrency.symbol}
                    {services.length > 0 ? (totalRevenue / services.length).toFixed(2) : "0.00"}
                  </p>
                  <span className="text-xs text-emerald-600 font-medium">{serviceCurrency}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ServiceHeader
