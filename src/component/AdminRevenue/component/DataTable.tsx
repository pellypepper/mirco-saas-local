import { useMemo, useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import ProviderModal from "@/component/AdminRevenue/component/ProviderModal";

type Column<T> = {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

export default function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  pageSizeOptions = [10, 25, 50],
}: {
  columns: Column<T>[];
  rows: T[];
  pageSizeOptions?: number[];
}) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [selectedProvider, setSelectedProvider] = useState<T | null>(null);

  const sorted = useMemo(() => {
    if (!sortKey) return rows;
    const sortedRows = [...rows].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === "number" && typeof vb === "number") return va - vb;
      return String(va).localeCompare(String(vb));
    });
    if (sortDir === "desc") sortedRows.reverse();
    return sortedRows;
  }, [rows, sortKey, sortDir]);

  const total = sorted.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const pageRows = sorted.slice((page - 1) * pageSize, page * pageSize);

  function toggleSort(k: string) {
    if (sortKey !== k) {
      setSortKey(k);
      setSortDir("asc");
    } else setSortDir((d) => (d === "asc" ? "desc" : "asc"));
  }

  const startRow = (page - 1) * pageSize + 1;
  const endRow = Math.min(page * pageSize, total);

  return (
    <div className="w-full">
      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100/50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700 first:pl-8 last:pr-8"
                  >
                    <div className="flex items-center gap-2">
                      <span>{col.label}</span>
                      {col.sortable && (
                        <button
                          onClick={() => toggleSort(col.key)}
                          className="inline-flex items-center justify-center w-6 h-6 rounded-md hover:bg-slate-200 transition-colors"
                        >
                          {sortKey === col.key ? (
                            sortDir === "asc" ? (
                              <ChevronUp className="w-4 h-4 text-chart-2/80" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-chart-2/80" />
                            )
                          ) : (
                            <ChevronsUpDown className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pageRows.map((r, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/50 cursor-pointer transition-colors duration-150"
                  onClick={() => setSelectedProvider(r)}
                >
                  {columns.map((c) => (
                    <td key={c.key} className="px-6 py-4 text-sm text-slate-600 first:pl-8 last:pr-8">
                      {c.render ? c.render(r) : String(r[c.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-slate-700">No results found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-700">Rows per page:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700"
          >
            {pageSizeOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-600 font-medium">
            {total === 0 ? (
              "No entries"
            ) : (
              <>
                Showing <span className="text-slate-900">{startRow}</span> to{" "}
                <span className="text-slate-900">{endRow}</span> of <span className="text-slate-900">{total}</span>{" "}
                entries
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(5, pages) }, (_, i) => {
              let pageNum;
              if (pages <= 5) pageNum = i + 1;
              else if (page <= 3) pageNum = i + 1;
              else if (page >= pages - 2) pageNum = pages - 4 + i;
              else pageNum = page - 2 + i;
              return (
                <button key={pageNum} onClick={() => setPage(pageNum)} className={`w-9 h-9 rounded-lg ${page === pageNum ? "bg-chart-2/80 text-white" : "bg-white border"}`}>
                  {pageNum}
                </button>
              );
            })}
            <button disabled={page >= pages} onClick={() => setPage((p) => Math.min(pages, p + 1))}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for selected provider */}
      {selectedProvider && (
    <ProviderModal selectedProvider={selectedProvider} setSelectedProvider={setSelectedProvider} /> 
      )}
    </div>
  );
}
