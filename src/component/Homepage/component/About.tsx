"use client";
import { Search, CheckCircle, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useMainNavBar } from "@/hooks/MainNavContext";

const About = () => {
  const steps = [
    {
      icon: Search,
      title: "Search & Browse",
      description: "Find the perfect service provider by searching our extensive directory of verified professionals.",
    color: "#390040",
      accentColor: "bg-chart-2"
    },
    {
      icon: Calendar,
      title: "Book Instantly",
      description: "Choose your preferred time slot and book appointments with just a few clicks.  It's that simple! ",
      color: "#390040",
      accentColor: "bg-chart-2"
    },
    {
      icon: CheckCircle,
      title: "Get It Done",
      description: "Sit back and relax while our trusted professionals take care of your needs with quality service.",
 color: "#390040",
      accentColor: "bg-chart-2"
    },
  ];
   const { isDarkMode } = useMainNavBar();
  return (
    <section className={`mx-auto px-4 py-20`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-chart-3/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-chart-2/5 rounded-full blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-16">
       
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-5xl font-bold ${isDarkMode ? "text-white" : "bg-chart-2 bg-clip-text text-transparent"} mb-4`}
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`${isDarkMode ? "text-zinc-300" : "text-zinc-600"} text-lg max-w-2xl mx-auto`}
          >
            Get started in three simple steps and connect with trusted professionals today
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection line - desktop only */}
          <div className={`hidden md:block absolute top-24 left-0 right-0 h-1 ${isDarkMode ? "bg-white" : "bg-chart-2"} opacity-20`} />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y:  0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                {/* Step number */}
                <div className={`absolute -top-4 -left-4 w-12 h-12 ${isDarkMode ? "bg-chart-2" : "bg-chart-2"} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg z-10 group-hover:scale-110 transition-transform`}>
                  {index + 1}
                </div>

                {/* Card */}
                <div className={`relative ${isDarkMode ? "bg-white/5 border-white/10  hover:border-zinc-900" : "bg-white/60 border-gray-100 hover:border-chart-3/30"} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2  h-full`}>
                  {/* Icon */}
                  <div 
                 
                  className={`inline-flex items-center bg-chart-4 justify-center w-20 h-20 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-900"}`}>
                    {step.title}
                  </h3>
                  <p className={`leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>
                    {step.description}
                  </p>

                  {/* Decorative corner */}
                  <div className={`absolute bottom-4 right-4 w-3 h-3 ${step.accentColor} rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />
                </div>

                {/* Arrow connector - desktop only */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 -right-6 z-20">
                    <ArrowRight className={`w-8 h-8 ${isDarkMode ? "text-white" : "text-chart-2"}`} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-chart-3/10 rounded-2xl p-8 border border-chart-3/20">
            <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-900"}`}>
              Ready to get started?
            </h3>
            <p className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>
              Join thousands of satisfied customers today
            </p>
            <button className="px-8 py-4 bg-chart-2 text-white font-bold rounded-full hover:shadow-xl hover:shadow-chart-2/50 hover:scale-105 transition-all duration-300">
              Find Your Professional Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;