"use client";

export default function SelectRoleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-chart-2 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-chart-3 opacity-10 rounded-full blur-3xl"></div>
    </div>
  );
}