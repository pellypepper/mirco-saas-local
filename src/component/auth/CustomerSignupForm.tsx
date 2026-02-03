"use client"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart3, Globe2, Shield, Zap} from "lucide-react"
import { motion } from "framer-motion"
import Loader from "../Spinner"
import SuccessModal from "../SuccessModal"
import ErrorModal from "../ErrorModal"
import useCustomerSignup from "@/hooks/useCustomerSignup"
import { useMainNavBar } from "@/hooks/MainNavContext"

function Feature({ icon, title, text, delay }: { icon: React.ReactNode; title: string; text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x:  0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex gap-4 group"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#009689]/20 to-[#eb7323]/20 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-[#009689]/50 transition-all">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-white mb-1 group-hover:text-[#009689] transition-colors">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{text}</p>
      </div>
    </motion.div>
  )
}

export default function HeroForm({ onClose }: { onClose: () => void }) {
  const { toggleLogin} = useMainNavBar()

  const {
    fullName,
    email,
    password,
    loading,
    successOpen,
    errorOpen,
    errorMessage,
    handleSubmit,
    setFullName,
    setEmail,
    setPassword,
    setSuccessOpen,
    setErrorOpen,
  } = useCustomerSignup()

  return (
    <>
      {/* Success / Error */}
      <SuccessModal
        open={successOpen}
        onClose={() => {
          setSuccessOpen(false)
          onClose()
       
        }}
        message="Account created successfully! You can now log in."
      />

      <ErrorModal
        open={errorOpen}
        message={errorMessage}
        onClose={() => setErrorOpen(false)}
      
      />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full max-w-7xl mx-auto overflow-y-auto lg:overflow-hidden">
        {/* LEFT - Features Section */}
        <div className="hidden lg:flex flex-1 flex-col justify-center p-12 gap-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y:  0 }}
            transition={{ duration: 0.2 }}
          >
         

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Ready to Book with{" "}
              <span className="text-chart-2">
                Trusted Professionals? 
              </span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
              Join thousands of users managing their bookings effortlessly. Fast, secure, and reliable. 
            </p>
          </motion.div>

          {/* Features */}
          <div className="space-y-6">
            <Feature
              icon={<Shield className="w-6 h-6 text-white" />}
              title="Verified Providers"
              text="All professionals are background-checked and certified."
              delay={0.3}
            />
            <Feature
              icon={<Zap className="w-6 h-6 text-white" />}
              title="Instant Booking"
              text="Book appointments in seconds with real-time availability."
              delay={0.4}
            />
            <Feature
              icon={<BarChart3 className="w-6 h-6 text-white" />}
              title="Track Everything"
              text="Real-time updates and analytics for all your bookings."
              delay={0.5}
            />
            <Feature
              icon={<Globe2 className="w-6 h-6 text-white" />}
              title="Global Reach"
              text="Access quality services from anywhere in the world."
              delay={0.6}
            />
          </div>

       
        </div>

        {/* RIGHT - Form Section */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Form Card */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-10 shadow-2xl">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-chart-3/20 to-transparent rounded-3xl blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-chart-2/20 to-transparent rounded-3xl blur-2xl" />

              <form onSubmit={handleSubmit} className="relative space-y-6">
                {/* Header */}
                <div className="text-center">
                  <h3 className="text-xl lg:text-3xl font-bold text-white mb-2">
                    Create Account
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Sign up to get started. It only takes a minute! 
                  </p>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label  className="text-white font-medium">
                    Full Name
                  </Label>
                  <Input
                  
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="bg-white/10 border-white/20 text-white placeholder:text-zinc-500 focus:border-chart-3 focus:ring-chart-3/50 rounded-xl h-12"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label  className="text-white font-medium">
                    Email
                  </Label>
                  <Input
                  
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-zinc-500 focus:border-chart-3 focus:ring-chart-3/50 rounded-xl h-12"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label  className="text-white font-medium">
                    Password
                  </Label>
                  <Input
                
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target. value)}
                    placeholder="••••••••"
                    className="bg-white/10 border-white/20 text-white placeholder:text-zinc-500 focus:border-chart-3 focus:ring-chart-3/50 rounded-xl h-12"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-chart-2 text-white hover:shadow-xl hover:shadow-chart-2/50 hover:scale-105 transition-all duration-300 rounded-xl h-12 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader /> : "Create Account"}
                </Button>

                {/* Login Link */}
                <p className="text-center text-sm text-zinc-400">
                  Already have an account?{" "}
                  <span
                    onClick={toggleLogin}
                    className="text-white font-bold cursor-pointer hover:text-chart-2 hover:underline transition-colors"
                  >
                    Log in
                  </span>
                </p>

                {/* Terms */}
                <p className="text-xs text-zinc-500 text-center pt-4 border-t border-white/10">
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-white hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-white hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>

      
          </motion.div>
        </div>
      </div>
    </>
  )
}