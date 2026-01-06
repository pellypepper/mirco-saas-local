"use client";

import { useState, useMemo } from "react";
import { Filter, Download, Search, TrendingUp, DollarSign, Calendar } from "lucide-react";
import DataTable from "./component/DataTable";
import AdvancedFilterDrawer from "./component/AdvancedFilterDrawer";
import Loader from "../Spinner";



const Revenue = ({
  filterOpen,
  filtered,
  setFilterOpen,
  filterState,
  setFilterState,
  handleSearch,
  handleFilterOpen,
  handleExportAll,
loading,
}: {
  filterOpen: boolean;
  filtered: any[];
  setFilterOpen: (open: boolean) => void;
  filterState: any;
  setFilterState: (state: any) => void;
  handleSearch: (term: string) => void;
  handleFilterOpen: () => void;
  handleExportAll: () => void;

  loading: boolean;
}) => {

 
  const [query, setQuery] = useState("");
 
console.log(filtered , "filtered");

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
        label: "Payout Enabled",
        render: (p: any) => (p.payout_enabled ? "Yes" : "No"),
      },
      {
        key: "adminFee",
        label: "Admin Fee",
        sortable: true,
        render: (p: any) => 
          `$${Number(p.adminFee || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
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
    const avgRevenue = totalBookings ? totalRevenue / totalBookings : 0;

    return [
      { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign },
      { label: "Total Bookings", value: totalBookings.toLocaleString(), icon: Calendar },
      { label: "Total Admin Fee", value: `$${totalAdminFee.toLocaleString()}`, icon: DollarSign },
      { label: "Avg per Booking", value: `$${avgRevenue.toFixed(2)}`, icon: TrendingUp },
    ];
  }, [filtered]);

  if(loading){
    return (
      <div className="p-8 min-h-screen bg-slate-50">
   
        <Loader message="Loading Revenue..." />
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-slate-50">
      <h1 className="text-3xl font-bold mb-6">Revenue Dashboard</h1>

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
              <s.icon className="w-6 h-6 text-chart-2/60" />
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
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-chart-2/20 transition"
          />
        </div>
        <button
          onClick={handleFilterOpen}
          className="px-6 py-3 bg-white border-2 border-slate-200 rounded-xl cursor-pointer font-medium hover:border-chart-2/20 hover:text-chart-3/80"
        >
          <Filter className="inline w-5 h-5 mr-2" /> Advanced Filters
        </button>
        <div className="relative group">
          <button className="px-6 py-3 bg-chart-2/80 text-white rounded-xl flex items-center gap-2">
            <Download className="w-5 h-5" /> Export
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <button onClick={handleExportAll("csv")} className="w-full p-3 text-left hover:bg-slate-50">CSV</button>
            <button onClick={handleExportAll("xlsx")} className="w-full p-3 text-left hover:bg-slate-50">XLSX</button>
            <button onClick={handleExportAll("pdf")} className="w-full p-3 text-left hover:bg-slate-50">PDF</button>
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        rows={filtered}

      />

      {/* Filter Drawer */}
      <AdvancedFilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        initial={filterState}
        services={[]} // add service options if available
        onApply={(s) => {
          setFilterState(s);
          setFilterOpen(false);
        }}
      />

  
    </div>
  );
};

export default Revenue;
