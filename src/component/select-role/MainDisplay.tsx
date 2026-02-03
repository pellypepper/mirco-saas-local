"use client";


import { useRoleSelection } from "@/hooks/useRoleSelection";
import { useMainNavBar } from "@/hooks/MainNavContext";
import { User, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SelectRoleBackground from "./component/SelectRoleBackground";
import SelectRoleHeader from "./component/SelectRoleHeader";
import RoleCard from "./component/RoleCard";

const ROLE_CONFIG = {
  customer: {
    title: "I'm a Customer",
    description: "Book appointments, manage reservations, and access services from providers.",
    icon: User,
    options: [
      "Browse and book services",
      "Manage your bookings",
      "View booking history",
    ],
  },
  provider: {
    title: "I'm a Provider",
    description: "Offer your services, manage bookings, and grow your business.",
    icon: Briefcase,
    options: [
      "Create and manage services",
      "Set your availability",
      "Track your bookings",
    ],
  },
} as const;

export default function SelectRolePage() {

  const { isDarkMode } = useMainNavBar();
  const { selectedRole, setSelectedRole, loading, error, handleContinue } = useRoleSelection();

  /* THEME TOKENS */
  const bgPrimary = isDarkMode ? "bg-zinc-900" : "bg-zinc-50";
  const bgSecondary = isDarkMode ? "bg-zinc-800" : "bg-white";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-400" : "text-zinc-600";



  return (
    <div
      className={`min-h-screen ${bgPrimary} flex items-center justify-center p-4 transition-colors duration-300`}
    >
      <SelectRoleBackground />

      <div className="relative w-full max-w-4xl">
        <SelectRoleHeader textPrimary={textPrimary} textSecondary={textSecondary} />

        {/* Role Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {(Object.keys(ROLE_CONFIG) as Array<keyof typeof ROLE_CONFIG>).map((role) => (
            <RoleCard
              key={role}
              role={role}
              title={ROLE_CONFIG[role].title}
              description={ROLE_CONFIG[role].description}
              icon={ROLE_CONFIG[role].icon}
               options={[...ROLE_CONFIG[role].options] as string[]}
              selected={selectedRole === role}
              onSelect={() => setSelectedRole(role)}
              bgSecondary={bgSecondary}
              border={border}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl">
            <p className="text-red-400 text-sm font-semibold text-center">{error}</p>
          </div>
        )}

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={!selectedRole || loading}
          className={`w-full h-14 text-lg font-bold rounded-xl transition-all duration-300 ${
            !selectedRole || loading
              ? `${
                  isDarkMode
                    ? "bg-zinc-800 border-2 border-zinc-700 text-zinc-600"
                    : "bg-zinc-200 border-2 border-zinc-300 text-zinc-400"
                } cursor-not-allowed`
              : "bg-chart-2 text-white hover:shadow-2xl hover:shadow-chart-2/50"
          }`}
        >
          {loading ? (
            "Setting up your account..."
          ) : (
            <span className="flex items-center justify-center gap-2">
              Continue
              <ArrowRight className="w-5 h-5" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}