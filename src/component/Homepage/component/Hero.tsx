"use client"
import { useMainNavBar } from "@/hooks/MainNavContext";

import HeroCTA from "./HeroCT"
import HeroModal from "../../auth/SignUpModal"


export default function Hero() {

  const { isExpanded, setIsExpanded } = useMainNavBar();

  return (
    <>
      <section className={` flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 `}>


        <HeroCTA onExpand={() => setIsExpanded(true)} />
      </section>

      <HeroModal
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
      />
    </>
  )
}
