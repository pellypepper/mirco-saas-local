'use client';

import { useLoginForm } from "@/hooks/useLoginForm";
import AuthButtons from "./AuthButtons";
import Link from "next/link";
import Loader from "../Spinner";
import SuccessModal from "../SuccessModal";
import ErrorModal from "../ErrorModal";
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
import { useMainNavBar } from "@/hooks/MainNavContext";
import { X, Lock, Mail, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MeshGradient } from "@paper-design/shaders-react";

export default function LoginPage() {
  const {
    handleClose,
    handleForgotPassword,
    handleSignup
  } = useMainNavBar();

  const {
    loading,
    errorMsg,
    successOpen,
    errorOpen,
    handleEmailSignIn,
    handleSuccessClose,
    handleErrorClose
  } = useLoginForm();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        {/* Animated Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity:  1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-chart-3/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl" />
        </motion.div>

        {/* Backdrop Click Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 cursor-pointer"
        />

        {/* Modals */}
        <SuccessModal
          open={successOpen}
          onClose={handleSuccessClose}
          title="Login Successful!"
          message="Welcome back!  Redirecting to your dashboard."
          buttonText="Go to Dashboard"
        />

        <ErrorModal
          open={errorOpen}
          onClose={handleErrorClose}
          title="Login Failed"
          message={errorMsg || "An error occurred while logging in. "}
          buttonText="Close"
        />

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity:  1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale:  0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-md z-10"
        >
          <Card className="border-none shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
            <CardHeader className="relative text-center p-2">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute right-4 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all hover:rotate-90 group"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </button>

           

              <CardTitle className="text-3xl text-white font-bold mb-2">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-zinc-300">
                Log in to access your dashboard and manage bookings
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-6">
              <form onSubmit={handleEmailSignIn} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center gap-2" htmlFor="email">
                    <Mail className="w-4 h-4 text-chart-2" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-zinc-400 focus:border-chart-3 focus:ring-chart-3/50 transition-all"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center gap-2" htmlFor="password">
                    <Lock className="w-4 h-4 text-chart-2" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-zinc-400 focus:border-chart-3 focus:ring-chart-3/50 transition-all"
                  />
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-chart-2 text-white hover:shadow-lg hover:shadow-chart-3/50 hover:scale-105 transition-all duration-300 rounded-xl font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ?  <Loader message="Logging in..." /> : "Login"}
                </Button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 border-b border-white/20"></div>
                <p className="text-sm text-zinc-400 font-medium">OR CONTINUE WITH</p>
                <div className="flex-1 border-b border-white/20"></div>
              </div>

              {/* Social Auth Buttons */}
              <AuthButtons />
            </CardContent>

            <CardFooter className="mb-[-30px] flex flex-col space-y-4 px-8 pb-8 pt-4 bg-white/5 backdrop-blur-sm border-t border-white/10">
              {/* Forgot Password */}
              <div className="text-center">
                <Link
                  href="#"
                  onClick={handleForgotPassword}
                  className="text-sm text-white hover:text-chart-3 hover:underline font-semibold transition-colors inline-flex items-center gap-1"
                >
                  <span>Forgot password?</span>
                </Link>
              </div>

              {/* Sign Up Link */}
              <div className="text-center text-sm text-zinc-300">
                Don't have an account?{" "}
                <Link
                  href="#"
                  onClick={handleSignup}
                  className="text-white font-bold hover:text-chart-5 hover:underline transition-colors"
                >
                  Sign up
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Sparkles className="w-4 h-4 text-chart-4" />
                  <span>Secure & encrypted login</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}