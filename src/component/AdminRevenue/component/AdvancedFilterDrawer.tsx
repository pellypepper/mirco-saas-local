import { useState, useEffect } from "react";
import { X, Calendar, DollarSign, Filter, RotateCcw, Check, Briefcase } from "lucide-react";

type FilterState = {
  startDate?: string | null;
  endDate?: string | null;
  service?: string;
  minRevenue?: number | null;
  maxRevenue?:  number | null;
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
  initial?:  Partial<FilterState>;
  onApply: (s: FilterState) => void;
  services?: string[];
}) {
  const [state, setState] = useState<FilterState>({
    startDate: initial?.startDate ?? null,
    endDate: initial?. endDate ?? null,
    service: initial?.service ?? "All",
    minRevenue: initial?. minRevenue ?? null,
    maxRevenue: initial?.maxRevenue ?? null,
  });

  // Update local state when initial props change
  useEffect(() => {
    setState({
      startDate: initial?.startDate ??  null,
      endDate: initial?.endDate ?? null,
      service: initial?.service ?? "All",
      minRevenue: initial?.minRevenue ?? null,
      maxRevenue: initial?.maxRevenue ?? null,
    });
  }, [initial]);

  function reset() {
    const resetState: FilterState = {
      startDate: null,
      endDate: null,
      service: "All",
      minRevenue: null,
      maxRevenue: null,
    };
    setState(resetState);
    onApply(resetState);
    onClose();
  }

  function handleApply() {
    onApply(state);
    onClose();
  }

  const hasActiveFilters = 
    state.startDate || 
    state.endDate || 
    (state.service && state.service !== "All") ||
    state.minRevenue !== null ||
    state.maxRevenue !== null;

  if (! open) return null;

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
        <div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-chart-2/10 to-chart-3/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-chart-2 to-chart-3 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
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
              <Calendar className="w-4 h-4 text-chart-2" />
              Date Range (Provider Join Date)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1.5">Start Date</label>
                <input 
                  type="date" 
                  value={state.startDate ?? ""} 
                  onChange={e => setState(s => ({...s, startDate: e. target.value || null}))} 
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus: ring-chart-2/50 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1.5">End Date</label>
                <input 
                  type="date" 
                  value={state.endDate ?? ""} 
                  onChange={e => setState(s => ({...s, endDate: e.target.value || null}))} 
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-chart-2/50 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* Service */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Briefcase className="w-4 h-4 text-chart-2" />
              Service Category
            </label>
            <select 
              value={state.service} 
              onChange={e => setState(s => ({...s, service: e.target.value}))} 
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-chart-2/50 focus:border-transparent transition bg-white"
            >
              <option value="All">All Categories</option>
              {services. map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Revenue Range */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <DollarSign className="w-4 h-4 text-chart-2" />
              Revenue Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1.5">Min ($)</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  min="0"
                  step="0.01"
                  value={state.minRevenue ??  ""} 
                  onChange={e => setState(s => ({... s, minRevenue: e. target.value ?  Number(e.target.value) : null}))} 
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-chart-2/50 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1.5">Max ($)</label>
                <input 
                  type="number" 
                  placeholder="No limit" 
                  min="0"
                  step="0.01"
                  value={state.maxRevenue ?? ""} 
                  onChange={e => setState(s => ({...s, maxRevenue: e.target.value ? Number(e.target.value) : null}))} 
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus: outline-none focus:ring-2 focus:ring-chart-2/50 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* Active Filters Badge */}
          {hasActiveFilters && (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-chart-2" />
                <span className="font-medium text-chart-3">
                  {Object. values(state).filter(v => v && v !== "All").length} active filter(s)
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
              onClick={handleApply}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-chart-2 to-chart-3 font-medium text-white shadow-lg shadow-chart-2/30 hover:shadow-xl hover:shadow-chart-2/40 transition-all"
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