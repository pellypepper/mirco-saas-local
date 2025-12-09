"use client";

export function CardGlass({ children, className = "" }: { children: any; className?: string }) {
  return (
    <div className={`bg-primary-white rounded-2xl shadow-xl p-6 border border-gray-100 backdrop-blur-lg ${className}`}>
      {children}
    </div>
  );
}
