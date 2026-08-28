/*
 * ┌─────────────────────────────────────────────────────────────────┐
 * │   ╔╗╔╔═╗╦  ╦╔╗ ╔═╗╦═╗                                         │
 * │   ║║║╠═╣╚╗╔╝╠╩╗╠═╣╠╦╝                                         │
 * │   ╝╚╝╩ ╩ ╚╝ ╚═╝╩ ╩╩╚═                                         │
 * │                                                                 │
 * │   🧭 Navigation Bar — Glassmorphic, Responsive, Animated        │
 * │   Handles auth state, scroll effects, and mobile menu           │
 * │                                                                 │
 * │   👤 Author: Pratik Jha  |  📅 July 2026                        │
 * └─────────────────────────────────────────────────────────────────┘
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Plans", href: "#plans" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 24px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
          /* Light mode: frosted off-white on scroll */
          background: scrolled ? "rgba(228,228,233,0.88)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              /* Logo mark — updated to blue combo */
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "0.75rem",
              color: "var(--text-inverted)",
              letterSpacing: "-0.02em",
            }}
          >
            XR
          </motion.div>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "1.2rem",
              color: "var(--text-100)",
              letterSpacing: "-0.03em",
            }}
          >
            XyncRoom
          </span>
        </Link>

        {/* Desktop nav — hidden on mobile */}
        {!isMobile && (
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ color: "var(--text-100)" }}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: "0.85rem",
                color: "var(--text-400)",
                textDecoration: "none",
                letterSpacing: "-0.01em",
                transition: "color 0.2s ease",
              }}
            >
              {label}
            </motion.a>
          ))}
        </nav>
        )}

        {/* Desktop CTAs + Mobile Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <motion.div whileHover={{ color: "var(--text-100)" }}>
            <Link
              href="/login"
              style={{
                padding: "7px 16px",
                fontSize: "0.85rem",
                color: "var(--text-400)",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Sign in
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          >
            <Link
              href="/register"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 18px",
                borderRadius: 9,
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-inverted)",
                textDecoration: "none",
                /* Sage CTA — no neon gradient */
                background: "var(--accent)",
                boxShadow: "0 0 0 1px rgba(127,168,152,0.3), 0 2px 8px rgba(0,0,0,0.3)",
                letterSpacing: "-0.01em",
              }}
            >
              Get started free
            </Link>
          </motion.div>

          {/* Mobile menu toggle — only visible on mobile */}
          {isMobile && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "flex",
              width: 38,
              height: 38,
              borderRadius: 8,
              background: scrolled ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.10)",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-200)",
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
          )}
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 60,
              left: 0,
              right: 0,
              zIndex: 999,
              background: "rgba(245,247,245,0.98)",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              padding: "16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: "14px 0",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "var(--text-100)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(0,0,0,0.07)",
                }}
              >
                {label}
              </a>
            ))}
            <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/login" className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
                  Sign in
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/register" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Get started free
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
