export default function GlassInsightCard({ icon, label, value, desc, isDarkMode }: any) {
  return (
    <div className={`rounded-2xl shadow-lg border p-5 flex flex-col gap-2 hover:bg-chart-2/20 cursor-pointer hover:scale-[1.03] transition-all duration-150 backdrop-blur-sm ${isDarkMode ? "bg-zinc-800 border-chart-4/20" : "bg-white border-gray-300"}`}>
      <span className="mb-2">{icon}</span>
      <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>{label}</p>
      <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{value}</p>
      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{desc}</p>
    </div>
  );
}