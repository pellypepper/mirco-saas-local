"use client";

import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Briefcase,
  Users,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";
import { useGetProviderEmail } from "@/hooks/useUserProfile";
import useExtraService from "@/hooks/extraServices";
import { useMainNavBar } from "@/hooks/MainNavContext";

const About = ({ provider }: { provider: any }) => {
  const providerWithEmail = useGetProviderEmail(provider.id);
  const { services } = useExtraService(provider.id);
  const { isDarkMode } = useMainNavBar();

  /* THEME TOKENS */
  const surface = isDarkMode ? "bg-zinc-800" : "bg-white";
  const surfaceSoft = isDarkMode ? "bg-zinc-900/50" : "bg-zinc-100";
  const border = isDarkMode ? "border-zinc-500" : "border-chart-2/20";

  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-300" : "text-zinc-700";
  const textMuted = isDarkMode ? "text-zinc-400" : "text-gray-700";

  return (
    <div className="px-8 pb-8">
      <div className="grid lg:grid-cols-3 gap-8">

        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-6">

          {/* ABOUT */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-chart-2 rounded-xl shadow-lg">
                <Users size={24} className="text-white" />
              </div>
              <h2 className={`md:text-2xl text-xl font-bold ${textPrimary}`}>
                About Me
              </h2>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-chart-3 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition" />
              <div
                className={`relative border-2 rounded-2xl p-6 transition ${surfaceSoft} ${border}`}
              >
                <p className={`text-sm md:text-base leading-relaxed ${textSecondary}`}>
                  {provider.bio || "No biography provided yet."}
                </p>
              </div>
            </div>
          </div>

          {/* SERVICES */}
          {services?.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-chart-4 rounded-xl shadow-lg">
                  <Briefcase size={24} className="text-white" />
                </div>
                <h3 className={`md:text-xl text-lg font-bold ${textPrimary}`}>
                  Services Offered
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {services.map((service: any) => (
                  <span
                    key={service.id}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full border-2 cursor-pointer transition
                      ${surface} ${border} ${textPrimary}
                      hover:border-chart-2 hover:text-chart-2`}
                  >
                    <Award size={14} className="text-chart-2" />
                    {service.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">

          {/* CONTACT */}
          <div className="relative group">
            <div className="absolute inset-0 bg-chart-4 rounded-3xl opacity-0 group-hover:opacity-10 blur-2xl transition" />
            <div
              className={`relative border-2 rounded-3xl p-6 shadow-2xl transition ${surface} ${border}`}
            >
              <h3 className={`text-lg font-bold mb-6 ${textPrimary}`}>
                Contact Info
              </h3>

              <div className="space-y-5">

                {/* ITEM */}
                {[
                  { icon: MapPin, label: "Location", value: provider.location },
                  providerWithEmail && {
                    icon: Mail,
                    label: "Email",
                    value: providerWithEmail.email,
                  },
                  provider.phone_number && {
                    icon: Phone,
                    label: "Phone",
                    value: provider.phone_number,
                  },
                ]
                  .filter(Boolean)
                  .map((item: any, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className={`p-2 rounded-xl border ${surfaceSoft} ${border}`}
                      >
                        <item.icon size={18} className={`${isDarkMode ? "text-chart-2" : "text-chart-2"}`} />
                      </div>
                      <div>
                        <div className={`text-xs uppercase font-semibold ${textMuted}`}>
                          {item.label}
                        </div>
                        <div className={`font-medium text-sm ${textPrimary}`}>
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}

                {/* WEBSITE */}
                {provider.website && (
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-xl border ${surfaceSoft} ${border}`}>
                      <Globe size={18} className={`${isDarkMode ? "text-chart-2" : "text-chart-2"}`} />
                    </div>
                    <a
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-chart-2 text-sm font-medium "
                    >
                        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Website</div>
            
                   <div className={`${isDarkMode ? "text-white" : "text-chart-2"} flex gap-2 items-center`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                       Visit Website
                       
                   </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="relative group">
            <div className="absolute inset-0 bg-chart-2 rounded-3xl opacity-0 group-hover:opacity-10 blur-2xl transition" />
            <div
              className={`relative border-2 rounded-3xl p-6 shadow-2xl transition ${surface} ${border}`}
            >
              <h3 className={`text-lg font-bold mb-6 ${textPrimary}`}>
                Quick Stats
              </h3>

              {[
                {
                  label: "Experience",
                  icon: TrendingUp,
                  value: `${provider.years_of_experience || "N/A"} yrs`,
                },
                {
                  label: "Clients Served",
                  icon: Users,
                  value: `${provider.clients_served || "N/A"}+`,
                },
                {
                  label: "Response Time",
                  icon: Clock,
                  value: provider.response_time || "< 24h",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-xl border mb-3 ${surfaceSoft} ${border}`}
                >
                  <div className="flex items-center gap-3">
                    <stat.icon size={18} className={`${isDarkMode ? "text-white" : "text-black"}`} />
                    <span className={`text-sm ${textMuted}`}>{stat.label}</span>
                  </div>
                  <span className={`font-bold ${textPrimary}`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
