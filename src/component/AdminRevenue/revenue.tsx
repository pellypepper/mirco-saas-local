import { useState, useMemo } from "react";
import { Filter, Download, Search, TrendingUp, DollarSign, Calendar } from "lucide-react";

import DataTable from "../admin/component/DataTable";
import AdvancedFilterDrawer from "../admin/component/AdvancedFilterDrawer";

const Revenue = ({
  filterOpen = false,
  categoryData = [],
  filtered = [],
  setFilterOpen = () => {},
  filterState = {},
  setFilterState = () => {},
  handleSearch = () => {},
  handleFilterOpen = () => {},
  handleExportAll = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { key: "name", label: "Name", sortable: true },
    {
      key: "revenue",
      label: "Revenue",
      sortable: true,
      render: (r) => {
        const revenue = r.revenue ?? 0;
        return `$${typeof revenue === 'number' ? revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : revenue}`;
      },
    },
    { key: "bookings", label: "Bookings", sortable: true },
  ];

  // Calculate actual stats from filtered data
  const stats = useMemo(() => {
    const totalRevenue = filtered.reduce((sum, item) => sum + (item.revenue || 0), 0);
    const totalBookings = filtered.reduce((sum, item) => sum + (item.bookings || 0), 0);
    const avgRevenuePerBooking = totalBookings > 0 ? totalRevenue / totalBookings : 0;

    return [
      {
        label: "Total Revenue",
        value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: "+12.5%",
        icon: DollarSign,
        color: "bg-emerald-500",
        bgLight: "bg-emerald-50",
        textColor: "text-emerald-700"
      },
      {
        label: "Total Bookings",
        value: totalBookings.toLocaleString('en-US'),
        change: "+8.2%",
        icon: Calendar,
        color: "bg-blue-500",
        bgLight: "bg-blue-50",
        textColor: "text-blue-700"
      },
      {
        label: "Avg per Booking",
        value: `$${avgRevenuePerBooking.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: "+4.3%",
        icon: TrendingUp,
        color: "bg-purple-500",
        bgLight: "bg-purple-50",
        textColor: "text-purple-700"
      },
    ];
  }, [filtered]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                Revenue Dashboard
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Track and analyze revenue performance across categories
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mb-2">
                    {stat.value}
                  </p>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                    {stat.change} vs last month
                  </span>
                </div>
                <div className={`${stat.bgLight} p-3 rounded-xl`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={handleFilterOpen}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 rounded-xl font-medium text-slate-700 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Advanced Filters</span>
            </button>

            {/* Export Dropdown */}
            <div className="relative group">
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all">
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">Export</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <button
                  onClick={() => handleExportAll("csv")}
                  className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 first:rounded-t-xl transition"
                >
                  Export as CSV
                </button>
                <button
                  onClick={() => handleExportAll("xlsx")}
                  className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  Export as XLSX
                </button>
                <button
                  onClick={() => handleExportAll("pdf")}
                  className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 last:rounded-b-xl transition"
                >
                  Export as PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-900">
              Revenue by Category
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {filtered.length} {filtered.length === 1 ? 'category' : 'categories'} found
            </p>
          </div>
          <DataTable columns={columns} rows={filtered} />
        </div>

        {/* Filter Drawer */}
        <AdvancedFilterDrawer
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          initial={filterState}
          services={categoryData?.map((c) => c.category) ?? []}
          onApply={(s) => {
            setFilterState(s);
            setFilterOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default Revenue;