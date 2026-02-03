"use client";

import { useMainNavBar } from "@/hooks/MainNavContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeIcon() {
  const { isDarkMode, handleThemeToggle} = useMainNavBar();


  return (
    <div onClick={handleThemeToggle} className={`cursor-pointer ${isDarkMode ? "bg-chart-2/20" : "bg-chart-4/20"} rounded-2xl p-2 border border-white/30 fixed bottom-3 right-3 z-90`}>
      {isDarkMode ? <Moon className="w-6 h-6 text-chart-2"/> : <Sun className="w-6 h-6 text-chart-4"/>}
    </div>
  );
}