"use client"

import { GodRays } from "@paper-design/shaders-react"
import { useMainNavBar } from "@/hooks/MainNavContext"

export default function HeroBackground() {

  return (
    <div className="absolute inset-0 pointer-events-none">
      <GodRays
        colorBack="#00000000"
        colors={["#52525b40", "#a1a1aa40", "#e4e4e740", "#71717a40"]}
        colorBloom="#a1a1aa"
        intensity={0.5}
        density={0.38}
        bloom={0.3}
        speed={0.5}
        scale={1.6}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
