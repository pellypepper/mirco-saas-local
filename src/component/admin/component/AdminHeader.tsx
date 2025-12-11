"use client";
import { Filter, Download, Search } from "lucide-react";
import { useState } from "react";

interface AdminHeaderProps {
  onSearch?: (value: string) => void;
  onFilter?: () => void;
  onExport?: () => void;
}

const AdminHeader = ({ onSearch, onFilter, onExport }: AdminHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
    <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold">Dashboard Overview</h1>
        <p className="text-slate-600 text-base md:text-lg mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

     
    </div>
  );
};

export default AdminHeader;
