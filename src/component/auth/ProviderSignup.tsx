'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProviderSignupForm from "./ProviderSignupForm";
import { useMainNavBar } from "@/hooks/MainNavContext";
import { motion, AnimatePresence } from "framer-motion";
import { MeshGradient } from "@paper-design/shaders-react";

export default function ProviderSignup({
  onSubmit: parentOnSubmit,
}:  {
  onSubmit?: (data: any) => void;
}) {
  const {
    setIsProviderSignup,
    isProviderSignup,
    setIsLogin,
  } = useMainNavBar();

  return (
    <Dialog open={isProviderSignup} onOpenChange={setIsProviderSignup}>
      <AnimatePresence>
        {isProviderSignup && (
          <DialogContent 
            className="sm:max-w-2xl w-full p-0 max-h-[90vh] overflow-hidden border-none bg-transparent shadow-none"
            style={{ backgroundColor: 'transparent' }}
          >
            {/* Animated Background Wrapper */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity:  1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 -z-10"
            >
              {/* Mesh Gradient Background */}
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
            </motion.div>

            {/* Form Content */}
            <ProviderSignupForm
              setIsProviderSignup={setIsProviderSignup}
              setIsLogin={setIsLogin}
              onSubmit={parentOnSubmit}
            />
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}