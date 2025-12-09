

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/libs/supabaseClient";
import { 
  Users, UserCheck, Calendar, DollarSign, TrendingUp, TrendingDown,
  Activity, Clock, CheckCircle, XCircle, ArrowUpRight, ArrowDownRight,
  Star, MapPin, Filter, Download, Search, Bell, Target, Percent
} from 'lucide-react';
import { 
  BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

export default function AdminDashboard() {
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
    pendingBookings: 0,
    cancelledBookings: 0,

    avgOrderValue: 0,
    conversionRate: 0,
    customerSatisfaction: 0,
  });

  const [revenueData, setRevenueData] = useState<{ month: string; revenue: number; bookings: number; }[]>([]);
  const [bookingStatus, setBookingStatus] = useState<{ name: string; value: number; color: string; }[]>([]);
  const [topProviders, setTopProviders] = useState<{ id: string; name: string; revenue: number; bookings: number; rating: number; location: string; }[]>([]);
  const [recentCustomers, setRecentCustomers] = useState<{ id: string; name: string; email: string; joined: string; bookings: number; spent: number; }[]>([]);
  const [categoryData, setCategoryData] = useState<{ category: string; bookings: number; revenue: number; }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('6m');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: bookingsData, error: bookingsError } = await supabase.from("bookings").select("*");
        if (bookingsError) throw bookingsError;

        const { data: customersData, error: customersError } = await supabase.from("profiles").select("*").eq("role", "customer");
        if (customersError) throw customersError;

        const { data: providersData, error: providersError } = await supabase.from("profiles").select("*").eq("role", "provider");
        if (providersError) throw providersError;

        const { data: servicesData, error: servicesError } = await supabase.from("services").select("*");
        if (servicesError) throw servicesError;

        if (!bookingsData || !customersData || !providersData || !servicesData) return;

        // Overview
        const totalRevenue = bookingsData.reduce((sum, b) => sum + b.amount, 0);
        const totalBookings = bookingsData.length;
        const totalCustomers = customersData.length;
        const totalProviders = providersData.length;
        const activeBookings = bookingsData.filter(b => b.status === "confirmed").length;
        const completedBookings = bookingsData.filter(b => b.status === "completed").length;
        const cancelledBookings = bookingsData.filter(b => b.status === "cancelled").length;
        const pendingBookings = bookingsData.filter(b => b.status === "pending").length;

        setOverview({
          totalRevenue,
          revenueChange: 0,
          totalBookings,
          bookingsChange: 0,
          totalCustomers,
          customersChange: 0,
          totalProviders,
          providersChange: 0,
          activeBookings,
          completedBookings,
          cancelledBookings,
          pendingBookings,

          avgOrderValue: 0,
    conversionRate: 0,
    customerSatisfaction: 0,
        });

        // Revenue by last 6 months
        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const revenueByMonth = Array.from({ length: 6 }).map((_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - (5 - i));
          const month = date.getMonth();
          const year = date.getFullYear();
          const monthRevenue = bookingsData.filter(b => new Date(b.booking_date).getMonth() === month && new Date(b.booking_date).getFullYear() === year).reduce((sum, b) => sum + b.amount, 0);
          const monthBookings = bookingsData.filter(b => new Date(b.booking_date).getMonth() === month && new Date(b.booking_date).getFullYear() === year).length;
          return { month: monthNames[month], revenue: monthRevenue, bookings: monthBookings };
        });
        setRevenueData(revenueByMonth);

        // Booking Status
        const statusDistribution = ["confirmed", "pending", "cancelled"].map(status => ({
          name: status.charAt(0).toUpperCase() + status.slice(1),
          value: bookingsData.filter(b => b.status === status).length,
          color: status === "confirmed" ? "#009689" : status === "pending" ? "#eab308" : "#f54900"
        }));
        setBookingStatus(statusDistribution);

        // Top Providers
        const providerRevenueMap: Record<string, number> = {};
        bookingsData.forEach(b => {
          if (!providerRevenueMap[b.provider_id]) providerRevenueMap[b.provider_id] = 0;
          providerRevenueMap[b.provider_id] += b.amount;
        });

        const topProvidersList = providersData.map(p => ({
          id: p.id,
          name: p.full_name,
          revenue: providerRevenueMap[p.id] || 0,
          bookings: bookingsData.filter(b => b.provider_id === p.id).length,
          rating: p.rating || 0,
          location: p.location
        })).sort((a,b) => b.revenue - a.revenue).slice(0,5);
        setTopProviders(topProvidersList);

        // Recent Customers
        const recentCustomersList = customersData.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0,5).map(c => {
          const customerBookings = bookingsData.filter(b => b.customer_id === c.id);
          return {
            id: c.id,
            name: c.full_name,
            email: c.email,
            joined: c.created_at,
            bookings: customerBookings.length,
            spent: customerBookings.reduce((sum,b) => sum + b.amount,0)
          };
        });
        setRecentCustomers(recentCustomersList);

        // Category Performance
        const categoryPerformance = servicesData.map(s => {
          const serviceBookings = bookingsData.filter(b => b.services_id === s.id);
          return {
            category: s.title,
            bookings: serviceBookings.length,
            revenue: serviceBookings.reduce((sum,b) => sum + b.amount,0)
          };
        });
        setCategoryData(categoryPerformance);

      } catch(err) {
        console.error("Error fetching dashboard data", err);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, change, icon: Icon, color, prefix='', suffix='' }) => {
    const isPositive = change >= 0;
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white"/>
          </div>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${isPositive?'bg-emerald-50 text-emerald-700':'bg-rose-50 text-rose-700'}`}>
            {isPositive?<TrendingUp className="w-3 h-3"/>:<TrendingDown className="w-3 h-3"/>}
            {Math.abs(change)}%
          </div>
        </div>
        <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-900">{prefix}{value.toLocaleString()}{suffix}</p>
      </div>
    )
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">Dashboard Overview</h1>
            <p className="text-slate-600 text-base md:text-lg mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Search..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"/>
            </div>
            <button className="px-5 py-2 md:p-3 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Filter className="w-5 h-5"/>
              Filter
            </button>
            <button className="px-5  bg-gradient-to-r from-chart-2 to-chart-3 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-2">
              <Download className="w-5 h-5"/>
              Export
            </button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="bg-white rounded-xl grid grid-cols-2 md:inline-flex shadow-sm border border-slate-200 p-2 mb-8  gap-1">
          {['7d', '30d', '3m', '6m'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-chart-2 to-chart-3 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '3m' ? '3 Months' : range === '6m' ? '6 Months' : '1 Year'}
            </button>
          ))}
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Revenue" value={overview.totalRevenue} change={overview.revenueChange} icon={DollarSign} color="from-chart-2 to-chart-2" prefix="£"/>
          <StatCard title="Total Bookings" value={overview.totalBookings} change={overview.bookingsChange} icon={Calendar} color="from-chart-4 to-chart-4"/>
          <StatCard title="Total Customers" value={overview.totalCustomers} change={overview.customersChange} icon={Users} color="from-chart-1 to-chart-1"/>
          <StatCard title="Total Providers" value={overview.totalProviders} change={overview.providersChange} icon={UserCheck} color="from-chart-3 to-chart-3"/>
        </div>

  
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Revenue Overview</h3>
                <p className="text-slate-600 text-sm">Monthly revenue and bookings trend</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fill="url(#revenueGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Booking Status Pie Chart */}
        <div className="bg-primary-white rounded-2xl p-6 shadow-sm border border-slate-200">
  <h3 className="text-xl font-bold text-slate-900 mb-4">Booking Status</h3>
  <ResponsiveContainer width="100%" height={250}>
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
        {bookingStatus.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: '#fff',
          border: '1px solid #009689',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        }}
      />
    </RePieChart>
  </ResponsiveContainer>

  {/* Status Legend */}
  <div className="space-y-2 mt-4">
    {bookingStatus.map((status) => (
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

        {/* Category Performance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Category Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="category" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
              <Bar dataKey="bookings" fill="#6366f1" radius={[8, 8, 0, 0]}/>
              <Bar dataKey="revenue" fill="#009689" radius={[8, 8, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Providers */}
       {/* Top Providers */}
<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="text-xl font-bold text-slate-900 mb-1">Top Providers</h3>
      <p className="text-slate-600 text-xs md:text-sm">Highest performing service providers</p>
    </div>
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-chart-1 to-chart-1 flex items-center justify-center shadow-lg">
      <Star className="w-4 h-4 md:w-5 md:h-5 text-white" />
    </div>
  </div>

  <div className="space-y-3">
    {topProviders.map((provider, index) => (
      <div 
        key={provider.id} 
        className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
      >
        {/* Rank */}
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-chart-2 to-chart-2 text-white font-bold shadow-lg">
          {index + 1}
        </div>

        {/* Provider Info */}
        <div className="flex-1">
          <p className="font-bold text-slate-900">{provider.name}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-slate-600 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {provider.location || 'N/A'}
            </span>
            <span className="text-xs hidden md:flex text-slate-600  items-center gap-1">
              <Star className="w-3 h-3 fill-chart-5 text-chart-5" />
              {provider.rating?.toFixed(1) || '0.0'}
            </span>
          </div>
        </div>

        {/* Revenue & Bookings */}
        <div className="text-right">
          <p className="font-bold text-slate-900">£{provider.revenue.toLocaleString()}</p>
          <p className="text-xs text-slate-600">{provider.bookings} bookings</p>
        </div>
      </div>
    ))}

    {/* Empty state */}
    {topProviders.length === 0 && (
      <p className="text-sm text-slate-500 text-center py-6">
        No provider data available.
      </p>
    )}
  </div>
</div>



    {/* Recent Customers */}
<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="text-xl font-bold text-slate-900 mb-1">Recent Customers</h3>
      <p className="text-slate-600 text-sm">Latest customer registrations</p>
    </div>
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-chart-2 to-chart-3 flex items-center justify-center shadow-lg">
      <Users className="w-5 h-5 text-white" />
    </div>
  </div>

  <div className="space-y-3">
    {recentCustomers.map((customer) => (
      <div 
        key={customer.id} 
        className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
      >
        {/* Avatar */}
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-chart-2 to-chart-2 flex items-center justify-center text-white font-bold shadow-lg">
          {customer.name.charAt(0).toUpperCase()}
        </div>

        {/* Customer Info */}
        <div className="flex-1">
          <p className="font-bold text-slate-900">{customer.name}</p>
          <p className="text-xs text-slate-600">{customer.email}</p>
        </div>

        {/* Spending & Bookings */}
        <div className="text-right">
          <p className="font-bold text-slate-900">£{customer.spent.toLocaleString()}</p>
          <p className="text-xs text-slate-600">{customer.bookings} bookings</p>
        </div>
      </div>
    ))}

    {/* Empty State */}
    {recentCustomers.length === 0 && (
      <p className="text-sm text-slate-500 text-center py-6">
        No recent customers found.
      </p>
    )}
  </div>
</div>

        </div>

                      {/* Secondary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatCard title="Avg Order Value" value={overview.avgOrderValue} change={0} icon={Target} color="from-chart-2 to-chart-3" prefix="£" />
          <StatCard title="Conversion Rate" value={overview.conversionRate} change={0} icon={Percent} color="from-chart-5 to-chart-5" suffix="%" />
          <StatCard title="Customer Satisfaction" value={overview.customerSatisfaction} change={0} icon={Star} color="from-chart-4 to-chart-4" suffix="/5" showTrend={false} />
        </div>


        {/* Footer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-chart-2/80 to-chart-2/80 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8"/>
              <ArrowUpRight className="w-6 h-6"/>
            </div>
            <p className="font-semibold">Completed Bookings</p>
            <p className="text-2xl font-bold">{overview.completedBookings}</p>
          </div>
          <div className="bg-gradient-to-br from-chart-1/80 to-chart-1/80 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8"/>
              <Clock className="w-6 h-6"/>
            </div>
            <p className="font-semibold">Active Bookings</p>
            <p className="text-2xl font-bold">{overview.activeBookings}</p>
          </div>
             <div className="bg-gradient-to-br from-chart-3/80 to-chart-3/80 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
                              <Bell className="w-8 h-8 " />
              <Clock className="w-6 h-6"/>
            </div>
            <p className="font-semibold">Pending Bookings</p>
            <p className="text-2xl font-bold">{overview.pendingBookings}</p>
          </div>
          <div className="bg-gradient-to-br from-chart-5/80 to-chart-5/80 rounded-2xl p-6 text-white shadow-lg">
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
