"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PricingSection() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSubscribe = () => {
    router.push("/pricing");
  };

  const basicFeatures = [
    "High Quality Video Meetings",
    "Essential Host Controls",
    "Standard Security Encryption",
    "Community Support",
  ];

  const ultraFeatures = [
    "Highest Possible Video Quality",
    "Advanced Host Controls",
    "Priority Network Routing",
    "Exclusive Founder Perks",
    "24/7 Priority Support",
  ];

  return (
    <section id="plans" style={{
      position: "relative",
      padding: isMobile ? "60px 16px" : "120px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      zIndex: 2,
    }}>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", maxWidth: 600, marginBottom: isMobile ? 40 : 80 }}
      >
        <span style={{ 
          fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.85rem",
          letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)"
        }}>
          Simple Pricing
        </span>
        <h2 style={{ 
          fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 800, color: "var(--text-100)", letterSpacing: "-0.04em",
          lineHeight: 1.1, marginTop: 16, marginBottom: 24 
        }}>
          Scale your meetings.
        </h2>
        <p style={{ 
          fontSize: "1.1rem", color: "var(--text-400)", lineHeight: 1.6, margin: 0 
        }}>
          Upgrade your experience with our premium plans. No hidden fees, cancel anytime.
        </p>
      </motion.div>

      {/* Pricing Cards Grid */}
      <div style={{ 
        display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32, 
        width: "100%", maxWidth: 1000, position: "relative" 
      }}>
        
        {/* BASIC TIER (₹59) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(0,0,0,0.08)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            flex: "1 1 340px", maxWidth: 400,
            background: "rgba(255,255,255,0.7)", 
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            borderRadius: 32, padding: 40,
            boxShadow: "0 20px 40px rgba(0,0,0,0.03)",
            border: "1px solid rgba(0,0,0,0.05)",
            display: "flex", flexDirection: "column",
            transformOrigin: "center bottom"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <Zap size={24} color="var(--accent)" />
            <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700, color: "var(--text-100)" }}>Basic Pro</h3>
          </div>
          <p style={{ margin: "0 0 32px 0", color: "var(--text-400)", fontSize: "0.95rem", lineHeight: 1.5 }}>
            Perfect for individuals and small teams looking for reliable video calls.
          </p>
          
          <div style={{ marginBottom: 32, display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-400)" }}>₹</span>
            <span style={{ fontSize: "3.5rem", fontWeight: 800, color: "var(--text-100)", letterSpacing: "-0.03em" }}>59</span>
            <span style={{ fontSize: "1rem", color: "var(--text-400)", fontWeight: 500 }}>/mo</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleSubscribe}
            style={{
              width: "100%", padding: "16px", borderRadius: 100, border: "2px solid var(--accent)",
              background: "transparent", color: "var(--accent)", fontSize: "1rem", fontWeight: 700, cursor: "pointer",
              marginBottom: 40, transition: "background 0.2s, color 0.2s"
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#fff"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
          >
            Get Started
          </motion.button>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: "auto" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-100)", textTransform: "uppercase", letterSpacing: "0.05em" }}>What's included</span>
            {basicFeatures.map((feature, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Check size={18} color="var(--accent)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: "var(--text-400)", fontSize: "0.95rem" }}>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ULTRA TIER (₹149) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(0,0,0,0.25)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            flex: "1 1 340px", maxWidth: 400,
            background: "var(--text-100)", // Dark card on light background
            borderRadius: 32, padding: 40,
            boxShadow: "0 24px 50px rgba(0,0,0,0.15)",
            border: "1px solid rgba(0,0,0,0.8)",
            display: "flex", flexDirection: "column",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Subtle glow inside dark card */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: -50, right: -50, width: 150, height: 150, background: "rgba(251, 191, 36, 1)", filter: "blur(60px)", borderRadius: "50%", pointerEvents: "none" }} 
          />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Star size={24} color="#fbbf24" fill="#fbbf24" />
              <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>Ultra</h3>
            </div>
            <div style={{ background: "rgba(251, 191, 36, 0.1)", color: "#fbbf24", padding: "4px 12px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", border: "1px solid rgba(251, 191, 36, 0.2)" }}>
              Most Popular
            </div>
          </div>
          
          <p style={{ margin: "0 0 32px 0", color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.5, position: "relative" }}>
            The ultimate meeting experience for power users and growing communities.
          </p>
          
          <div style={{ marginBottom: 32, display: "flex", alignItems: "baseline", gap: 4, position: "relative" }}>
            <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#9ca3af" }}>₹</span>
            <span style={{ fontSize: "3.5rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>149</span>
            <span style={{ fontSize: "1rem", color: "#9ca3af", fontWeight: 500 }}>/mo</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleSubscribe}
            style={{
              width: "100%", padding: "16px", borderRadius: 100, border: "none",
              background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", color: "#111827", fontSize: "1rem", fontWeight: 800, cursor: "pointer",
              marginBottom: 40, boxShadow: "0 8px 24px rgba(245, 158, 11, 0.3)", position: "relative"
            }}
          >
            Upgrade to Ultra
          </motion.button>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: "auto", position: "relative" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>Everything in Basic, plus</span>
            {ultraFeatures.map((feature, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Check size={18} color="#fbbf24" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: "#d1d5db", fontSize: "0.95rem" }}>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
