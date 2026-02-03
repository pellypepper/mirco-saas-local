"use client"; 

import { useState, useMemo, useEffect } from "react";
import { toCSV, toXLSX, toPDF } from "@/lib/exportUtils";
import useDebouncedValue from "@/hooks/useDebouncedValue";

interface UseRevenueProps {
  providers: any[];
  bookings?:  any[];
}

type FilterState = {
  startDate?: string | null;
  endDate?: string | null;
  service?: string;
  minRevenue?: number | null;
  maxRevenue?:  number | null;
};

const useRevenue = ({ providers = [], bookings = [] }: UseRevenueProps) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    startDate: null,
    endDate: null,
    service: "All",
    minRevenue:  null,
    maxRevenue:  null,
  });
  const [query, setQuery] = useState("");

  // debounced search
  const debouncedQuery = useDebouncedValue(query, 350);

  // ----------------------------
  // Base table rows
  // ----------------------------
  const rows = useMemo(() => {
    if (bookings.length > 0) return bookings;
    return providers. map((p) => ({ ...p }));
  }, [providers, bookings]);

  // ----------------------------
  // Get unique services for filter dropdown
  // ----------------------------
  const uniqueServices = useMemo(() => {
    const services = new Set<string>();
    rows.forEach((row) => {
      if (row.service_type) services.add(row.service_type);
    });
    return Array.from(services).sort();
  }, [rows]);

  // ----------------------------
  // Filter logic (search + advanced filters)
  // ----------------------------
  const filtered = useMemo(() => {
    let r = rows;

    // 1. Search filter
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      r = r.filter(
        (x) =>
          (x.full_name || "").toLowerCase().includes(q) ||
          (x.email || "").toLowerCase().includes(q) ||
          (x.service_type || "").toLowerCase().includes(q) ||
          (x.location || "").toLowerCase().includes(q) ||
          String(x.id || "").toLowerCase().includes(q)
      );
    }

    // 2. Date range filter
    if (filterState.startDate) {
      r = r.filter((x) => {
        const itemDate = x.created_at || x.date || x.joined_at;
        if (!itemDate) return false;
        const date = new Date(itemDate);
        date.setHours(0, 0, 0, 0);
        const filterDate = new Date(filterState. startDate! );
        filterDate.setHours(0, 0, 0, 0);
        return date >= filterDate;
      });
    }

    if (filterState.endDate) {
      r = r.filter((x) => {
        const itemDate = x.created_at || x.date || x.joined_at;
        if (!itemDate) return false;
        const date = new Date(itemDate);
        date.setHours(23, 59, 59, 999);
        const filterDate = new Date(filterState.endDate!);
        filterDate.setHours(23, 59, 59, 999);
        return date <= filterDate;
      });
    }

    // 3. Service filter
    if (filterState.service && filterState.service !== "All") {
      r = r.filter((x) => x.service_type === filterState.service);
    }

    // 4. Revenue range filter
    if (filterState.minRevenue !== null && filterState.minRevenue !== undefined) {
      r = r.filter((x) => {
        const revenue = Number(x.revenue || 0);
        return revenue >= filterState.minRevenue! ;
      });
    }

    if (filterState.maxRevenue !== null && filterState.maxRevenue !== undefined) {
      r = r.filter((x) => {
        const revenue = Number(x.revenue || 0);
        return revenue <= filterState. maxRevenue!;
      });
    }

    return r;
  }, [rows, debouncedQuery, filterState]);

  // ----------------------------
  // Handlers
  // ----------------------------
  const handleSearch = (value: string) => setQuery(value);

  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);

  const handleFilterApply = (state: FilterState) => {
    setFilterState(state);
    setFilterOpen(false);
  };

  const handleFilterReset = () => {
    const resetState:  FilterState = {
      startDate: null,
      endDate:  null,
      service: "All",
      minRevenue: null,
      maxRevenue: null,
    };
    setFilterState(resetState);
    setQuery("");
  };

  // ----------------------------
  // Export
  // ----------------------------
  const handleExportAll = (type: "csv" | "xlsx" | "pdf") => async () => {
    if (type === "csv") toCSV(filtered, "revenue-export. csv");
    if (type === "xlsx") await toXLSX(filtered, "revenue-export.xlsx");
    if (type === "pdf")
      await toPDF(filtered, "revenue-export.pdf", "Revenue Dashboard Export");
  };

  return {
    filterOpen,
    filtered,
    categoryData: rows,
    filterState,
    uniqueServices,
    setFilterOpen,
    setFilterState,
    handleSearch,
    handleFilterOpen,
    handleFilterClose,
    handleFilterApply,
    handleFilterReset,
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

      setProviders(json. providers || []);
      setLoading(false);
    };

    load();
  }, []);

  return { providers, loading };
};

export default useRevenue;