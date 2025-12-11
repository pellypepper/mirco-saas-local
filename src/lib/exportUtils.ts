// /utils/exportUtils.ts
export function toCSV(rows: any[], filename = "export.csv") {
  if (!rows || rows.length === 0) return;
  const header = Object.keys(rows[0]);
  const csv = [
    header.join(","),
    ...rows.map(r =>
      header.map(k => {
        const v = r[k] ?? "";
        const s = String(v).replace(/"/g, '""');
        return `"${s}"`;
      }).join(",")
    )
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// dynamic Excel export (SheetJS)
export async function toXLSX(rows: any[], filename = "export.xlsx") {
  if (!rows || rows.length === 0) return;
  try {
    const XLSX = await import("xlsx");
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error("XLSX export failed (missing library).", e);
    // fallback to CSV
    toCSV(rows, filename.replace(/xlsx$/, "csv"));
  }
}

// dynamic PDF export using jsPDF + autotable
export async function toPDF(rows: any[], filename = "export.pdf", title = "Export") {
  if (!rows || rows.length === 0) return;
  try {
    const jsPDFMod = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;
    const { jsPDF } = jsPDFMod;
    const doc = new jsPDF();
    const header = Object.keys(rows[0]);
    const body = rows.map(r => header.map(h => r[h] ?? ""));
    // @ts-ignore
    autoTable(doc, { head: [header], body });
    doc.save(filename);
  } catch (e) {
    console.error("PDF export failed (missing library).", e);
    // fallback to CSV
    toCSV(rows, filename.replace(/pdf$/, "csv"));
  }
}
