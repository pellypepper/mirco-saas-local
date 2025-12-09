"use client"
import {
   
   AlertCircle, Activity
} from "lucide-react";
import { CardGlass } from "./Component/CardGlass";


export default 
function BottomPanels({ stats, recentActivity }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <CardGlass>
        <h2 className="text-xl font-extrabold flex items-center gap-3 mb-5 text-chart-1">
          <AlertCircle />
          Needs Attention
        </h2>
        <div className="space-y-4">
          <AlertBox
            label={`${stats.pendingApprovals} Pending Approvals`}
            description="Review your new booking requests asap."
            color="green"
            value={stats.pendingApprovals}
            progress={stats.pendingApprovals > 10 ? 80 : stats.pendingApprovals * 8}
          />
          <AlertBox
            label={`Availability ${stats.availabilityFilled}% Filled`}
            description="Stay flexible and add more slots to maximize bookings."
            color="yellow"
            value={stats.availabilityFilled}
            progress={stats.availabilityFilled}
          />
        </div>
      </CardGlass>
      <CardGlass>
        <h2 className="text-xl font-extrabold mb-5 flex items-center gap-2 text-chart-2">
          <Activity />
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivity.length === 0 ? (
            <p className="text-gray-400">No recent bookings.</p>
          ) : (
            recentActivity.map((a: any) => (
              <div key={a.id} className="flex gap-3 pb-3">
                <div className="bg-body-bg p-2 rounded-full border border-chart-3">
                  <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base text-chart-3">{a.message}</p>
                  <p className="text-xs text-gray-500">{a.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardGlass>
    </div>
  );
}

function AlertBox({ label, description, color, value = 0, progress = 0 }: any) {
  // Color map for bars
  const barColor: any = {
    orange: "bg-orange-400",
    blue: "bg-blue-500",
    yellow: "bg-yellow-400",
    indigo: "bg-indigo-500",
    green: "bg-chart-2",
    violet: "bg-violet-500",
  };
  return (
    <div className={`p-4 bg-${color}-50 border border-${color}-200 rounded-xl`}>
      <p className="font-bold mb-1">{label}</p>
      <div className="w-full rounded-full h-2 mb-2 bg-gray-100 overflow-hidden">
        <div className={`${barColor[color]} h-2 transition-all`} style={{ width: `${progress}%` }} />
      </div>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
}