"use client";
import Link from "next/link";
import { motion } from "framer-motion";

import { useMainNavBar } from "@/hooks/MainNavContext";

const Services = () => {
  const services = [
    { name: "Plumbing", icon: "🔧", gradient:  "#219ebc" },  // ✅ Removed brackets
    { name: "Electrical", icon: "⚡", gradient: "#219ebc" }, // ✅ Removed brackets
    { name:  "Cleaning", icon: "🧹", gradient: "#219ebc" },
    { name: "Painting", icon: "🎨", gradient:  "#219ebc" },
    { name: "Carpentry", icon: "🔨", gradient: "#219ebc"},
    { name: "HVAC", icon: "❄️", gradient:  "#219ebc" },
    { name: "Landscaping", icon: "🌳",gradient:  "#219ebc" },
    { name: "Moving", icon:  "📦",gradient:  "#219ebc"  },
    { name:  "Handyman", icon: "🛠️", gradient: "#219ebc"},
    { name: "Pet Care", icon: "🐕", gradient:  "#219ebc" },
    { name:  "Tutoring", icon: "📚", gradient:  "#219ebc" },
    { name: "Photography", icon: "📷",gradient: "#219ebc" },
  ];
const { isDarkMode } = useMainNavBar();
  return (
    <section className={`py-20 `}>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-5xl font-bold ${isDarkMode ? "text-white" : "bg-chart-2 bg-clip-text text-transparent"} mb-4`}
          >
            Popular Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`max-w-2xl mx-auto text-lg md:text-xl ${isDarkMode ? "text-zinc-300" : "text-zinc-700"}`}
          >
            From home repairs to personal care, find the perfect professional for any task
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity:  1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href="#"
                className={`group relative block ${isDarkMode ? "bg-zinc-800" : "bg-white"} rounded-2xl p-6 shadow-sm hover:shadow-xl border border-chart-2/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
                  style={{ backgroundColor: service.gradient }}
                />

                {/* Gradient overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"
                  style={{ backgroundColor: service.gradient }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
                  <div className="text-4xl md:text-5xl transform group-hover:scale-110 transition-transform duration-300">
                    {service. icon}
                  </div>
                  <div className={`font-bold text-sm md:text-base ${isDarkMode ? "text-white" : "text-gray-800"} group-hover:text-white transition-colors duration-300`}>
                    {service.name}
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-chart-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y:  0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="#"
            className={`inline-flex items-center gap-2 ${isDarkMode ? "text-white" : "text-chart-2"} font-semibold hover:gap-4 transition-all group`}
          >
            <span>View All Services</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;