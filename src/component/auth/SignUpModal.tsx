"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { MeshGradient } from "@paper-design/shaders-react"
import HeroForm from "./CustomerSignupForm"

export default function HeroModal({
  isOpen,
  onClose,
}:  {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale:  1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-h-[95vh] bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden rounded-3xl shadow-2xl"
            >
              {/* ✅ BACKGROUND ONLY */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <MeshGradient
       colors={["#219ebc", "#219ebc", "#219ebc", "#219ebc"]}
                  distortion={0.8}
                  speed={0.6}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>

              {/* Decorative gradients */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-chart-3/20 rounded-full blur-3xl" />

              {/* ✅ CLOSE BUTTON */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full p-3 text-white hover:rotate-90 transition-all duration-300 group"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* ✅ CONTENT ABOVE */}
              <div className="relative z-10 h-full overflow-y-auto">
                <HeroForm onClose={onClose} />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}