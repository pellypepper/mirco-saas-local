"use client";

import { useState, useEffect } from "react";
import { 

  Search, 

  CheckCircle2, 
  XCircle, 
  Clock, 

  ChevronUp,
  ChevronDown,
  ChevronsUpDown,

} from "lucide-react";
import Header from "./component/Header";
import User from "./component/Users";
import SelectedUser from "./component/SelectedUser";
import { useAdminUser } from "@/hooks/useAdminUser";


const MainDisplay = () => {
    const {users, loading } = useAdminUser();



  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");







 

  const filteredUsers = users.filter(user => 
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aVal = a[sortKey];
    let bVal = b[sortKey];

    if (sortKey === "joined" || sortKey === "lastBooking") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    }

    const comparison = String(aVal).localeCompare(String(bVal));
    return sortDir === "asc" ? comparison : -comparison;
  });

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.pendingBookings > 0).length;

  const totalBookings = users.reduce((sum, u) => sum + u.totalBookings, 0);

  const getStatusColor = (status: "confirmed" | "pending" | "cancelled" | string) => {
    switch (status) {
      case "confirmed":
        return "bg-chart-2/20 text-chart-2 border-chart-2/50";
      case "pending":
        return "bg-chart-3/20 text-chart-3 border-chart-3/50";
      case "cancelled":
        return "bg-chart-1/20 text-chart-1 border-chart-1/50";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: "confirmed" | "pending" | "cancelled" | string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortKey !== column) {
      return <ChevronsUpDown className="w-4 h-4 text-slate-400" />;
    }
    return sortDir === "asc" ? (
      <ChevronUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-blue-600" />
    );
  };

  return (
    <div className="min-h-screen  p-8">
      <div className=" mx-auto">
     <Header totalUsers={totalUsers} activeUsers={activeUsers}  totalBookings={totalBookings} />

        {/* Search */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chart-2/50 focus:border-transparent"
            />
          </div>
        </div>

        {/* Users Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chart-2"></div>
          </div>
        ) : (
    <User  SortIcon={SortIcon} sortedUsers={sortedUsers} toggleSort={toggleSort}  setSelectedUser={setSelectedUser} />
        )}

        {/* User Detail Modal */}
        {selectedUser && (
       <SelectedUser getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        )}
      </div>
    </div>
  );
};

export default MainDisplay;