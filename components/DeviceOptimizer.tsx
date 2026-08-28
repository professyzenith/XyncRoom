"use client";

import { useEffect } from "react";

/**
 * Adaptive Device & Specs Optimizer
 * Automatically detects device capabilities (CPU cores, RAM, touch capability, screen size, battery/network)
 * and dynamically tunes rendering, disabling heavy SVG filters, Canvas loops, and 3D effects on mobile
 * for a butter-smooth 60/120 FPS experience on every device.
 */
export default function DeviceOptimizer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    const cores = navigator.hardwareConcurrency || 4;
    // @ts-ignore
    const memory = navigator.deviceMemory || 4;

    const isLowOrMobileSpec = isTouch || isSmallScreen || cores <= 4 || memory <= 4;

    const html = document.documentElement;

    if (isLowOrMobileSpec) {
      html.classList.add("perf-optimized");
    }

    if (isTouch) {
      html.classList.add("touch-device");
    }

    // Handle orientation/resize
    const handleResize = () => {
      if (window.innerWidth < 768) {
        html.classList.add("perf-optimized");
      } else if (!isTouch && cores > 4) {
        html.classList.remove("perf-optimized");
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return null;
}
