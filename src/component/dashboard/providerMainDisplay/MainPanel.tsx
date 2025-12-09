"use client";
import {
   Clock, 
  ArrowRight,  Sparkles
} from "lucide-react";
import { CardGlass } from "./Component/CardGlass";

export default function MainPanels({ upcoming, quickActions }: any) {


  return (
    <div className="grid lg:grid-cols-3 gap-6 mb-10">
      <CardGlass className="lg:col-span-2">
        <h2 className="text-xl font-extrabold flex items-center gap-3 mb-5 text-chart-2">
          <Clock className="w-5 h-5" />
          Today's Appointments
        </h2>
        <div className="space-y-3">
          {upcoming.length === 0 ? (
            <p className="text-gray-500">No appointments today.</p>
          ) : upcoming.map((b: any) => (
            <div
              key={b.id}
              className="p-4 bg-body-bg rounded-xl border border-chart-2/10"
            >
              <p className="font-semibold text-chart-2">{b.customer?.full_name}</p>
              <p className="text-sm text-gray-600">{b.services?.title}</p>
            </div>
          ))}
        </div>
      </CardGlass>
      <CardGlass>
        <h2 className="text-xl font-extrabold mb-5 flex items-center gap-2 text-chart-2">
          <Sparkles className="w-5 h-5" />
          Quick Actions
        </h2>
        <div className="space-y-3">
          {quickActions.map((a: any, i: number) => (
            console.log(a),
            <a
              key={i}
              href={a.link}
              className={`w-full p-4 bg-body-bg rounded-xl border border-${a.color.border}-200 flex justify-between hover:scale-[1.02] transition-transform items-center gap-2 shadow-sm`}
            >
              <span className="flex items-center gap-3">
                <a.icon className={`${a.color.text} w-5 h-5`} />
                <span className="font-semibold">{a.label}</span>
              </span>
              <ArrowRight className="text-gray-400 w-4 h-4" />
            </a>
          ))}
        </div>
      </CardGlass>
    </div>
  );
}

