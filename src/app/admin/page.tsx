"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/libs/supabaseClient";
import { 
  Users, UserCheck, Calendar, DollarSign, TrendingUp, TrendingDown,
  Activity, Clock, CheckCircle, XCircle, ArrowUpRight, ArrowDownRight,
  Star, MapPin, Filter, Download, Search, Bell, Settings, LogOut,
  RefreshCw, AlertTriangle, Shield, Server, Database, Zap, Globe,
  MessageSquare, CreditCard, FileText, Eye, BarChart3, PieChart,
  Target, Percent
} from 'lucide-react';
import { 
  BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, Legend, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

export default function AdminDashboard() {
  // --- State ---
  const [overview, setOverview] = useState({
    totalRevenue: 0,
    revenueChange: 0,
    totalBookings: 0,
    bookingsChange: 0,
    totalCustomers: 0,
    customersChange: 0,
    totalProviders: 0,
    providersChange: 0,
    activeBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    // optional extended metrics
    avgOrderValue: 0,
    conversionRate: 0,
    customerSatisfaction: 0,
  });

  const [revenueData, setRevenueData] = useState<{ month: string; revenue: number; bookings: number; customers?: number }[]>([]);
  const [bookingStatus, setBookingStatus] = useState<{ name: string; value: number; color: string }[]>([]);
  const [topProviders, setTopProviders] = useState<{ id: string; name: string; revenue: number; bookings: number; rating: number; location: string; }[]>([]);
  const [recentCustomers, setRecentCustomers] = useState<{ id: string; name: string; email: string; joined: string; bookings: number; spent: number }[]>([]);
  const [categoryData, setCategoryData] = useState<{ category: string; bookings: number; revenue: number }[]>([]);
  const [performanceData, setPerformanceData] = useState<{ subject: string; A: number; fullMark: number }[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [systemHealth, setSystemHealth] = useState<any>({});
  const [realtimeStats, setRealtimeStats] = useState<any>({});

  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('6m');
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // --- Core data ---
        const { data: bookings = [], error: bookingsError } = await supabase.from("bookings").select("*");
        if (bookingsError) throw bookingsError;

        const { data: customers = [], error: custError } = await supabase.from("profiles").select("*").eq("role", "customer");
        if (custError) throw custError;

        const { data: providers = [], error: provError } = await supabase.from("profiles").select("*").eq("role", "provider");
        if (provError) throw provError;

        const { data: services = [], error: servError } = await supabase.from("services").select("*");
        if (servError) throw servError;

        // --- Overview Stats ---
        const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount ?? 0), 0);
        const totalBookings = bookings.length;
        const totalCustomers = customers.length;
        const totalProviders = providers.length;
        const activeBookings = bookings.filter(b => b.status === "confirmed").length;
        const completedBookings = bookings.filter(b => b.status === "completed").length;
        const cancelledBookings = bookings.filter(b => b.status === "cancelled").length;

        setOverview(prev => ({
          ...prev,
          totalRevenue,
          totalBookings,
          totalCustomers,
          totalProviders,
          activeBookings,
          completedBookings,
          cancelledBookings
        }));

        // --- Revenue Chart (last 6 months) ---
        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const revenueByMonth = Array.from({ length: 6 }).map((_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - (5 - i));
          const month = date.getMonth();
          const year = date.getFullYear();

          const monthBookings = bookings.filter(b => {
            const bd = new Date(b.booking_date);
            return bd.getMonth() === month && bd.getFullYear() === year;
          });

          const monthRevenue = monthBookings.reduce((sum, b) => sum + (b.amount ?? 0), 0);
          // optional: derive number of customers this month
          const uniqueCustomers = new Set(monthBookings.map(b => b.customer_id)).size;

          return {
            month: monthNames[month],
            revenue: monthRevenue,
            bookings: monthBookings.length,
            customers: uniqueCustomers
          };
        });
        setRevenueData(revenueByMonth);

        // --- Booking Status distribution ---
        const statusDistribution = ["confirmed", "pending", "cancelled"].map(status => ({
          name: status.charAt(0).toUpperCase() + status.slice(1),
          value: bookings.filter(b => b.status === status).length,
          color: status === "confirmed" ? "#10b981" : status === "pending" ? "#f59e0b" : "#ef4444"
        }));
        setBookingStatus(statusDistribution);

        // --- Top Providers by revenue ---
        const providerRevenueMap: Record<string, number> = {};
        bookings.forEach(b => {
          const pid = b.provider_id;
          if (!providerRevenueMap[pid]) providerRevenueMap[pid] = 0;
          providerRevenueMap[pid] += (b.amount ?? 0);
        });

        const topProv = providers.map(p => ({
          id: p.id,
          name: p.full_name,
          revenue: providerRevenueMap[p.id] || 0,
          bookings: bookings.filter(b => b.provider_id === p.id).length,
          rating: p.rating ?? 0,
          location: p.location ?? ""
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

        setTopProviders(topProv);

        // --- Recent Customers ---
        const recentCust = customers
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5)
          .map(c => {
            const custBookings = bookings.filter(b => b.customer_id === c.id);
            const spent = custBookings.reduce((sum, b) => sum + (b.amount ?? 0), 0);
            return {
              id: c.id,
              name: c.full_name,
              email: c.email,
              joined: c.created_at,
              bookings: custBookings.length,
              spent
            };
          });
        setRecentCustomers(recentCust);

        // --- Category Performance ---
        const categoryPerf = services.map(svc => {
          const svcBookings = bookings.filter(b => b.services_id === svc.id);
          const rev = svcBookings.reduce((sum, b) => sum + (b.amount ?? 0), 0);
          return {
            category: svc.title,
            bookings: svcBookings.length,
            revenue: rev
          };
        });
        setCategoryData(categoryPerf);

        // --- (Optional) Performance Data / System Health / Activity / Realtime Stats ---
        // You need to fetch from your tables or metrics endpoints for these
        // Example skeleton:
        /*
        const { data: activity = [] } = await supabase.from("activity_log").select("*").order("created_at", { ascending: false }).limit(20);
        setRecentActivity(activity);
        */

        // (Similarly for system health, realtime stats, feedbacks, etc.)

      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []); // You may add [timeRange] to recalc when timeRange changes

  // --- StatCard Component (same as before) ---
  const StatCard = ({ title, value, change, icon: Icon, color, prefix = '', suffix = '', showTrend = true }) => {
    const isPositive = change >= 0;
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6 text-white"/>
          </div>
          {showTrend && (
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${isPositive?'bg-emerald-50 text-emerald-700':'bg-rose-50 text-rose-700'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3"/> : <TrendingDown className="w-3 h-3"/>}
              {Math.abs(change)}%
            </div>
          )}
        </div>
        <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-900">{prefix}{value.toLocaleString()}{suffix}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm backdrop-blur-lg bg-white/95">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Admin Portal</h1>
                <p className="text-xs text-slate-500">System Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                {/* Optionally show notification badge */}
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <Settings className="w-5 h-5 text-slate-600" />
              </button>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-900">Admin User</p>
                  <p className="text-xs text-slate-500">admin@platform.com</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg">
                  A
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <LogOut className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header + Controls (Search, Tabs, Time Range) */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Dashboard Overview</h1>
              <p className="text-slate-600 text-lg mt-1">Real-time insights and analytics</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search bookings, users, providers..." 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)} 
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                />
              </div>

              <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
                <Filter className="w-5 h-5"/>
                Filter
              </button>

              <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-2">
                <Download className="w-5 h-5"/>
                Export
              </button>
            </div>
          </div>

          {/* Tabs (overview, analytics, users, etc.) — optional implementation */}
          {/* Time Range Selector */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1.5 inline-flex gap-1 mb-6 overflow-x-auto">
            {['7d','30d','3m','6m','1y'].map(range => (
              <button key={range} onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeRange === range ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '3m' ? '3 Months' : range === '6m' ? '6 Months' : '1 Year'}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Status Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Globe className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-600 font-medium">Online Users</p>
              <p className="text-xl font-bold text-slate-900">{realtimeStats.onlineUsers ?? 0}</p>
            </div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Activity className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-600 font-medium">Active Bookings</p>
              <p className="text-xl font-bold text-slate-900">{realtimeStats.activeBookings ?? 0}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-600 font-medium">Pending</p>
              <p className="text-xl font-bold text-slate-900">{realtimeStats.pendingApprovals ?? 0}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-violet-600" />
            </div>
            <div className="flex-1">
              <p class="text-xs text-slate-600 font-medium">Messages</p>
              <p className="text-xl font-bold text-slate-900">{realtimeStats.unreadMessages ?? 0}</p>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Revenue" value={overview.totalRevenue} change={overview.revenueChange} icon={DollarSign} color="from-emerald-500 to-teal-500" prefix="£"/>
          <StatCard title="Total Bookings" value={overview.totalBookings} change={overview.bookingsChange} icon={Calendar} color="from-indigo-500 to-violet-500"/>
          <StatCard title="Total Customers" value={overview.totalCustomers} change={overview.customersChange} icon={Users} color="from-violet-500 to-purple-500"/>
          <StatCard title="Total Providers" value={overview.totalProviders} change={overview.providersChange} icon={UserCheck} color="from-amber-500 to-orange-500"/>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatCard title="Avg Order Value" value={overview.avgOrderValue} change={0} icon={Target} color="from-blue-500 to-cyan-500" prefix="£" />
          <StatCard title="Conversion Rate" value={overview.conversionRate} change={0} icon={Percent} color="from-pink-500 to-rose-500" suffix="%" />
          <StatCard title="Customer Satisfaction" value={overview.customerSatisfaction} change={0} icon={Star} color="from-yellow-500 to-orange-500" suffix="/5" showTrend={false} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Revenue Analytics</h3>
                <p className="text-slate-600 text-sm">Multi-metric performance tracking</p>
              </div>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue (£)" />
                <Line type="monotone" dataKey="bookings" stroke="#6366f1" strokeWidth={3} name="Bookings" />
                { revenueData[0] && revenueData[0].customers !== undefined && (
                  <Line type="monotone" dataKey="customers" stroke="#8b5cf6" strokeWidth={3} name="New Customers" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Booking Status Pie Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Booking Status</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RePieChart>
                <Pie
                  data={bookingStatus}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                >
                  {bookingStatus.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
              </RePieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {bookingStatus.map(status => (
                <div key={status.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                    <span className="text-sm font-medium text-slate-700">{status.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{status.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Performance & Platform Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Category Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="category" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend />
                <Bar dataKey="bookings" fill="#6366f1" radius={[8, 8, 0, 0]} name="Bookings" />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Revenue (£)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Platform Score</h3>
            {performanceData.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={performanceData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" style={{ fontSize: '12px' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} style={{ fontSize: '10px' }} />
                  <Radar name="Performance" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            )}
            {performanceData.length === 0 && (
              <p className="text-slate-500 text-center py-10">No performance data available</p>
            )}
          </div>
        </div>

        {/* Activity Feed & System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Recent Activity</h3>
                <p className="text-slate-600 text-sm">Latest platform events</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-slate-600">Live</span>
              </div>
            </div>
            <div className="space-y-3">
              {recentActivity.length > 0 ? recentActivity.map(act => (
                <div key={act.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{act.description}</p>
                    <p className="text-xs text-slate-600">{act.time} • {act.user}</p>
                  </div>
                </div>
              )) : (
                <p className="text-slate-500 text-center py-8">No recent activity.</p>
              )}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Server Status</span>
                <span>{systemHealth.serverStatus ?? "Unknown"}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Uptime</span>
                <span>{systemHealth.uptime ?? "-"}%</span>
              </div>
              {/* Add more metrics as needed */}
            </div>
          </div>
        </div>

        {/* Tables: Top Providers & Recent Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Providers Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Top Providers</h3>
                <p className="text-slate-600 text-sm">Highest performing providers</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="space-y-3">
              {topProviders.length > 0 ? topProviders.map((p, i) => (
                <div key={p.id} className="flex items-center justify-between p-4 rounded-xl border hover:bg-slate-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-bold">{i + 1}</div>
                    <div>
                      <p className="font-bold text-slate-900">{p.name}</p>
                      <div className="flex gap-2 text-xs text-slate-600">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/>{p.location || 'N/A'}</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400"/>{p.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">£{p.revenue.toLocaleString()}</p>
                    <p className="text-xs text-slate-600">{p.bookings} bookings</p>
                  </div>
                </div>
              )) : (
                <p className="text-slate-500 text-center py-6">No provider data available.</p>
              )}
            </div>
          </div>

          {/* Recent Customers Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Recent Customers</h3>
                <p className="text-slate-600 text-sm">Latest customer sign-ups / spenders</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="space-y-3">
              {recentCustomers.length > 0 ? recentCustomers.map(c => (
                <div key={c.id} className="flex items-center justify-between p-4 rounded-xl border hover:bg-slate-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{c.name}</p>
                      <p className="text-xs text-slate-600">{c.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">£{c.spent.toLocaleString()}</p>
                    <p className="text-xs text-slate-600">{c.bookings} bookings</p>
                  </div>
                </div>
              )) : (
                <p className="text-slate-500 text-center py-6">No recent customers found.</p>
              )}
            </div>
          </div>
        </div>

         {/* Footer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8"/>
              <ArrowUpRight className="w-6 h-6"/>
            </div>
            <p className="font-semibold">Completed Bookings</p>
            <p className="text-2xl font-bold">{overview.completedBookings}</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-violet-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8"/>
              <Clock className="w-6 h-6"/>
            </div>
            <p className="font-semibold">Active Bookings</p>
            <p className="text-2xl font-bold">{overview.activeBookings}</p>
          </div>
          <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <XCircle className="w-8 h-8"/>
              <ArrowDownRight className="w-6 h-6"/>
            </div>
            <p className="font-semibold">Cancelled Bookings</p>
            <p className="text-2xl font-bold">{overview.cancelledBookings}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

