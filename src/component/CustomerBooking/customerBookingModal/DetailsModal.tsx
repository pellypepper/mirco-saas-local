"use client";

import {
  Clock,
  DollarSign,
  X,
  Star,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  Calendar,
  User,
  Award,
} from "lucide-react";
import { BookingCustomer } from "@/types/type";
import { useMainNavBar } from "@/hooks/MainNavContext";

const DetailsModal = ({
  booking,
  onClose,
}: {
  booking: BookingCustomer | null;
  onClose: () => void;
}) => {
  const { isDarkMode } = useMainNavBar();
  if (!booking) return null;

  /* THEME TOKENS */
  const surface = isDarkMode ? "bg-zinc-800" : "bg-white";
  const surfaceSoft = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const surfaceInner = isDarkMode ? "bg-zinc-800" : "bg-white";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-300";
  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-400" : "text-zinc-600";
  const textMuted = "text-zinc-500";

  return (
    <div className={`${isDarkMode ? "bg-black/50" : "bg-white/50"} fixed inset-0  backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300`}>
      <div
        className={`rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in duration-500 border-2 ${surface} ${border}`}
      >
        {/* HEADER */}
        <div className="sticky top-0 p-6 z-10 bg-chart-2 border-b-2 border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <Award size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white">Booking Details</h2>
                <p className="text-white/90 text-sm font-medium">
                  Complete appointment information
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 hover:rotate-90 border border-white/30"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
          <div className="p-6 space-y-6">
            {/* SERVICE INFO */}
            <Section
              title="Service Information"
              icon={<Award size={20} className="text-white" />}
              accent="chart-2"
              surfaceSoft={surfaceSoft}
              border={border}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
            >
              <p className="text-3xl font-black mb-2">{booking.services.title}</p>
              <p className={`${textSecondary} leading-relaxed`}>
                {booking.services.description}
              </p>

              <div className={`flex flex-wrap gap-4 pt-4 mt-4 border-t-2 ${border}`}>
                <InfoPill
                  icon={<Clock className="text-chart-4" />}
                  label="Duration"
                  value={`${booking.services.duration_minutes} min`}
                  surfaceInner={surfaceInner}
                  border={border}
                />
                <InfoPill
                  icon={<DollarSign className="text-green-600" />}
                  label="Amount"
                  value={`$${(booking.amount / 100).toFixed(2)}`}
                  surfaceInner={surfaceInner}
                  border={border}
                />
              </div>
            </Section>

            {/* PROVIDER INFO */}
            <Section
              title="Provider Information"
              icon={<User size={20} className="text-white" />}
              accent="chart-4"
              surfaceSoft={surfaceSoft}
              border={border}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
            >
              <div className={`flex items-center gap-4 p-4 rounded-xl border ${surfaceInner} ${border}`}>
                <div className="w-16 h-16 rounded-full bg-chart-4 flex items-center justify-center text-white text-2xl font-black border-2 border-zinc-200">
                  {booking.provider.full_name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-black text-xl">{booking.provider.full_name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 fill-chart-2 text-chart-2" />
                    <span className="font-bold">{booking.provider.rating}</span>
                    <span className={textMuted}>(reviews)</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <ContactRow
                  icon={<MapPin className="text-chart-2" />}
                  label="Location"
                  value={`${booking.provider.location}, ${booking.provider.country}`}
                  surfaceInner={surfaceInner}
                  border={border}
                />
                <ContactRow
                  icon={<Mail className="text-chart-4" />}
                  label="Email"
                  value={booking.provider.email}
                  surfaceInner={surfaceInner}
                  border={border}
                />
                <ContactRow
                  icon={<Phone className="text-green-600" />}
                  label="Phone"
                  value={booking.provider.phone_number}
                  surfaceInner={surfaceInner}
                  border={border}
                />
              </div>
            </Section>

            {/* APPOINTMENT DETAILS */}
            <Section
              title="Appointment Details"
              icon={<Calendar size={20} className="text-white" />}
              accent="chart-2"
              surfaceSoft={surfaceSoft}
              border={border}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <DetailBox label="Date" surfaceInner={surfaceInner} border={border}>
                  {new Date(booking.booking_date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </DetailBox>

                <DetailBox label="Time" surfaceInner={surfaceInner} border={border}>
                  {new Date(booking.booking_date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </DetailBox>

                <DetailBox label="Status" surfaceInner={surfaceInner} border={border}>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600/20 border-2 border-green-600 text-green-600 font-black text-sm">
                    <CheckCircle className="w-4 h-4" />
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </DetailBox>

                <DetailBox label="Booking ID" surfaceInner={surfaceInner} border={border}>
                  <span className="font-mono font-bold">#{booking.id}</span>
                </DetailBox>
              </div>
            </Section>
          </div>
        </div>
      </div>

      {/* SCROLLBAR */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${isDarkMode ? "#27272a" : "#e5e7eb"};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #eb7323;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #009689;
        }
      `}</style>
    </div>
  );
};

/* ---------- SMALL REUSABLE UI PARTS ---------- */

const Section = ({ title, icon, accent, children, surfaceSoft, border, textPrimary, textSecondary }: any) => (
  <div className="relative group">
    <div className={`absolute inset-0 bg-${accent} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition`} />
    <div className={`relative rounded-2xl p-6 border-2 ${surfaceSoft} ${border}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 bg-${accent} rounded-lg`}>{icon}</div>
        <h3 className={`text-lg font-black uppercase tracking-wider ${textPrimary}`}>
          {title}
        </h3>
      </div>
      <div className={`space-y-4 ${textSecondary}`}>{children}</div>
    </div>
  </div>
);

const InfoPill = ({ icon, label, value, surfaceInner, border }: any) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${surfaceInner} ${border}`}>
    {icon}
    <div>
      <p className="text-xs text-zinc-500 font-bold uppercase">{label}</p>
      <p className="font-black">{value}</p>
    </div>
  </div>
);

const ContactRow = ({ icon, label, value, surfaceInner, border }: any) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${surfaceInner} ${border}`}>
    {icon}
    <div>
      <p className="text-xs text-zinc-500 font-bold uppercase">{label}</p>
      <p className="font-semibold break-all">{value}</p>
    </div>
  </div>
);

const DetailBox = ({ label, children, surfaceInner, border }: any) => (
  <div className={`p-4 rounded-xl border ${surfaceInner} ${border}`}>
    <p className="text-xs text-zinc-500 font-bold uppercase mb-2">{label}</p>
    <div className="font-black">{children}</div>
  </div>
);

export default DetailsModal;
