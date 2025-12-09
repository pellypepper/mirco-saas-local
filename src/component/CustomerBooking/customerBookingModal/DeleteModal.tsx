"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";



const DeleteModal = ({ onCancel, onConfirm, booking }: {
    onCancel: () => void;
    onConfirm: (booking: any) => void;
    booking: any;
    openDelete?: boolean;
}) => {
  return (
    <AnimatePresence>

        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                       bg-white p-6 w-[90%] max-w-sm rounded-2xl shadow-xl z-[1000]"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-slate-900">Delete Booking</h2>
              <button onClick={onCancel}>
                <X className="w-5 h-5 text-slate-500 hover:text-slate-700 transition" />
              </button>
            </div>

            {/* Body */}
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="font-medium text-slate-800">{booking.services.title}</span>?
              <br />
              This action only removes it from your view.
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm 
                           hover:bg-slate-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={()=> onConfirm(booking)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm 
                           hover:bg-red-600 transition flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </motion.div>
        </>

    </AnimatePresence>
  );
};

export default DeleteModal;
