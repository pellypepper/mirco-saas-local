"use client";

export function CardGlass({ children, className = "", isDarkMode = false }: { children: any; className?: string; isDarkMode?: boolean }) {
  return (
    <div className={`bg-chart-3/10 rounded-2xl shadow-xl p-6 border ${isDarkMode ? "border-zinc-700" : "border-gray-300"} backdrop-blur-lg ${className}`}>
      {children}
    </div>
  );
}
