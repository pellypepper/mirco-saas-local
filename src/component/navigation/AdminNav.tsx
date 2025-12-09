"use client"
import { 
Bell, Settings, LogOut,
 Shield
 
} from 'lucide-react';


const AdminNav = ({ handleLogout,user, profile }: { handleLogout: () => void, user: any, profile: any }) => {

  console.log("AdminNav profile:", profile);
    console.log("AdminNav user:", user);

  return (
    <div className="bg-primary-white border-b border-slate-200 sticky top-0 z-50 shadow-sm backdrop-blur-lg">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-chart-2 to-chart-3 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-900">Admin Portal</h1>
                <p className="text-xs hidden md:flex text-slate-500">System Management</p>
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
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-chart-2 flex items-center justify-center text-white font-bold shadow-lg">
               {profile?.full_name[0]?.toUpperCase()}
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <LogOut onClick={handleLogout} className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AdminNav
