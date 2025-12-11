import { useState } from "react";
import { X, Calendar, DollarSign, Filter, RotateCcw, Check } from "lucide-react";

type FilterState = {
  startDate?: string | null;
  endDate?: string | null;
  service?: string;
  status?: string;
  minRevenue?: number | null;
  maxRevenue?: number | null;
};

export default function AdvancedFilterDrawer({
  open,
  onClose,
  initial,
  onApply,
  services = []
}: {
  open: boolean;
  onClose: () => void;
  initial?: Partial<FilterState>;
  onApply: (s: FilterState) => void;
  services?: string[];
}) {
  const [state, setState] = useState<FilterState>({
    startDate: initial?.startDate ?? null,
    endDate: initial?.endDate ?? null,
    service: initial?.service ?? "All",
    status: initial?.status ?? "All",
    minRevenue: initial?.minRevenue ?? null,
    maxRevenue: initial?.maxRevenue ?? null,
  });

  function reset() {
    const resetState = {
      startDate: null,
      endDate: null,
      service: "All",
      status: "All",
      minRevenue: null,
      maxRevenue: null,
    };
    setState(resetState);
    onApply(resetState);
  }

  const hasActiveFilters = 
    state.startDate || 
    state.endDate || 
    (state.service && state.service !== "All") ||
    (state.status && state.status !== "All") ||
    state.minRevenue !== null ||
    state.maxRevenue !== null;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Drawer */}
      <aside className="relative ml-auto w-full max-w-md bg-white shadow-2xl overflow-hidden flex flex-col animate-slide-in">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Advanced Filters</h3>
                <p className="text-sm text-slate-600">Refine your search results</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 rounded-lg hover:bg-white/80 transition-colors"
              aria-label="Close filters"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Date Range */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1.5">Start Date</label>
                <input 
                  type="date" 
                  value={state.startDate ?? ""} 
                  onChange={e => setState(s => ({...s, startDate: e.target.value || null}))} 
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1.5">End Date</label>
                <input 
                  type="date" 
                  value={state.endDate ?? ""} 
                  onChange={e => setState(s => ({...s, endDate: e.target.value || null}))} 
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* Service */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Service Type
            </label>
            <select 
              value={state.service} 
              onChange={e => setState(s => ({...s, service: e.target.value}))} 
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
            >
              <option>All</option>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Booking Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["All", "confirmed", "pending", "cancelled", "rescheduled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setState(s => ({...s, status}))}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    state.status === status
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Revenue Range */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <DollarSign className="w-4 h-4 text-indigo-600" />
              Revenue Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1.5">Min ($)</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  value={state.minRevenue ?? ""} 
                  onChange={e => setState(s => ({...s, minRevenue: e.target.value ? Number(e.target.value) : null}))} 
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1.5">Max ($)</label>
                <input 
                  type="number" 
                  placeholder="No limit" 
                  value={state.maxRevenue ?? ""} 
                  onChange={e => setState(s => ({...s, maxRevenue: e.target.value ? Number(e.target.value) : null}))} 
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* Active Filters Badge */}
          {hasActiveFilters && (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-indigo-600" />
                <span className="font-medium text-indigo-900">
                  {Object.values(state).filter(v => v && v !== "All").length} active filter(s)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
          <div className="flex gap-3">
            <button 
              onClick={reset}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All
            </button>
            <button 
              onClick={() => onApply(state)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-medium text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
            >
              <Check className="w-4 h-4" />
              Apply Filters
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}