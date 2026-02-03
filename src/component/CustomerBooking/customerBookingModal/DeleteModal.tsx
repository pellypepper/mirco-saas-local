"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, AlertTriangle } from "lucide-react";
import { useMainNavBar } from "@/hooks/MainNavContext";

const DeleteModal = ({
  onCancel,
  onConfirm,
  booking,
}: {
  onCancel: () => void;
  onConfirm: (booking: any) => void;
  booking: any;
}) => {
  const { isDarkMode } = useMainNavBar();

  /* THEME TOKENS */
  const surface = isDarkMode ? "bg-zinc-800" : "bg-white";
  const surfaceSoft = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-200";

  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-300" : "text-zinc-700";
  const textMuted = "text-zinc-500";

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[90%] max-w-md rounded-3xl shadow-2xl z-[1000]
          border-2 ${surface} ${border}`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-start p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/20 rounded-xl border-2 border-red-500/50">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className={`text-xl font-black ${textPrimary}`}>
                Delete Booking
              </h2>
              <p className={`text-xs uppercase tracking-wider ${textMuted}`}>
                Permanent Action
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className={`p-2 rounded-lg transition-colors border ${
              isDarkMode
                ? "bg-zinc-900 border-zinc-700 hover:border-zinc-600"
                : "bg-zinc-100 border-zinc-300 hover:border-zinc-400"
            }`}
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 pb-6">
          <div
            className={`rounded-2xl p-5 border-2 mb-6 ${surfaceSoft} ${border}`}
          >
            <p className={`text-sm leading-relaxed ${textSecondary}`}>
              Are you sure you want to delete{" "}
              <span className={`font-bold ${textPrimary}`}>
                {booking.services.title}
              </span>
              ?
              <br />
              <span className={textMuted}>
                This action only removes it from your view.
              </span>
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className={`flex gap-3 pt-2 border-t-2 ${border}`}>
            <button
              onClick={onCancel}
              className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all duration-300 border-2 ${surfaceSoft} ${border} ${textPrimary}`}
            >
              Cancel
            </button>

            <button
              onClick={() => onConfirm(booking)}
              className="group flex-1 px-6 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Trash2 className="w-5 h-5 relative" />
              <span className="relative">Delete</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteModal;
