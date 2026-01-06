import { useState, useMemo, useEffect } from "react";

import { toCSV, toXLSX, toPDF } from "@/lib/exportUtils";

import useDebouncedValue from "@/hooks/useDebouncedValue";

interface UseRevenueProps {
  providers: any[];
  bookings?: any[];
}

const useRevenue = ({ providers = [], bookings = [] }: UseRevenueProps) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterState, setFilterState] = useState<any>({});
  const [query, setQuery] = useState("");

  // local copy of filtered rows
  const [initialFiltered, setInitialFiltered] = useState<any[]>([]);

  // initialize when providers load
  useEffect(() => {
    setInitialFiltered(providers);
  }, [providers]);

  // debounced search
  const debouncedQuery = useDebouncedValue(query, 350);

  // ----------------------------
  // Base table rows
  // ----------------------------
  const rows = useMemo(() => {
    if (bookings.length > 0) return bookings;

    return providers.map((p) => ({
   ...p,
    }));
  }, [providers, bookings]);

  // ----------------------------
  // Filter logic (search + advanced filters)
  // ----------------------------
  const filtered = useMemo(() => {
    let r = rows;

    // Search
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      r = r.filter(
        (x) =>
          (x.name || "").toLowerCase().includes(q) ||
          (x.email || "").toLowerCase().includes(q) ||
          String(x.id || "").toLowerCase().includes(q)
      );
    }

  

    return r;
  }, [rows, debouncedQuery]);

  // ----------------------------
  // Handlers
  // ----------------------------
  const handleSearch = (value: string) => setQuery(value);

  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);

  const handleFilterStateChange = (state: any) => setFilterState(state);

  // ----------------------------
  // Export
  // ----------------------------
  const handleExportAll =
    (type: "csv" | "xlsx" | "pdf") => async () => {
      if (type === "csv") toCSV(filtered, "dashboard-export.csv");
      if (type === "xlsx") await toXLSX(filtered, "dashboard-export.xlsx");
      if (type === "pdf")
        await toPDF(filtered, "dashboard-export.pdf", "Dashboard export");
    };

  return {
    filterOpen,
    filtered,
    categoryData: rows,
    filterState,
initialFiltered,
    setFilterOpen,
    setFilterState,

    handleSearch,
    handleFilterOpen,
    handleFilterClose,
    handleFilterStateChange,
    handleExportAll,
  };
};










export const useProviders = () => {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const res = await fetch("/api/providers");
      const json = await res.json();

      setProviders(json.providers || []);
      setLoading(false);
    };

    load();
  }, []);

  return { providers, loading };
};





export default useRevenue
