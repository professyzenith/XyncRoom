/*
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                                                                 │
 * │   ██╗  ██╗███████╗██████╗  ██████╗                              │
 * │   ██║  ██║██╔════╝██╔══██╗██╔═══██╗                             │
 * │   ███████║█████╗  ██████╔╝██║   ██║                             │
 * │   ██╔══██║██╔══╝  ██╔══██╗██║   ██║                             │
 * │   ██║  ██║███████╗██║  ██║╚██████╔╝                             │
 * │   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝                              │
 * │                                                                 │
 * │   🚀 Hero Section — First Impression, Last Impression            │
 * │   Cinematic animations, particle effects, and CTA               │
 * │                                                                 │
 * │   👤 Author: Pratik Jha  |  📅 July 2026                        │
 * └─────────────────────────────────────────────────────────────────┘
 */

"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Removed unused dynamic import for ThreeCanvas

/* ─── Palette — muted, readable on light bg (meeting room stays dark) ─── */
const P = {
  sage:    "#4a9070",   /* Speaking indicator */
  steel:   "#4a78a8",   /* Alex */
  violet:  "#7a5ea8",   /* Maria */
  amber:   "#9a7830",   /* Sam */
};

/* ─── Waveform bars — lighter on mobile ─── */
function Waveform({ color }: { color: string }) {
  const h = [3, 7, 13, 7, 5, 11, 5];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height: 14 }}>
      {h.map((v, i) => (
        <motion.div
          key={i}
          animate={{ height: [v, v * 1.7, v * 0.6, v] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
          style={{ width: 2, borderRadius: 2, background: color, opacity: 0.65 }}
        />
      ))}
    </div>
  );
}

/* ─── Camera Feed ─── */
function CameraFeed({
  name, initials, color, speaking, muted = false, delay = 0,
}: {
  name: string; initials: string; color: string;
  speaking: boolean; muted?: boolean; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "relative",
        borderRadius: 8,
        overflow: "hidden",
        aspectRatio: "16/9",
        /* Glass card treatment on each feed */
        background: `linear-gradient(160deg, ${color}0e 0%, rgba(17,17,19,0.96) 100%)`,
        border: speaking
          ? `1.5px solid ${color}50`
          : "1px solid rgba(210,210,220,0.09)",
        /* Subtle inner glow only on speaking — no neon */
        boxShadow: speaking
          ? `0 0 0 2px ${color}14, 0 2px 12px rgba(0,0,0,0.4)`
          : "0 2px 8px rgba(0,0,0,0.35)",
      }}
    >
      {/* Animated background shimmer */}
      <motion.div
        animate={{
          background: speaking
            ? [`linear-gradient(160deg,${color}18 0%,rgba(17,17,19,0.96) 100%)`,
               `linear-gradient(160deg,${color}24 0%,rgba(17,17,19,0.9) 100%)`,
               `linear-gradient(160deg,${color}18 0%,rgba(17,17,19,0.96) 100%)`]
            : `linear-gradient(160deg,${color}07 0%,rgba(17,17,19,0.98) 100%)`,
        }}
        transition={{ duration: speaking ? 2 : 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* Avatar */}
      <div
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 36, height: 36, borderRadius: "50%",
          background: `rgba(17,17,19,0.7)`,
          border: `1px solid ${color}35`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-black)",
          fontSize: "0.85rem",
          color: speaking ? color : `${color}cc`,
        }}
      >
        {initials}
      </div>

      {/* Name row */}
      <div style={{
        position: "absolute", bottom: 6, left: 6,
        display: "flex", alignItems: "center", gap: 4,
      }}>
        {speaking && <Waveform color={color} />}
        <span style={{
          fontSize: "0.58rem",
          color: "rgba(255,255,255,0.65)",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
          padding: "2px 6px",
          borderRadius: 4,
          fontFamily: "var(--font-body)",
          fontWeight: 500,
        }}>
          {name}
        </span>
        {muted && (
          <span style={{
            fontSize: "0.52rem",
            background: "rgba(239,68,68,0.12)",
            color: "#ef4444",
            padding: "2px 4px",
            borderRadius: 3,
          }}>muted</span>
        )}
      </div>

      {/* Speaking dot — sage accent (permitted use) */}
      {speaking && (
        <motion.div
          animate={{ opacity: [1, 0.3, 1], scale: [1, 1.25, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: 6, right: 6,
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--accent)",
          }}
        />
      )}
    </motion.div>
  );
}

/* ─── Control button ─── */
function CtrlBtn({ children, label, danger = false, active = false }: {
  children: React.ReactNode; label: string; danger?: boolean; active?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.08, y: -1 }}
      whileTap={{ scale: 0.92 }}
      aria-label={label}
      title={label}
      style={{
        width: 32, height: 32, borderRadius: 8,
        background: danger
          ? "rgba(239,68,68,0.08)"
          : active
            ? "rgba(255,255,255,0.07)"
            : "rgba(255,255,255,0.04)",
        border: `1px solid ${danger ? "rgba(239,68,68,0.2)" : "rgba(210,210,220,0.09)"}`,
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        color: danger ? "#ef4444" : active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.42)",
      }}
    >
      {children}
    </motion.button>
  );
}

const MicIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="22"/>
  </svg>
);
const CamIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m22 8-6 4 6 4V8z"/>
    <rect x="2" y="6" width="14" height="12" rx="2"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="14" rx="2"/>
    <path d="m8 21 4-4 4 4"/>
    <path d="M12 17V13"/>
  </svg>
);

/* ─── Meeting Room UI ─── */
function MeetingRoomUI() {
  const [activeSpeaker, setActiveSpeaker] = useState(0);

  useEffect(() => {
    // Randomly switch speaker every 3-5 seconds to simulate a live meeting
    const interval = setInterval(() => {
      setActiveSpeaker(prev => {
        let next;
        do { next = Math.floor(Math.random() * 4); } while (next === prev);
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      role="img"
      aria-label="Live meeting room with 4 participants in a video call"
      style={{
        borderRadius: 16,
        overflow: "hidden",
        /* Glassmorphism chrome — Apple-style */
        background: "rgba(17,17,22,0.82)",
        backdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow:
          "0 0 0 1px rgba(210,210,220,0.07), " +
          "0 32px 64px rgba(0,0,0,0.55), " +
          "0 1px 0 rgba(255,255,255,0.06) inset",
        width: "100%",
      }}
    >
      {/* Chrome bar — glass */}
      <div style={{
        height: 40,
        background: "rgba(255,255,255,0.025)",
        borderBottom: "1px solid rgba(210,210,220,0.08)",
        display: "flex", alignItems: "center",
        padding: "0 14px", gap: 12,
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#ef4444","#f59e0b","#22c55e"].map((c, i) => (
            <div key={i} style={{
              width: 9, height: 9, borderRadius: "50%",
              background: c, opacity: 0.5,
            }} />
          ))}
        </div>
        <span style={{
          flex: 1, fontSize: "0.65rem",
          color: "rgba(255,255,255,0.18)",
          fontFamily: "var(--font-mono)",
        }}>
          XyncRoom — Engineering Standup
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          {/* LIVE — sage accent dot */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <motion.div
              animate={{ opacity: [1, 0.25, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "var(--accent)",
              }}
            />
            <span style={{
              fontSize: "0.58rem",
              color: "var(--accent-text)",
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}>
              LIVE
            </span>
          </div>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.58rem",
            color: "rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.04)",
            padding: "2px 7px", borderRadius: 4,
          }}>
            14:07
          </span>
        </div>
      </div>

      {/* Video grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 4,
        background: "rgba(10,10,12,0.8)",
        padding: "5px 5px 0",
      }}>
        <CameraFeed name="Zenith"  initials="Z" color={P.sage}   speaking={activeSpeaker === 0} muted={activeSpeaker !== 0} delay={0.1}  />
        <CameraFeed name="Alex"    initials="A" color={P.steel}  speaking={activeSpeaker === 1} muted={activeSpeaker !== 1} delay={0.22} />
        <CameraFeed name="Maria"   initials="M" color={P.violet} speaking={activeSpeaker === 2} muted={activeSpeaker !== 2} delay={0.35} />
        <CameraFeed name="Sam"     initials="S" color={P.amber}  speaking={activeSpeaker === 3} muted={activeSpeaker !== 3} delay={0.48} />
      </div>

      {/* Controls — glass tray */}
      <div style={{
        height: 52,
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(210,210,220,0.07)",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 14px",
        marginTop: 4,
      }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.6rem",
          color: "rgba(255,255,255,0.16)",
        }}>
          4 participants
        </span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <CtrlBtn label="Toggle microphone" active><MicIcon /></CtrlBtn>
          <CtrlBtn label="Toggle camera" active><CamIcon /></CtrlBtn>
          <CtrlBtn label="Share screen"><ShareIcon /></CtrlBtn>
          <div style={{ width: 1, height: 18, background: "rgba(210,210,220,0.08)", margin: "0 2px" }} />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            aria-label="End meeting"
            style={{
              padding: "0 14px", height: 28, borderRadius: 7,
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#ef4444", fontSize: "0.68rem",
              fontWeight: 600, cursor: "pointer",
              fontFamily: "var(--font-body)",
              letterSpacing: "-0.01em",
            }}
          >
            End call
          </motion.button>
        </div>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.56rem",
          color: "rgba(255,255,255,0.14)",
        }}>
          e2e encrypted
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */
export default function Hero({ visible }: { visible: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const smoothX = useSpring(rawX, { stiffness: 55, damping: 22 });
  const smoothY = useSpring(rawY, { stiffness: 55, damping: 22 });
  const rotateX = useTransform(smoothY, [0, 1], [2.5, -2.5]);
  const rotateY = useTransform(smoothX, [0, 1], [-3.5, 3.5]);
  const uiX     = useTransform(smoothX, [0, 1], [-7, 7]);
  const uiY     = useTransform(smoothY, [0, 1], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return; // skip on touch devices
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      aria-label="Hero — XyncRoom: premium video conferencing"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: "var(--nav-height) var(--container-pad) 60px",
      }}
    >
      {/* Horizontal grid lines — dark on light, very subtle */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)",
        }}
      />

      {/* Removed WebGL background for cleaner text readability */}

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "0.9fr 1.1fr",
            gap: isMobile ? "40px" : "var(--space-16)",
            alignItems: "center",
            minHeight: isMobile ? "auto" : "calc(100vh - 140px)",
          }}>

          {/* ── Left: Copy ── */}
          <div>
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{ delay: 0.08, duration: 0.6 }}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "var(--space-6)" }}
            >
              <span className="section-label">Video conferencing</span>
              <div style={{ width: 32, height: 1, background: "var(--border-default)" }} />
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-mask-reveal"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: "var(--weight-black)",
                lineHeight: "0.95",
                letterSpacing: "-0.05em",
                marginBottom: "var(--space-6)",
              }}
            >
              The world&apos;s best teams<br />meet on XyncRoom.
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 14 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "var(--text-lg)",
                color: "var(--text-secondary)",
                lineHeight: "var(--leading-relaxed)",
                marginBottom: "var(--space-10)",
                maxWidth: 360,
                letterSpacing: "var(--tracking-body)",
              }}
            >
              HD video. End-to-end encrypted. Zero setup.
              Your entire team joins in seconds — nothing to install.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
              transition={{ delay: 0.42, duration: 0.6 }}
              style={{ display: "flex", gap: "var(--space-4)", alignItems: "center", flexWrap: "wrap" }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                className="magnetic"
              >
                <Link
                  href="/register"
                  className="btn btn-primary ripple-host anim-pulse-soft"
                  style={{ padding: "14px 36px", fontSize: "0.9rem" }}
                >
                  Get started
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 600, damping: 30 }}
              >
                <Link
                  href="/join"
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-secondary)",  /* boosted from tertiary */
                    fontWeight: 500,
                    textDecoration: "none",
                    display: "flex", alignItems: "center", gap: 6,
                    letterSpacing: "var(--tracking-body)",
                  }}
                >
                  Join a meeting
                  <span style={{ opacity: 0.7 }}>→</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Spec chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{ delay: 0.56, duration: 0.5 }}
              style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginTop: "var(--space-10)" }}
            >
              {["1080p HD", "256-bit AES", "< 2s join", "Zero plugins"].map((spec) => (
                <span
                  key={spec}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--text-secondary)",  /* bumped from tertiary */
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    background: "rgba(0,0,0,0.055)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(0,0,0,0.14)",
                    padding: "5px 12px",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  {spec}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Meeting Room — hidden on small phones ── */}
          {!isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.92, y: visible ? 0 : 18 }}
            transition={{ delay: 0.22, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: uiX, y: uiY,
              rotateX, rotateY,
              transformPerspective: 1200,
              position: "relative",
            }}
          >
            {/* Perpetual float wrapper — makes the room feel alive */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Pulsing sage ambient glow beneath the card */}
              <motion.div
                aria-hidden="true"
                animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  width: "80%", height: "40%",
                  background: "radial-gradient(ellipse, rgba(74,144,112,0.12), transparent 70%)",
                  bottom: "-18%", left: "50%",
                  transform: "translateX(-50%)",
                  filter: "blur(32px)",
                  pointerEvents: "none", zIndex: 0,
                }}
              />

              {/* Shadow that deepens as card floats up */}
              <motion.div
                aria-hidden="true"
                animate={{ opacity: [0.12, 0.22, 0.12], scaleX: [1, 0.9, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  width: "70%", height: 24,
                  background: "radial-gradient(ellipse, rgba(0,0,0,0.20), transparent 70%)",
                  bottom: "-24px", left: "50%",
                  transform: "translateX(-50%)",
                  filter: "blur(12px)",
                  pointerEvents: "none", zIndex: 0,
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <MeetingRoomUI />
              </div>
            </motion.div>
          </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
