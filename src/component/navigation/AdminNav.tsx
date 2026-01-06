"use client";
import { Bell, Settings, LogOut,  CalendarCheck, Shield, Menu , Users, DollarSign} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminNav = ({
  handleLogout,
  user,
  profile,
}: {
  handleLogout: () => void;
  user: any;
  profile: any;
}) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [notifications, setNotifications] = useState<
    Array<{ id: number; title: string; time: string }>
  >([
    { id: 1, title: "New user registered", time: "2 mins ago" },
    { id: 2, title: "Server downtime resolved", time: "1 hour ago" },
    { id: 3, title: "New booking received", time: "3 hours ago" },
  ]);

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
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <div className="absolute top-12 right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Notifications</span>
                  <button
                    onClick={() => setNotifications([])}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length === 0 && (
                    <p className="p-4 text-sm text-gray-500 text-center">No notifications</p>
                  )}
                  <ul>
                    {notifications.map((n) => (
                      <li
                        key={n.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <p className="text-sm font-medium text-slate-800">{n.title}</p>
                        <p className="text-xs text-gray-500">{n.time}</p>
                      </li>
                    ))}
                  </ul>
                </div>
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
              <div className="absolute top-12 right-14 w-48 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden">
                <ul className="flex flex-col">
                        <li 
                    onClick={() => (router.push("/dashboard/Admin"), setMenuOpen(false))}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <Settings className="w-4 h-4 inline mr-2 text-gray-600" />
          Dashboard
                  </li>
                  <li 
                    onClick={() => (router.push("/dashboard/Admin/revenue"), setMenuOpen(false))}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                  <DollarSign className="w-4 h-4 inline mr-2 text-gray-600" />
                Revenue & Payout
                  </li>
                      <li 
                    onClick={() => (router.push("/dashboard/Admin/users"), setMenuOpen(false))}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                   <Users className="w-4 h-4 inline mr-2 text-gray-600" />
                User Management
                  </li>
             
                      <li 
                    onClick={() => (router.push("/dashboard/Admin/booking"), setMenuOpen(false))}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                     <CalendarCheck className="w-4 h-4 inline mr-2 text-gray-600" />
                  Bookings
                  </li>
                  
                  <li
                    onClick={handleLogout}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center"
                  >
                    <LogOut className="w-4 h-4 inline mr-2 text-gray-600" />
                    Logout
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
