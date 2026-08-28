/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║                                                                  ║
 * ║   ██╗  ██╗██╗   ██╗     ██████╗ ██████╗ ███╗   ███╗██████╗      ║
 * ║   ╚██╗██╔╝╚██╗ ██╔╝    ██╔════╝██╔═══██╗████╗ ████║██╔══██╗     ║
 * ║    ╚███╔╝  ╚████╔╝     ██║     ██║   ██║██╔████╔██║██████╔╝     ║
 * ║    ██╔██╗   ╚██╔╝      ██║     ██║   ██║██║╚██╔╝██║██╔══██╗     ║
 * ║   ██╔╝ ██╗   ██║       ╚██████╗╚██████╔╝██║ ╚═╝ ██║██████╔╝     ║
 * ║   ╚═╝  ╚═╝   ╚═╝        ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝      ║
 * ║                                                                  ║
 * ║   🏠 Landing Page — The Front Door of XyncRoom              ║
 * ║   📦 Version: 1.0.0                                              ║
 * ║   👤 Author: Pratik Jha                                           ║
 * ║   📅 Last Updated: July 2026                                     ║
 * ║                                                                  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import FeaturesSection from "@/components/FeaturesSection";
import SecuritySection from "@/components/SecuritySection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import DeviceOptimizer from "@/components/DeviceOptimizer";

const CustomCursor   = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ScrollProgressBar"), { ssr: false });
const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), { ssr: false });
const ScrollFXInit   = dynamic(() => import("@/components/ScrollFXInit"), { ssr: false });

/* ─────────────────────────────────────────────────────────────────────────────
   AMBIENT BACKGROUND — Light Mode & GPU-Friendly
   ───────────────────────────────────────────────────────────────────────────── */
function AmbientBackground({ isMobile }: { isMobile: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "var(--surface-base)",
      }}
    >
      {/* ── Layer 1: Subtle cool dot grid ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: "radial-gradient(ellipse 80% 75% at 50% 40%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 75% at 50% 40%, black 20%, transparent 100%)",
      }} />

      {/* ── Layer 2: Sage bloom from top ── */}
      <div style={{
        position: "absolute", top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: isMobile ? "100%" : "140%", height: isMobile ? "40vh" : "60vh",
        background: "radial-gradient(ellipse 60% 90% at 50% -5%, rgba(74,144,112,0.08) 0%, rgba(74,144,112,0.02) 55%, transparent 70%)",
      }} />

      {/* ── Layer 3: Silver shimmer (Desktop only for 60fps mobile) ── */}
      {!isMobile && (
        <>
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: "40vw", height: "80vh",
            background: "radial-gradient(ellipse at 100% 20%, rgba(200,200,220,0.18) 0%, transparent 60%)",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0,
            width: "50vw", height: "50vh",
            background: "radial-gradient(ellipse at 0% 100%, rgba(0,0,0,0.06) 0%, transparent 60%)",
          }} />
          {/* Live particle constellation only on desktop */}
          <ParticleCanvas />
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────────────────── */
export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <DeviceOptimizer />
      {!isMobile && <CustomCursor />}
      {!isMobile && <ScrollProgress />}
      <AmbientBackground isMobile={isMobile} />

      <div
        id="main-content"
        role="main"
        style={{
          position: "relative", zIndex: 1,
          opacity: 1,
          transition: "opacity 0.9s ease",
        }}
      >
        <SmoothScroll>
          <ScrollFXInit />
          <Navbar />
          <main>
            <Hero visible={true} />
            <MarqueeSection />
            <FeaturesSection />
            <PricingSection />
            <SecuritySection />
          </main>
          <Footer />
        </SmoothScroll>
      </div>
    </>
  );
}

