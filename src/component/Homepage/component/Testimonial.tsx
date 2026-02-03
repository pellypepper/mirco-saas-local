"use client";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

import { useMainNavBar } from "@/hooks/MainNavContext";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      service: "Plumbing Service",
      rating: 5,
      comment: "Quick response and excellent service! The plumber was professional and fixed the issue in no time.",
      avatar: "SJ",
      color: "#0077b6"
    },
    {
      name: "Michael Chen",
      service: "House Cleaning",
      rating: 5,
      comment: "Amazing cleaning service! My house has never looked better.  Highly recommend!",
      avatar:  "MC",
      color: "#fb8500"
    },
    {
      name: "Emily Rodriguez",
      service: "Electrical Work",
      rating: 5,
      comment: "Very satisfied with the electrician.  Arrived on time, did great work, and cleaned up after.",
      avatar: "ER",
      color: "#0077b6"
    },
  ];

  const { isDarkMode } = useMainNavBar();

  return (
    <section className={` py-20 `}>


      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
    
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-5xl font-bold b ${isDarkMode ? "text-white" : "bg-chart-2 bg-clip-text text-transparent"} mb-4`}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={` ${isDarkMode ? "text-gray-300" : "text-gray-600"} text-lg max-w-2xl mx-auto`}
          >
            Real stories from real people who found their perfect service provider
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y:  0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className={`relative ${isDarkMode ? "bg-chart-3/200 border-gray-600 hover:border-zinc-900" : "bg-white/60 border-white/10 "} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border hover:border-chart-3/30 h-full`}>
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-chart-2 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex mb-4 justify-end">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-chart-4 text-chart-4"
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-6 leading-relaxed italic`}>
                  &ldquo;{testimonial.comment}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                  <div style={{backgroundColor: testimonial.color}} className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className={`font-bold ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>{testimonial.name}</div>
                    <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{testimonial.service}</div>
                  </div>
                </div>

     
                       </div>
            </motion.div>
          ))}
        </div>

   
      </div>
    </section>
  );
};

export default Testimonial;