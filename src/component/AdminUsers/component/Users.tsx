"use client"

import { 
  Users, 

  Mail, 
  Phone, 

  Activity,

} from "lucide-react";

const User = ({ sortedUsers, toggleSort,  SortIcon, setSelectedUser }: { sortedUsers: any[], toggleSort: (key: string) => void, SortIcon: any, setSelectedUser: (user: any) => void }) => {
  return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th 
                      className="px-6 py-4 text-left cursor-pointer hover:bg-slate-100 transition-colors"
                      onClick={() => toggleSort("name")}>
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        User
                        <SortIcon column="name" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        Contact
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-center cursor-pointer hover:bg-slate-100 transition-colors"
                      onClick={() => toggleSort("totalBookings")}>
                      <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
                        Bookings
                        <SortIcon column="totalBookings" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-center cursor-pointer hover:bg-slate-100 transition-colors"
                      onClick={() => toggleSort("totalSpent")}>
                      <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
                        Total Spent
                        <SortIcon column="totalSpent" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center">
                      <div className="text-sm font-semibold text-slate-700">Status</div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left cursor-pointer hover:bg-slate-100 transition-colors"
                      onClick={() => toggleSort("lastBooking")}>
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        Last Booking
                        <SortIcon column="lastBooking" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedUsers.map((user) => (
                    <tr 
                      key={user.id}
                      className="hover:bg-blue-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedUser(user)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-chart-2 to-chart-3 flex items-center justify-center text-white font-semibold">
                            {user.full_name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">{user.full_name}</p>
                            <p className="text-sm text-slate-500">{user.location ? user.location : "N/A"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Phone className="w-3 h-3" />
                            {user.phone_number ? user.phone_number : "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex flex-col items-center gap-1">
                          <span className="text-2xl font-bold text-slate-800">{user.totalBookings}</span>
                          <div className="flex gap-1 text-xs">
                            <span className="px-2 py-0.5 bg-chart-2/20 text-chart-2 rounded-full">{user.completedBookings}</span>
                            <span className="px-2 py-0.5 bg-chart-3/20 text-chart-3 rounded-full">{user.pendingBookings}</span>
                            <span className="px-2 py-0.5 bg-chart-1/20 text-chart-1 rounded-full">{user.cancelledBookings}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xl font-bold text-chart-2">
                          ${user.totalSpent.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {user.pendingBookings > 0 ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-chart-2/20 text-chart-2 rounded-full text-sm font-medium">
                            <Activity className="w-3 h-3" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">
                          {new Date(user.lastBooking).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {sortedUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No users found</p>
              </div>
            )}
          </div>
  )
}

export default User
