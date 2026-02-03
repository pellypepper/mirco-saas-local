"use client";

import { useState, useMemo } from "react";
import { Filter, Download, Search, TrendingUp, DollarSign, RotateCcw, Calendar} from "lucide-react";
import DataTable from "./component/DataTable";
import AdvancedFilterDrawer from "./component/AdvancedFilterDrawer";
import Loader from "../Spinner";

const Revenue = ({
  filterOpen,
  filtered,
  setFilterOpen,
  filterState,
  handleSearch,
  handleFilterOpen,
  handleFilterApply,
  handleFilterReset,
  handleExportAll,
  loading,
  uniqueServices = [],
}: {
  filterOpen: boolean;
  filtered: any[];
  setFilterOpen: (open: boolean) => void;
  handleFilterClose: () => void;
  handleFilterReset: () => void;
  filterState:  any;
  handleSearch: (term: string) => void;
  handleFilterOpen: () => void;
  handleFilterApply: (state: any) => void;
  handleExportAll: (type: "csv" | "xlsx" | "pdf") => () => void;
  loading: boolean;
  uniqueServices?: string[];
}) => {
  const [query, setQuery] = useState("");


  // ----------------------------
  // Table columns
  // ----------------------------
  const columns = useMemo(
    () => [
      { key: "full_name", label: "Full Name", sortable: true },
      { key: "email", label: "Email" },
      { key: "service_type", label: "Category" },
      { key: "location", label: "Location" },
      { key: "country", label: "Country" },
      { key: "phone_number", label: "Phone" },
      { key: "website", label: "Website" },
      {
        key: "payout_enabled",
        label:  "Payout Enabled",
        render: (p: any) => (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              p.payout_enabled
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {p.payout_enabled ? "Yes" : "No"}
          </span>
        ),
      },
      {
        key: "adminFee",
        label: "Admin Fee",
        sortable: true,
        render:  (p: any) =>
          `$${Number(p.adminFee || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits:  2,
          })}`,
      },
      {
        key: "revenue",
        label: "Revenue",
        sortable: true,
        render: (p: any) =>
          `$${Number(p.revenue || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      },
      { key: "bookings", label: "Bookings", sortable: true },
    ],
    []
  );

  // ----------------------------
  // Stats
  // ----------------------------
  const stats = useMemo(() => {
    const totalRevenue = filtered.reduce((sum, p) => sum + (p.revenue || 0), 0);
    const totalBookings = filtered.reduce((sum, p) => sum + (p.bookings || 0), 0);
    const totalAdminFee = filtered.reduce((sum, p) => sum + (p.adminFee || 0), 0);
    const avgRevenue = totalBookings ?  totalRevenue / totalBookings : 0;

    return [
      {
        label: "Total Revenue",
        value: `$${totalRevenue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        icon: DollarSign,
      },
      { label: "Total Bookings", value: totalBookings. toLocaleString(), icon: Calendar },
      {
        label: "Total Admin Fee",
        value: `$${totalAdminFee.toLocaleString(undefined, {
          minimumFractionDigits:  2,
          maximumFractionDigits: 2,
        })}`,
        icon: DollarSign,
      },
      {
        label:  "Avg per Booking",
        value: `$${avgRevenue.toFixed(2)}`,
        icon: TrendingUp,
      },
    ];
  }, [filtered]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filterState.startDate) count++;
    if (filterState. endDate) count++;
    if (filterState.service && filterState.service !== "All") count++;
    if (filterState.status && filterState.status !== "All") count++;
    if (filterState.minRevenue !== null) count++;
    if (filterState.maxRevenue !== null) count++;
    return count;
  }, [filterState]);

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-slate-50">
        <Loader message="Loading Revenue..." />
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Revenue Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Showing {filtered.length} of {filtered. length} providers
          </p>
        </div>
        {activeFiltersCount > 0 && (
          <div className="px-4 py-2 bg-chart-2/10 border border-chart-2/20 rounded-lg">
            <span className="text-sm font-medium text-chart-2">
              {activeFiltersCount} active filter{activeFiltersCount > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">{s.label}</p>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            </div>
            <div className="p-3 bg-chart-2/10 rounded-xl">
              <s. icon className="w-6 h-6 text-chart-2/60" />
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or category..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder: text-slate-400 focus: outline-none focus:ring-2 focus:ring-chart-2/20 transition"
          />
        </div>
        <button
          onClick={handleFilterOpen}
          className="px-6 py-3 bg-white border-2 border-slate-200 rounded-xl font-medium hover:border-chart-2/20 hover:text-chart-3/80 transition-all relative"
        >
          <Filter className="inline w-5 h-5 mr-2" /> Advanced Filters
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-chart-2 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
        {activeFiltersCount > 0 && (
  <button
    onClick={handleFilterReset}
    className="px-6 py-3 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl font-medium hover:bg-red-100 transition-all flex items-center gap-2"
  >
    <RotateCcw className="w-4 h-4" />
    Clear Filters
  </button>
)}
        <div className="relative group">
          <button className="px-6 py-3 bg-chart-2/80 text-white rounded-xl flex items-center gap-2 hover:bg-chart-2 transition-colors">
            <Download className="w-5 h-5" /> Export
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <button
              onClick={handleExportAll("csv")}
              className="w-full p-3 text-left hover:bg-slate-50 rounded-t-xl transition-colors"
            >
              Export as CSV
            </button>
            <button
              onClick={handleExportAll("xlsx")}
              className="w-full p-3 text-left hover:bg-slate-50 transition-colors"
            >
              Export as XLSX
            </button>
            <button
              onClick={handleExportAll("pdf")}
              className="w-full p-3 text-left hover:bg-slate-50 rounded-b-xl transition-colors"
            >
              Export as PDF
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable columns={columns} rows={filtered} />

      {/* Filter Drawer */}
      <AdvancedFilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        initial={filterState}
        services={uniqueServices}
        onApply={handleFilterApply}
      />
    </div>
  );
};

export default Revenue;