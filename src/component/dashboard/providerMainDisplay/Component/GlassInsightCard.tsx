export default function GlassInsightCard({ icon, label, value, desc }: any) {
  return (
    <div className="rounded-2xl bg-body-bg shadow-lg border border-chart-2/10 p-5 flex flex-col gap-2">
      <span className="mb-2">{icon}</span>
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
}