"use client";

import { useState, useEffect } from "react";
import { 
  Calendar,
  CalendarCheck,
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 

  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  
} from "lucide-react";
import Header from "./component/Header";
import Booking from "./component/Booking";
import SelectedBooking from "./component/SelectedBooking";
import {adminBookingService } from "@/services/adminBooking";

const MainDisplay = () => {
  
  const [bookings, setBookings] = useState<any[]>([]);


  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [loading, setLoading] = useState(false);

  // Fetch bookings from database
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
     const result = await adminBookingService();

        setBookings(result.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingRef.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    let aVal = a[sortKey];
    let bVal = b[sortKey];

    if (sortKey === "date" || sortKey === "createdAt") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    }

    const comparison = String(aVal).localeCompare(String(bVal));
    return sortDir === "asc" ? comparison : -comparison;
  });

  const toggleSort = (key : string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === "confirmed").length;
  const completedBookings = bookings.filter(b => b.status === "completed").length;
  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const cancelledBookings = bookings.filter(b => b.status === "cancelled").length;
  const totalRevenue = bookings
    .filter(b => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + b.amount, 0);


  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "refunded":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status : string) => {
    switch (status) {
      case "confirmed":
        return <CalendarCheck className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const SortIcon = ({ column }: {column : string}) => {
    if (sortKey !== column) {
      return <ChevronsUpDown className="w-4 h-4 text-slate-400" />;
    }
    return sortDir === "asc" ? (
      <ChevronUp className="w-4 h-4 text-chart-2" />
    ) : (
      <ChevronDown className="w-4 h-4 text-chart-2" />
    );
  };

  return (
    <div className="min-h-screen  p-8">
      <div className=" mx-auto">
        {/* Header */}
   <Header totalBookings={totalBookings} confirmedBookings={confirmedBookings} completedBookings={completedBookings} pendingBookings={pendingBookings} cancelledBookings={cancelledBookings} totalRevenue={totalRevenue} />

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by client, provider, service, or booking reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chart-2/50 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  statusFilter === "all"
                    ? "bg-chart-2 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}>
                All
              </button>
              <button
                onClick={() => setStatusFilter("confirmed")}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  statusFilter === "confirmed"
                    ? "bg-chart-2 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}>
                Confirmed
              </button>
              <button
                onClick={() => setStatusFilter("pending")}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  statusFilter === "pending"
                    ? "bg-chart-3 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}>
                Pending
              </button>
     
              <button
                onClick={() => setStatusFilter("cancelled")}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  statusFilter === "cancelled"
                    ? "bg-chart-1 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}>
                Cancelled
              </button>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chart-2"></div>
          </div>
        ) : (
     <Booking sortedBookings={sortedBookings} toggleSort={toggleSort} SortIcon={SortIcon} setSelectedBooking={setSelectedBooking} getStatusColor={getStatusColor} getPaymentColor={getPaymentColor} getStatusIcon={getStatusIcon} />
        )}

        {/* Booking Detail Modal */}
        {selectedBooking && (
       <SelectedBooking selectedBooking={selectedBooking} setSelectedBooking={setSelectedBooking} getStatusColor={getStatusColor} getPaymentColor={getPaymentColor} getStatusIcon={getStatusIcon} />
        )}
      </div>
    </div>
  );
};

export default MainDisplay;