"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";


/* ─── Animated encryption stream ─── */
function EncryptionStream() {
  const chars = "01AE4F8B2CD9XZ!@#$%^&*".split("");
  return (
    <div style={{
      position: "relative", height: 80, overflow: "hidden",
      borderRadius: 10, background: "var(--surface-2)",
      border: "1px solid rgba(0,0,0,0.07)",
    }}>
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: ["-10%", "110%"], opacity: [0, 0.7, 0] }}
          transition={{
            duration: 1.4 + (i % 5) * 0.4,
            repeat: Infinity,
            delay: (i * 0.22) % 3.5,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${(i / 22) * 100}%`,
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            color: i % 4 === 0
              ? "rgba(74,144,112,0.90)"
              : i % 4 === 1
              ? "rgba(74,120,168,0.55)"
              : "rgba(29,29,31,0.30)",
            userSelect: "none", fontWeight: 700,
          }}
        >
          {chars[i % chars.length]}
        </motion.div>
      ))}
      {/* Edge fade */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(0deg, var(--surface-2) 0%, transparent 30%, transparent 70%, var(--surface-2) 100%)",
        pointerEvents: "none",
      }} />
      {/* Lock icon in center */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.5rem", pointerEvents: "none",
      }}>
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 8px rgba(74,144,112,0.35))" }}
        >
          🔒
        </motion.div>
      </div>
    </div>
  );
}

function StatChip({ value, label, delay = 0, isText }: {
  value: string; label: string; delay?: number; isText?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="shimmer-card"
      style={{
        textAlign: "center", padding: "16px 10px",
        borderRadius: 12, background: "#ffffff",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,0.9) inset",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)", fontSize: "1.1rem",
          fontWeight: 800, letterSpacing: "-0.04em",
          color: "var(--text-primary)", marginBottom: 5,
        }}
      >
        {value}
      </div>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "0.58rem",
        color: "var(--text-secondary)", letterSpacing: "0.08em",
        textTransform: "uppercase", fontWeight: 600,
      }}>
        {label}
      </div>
    </motion.div>
  );
}


export default function SecuritySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{
      padding: isMobile ? "60px 0 70px" : "100px 0 130px",
      borderTop: "1px solid var(--border-subtle)",
      position: "relative", overflow: "hidden",
    }}>

      {/* Ambient sage orb */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.03, 0.07, 0.03], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", width: 600, height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,144,112,0.15), transparent 70%)",
          bottom: "-200px", right: "-100px",
          filter: "blur(60px)", pointerEvents: "none",
        }}
      />

      <div className="container">
        <div style={{
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 36 : 80, 
          alignItems: "center",
        }}>

          {/* ── Left: text ── */}
          <div ref={ref}>
            {/* Label */}
            <motion.span
              className="section-label"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "block", marginBottom: 20 }}
            >
              Security
            </motion.span>

            {/* Headline — word by word */}
            <div style={{ marginBottom: 28, overflow: "hidden" }}>
              {[
                { text: "Your conversations", color: "var(--text-primary)" },
                { text: "stay yours.", color: "var(--accent)" },
              ].map(({ text, color }, li) => (
                <motion.div
                  key={li}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.75,
                    delay: li * 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.055em",
                    lineHeight: 1.08,
                    color,
                  }}
                >
                  {text}
                </motion.div>
              ))}
            </div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "var(--text-base)",
                color: "var(--text-secondary)",
                lineHeight: "var(--leading-relaxed)",
                marginBottom: 32,
                maxWidth: 400,
              }}
            >
              Every call is end-to-end encrypted with 256-bit AES.
              Zero-knowledge architecture means even we cannot access your meetings.
            </motion.p>

            {/* Bullet points */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "256-bit AES encryption",
                "Zero-knowledge architecture",
                "No data stored post-call",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5, delay: 0.45 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  {/* Animated dot */}
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.7 }}
                    style={{
                      width: 7, height: 7, borderRadius: "50%",
                      background: "var(--accent)", flexShrink: 0,
                      boxShadow: "0 0 6px rgba(74,144,112,0.4)",
                    }}
                  />
                  <span style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                  }}>
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right: animated card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hologram-card glass-panel"
            style={{
              borderRadius: 20,
              padding: 24,
              position: "relative",
            }}
          >
            {/* Sage top accent — animated */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, var(--accent), rgba(74,144,112,0.2), transparent)",
                borderRadius: "20px 20px 0 0",
              }}
            />

            {/* Encryption stream */}
            <EncryptionStream />

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(0,0,0,0.10)", margin: "20px 0" }} />

            {/* Animated stat chips */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <StatChip value="256-bit" label="AES"          delay={0}    isText />
              <StatChip value="E2E"     label="Encrypted"    delay={0.1}  isText />
              <StatChip value="Zero"    label="Data Stored"  delay={0.2}  isText />
              <StatChip value="Always"  label="On by Default" delay={0.3} isText />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
