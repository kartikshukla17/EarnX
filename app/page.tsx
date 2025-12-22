"use client"

import Footer from "@/components/Footer";
import { Features } from "@/components/ui/Features";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Hero from "@/components/ui/Hero";
import { TrustedBy } from "@/components/ui/TrustedBy";
import Lenis from "lenis";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // @ts-ignore
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 py-4">
        <FloatingNav />
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Feature Highlights */}
      <Features />

      {/* Trusted By Section */}
      <TrustedBy />

      {/* Footer */}
      <Footer />
    </div>
  );
}
