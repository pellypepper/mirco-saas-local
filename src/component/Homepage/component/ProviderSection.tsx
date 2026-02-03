"use client";
import { ArrowRight, TrendingUp, DollarSign, Users, Clock } from "lucide-react";
import { useMainNavBar } from "@/hooks/MainNavContext";


const ProviderSection = () => {
  const { handleProviderSignup } = useMainNavBar();
  
  const benefits = [
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Reach thousands of potential customers"
    },
    {
      icon: DollarSign,
      title: "Increase Revenue",
      description: "Get more bookings and higher earnings"
    },
    {
      icon: Users,
      title: "Build Your Brand",
      description: "Showcase your expertise and reviews"
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Work on your own terms and availability"
    }
  ];

  return (
    <section className="relative bg-chart-2/70  text-white py-20 overflow-hidden">

      
 
      <div className="relative container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
          
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Are You a Service Provider?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Join thousands of professionals growing their business on our platform
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white/10 backdrop-blur-md border cursor-pointer border-white/20 rounded-2xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                <Icon className="w-10 h-10 mb-4 text-chart-4" />
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-white/80 text-sm">{description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={handleProviderSignup}
              className="group inline-flex items-center gap-3 bg-chart-2 cursor-pointer  text-white px-10 py-5 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-chart-2/50 hover:scale-105 transition-all duration-300"
            >
              <span>Become a Provider Today</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="mt-4 text-white/70 text-sm">
              ✓ No setup fees • ✓ Easy onboarding • ✓ 24/7 support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProviderSection;