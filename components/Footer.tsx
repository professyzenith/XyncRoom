"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <footer style={{
      borderTop: "1px solid rgba(0,0,0,0.09)",
      background: "rgba(0,0,0,0.025)",  /* very slight dark tint — differentiates footer */
    }}>
      {/* ── CTA block ── */}
      <div style={{ padding: isMobile ? "60px 16px 40px" : "120px 40px 80px" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "200px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label" style={{ display: "block", marginBottom: 28, color: "var(--text-tertiary)" }}>
              Get started
            </span>

            <h2
              className="anim-float-slow"
              style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 900,
              letterSpacing: "-0.065em",
              lineHeight: 0.94,
              color: "var(--text-primary)",
              marginBottom: 40,
              maxWidth: 820,
            }}>
              Set the standard.
              <br />
              <span className="gradient-text-anim">Raise the bar.</span>
            </h2>

            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
              >
                <Link
                  href="/register"
                  className="btn btn-primary"
                  style={{ padding: "16px 40px", fontSize: "0.95rem" }}
                >
                  Get started free
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
                <Link
                  href="/join"
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",  /* was rgba(255,255,255,0.3) — invisible */
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  Join a meeting →
                </Link>
              </motion.div>
            </div>

            {/* Trust line */}
            <p style={{
              marginTop: 48,
              fontSize: "0.78rem",
              color: "var(--text-tertiary)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.03em",
            }}>
              No credit card · Free forever · End-to-end encrypted
            </p>

          </motion.div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.09)", padding: "28px 40px" }}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {/* Logo + copyright */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 26, height: 26, borderRadius: 7,
              background: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 900,
              fontSize: "0.65rem", color: "#ffffff",
            }}>
              XR
            </div>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.7rem",
              color: "var(--text-tertiary)",  /* was rgba(255,255,255,0.22) — invisible */
              letterSpacing: "0.01em",
            }}>
              © 2025 XyncRoom, Inc.
            </span>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", gap: 28 }}>
            {["Privacy", "Terms", "GitHub"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                  color: "var(--text-tertiary)",  /* was rgba(255,255,255,0.22) — invisible */
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-tertiary)")}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
