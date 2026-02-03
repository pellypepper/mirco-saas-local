"use client"

import Navbar from "../navigation/HomepageNavbar";
import Hero from "./component/Hero";
import Services from "./component/Services";
import About from "./component/About";
import Features from "./component/Features";
import Testimonial from "./component/Testimonial";
import ProviderSection from "./component/ProviderSection";
import Footer from "./component/Footer";
import HeroBackground from "../Design/Herobackground";
import { useMainNavBar } from "@/hooks/MainNavContext";

const MainDisplay = () => {
  const { isDarkMode } = useMainNavBar();
    
  return (
    <div>
        <Navbar />
     <div className={`${isDarkMode ? "bg-zinc-950" : "bg-white"} relative overflow-hidden`}>
      <HeroBackground />
      
      {/* Hero Section */}
    <Hero />

      {/* Popular Services */}
    <Services />

      {/* How It Works */}
   <About />

      {/* Features */}
  <Features />  

      {/* Testimonials */}
     <Testimonial />

      {/* CTA Section for Providers */}
<ProviderSection />

      {/* Footer */}
    <Footer />
     </div>
    </div>
  )
}

export default MainDisplay
