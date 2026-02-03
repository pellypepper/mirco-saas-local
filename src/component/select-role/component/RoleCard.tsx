"use client";

import { LucideIcon } from "lucide-react";
import RoleOption from "./RoleOption";

interface RoleCardProps {
  role: "customer" | "provider";
  title: string;
  description: string;
  icon: LucideIcon;
  options: string[];
  selected: boolean;
  onSelect: () => void;
  bgSecondary: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  isDarkMode: boolean;
}

export default function RoleCard({
  role,
  title,
  description,
  icon: Icon,
  options,
  selected,
  onSelect,
  bgSecondary,
  border,
  textPrimary,
  textSecondary,
  isDarkMode,
}: RoleCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`group relative ${bgSecondary} border-2 ${
        selected ? "border-chart-2" : border
      } rounded-3xl p-8 text-left transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        selected ? "ring-4 ring-chart-2/20" : ""
      }`}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 bg-chart-2 rounded-3xl opacity-0 ${
          selected ? "opacity-5" : "group-hover:opacity-5"
        } transition-opacity`}
      ></div>

      <div className="relative">
        {/* Icon */}
        <div
          className={`inline-flex p-4 rounded-2xl mb-6 ${
            selected
              ? "bg-chart-2"
              : isDarkMode
              ? "bg-zinc-900"
              : "bg-zinc-100"
          } transition-colors`}
        >
          <Icon
            className={`w-8 h-8 ${
              selected ? "text-white" : "text-chart-2"
            }`}
          />
        </div>

        {/* Title */}
        <h3 className={`text-2xl font-black ${textPrimary} mb-3`}>
          {title}
        </h3>

        {/* Description */}
        <p className={`${textSecondary} mb-4`}>{description}</p>

        {/* Options List */}
        <ul className={`space-y-2 ${textSecondary} text-sm`}>
          {options.map((option, index) => (
            <RoleOption key={index}  text={option} />
          ))}
        </ul>

        {/* Checkmark */}
        {selected && (
          <div className="absolute top-4 right-4">
            <div className="w-6 h-6 rounded-full bg-chart-2 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}