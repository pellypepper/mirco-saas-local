"use client";
import { Bell, Settings, LogOut, CalendarCheck, Shield, Menu, Users, DollarSign, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotification";
import { notificationService } from "@/services/notificationService";

const AdminNav = ({
  handleLogout,
  user,
  profile,
}:  {
  handleLogout: () => void;
  user: any;
  profile: any;
}) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
    deleteNotification,
  } = useNotifications();

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.link) {
      router.push(notification.link);
    }
    setNotificationOpen(false);
  };

  return (
    <div className="bg-primary-white border-b border-slate-200 sticky top-0 z-50 shadow-sm backdrop-blur-lg">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-chart-2 to-chart-3 flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900">Admin Portal</h1>
              <p className="text-xs hidden md:flex text-slate-500">System Management</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 relative">
            {/* Notification Button */}
            <button
              onClick={() => setNotificationOpen(! notificationOpen)}
              className="relative p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              {unreadCount > 0 && (
                <>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                </>
              )}
            </button>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <div className="absolute top-12 right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-chart-2/5 to-chart-3/5">
                  <div>
                    <span className="font-semibold text-slate-900">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {notifications.length > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-chart-2 hover:text-chart-3 font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button
                        onClick={clearAll}
                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Bell className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-sm text-slate-600 font-medium">No notifications yet</p>
                      <p className="text-xs text-slate-500 mt-1">You're all caught up!</p>
                    </div>
                  ) : (
                    <ul>
                      {notifications.map((notification) => {
                        const style = notificationService.getNotificationStyle(notification.type);
                        return (
                          <li
                            key={notification.id}
                            className={`group relative px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-100 ${
                              ! notification.read ? 'bg-blue-50/30' : ''
                            }`}
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-lg ${style.color} flex items-center justify-center flex-shrink-0 text-lg`}>
                                {style.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-sm font-semibold text-slate-900">
                                    {notification.title}
                                  </p>
                                  {!notification.read && (
                                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e. stopPropagation();
                                  deleteNotification(notification. id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
                              >
                                <X className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
                    <button
                      onClick={() => {
                        router.push('/dashboard/Admin/notifications');
                        setNotificationOpen(false);
                      }}
                      className="text-sm text-chart-2 hover:text-chart-3 font-medium w-full text-center"
                    >
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>

            {/* Menu Dropdown */}
            {menuOpen && (
              <div className="absolute top-12 right-14 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                <ul className="flex flex-col py-2">
                  <li
                    onClick={() => (router.push("/dashboard/Admin"), setMenuOpen(false))}
                    className="px-4 py-3 hover:bg-gradient-to-r hover:from-chart-2/20 hover:tochart-3/20 cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <Settings className="w-4 h-4 text-gray-600 group-hover:text-chart-2 transition-colors" />
                    <span className="font-medium text-gray-700 group-hover:text-chart-2">Dashboard</span>
                  </li>
                  <li
                    onClick={() => (router.push("/dashboard/Admin/revenue"), setMenuOpen(false))}
                    className="px-4 py-3 hover:bg-gradient-to-r hover: from-chart-2/20 hover: tochart-3/20 cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <DollarSign className="w-4 h-4 text-gray-600 group-hover:text-chart-2 transition-colors" />
                    <span className="font-medium text-gray-700 group-hover:text-chart-2">Revenue & Payout</span>
                  </li>
                  <li
                    onClick={() => (router.push("/dashboard/Admin/users"), setMenuOpen(false))}
                    className="px-4 py-3 hover:bg-gradient-to-r hover:from-chart-2/20 hover:tochart-3/20 cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <Users className="w-4 h-4 text-gray-600 group-hover:text-chart-2 transition-colors" />
                    <span className="font-medium text-gray-700 group-hover:text-chart-2">User Management</span>
                  </li>
                  <li
                    onClick={() => (router.push("/dashboard/Admin/booking"), setMenuOpen(false))}
                    className="px-4 py-3 hover:bg-gradient-to-r hover: from-chart-2/20 hover: tochart-3/20 cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <CalendarCheck className="w-4 h-4 text-gray-600 group-hover:text-chart-2 transition-colors" />
                    <span className="font-medium text-gray-700 group-hover:text-chart-2">Bookings</span>
                  </li>
                  <div className="h-px bg-slate-200 my-2"></div>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-3 hover:bg-gradient-to-r hover:from-chart-1/20 hover:to-chart-4/20 cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <LogOut className="w-4 h-4 text-gray-600 group-hover:text-chart-1 transition-colors" />
                    <span className="font-medium text-gray-700 group-hover:text-chart-1">Logout</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Divider */}
            <div className="h-8 w-px bg-slate-200"></div>

            {/* User */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{profile?.full_name || "Admin"}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-chart-2 flex items-center justify-center text-white font-bold shadow-lg">
                {profile?.full_name?.[0]?.toUpperCase() || "A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;