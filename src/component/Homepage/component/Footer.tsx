"use client";

import Link from "next/link";
import {  Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useMainNavBar } from "@/hooks/MainNavContext";

const Footer = () => {
  const footerLinks = {
    company: [
      { label: "All Services", href: "#services" },
      { label: "Find Providers", href: "#providers" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
    ],
    support: [
      { label: "Help Center", href:  "#help" },
      { label: "Contact Us", href: "#contact" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
    ],
    resources: [
      { label: "Blog", href: "#blog" },
      { label: "Success Stories", href: "#stories" },
      { label: "Provider Resources", href: "#resources" },
      { label: "API Documentation", href: "#api" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-[#1877f2]" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-[#1da1f2]" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-[#e4405f]" },
    { icon: Linkedin, href:  "#", label: "LinkedIn", color: "hover:text-[#0077b5]" },
  ];

  const { isDarkMode } = useMainNavBar();

  return (
    <footer className={`relative ${isDarkMode ? " text-white bg-zinc-950" : " text-gray-900"} overflow-hidden`}>
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-chart-3/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
          
              <div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                  Service<span className="text-chart-2">Hub</span>
                </h3>
              
              </div>
            </div>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-700"} leading-relaxed mb-6`}>
              Your trusted platform for connecting with quality service providers
              in your area.  We make finding and booking professionals simple, fast, and reliable.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className={`flex items-center gap-3 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-700"} hover:text-chart-3 transition-colors`}>
                <Mail className="w-4 h-4 text-chart-3" />
                <span>support@servicehub.com</span>
              </div>
              <div className={`flex items-center gap-3 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-700"} hover:text-chart-3 transition-colors`}>
                <Phone className="w-4 h-4 text-chart-2" />
                <span>1-800-SERVICE</span>
              </div>
              <div className={`flex items-center gap-3 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-700"} hover:text-chart-3 transition-colors`}>
                <MapPin className="w-4 h-4 text-chart-3" />
                <span>123 Service Street, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-bold text-lg mb-6 relative inline-block ${isDarkMode ? "text-white" : "text-black"}`}>
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-chart-3" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-700"} hover:text-chart-3 hover:translate-x-1 inline-block transition-all duration-300`}
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className={`font-bold text-lg mb-6 relative inline-block ${isDarkMode ? "text-white" : "text-black"}`}>
              Support
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-chart-3" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-700"} hover:text-chart-2 hover:translate-x-1 inline-block transition-all duration-300`}
                  >
                    → {link. label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className={`font-bold text-lg mb-6 relative inline-block ${isDarkMode ? "text-white" : "text-black"}`}>
              Resources
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-chart-3" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-700"} hover:text-chart-3 hover:translate-x-1 inline-block transition-all duration-300`}
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-black"}`}>
              Stay Updated
            </h3>
            <p className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>
              Subscribe to our newsletter for the latest updates and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3  border ${isDarkMode ? "border-chart-2/90 bg-white/10 placeholder:text-gray-500" : "border-gray-300 bg-zinc-200 placeholder:text-gray-700"} rounded-xl text-white  focus:outline-none focus:border-chart-3 transition-colors`}
              />
              <button className="px-6 py-3 bg-chart-2 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-chart-2/50 hover:scale-105 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              © {new Date().getFullYear()} <span className="text-chart-2 font-semibold">ServiceHub</span>.  All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`w-10 h-10  border ${isDarkMode ? "text-white border-white/20 bg-zinc-7800" : "border-zinc-200 bg-zinc-200 text-black"} rounded-xl flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all ${color}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

       
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;