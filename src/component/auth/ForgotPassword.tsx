"use client";

import { useForgotPassword } from "../../hooks/useAuth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../Spinner";
import SuccessModal from "../SuccessModal";
import ErrorModal from "../ErrorModal";
import { useMainNavBar } from "@/hooks/MainNavContext";
import { Mail, KeyRound, ArrowLeft, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPassword() {
  const {
    setIsForgotPassword,
    setIsLogin,
  } = useMainNavBar();

  const {
    handleBackToLogin,
    loading,
    setEmail,
    email,
    handleSubmit,
    successOpen,
    setSuccessOpen,
    errorOpen,
    setErrorOpen,
    errorMessage
  } = useForgotPassword({ setIsForgotPassword, setIsLogin });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Success Modal */}
        <SuccessModal
          open={successOpen}
          onClose={() => setSuccessOpen(false)}
          title="Reset Email Sent!"
          message="Check your inbox for the password reset link."
          buttonText="Close"
        />

        {/* Error Modal */}
        <ErrorModal
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          title="Failed"
          message={errorMessage}
          buttonText="Close"
        />

        {/* Forgot Password Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale:  0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-md z-10"
        >
          <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
            {/* Loader overlay */}
            {loading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#009689]/90 to-[#eb7323]/90 backdrop-blur-sm rounded-3xl">
                <div className="text-center space-y-4">
                  <Loader message="Sending reset link..." />
                  <p className="text-white font-medium">This will only take a moment...</p>
                </div>
              </div>
            )}

       
            <CardHeader className="relative text-center pt-8 pb-6 space-y-4">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-chart-3 rounded-2xl mb-2 mx-auto shadow-lg">
                <KeyRound className="w-8 h-8 text-white" />
              </div>

              <CardTitle className="text-2xl md:text-3xl font-bold text-zinc-950">
                Forgot Password? 
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">
            Enter your email and we'll send you a reset link
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-zinc-950 font-medium flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-chart-3" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 rounded-xl border-gray-300 focus:border-[#009689] focus:ring-[#009689]/20 transition-all"
                  />
                </div>

         

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12  bg-chart-2 text-white hover:shadow-lg hover:shadow-[#009689]/50 hover:scale-105 transition-all duration-300 rounded-xl font-bold text-base disabled:opacity-50 disabled: cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 px-8 pb-8 pt-4 bg-gray-50">
              {/* Back to Login */}
              <Button
                variant="ghost"
                type="button"
                onClick={handleBackToLogin}
                className="w-full text-chart-3 hover:text-chart-3 hover:bg-chart-3/10 font-semibold transition-all rounded-xl h-11 group"
              >
                <ArrowLeft className="w-4 cursor-pointer h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Login
              </Button>

              {/* Help Text */}
              <div className="text-center text-xs text-gray-500 pt-2">
                Remember your password? {" "}
                <button
                  onClick={handleBackToLogin}
                  className="cursor-pointer text-chart-2 font-semibold hover:underline"
                >
                  Sign in instead
                </button>
              </div>
            </CardFooter>
          </Card>

          {/* Additional Help */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity:  1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-white/90">
              Need help? {" "}
              <a href="#" className="text-chart-2 font-semibold hover:underline">
                Contact Support
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}