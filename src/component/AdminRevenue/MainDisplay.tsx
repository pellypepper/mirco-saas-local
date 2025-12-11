"use client";
import { useState, useMemo } from "react";
import Revenue from "@/component/AdminRevenue/revenue";
import { toCSV, toXLSX, toPDF } from "@/lib/exportUtils";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import useDebouncedValue from "@/hooks/useDebouncedValue";

const MainDisplay = () => {
      const [filterOpen, setFilterOpen] = useState(false);
      const [filterState, setFilterState] = useState<any>({});
        const [bookings, setBookings] = useState<any[]>([]); 
      
  const [query, setQuery] = useState("");
        const debouncedQuery = useDebouncedValue(query, 350);
      
  const {
  
    topProviders,

    categoryData
  } = useAdminDashboard();

   const rows = bookings.length ? bookings : topProviders.map(p => ({ id: p.id, name: p.name, revenue: p.revenue, bookings: p.bookings }));

  const filtered = useMemo(() => {
    let r = rows;
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      r = r.filter(x => (x.name || "").toLowerCase().includes(q) || String(x.id || "").toLowerCase().includes(q));
    }
    // apply filterState (date/service/status/min/max) if bookings present — omitted for brevity
    return r;
  }, [rows, debouncedQuery]);


    const handleSearch = (v: string) => setQuery(v);
  const handleFilterOpen = () => setFilterOpen(true);
  const handleExportAll = async (type: "csv"|"xlsx"|"pdf") => {
    if (type === "csv") toCSV(filtered, "dashboard-export.csv");
    if (type === "xlsx") await toXLSX(filtered, "dashboard-export.xlsx");
    if (type === "pdf") await toPDF(filtered, "dashboard-export.pdf", "Dashboard export");
  };


  return (
    <div>
      <Revenue categoryData={categoryData} filtered={filtered} filterOpen={filterOpen} setFilterOpen={setFilterOpen} filterState={filterState} setFilterState={setFilterState} handleSearch={handleSearch} handleFilterOpen={handleFilterOpen} handleExportAll={handleExportAll} />
    </div>
  )
}

export default MainDisplay
