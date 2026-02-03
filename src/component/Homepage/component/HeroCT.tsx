"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import {useMainNavBar} from "@/hooks/MainNavContext";

export default function HeroCTA({ onExpand }: { onExpand: () => void }) {
  const { handleProviderSignup, isDarkMode } = useMainNavBar();
  
  return (
    <div className="relative z-10 text-center space-y-8 px-4">
 

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity:  1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`text-4xl md:text-6xl  font-bold leading-tight ${isDarkMode ? "text-white" : "text-black"}`}
      >
        Find and Book Trusted{" "}
        <span className="relative inline-block">
          <span className="relative z-10 bg-chart-2 bg-clip-text text-transparent">
            Service Providers
          </span>
      
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`max-w-2xl mx-auto text-lg md:text-xl ${isDarkMode ? "text-zinc-300" : "text-zinc-700"}`}
      >
        Connect with verified professionals in minutes. Fast, reliable, and hassle-free service at your fingertips.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
      >
        <button
          onClick={onExpand}
          className={`group cursor-pointer relative w-full sm:w-auto px-8 py-4 bg-chart-2 text-white text-base font-bold rounded-full overflow-hidden shadow-lg hover:shadow-chart-2/50 transition-all duration-300 hover: scale-105`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-chart-2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <button
          onClick={handleProviderSignup}
          className="group w-full cursor-pointer sm:w-auto px-8 py-4 bg-white text-zinc-900 text-base font-bold rounded-full hover:bg-chart-3 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
        >
          Become A Provider
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y:  30 }}
        animate={{ opacity:  1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto pt-12"
      >
        {[
          { value: "1,000+", label: "Service Providers",  },
          { value: "10,000+", label: "Happy Customers", },
          { value: "50+", label: "Service Categories",  },
          { value: "4. 8★", label: "Average Rating", },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-chart-3/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <div className={`relative ${isDarkMode ? "bg-zinc-800/5 border-white/10 " : "bg-white/5 border-chart-2/10 "} backdrop-blur-sm border  rounded-2xl p-6 hover:border-chart-3/50 transition-all`}>
              <div className={`text-2xl md:text-4xl font-bold  ${isDarkMode ? "bg-chart-4" : "bg-chart-4"}  bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-zinc-400 text-sm font-medium">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}