"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Palette ─── */
const P = {
  sage:   "#4a9070",
  steel:  "#4a78a8",
  violet: "#7a5ea8",
  amber:  "#9a7830",
};

/* ─── Tiny meeting room UI ─── */
function MiniMeetingRoom() {
  const ppl = [
    { i: "Z", c: P.sage,   speaking: true  },
    { i: "A", c: P.steel,  speaking: false },
    { i: "M", c: P.violet, speaking: false },
    { i: "S", c: P.amber,  speaking: false },
  ];
  return (
    <div style={{
      borderRadius: 12, overflow: "hidden",
      background: "#111116",
      border: "1px solid rgba(0,0,0,0.18)",
      boxShadow: "0 8px 28px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.06) inset",
    }}>
      {/* Chrome */}
      <div style={{
        height: 32, background: "#0c0c10",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", padding: "0 10px", gap: 8,
      }}>
        <div style={{ display: "flex", gap: 4 }}>
          {["#ef4444","#f59e0b","#22c55e"].map((c, i) => (
            <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c, opacity: 0.5 }} />
          ))}
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", color: "rgba(255,255,255,0.2)", flex: 1 }}>
          XyncRoom
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 4, height: 4, borderRadius: "50%", background: P.sage }}
          />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: P.sage, opacity: 0.85 }}>LIVE</span>
        </div>
      </div>
      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, padding: "3px 3px 0", background: "#070709" }}>
        {ppl.map((p) => (
          <div key={p.i} style={{
            position: "relative", borderRadius: 6, overflow: "hidden",
            aspectRatio: "16/9",
            background: `linear-gradient(140deg, ${p.c}14, #080809)`,
            border: p.speaking ? `1px solid ${p.c}45` : "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 22, height: 22, borderRadius: "50%",
              background: "rgba(10,10,14,0.8)", border: `1px solid ${p.c}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "0.6rem",
              color: p.speaking ? p.c : `${p.c}77`,
            }}>{p.i}</div>
            {p.speaking && (
              <motion.div animate={{ opacity: [0.9, 0.2, 0.9] }} transition={{ duration: 1.1, repeat: Infinity }}
                style={{ position: "absolute", top: 4, right: 4, width: 4, height: 4, borderRadius: "50%", background: P.sage }}
              />
            )}
          </div>
        ))}
      </div>
      {/* Controls */}
      <div style={{ height: 32, background: "#0c0c10", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        {[0,1,2].map((i) => (
          <div key={i} style={{ width: 20, height: 20, borderRadius: 5, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
        ))}
        <div style={{ width: 36, height: 18, borderRadius: 4, background: "rgba(239,68,68,0.14)", border: "1px solid rgba(239,68,68,0.18)" }} />
      </div>
    </div>
  );
}

/* ─── Chat mini ─── */
function MiniChat() {
  const msgs = [
    { from: "Alex", c: P.steel, t: "Shipping at 3pm today." },
    { from: "Zenith", c: P.sage, t: "Ship it 🚀" },
    { from: "Maria", c: P.violet, t: "PR approved ✓" },
  ];
  return (
    <div style={{
      borderRadius: 12, overflow: "hidden",
      background: "var(--surface-1)",
      border: "1px solid rgba(0,0,0,0.09)",
      boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
    }}>
      <div style={{
        height: 32, background: "#f7f6f4",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        display: "flex", alignItems: "center", padding: "0 10px",
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(0,0,0,0.35)" }}># general</span>
      </div>
      <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 7 }}>
        {msgs.map((msg, i) => (
          <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
            <div style={{
              width: 16, height: 16, borderRadius: "50%",
              background: `${msg.c}18`, border: `1px solid ${msg.c}28`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.45rem", fontWeight: 700, color: msg.c, flexShrink: 0,
            }}>{msg.from[0]}</div>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.48rem", color: msg.c, display: "block" }}>{msg.from}</span>
              <span style={{ fontSize: "0.62rem", color: "rgba(29,29,31,0.55)", fontFamily: "var(--font-body)" }}>{msg.t}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── AI notes mini ─── */
function MiniNotes() {
  return (
    <div style={{
      borderRadius: 12, background: "var(--surface-1)",
      border: "1px solid rgba(0,0,0,0.09)",
      boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
      padding: 14,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.8, repeat: Infinity }}
          style={{ width: 5, height: 5, borderRadius: "50%", background: P.sage }}
        />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: P.sage, letterSpacing: "0.06em" }}>AI NOTES</span>
      </div>
      {["Decision: ship v2 Thursday", "Action: Alex → PR by 3pm", "Action: Maria → update docs"].map((n, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "4px 0",
          borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.05)" : "none",
        }}>
          <span style={{ color: P.sage, fontSize: "0.42rem" }}>●</span>
          <span style={{ fontSize: "0.6rem", color: "rgba(29,29,31,0.5)", fontFamily: "var(--font-body)" }}>{n}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Lock icon ─── */
const LockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

/* ─── Bolt icon ─── */
const BoltIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

/* ─── Globe icon ─── */
const GlobeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

/* ─── Feature card ─── */
function Card({
  children, span = 1, delay = 0, style = {}, isMobile = false,
}: {
  children: React.ReactNode;
  span?: 1 | 2;
  delay?: number;
  style?: React.CSSProperties;
  isMobile?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className="shimmer-card card-3d glow-hover"
      data-tilt
      style={{
        gridColumn: (!isMobile && span === 2) ? "span 2" : "span 1",
        background: "var(--surface-1)",
        borderRadius: 20,
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,0.9) inset",
        padding: isMobile ? "20px 18px 18px" : "28px 28px 24px",
        overflow: "hidden",
        position: "relative",
        cursor: "default",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURES SECTION — Apple bento grid
═══════════════════════════════════════════════════════════════════════════ */
export default function FeaturesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      style={{ padding: isMobile ? "60px 0 60px" : "120px 0 100px", position: "relative" }}
      aria-label="Platform features"
    >
      {/* Section divider */}
      <div style={{ height: 1, background: "var(--border-subtle)", marginBottom: 80 }} />

      <div className="container">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span className="section-label" style={{ display: "block", marginBottom: 16 }}>
            Platform
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h1)",
            fontWeight: "var(--weight-black)",
            letterSpacing: "var(--tracking-h1)",
            lineHeight: "var(--leading-tight)",
            color: "var(--text-primary)",
            marginBottom: 16,
          }}>
            Everything teams need.<br />
            <span className="gradient-text-anim">Nothing they don&apos;t.</span>
          </h2>
          <p style={{
            fontSize: "var(--text-lg)",
            color: "var(--text-secondary)",
            lineHeight: "var(--leading-relaxed)",
            maxWidth: 480,
            margin: "0 auto",
            letterSpacing: "var(--tracking-body)",
          }}>
            Designed from scratch for the way modern teams actually work.
          </p>
        </motion.div>

        {/* ── Bento grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: isMobile ? 16 : 14,
        }}>

          {/* Card 1 — HD Video (2 col wide) */}
          <Card span={2} delay={0.05} isMobile={isMobile}>
            {/* Sage top line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg, var(--accent), transparent)",
              borderRadius: "20px 20px 0 0",
            }} />
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 16 : 24, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(74,144,112,0.09)", border: "1px solid rgba(74,144,112,0.2)",
                  borderRadius: 8, padding: "4px 10px", marginBottom: 16,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--accent-text)", letterSpacing: "0.05em" }}>
                    HD · 1080p
                  </span>
                </div>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                  fontWeight: "var(--weight-black)",
                  letterSpacing: "-0.04em",
                  color: "var(--text-primary)",
                  lineHeight: 1.1,
                  marginBottom: 10,
                }}>
                  Crystal clear<br />HD video
                </h3>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--leading-relaxed)", maxWidth: isMobile ? "100%" : 240 }}>
                  Adaptive bitrate keeps every call smooth — whether you&apos;re on fibre or a coffee shop Wi-Fi.
                </p>
              </div>
              <div style={{ width: isMobile ? "100%" : 200, flexShrink: 0, marginTop: 4 }}>
                <MiniMeetingRoom />
              </div>
            </div>
          </Card>

          {/* Card 2 — Security */}
          <Card delay={0.1} isMobile={isMobile}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "rgba(74,144,112,0.09)",
              border: "1px solid rgba(74,144,112,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--accent)", marginBottom: 18,
            }}>
              <LockIcon />
            </div>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: "var(--weight-black)",
              letterSpacing: "-0.035em",
              color: "var(--text-primary)",
              marginBottom: 8,
            }}>
              End-to-end encrypted
            </h3>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--leading-relaxed)" }}>
              256-bit AES on every call. Zero-knowledge architecture. Even we can&apos;t see your meetings.
            </p>
            <div style={{
              marginTop: 20,
              display: "flex", gap: 6, flexWrap: "wrap",
            }}>
              {["256-bit AES", "Zero-knowledge", "E2E default"].map((tag) => (
                <span key={tag} style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                  color: "var(--text-tertiary)", letterSpacing: "0.04em",
                  background: "var(--surface-2)", border: "1px solid var(--border-subtle)",
                  padding: "3px 8px", borderRadius: 6,
                }}>{tag}</span>
              ))}
            </div>
          </Card>

          {/* Card 3 — Instant join */}
          <Card delay={0.12} isMobile={isMobile}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "rgba(74,144,112,0.09)",
              border: "1px solid rgba(74,144,112,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--accent)", marginBottom: 18,
            }}>
              <BoltIcon />
            </div>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: "var(--weight-black)",
              letterSpacing: "-0.035em",
              color: "var(--text-primary)",
              marginBottom: 8,
            }}>
              Join in under 2 seconds
            </h3>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--leading-relaxed)" }}>
              No downloads. No plugins. One link, any browser, instant entry.
            </p>
            {/* Speed meter */}
            <div style={{ marginTop: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--text-tertiary)" }}>Join time</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--accent)", fontWeight: 700 }}>&lt; 2s</span>
              </div>
              <div style={{ height: 4, background: "var(--surface-2)", borderRadius: 4, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "92%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg, var(--accent), var(--accent-light))" }}
                />
              </div>
            </div>
          </Card>

          {/* Card 4 — Works everywhere */}
          <Card delay={0.15} isMobile={isMobile}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "rgba(74,144,112,0.09)",
              border: "1px solid rgba(74,144,112,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--accent)", marginBottom: 18,
            }}>
              <GlobeIcon />
            </div>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: "var(--weight-black)",
              letterSpacing: "-0.035em",
              color: "var(--text-primary)",
              marginBottom: 8,
            }}>
              Works everywhere
            </h3>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--leading-relaxed)" }}>
              Chrome, Safari, Firefox, Edge. Mobile or desktop. Any device, zero friction.
            </p>
            <div style={{ marginTop: 18, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              {["Chrome", "Safari", "Firefox", "Edge"].map((b) => (
                <span key={b} style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.55rem",
                  color: "var(--text-tertiary)",
                  background: "var(--surface-2)",
                  padding: "3px 8px", borderRadius: 6,
                  border: "1px solid var(--border-subtle)",
                }}>{b}</span>
              ))}
            </div>
          </Card>

          {/* Card 5 — Chat (2 col wide) */}
          <Card span={2} delay={0.18} isMobile={isMobile}>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 16 : 24, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                  fontWeight: "var(--weight-black)",
                  letterSpacing: "-0.04em",
                  color: "var(--text-primary)",
                  lineHeight: 1.1,
                  marginBottom: 10,
                }}>
                  Conversations<br />that persist
                </h3>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--leading-relaxed)", maxWidth: isMobile ? "100%" : 260 }}>
                  Chat, files, and decisions stay with your team long after the call ends. Context never gets lost.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, width: isMobile ? "100%" : 200, flexShrink: 0 }}>
                <MiniChat />
                <MiniNotes />
              </div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}
