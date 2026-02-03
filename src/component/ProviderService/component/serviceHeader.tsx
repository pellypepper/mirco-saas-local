"use client";
import { Briefcase, TrendingUp, Sparkles} from "lucide-react";


const ServiceHeader = ({
  services, 
  totalRevenue, 
  selectedCurrency, 
  serviceCurrency,
 
}: {
  services: any[], 
  totalRevenue: number, 
  selectedCurrency: {symbol: string}, 
  serviceCurrency: string,

}) => {
  

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-chart-2 to-chart-3 rounded-3xl shadow-2xl">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32" />
      
      {/* Geometric pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      <div className="relative p-8 md:p-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Left Section */}
          <div className="flex items-start gap-5">
            <div className="relative">
              <div className="relative bg-chart-3 p-4 rounded-2xl shadow-lg">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-3 border border-white/30">
                <Sparkles size={14} className="text-white" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">Management</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
                Service Management
              </h1>
              <p className="text-white/80 text-sm md:text-base font-medium">
                Configure and manage your professional service offerings
              </p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="flex flex-wrap gap-4">
            {/* Total Services */}
            <div className="group relative">
              <div className="relative bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-2xl px-6 py-4 shadow-xl min-w-[140px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-white/90 text-xs font-bold uppercase tracking-wide">Services</p>
                </div>
                <p className="text-3xl md:text-4xl font-black text-white">{services.length}</p>
              </div>
            </div>

            {/* Average Price */}
            <div className="group relative">
              <div className="relative bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-2xl px-6 py-4 shadow-xl min-w-[160px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-white/90 text-xs font-bold uppercase tracking-wide">Avg. Price</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <p className="text-3xl md:text-4xl font-black text-white">
                    {selectedCurrency.symbol}
                    {services.length > 0 ? (totalRevenue / services.length).toFixed(2) : "0.00"}
                  </p>
                  <span className="text-xs text-white/70 font-bold">{serviceCurrency}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHeader;