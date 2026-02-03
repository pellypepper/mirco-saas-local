"use client";
import { MapPin, Award, CheckCircle, Star} from "lucide-react";
import {useMainNavBar} from "@/hooks/MainNavContext"

import Image from "next/image";
const BackgroundDesign = ({avatarSrc, provider} :{avatarSrc: string; provider: any}) => {
  const { isDarkMode } = useMainNavBar();
  const cardBg = isDarkMode ? "bg-zinc-800/95" : "bg-white/90";
const cardBorder = isDarkMode ? "border-zinc-700" : "border-zinc-200";

const avatarBg = isDarkMode ? "bg-zinc-900" : "bg-white";
const avatarBorder = isDarkMode ? "border-zinc-800" : "border-zinc-200";

const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
const textMuted = isDarkMode ? "text-zinc-500" : "text-zinc-600";

const badgeText = isDarkMode ? "text-white" : "text-zinc-900";
const badgeBorderDark = isDarkMode ? "border-zinc-900" : "border-white";

  return (
    <div className="relative">
            {/* Split background with diagonal */}
       <div className="h-80 relative overflow-hidden">
  {/* Base background */}
  <div className={`absolute inset-0 ${isDarkMode ? "bg-zinc-900" : "bg-white"}`}></div>

  {/* Animated mesh pattern */}
  <div className="absolute inset-0" style={{
    backgroundImage: `
      linear-gradient(to right, #fb8500 1px, transparent 1px),
      linear-gradient(to bottom, #219ebc 1px, transparent 1px)
    `,
    backgroundSize: '80px 80px',
    opacity: 0.1
  }}></div>

  {/* Diagonal stripes - alternating colors */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0" style={{
      backgroundImage: `repeating-linear-gradient(
        45deg,
        #730071 0px,
        #730071 40px,
        transparent 40px,
        transparent 80px,
        #219ebc 80px,
        #219ebc 120px,
        transparent 120px,
        transparent 160px
      )`
    }}></div>
  </div>

  {/* Floating geometric shapes - modern minimalist */}
  <div className="absolute top-12 left-12">
    <div className="w-24 h-24 border-2 border-chart-2 rounded-2xl transform rotate-12 animate-float"></div>
  </div>
  
  <div className="absolute top-20 right-16">
    <div className="w-16 h-16 bg-chart-4 opacity-20 rounded-full animate-float-delayed"></div>
  </div>

  <div className="absolute bottom-16 left-1/4">
    <div className="w-20 h-20 border-2 border-chart-4 rounded-full animate-float-slow"></div>
  </div>

  <div className="absolute bottom-20 right-1/3">
    <div className="w-12 h-12 bg-chart-2 opacity-20 transform rotate-45 animate-float"></div>
  </div>

  {/* Glowing orbs in corners */}
  <div className="absolute top-0 left-0 w-64 h-64 bg-chart-2 opacity-10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-80 h-80 bg-chart-4 opacity-10 rounded-full blur-3xl"></div>
  
  {/* Center accent line */}
  <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
  
  {/* Vertical accent bars */}
  <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-chart-2/20 to-transparent"></div>
  <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-chart-4/20 to-transparent"></div>

  {/* Corner accents */}
  <div className="absolute top-8 left-8">
    <div className="flex gap-2">
      <div className="w-1 h-8 bg-chart-2"></div>
      <div className="w-1 h-12 bg-chart-2 opacity-50"></div>
    </div>
  </div>

  <div className="absolute bottom-8 right-8">
    <div className="flex gap-2">
      <div className="w-1 h-12 bg-chart-4 opacity-50"></div>
      <div className="w-1 h-8 bg-chart-4"></div>
    </div>
  </div>

  {/* Dot pattern overlay */}
  <div className="absolute inset-0" style={{
    backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
    backgroundSize: '50px 50px',
    opacity: 0.03
  }}></div>
</div>

<style jsx>{`
  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(12deg);
    }
    50% {
      transform: translateY(-20px) rotate(12deg);
    }
  }

  @keyframes float-delayed {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-15px) scale(1.1);
    }
  }

  @keyframes float-slow {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  . animate-float {
    animation:  float 6s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation:  float-delayed 8s ease-in-out infinite;
    animation-delay: 1s;
  }

  .animate-float-slow {
    animation: float-slow 10s ease-in-out infinite;
  }
`}</style>

            {/* Profile Content - Positioned Absolutely */}
          <div className="absolute inset-x-0 bottom-0 translate-y-1/2 px-4 sm:px-8">
  <div className="max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row items-center md:items-end gap-6">

      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 rounded-3xl blur-2xl opacity-40 animate-pulse bg-chart-2/30"></div>

        <div className="relative w-40 h-40 md:w-48 md:h-48">
          <div className="absolute inset-0 rounded-3xl rotate-6 bg-chart-4/20"></div>

          <div
            className={`absolute inset-2 rounded-3xl overflow-hidden border-4 ${avatarBg} ${avatarBorder}`}
          >
            <Image
              unoptimized
              src={avatarSrc}
              alt={provider.full_name}
              fill
              className="object-cover"
            />
          </div>

          {/* Verified badge */}
          <div
            className={`absolute -top-3 -right-3 rounded-2xl p-3 shadow-xl animate-bounce bg-chart-3 border-4 ${badgeBorderDark}`}
          >
            <CheckCircle size={20} className="text-white" fill="white" />
          </div>
        </div>
      </div>

      {/* Name Card */}
      <div className="flex-1 w-full">
        <div
          className={`backdrop-blur-xl rounded-3xl px-8 py-6 shadow-2xl border-2 ${cardBg} ${cardBorder}`}
        >

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 px-4 py-2 rounded-xl">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill="currentColor"
                  className={textPrimary}
                />
              ))}
            </div>
            <span className="text-chart-2 font-bold text-lg">
              {provider.rating || "5.0"}
            </span>
            <span className={`text-sm ${textMuted}`}>(127 reviews)</span>
          </div>

          {/* Name */}
          <h1
            className={`text-2xl md:text-5xl font-black mb-4 leading-tight ${textPrimary}`}
          >
            {provider.full_name.toUpperCase()}
          </h1>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">

            {/* Service */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl blur-md opacity-40 bg-chart-2/30"></div>
              <div className="relative flex items-center gap-2 px-5 py-3 border-2 border-chart-2 rounded-2xl bg-chart-2/10">
                <Award size={18} className={badgeText} />
                <span className={`font-bold text-sm md:text-base ${badgeText}`}>
                  {provider.service_type}
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl blur-md opacity-40 bg-chart-4/30"></div>
              <div className="relative flex items-center gap-2 px-5 py-3 border-2 border-chart-4 rounded-2xl bg-chart-4/10">
                <MapPin size={18} className={badgeText} />
                <span className={`font-bold text-sm md:text-base ${badgeText}`}>
                  {provider.location}
                  {provider.country ? `, ${provider.country}` : ""}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</div>

          </div>
  )
}

export default BackgroundDesign
