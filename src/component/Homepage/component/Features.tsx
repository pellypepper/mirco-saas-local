"use client";

import { Users, Calendar, Star, Shield } from "lucide-react";
import { motion } from "framer-motion";

import { useMainNavBar } from "@/hooks/MainNavContext";

const Features = () => {

  const { isDarkMode } = useMainNavBar();
  return (
    <section className={`relative ${isDarkMode ? " text-white" : "text-black"}  py-20 overflow-hidden`}>
    


   
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
 
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            Why Choose{" "}
            <span className="bg-chart-2  bg-clip-text text-transparent">
              Us?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={` text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}
          >
            We're committed to connecting you with the best professionals while ensuring a seamless experience
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {features.map(({ icon: Icon, title, description, color }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y:  0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
          
              {/* Card */}
              <div className={`relative h-full ${isDarkMode ? "bg-white/5 border-white/10 " : "bg-white/60 border-chart-2/32"} backdrop-blur-sm border rounded-3xl p-8 hover:bg-white/10 hover:border-chart-3/50 transition-all duration-300 cursor-pointer`}>
                {/* Icon container */}
                <div 
                
                className={`inline-flex items-center opacity-60 ${isDarkMode ? "bg-chart-4" : "bg-chart-4"} justify-center w-16 h-16  rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className={`text-xl md:text-2xl font-bold mb-4 group-hover:text-chart-2 transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-900"}`}>
                  {title}
                </h3>

                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-700"} leading-relaxed group-hover:text-zinc-300 transition-colors`}>
                  {description}
                </p>

                {/* Decorative corner accent */}
                <div
                 style={{backgroundColor: color}}
                className={`absolute bottom-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once:  true }}
          className="text-center mt-16"
        >
          <div className={`inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-sm border ${isDarkMode ? "border-white/10" : "border-chart-2/20"} rounded-2xl p-6`}>
            <Shield className="w-12 h-12 text-chart-2" />
            <div className="text-center sm:text-left">
              <div className="font-bold text-lg mb-1">100% Satisfaction Guaranteed</div>
              <div className="text-zinc-400 text-sm">If you're not happy, we'll make it right</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

const features = [
  {
    icon: Shield,
    title: "Verified Providers",
    description: "All service providers are thoroughly vetted, background-checked, and certified professionals.",
    color: "#a9a587"
  },
  {
    icon:  Star,
    title: "Quality Guarantee",
    description: "Read authentic reviews and ratings from real customers before you book with confidence.",
    color: "#a9a587"
  },
  {
    icon: Calendar,
    title:  "Easy Booking",
    description: "Book appointments 24/7 with our simple, intuitive platform. Get confirmed in minutes.",
 color: "#a9a587"
  },
  {
    icon: Users,
    title: "Customer Support",
    description: "Our dedicated support team is here to help you every step of the way, anytime you need.",
    color: "#a9a587"
  },
];