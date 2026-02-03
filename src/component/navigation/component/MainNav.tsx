"use client";

import { useMainNavBar } from "@/hooks/MainNavContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const MainNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const {
    toggleLogin,
 handleSignup,
    handleProviderSignup,
    setIsExpanded
  } = useMainNavBar();

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            
            <div>
              <h1 className="text-xl font-bold text-white">
                Service<span className="text-chart-2">Hub</span>
              </h1>
        
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLogin}
              className="px-5 py-2.5 text-sm font-medium cursor-pointer text-white rounded-xl hover:bg-white/10 transition-all"
            >
              Log in
            </button>

            <button
              onClick={() =>  handleSignup()}
              className="px-5 py-2.5 text-sm font-medium cursor-pointer text-white rounded-xl hover:bg-white/10 transition-all"
            >
              Sign up
            </button>

            <button
              onClick={handleProviderSignup}
              className="px-6 py-2.5 text-sm font-bold rounded-xl bg-chart-2 text-white hover:shadow-lg hover:shadow-chart-2/50 hover:scale-105 transition-all"
            >
              Become a Provider
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-all"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-3 animate-in slide-in-from-top">
            <button
              onClick={() => {
                toggleLogin();
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-3 text-sm font-medium cursor-pointer text-white rounded-xl hover:bg-white/10 transition-all text-left"
            >
              Log in
            </button>

            <button
              onClick={() => {
                setIsExpanded(true);
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-3 text-sm font-medium cursor-pointer text-white rounded-xl hover:bg-white/10 transition-all text-left"
            >
              Sign up
            </button>

            <button
              onClick={() => {
                handleProviderSignup();
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-3 text-sm font-bold cursor-pointer rounded-xl bg-chart-2 text-white hover:shadow-lg transition-all text-left"
            >
              Become a Provider
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNav;