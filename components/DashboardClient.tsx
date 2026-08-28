/*
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  ╔═╗╔═╗╔╦╗╔╦╗╦╔╗╔╔═╗╔═╗                                      │
 * │  ╚═╗║╣  ║  ║ ║║║║║ ╦╚═╗                                      │
 * │  ╚═╝╚═╝ ╩  ╩ ╩╝╚╝╚═╝╚═╝                                      │
 * │                                                                 │
 * │  📊 Dashboard Client — Command Center for XyncRoom         │
 * │  ──────────────────────────────────────────────────────          │
 * │  Manages: Home View, Settings, Profile, Avatar Upload           │
 * │  Integrations: Supabase Auth, Supabase Storage, Framer Motion   │
 * │                                                                 │
 * │  👤 Author: Pratik Jha                                           │
 * │  📦 Version: 1.0.0  |  📅 July 2026                             │
 * └─────────────────────────────────────────────────────────────────┘
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Video, Clock, Copy, Plus, ArrowRight, Home, Users, Settings, Calendar as CalendarIcon, Search, Star, Inbox } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import IntroAnimation from "@/components/IntroAnimation";
import ScheduleMeetingForm from "./ScheduleMeetingForm";

// ── Admin config ──────────────────────────────────────────────────────────────
const ADMIN_EMAIL = "pratikjha926543@gmail.com";

interface SupportMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

interface UserInfo {
  email: string;
  fullName: string;
  initials: string;
  avatarUrl?: string | null;
  phone?: string;
}

export default function DashboardClient({ user }: { user: UserInfo }) {
  const router = useRouter();
  const supabase = createClient();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isStartingMeeting, setIsStartingMeeting] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  const [activeTab, setActiveTab] = useState<'home' | 'schedule' | 'settings' | 'inbox'>('home');
  const isAdmin = user.email === ADMIN_EMAIL;

  // Inbox state
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [inboxLoading, setInboxLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Fetch support messages when inbox tab opens (admin only)
  useEffect(() => {
    if (activeTab !== 'inbox' || !isAdmin) return;
    setInboxLoading(true);
    const sb = createClient();
    sb.from('support_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setMessages((data as SupportMessage[]) ?? []);
        setInboxLoading(false);
      });
  }, [activeTab, isAdmin]);

  // Settings states
  const [settingsName, setSettingsName] = useState(user.fullName);
  const [settingsEmail, setSettingsEmail] = useState(user.email);
  const [settingsPhone, setSettingsPhone] = useState(user.phone || "");
  const [settingsAvatar, setSettingsAvatar] = useState(user.avatarUrl || "");
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState("");

  const [personalMeetingId, setPersonalMeetingId] = useState("");

  const [introComplete, setIntroComplete] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let id = localStorage.getItem("xyncroom_pm_id");
    if (!id) {
      const p1 = Math.floor(Math.random() * 900) + 100;
      const p2 = Math.floor(Math.random() * 900) + 100;
      const p3 = Math.floor(Math.random() * 9000) + 1000;
      id = `${p1} ${p2} ${p3}`;
      localStorage.setItem("xyncroom_pm_id", id);
    }
    setPersonalMeetingId(id);
  }, []);

  const PRESET_AVATARS = [
    // Girls
    `https://api.dicebear.com/9.x/lorelei/svg?seed=Mia&backgroundColor=ffd5dc`,
    `https://api.dicebear.com/9.x/lorelei/svg?seed=Sophia&backgroundColor=f4d8e8`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Lily&backgroundColor=ffdfbf`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Chloe&backgroundColor=d1d4f9`,
    `https://api.dicebear.com/9.x/adventurer/svg?seed=Zoe&backgroundColor=c0aede`,
    `https://api.dicebear.com/9.x/adventurer/svg?seed=Aria&backgroundColor=ffdfbf`,
    `https://api.dicebear.com/9.x/notionists/svg?seed=Ella&backgroundColor=ffd5dc`,
    
    // Boys
    `https://api.dicebear.com/9.x/micah/svg?seed=Noah&backgroundColor=b6e3f4`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Oliver&backgroundColor=c0aede`,
    `https://api.dicebear.com/9.x/adventurer/svg?seed=Liam&backgroundColor=b6e3f4`,
    `https://api.dicebear.com/9.x/adventurer/svg?seed=Elijah&backgroundColor=f4f2eb`,
    `https://api.dicebear.com/9.x/notionists/svg?seed=Mateo&backgroundColor=c0aede`,
    `https://api.dicebear.com/9.x/notionists/svg?seed=Lucas&backgroundColor=b6e3f4`,
    
    // Fun / Robots
    `https://api.dicebear.com/9.x/bottts/svg?seed=R2D2&backgroundColor=f4f2eb`,
    `https://api.dicebear.com/9.x/bottts/svg?seed=C3PO&backgroundColor=d1d4f9`,
    `https://api.dicebear.com/9.x/fun-emoji/svg?seed=Smile&backgroundColor=ffd5dc`,
    `https://api.dicebear.com/9.x/fun-emoji/svg?seed=Wink&backgroundColor=b6e3f4`
  ];

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    setSettingsMessage("");
    try {
      // Only include email in payload if it actually changed, to prevent redundant confirmation emails
      const updatePayload: any = {
        data: { full_name: settingsName, avatar_url: settingsAvatar, phone: settingsPhone }
      };
      
      if (settingsEmail !== user.email) {
        updatePayload.email = settingsEmail;
      }

      const { error } = await supabase.auth.updateUser(updatePayload);
      if (error) throw error;
      setSettingsMessage("Profile updated successfully!");
      setTimeout(() => router.refresh(), 1000);
    } catch (err: any) {
      console.error(err);
      setSettingsMessage(`Error: ${err.message || JSON.stringify(err)}`);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSettingsMessage("Uploading avatar...");
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.email}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setSettingsAvatar(data.publicUrl);
      setSettingsMessage("Avatar uploaded! Remember to click Save.");
    } catch (error: any) {
      setSettingsMessage(`Upload error: ${error.message}`);
    }
  };

  // Hydration-safe clock
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("xy_dashboard_intro_seen");
    if (hasSeenIntro) {
      setIntroComplete(true);
    }
    setHasMounted(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
    sessionStorage.setItem("xy_dashboard_intro_seen", "true");
  }, []);

  const handleSignOut = () => {
    setIsSigningOut(true);
    // Instantly navigate to the home page for a smooth, zero-delay transition
    router.push("/");
    
    // Clear the session in the background and tell Next.js to refresh its cache
    supabase.auth.signOut().then(() => {
      router.refresh();
    });
  };

  const [isInstantLaunching, setIsInstantLaunching] = useState(false);

  const handleStartMeeting = () => {
    setIsStartingMeeting(true);
    router.push(`/setup?name=${encodeURIComponent(user.fullName)}`);
  };

  const handleInstantMeeting = () => {
    setIsInstantLaunching(true);
    const roomId = Math.random().toString(36).substring(2, 9) + "-" + Math.random().toString(36).substring(2, 9);
    router.push(`/room/${roomId}?name=${encodeURIComponent(user.fullName)}&topic=Instant%20Meeting&capacity=50&host=true`);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  // Soft Organic Theme Colors
  const bgApp = "#f4f2eb";
  const bgCard = "#ffffff";
  const bgTaupe = "#d7d2c6"; 
  const textDark = "#2a2b2e";
  const textLight = "#8a8b8e";
  const yellowAccent = "#ffcc00";
  const charcoal = "#242528";
  const softShadow = "0 12px 40px rgba(0,0,0,0.04)";
  
  const fontFam = "'Nunito', 'Quicksand', 'Inter', system-ui, sans-serif";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  if (!hasMounted) return null;

  return (
    <>
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}
      <div style={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row",
        minHeight: "100vh", 
        background: bgApp, 
        color: textDark, 
        fontFamily: fontFam, 
        padding: isMobile ? "14px 10px" : "24px", 
        gap: isMobile ? "16px" : "24px",
        opacity: introComplete ? 1 : 0,
        transition: "opacity 0.9s ease"
      }}>
      
      {/* 1. Left Sidebar Navigation (Floating Pill) */}
      <aside style={{ 
        width: isMobile ? "100%" : "240px", 
        background: bgCard, 
        display: "flex", flexDirection: "column", 
        padding: isMobile ? "16px 14px" : "32px 20px",
        borderRadius: isMobile ? "20px" : "32px", 
        boxShadow: softShadow,
        flexShrink: 0
      }}>
        {/* Brand & User info */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isMobile ? "12px" : "28px",
          fontSize: "1.2rem", fontWeight: 900, color: textDark, letterSpacing: "-0.5px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: "0.8rem", flexShrink: 0
            }}>
              XR
            </div>
            XyncRoom
          </div>
          {isMobile && (
            <button onClick={handleSignOut} disabled={isSigningOut} style={{ 
              background: "#fef2f2", border: "none", color: "#ef4444", cursor: "pointer", padding: "6px 12px", 
              display: "flex", alignItems: "center", gap: 4, borderRadius: "100px", 
              fontWeight: 700, fontSize: "0.78rem" 
            }}>
              <LogOut size={13} strokeWidth={2.5} /> Sign out
            </button>
          )}
        </div>

        {/* Profile Card */}
        <div style={{ 
          padding: isMobile ? "10px 14px" : "20px 16px", background: "rgba(255, 255, 255, 0.6)", borderRadius: isMobile ? "14px" : "24px", 
          display: "flex", flexDirection: isMobile ? "row" : "column", alignItems: "center", gap: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.02)", marginBottom: isMobile ? "14px" : "40px"
        }}>
          <div style={{ width: isMobile ? 40 : 64, height: isMobile ? 40 : 64, background: user.avatarUrl ? "#fff" : charcoal, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? "0.95rem" : "1.2rem", fontWeight: "800", color: "#fff", overflow: "hidden", border: user.avatarUrl ? "2px solid #fff" : "none", flexShrink: 0, boxShadow: "0 4px 14px rgba(0,0,0,0.12)" }}>
            {user.avatarUrl ? <img src={user.avatarUrl} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : user.initials}
          </div>
          <span style={{ fontSize: isMobile ? "0.95rem" : "1rem", fontWeight: 800, color: textDark, textAlign: isMobile ? "left" : "center", lineHeight: "1.3", letterSpacing: "-0.3px", wordBreak: "break-word" }}>{user.fullName}</span>
        </div>

        {/* Navigation Links */}
        <nav style={{ 
          display: "flex", 
          flexDirection: isMobile ? "row" : "column", 
          gap: 8, 
          flex: isMobile ? "none" : 1,
          overflowX: isMobile ? "auto" : "visible",
          paddingBottom: isMobile ? "4px" : "0",
          WebkitOverflowScrolling: "touch"
        }}>
          <div onClick={() => setActiveTab('home')} style={{ display: "flex", alignItems: "center", gap: 10, padding: isMobile ? "8px 14px" : "14px 18px", background: activeTab === 'home' ? charcoal : "transparent", color: activeTab === 'home' ? "#fff" : textLight, fontWeight: 700, cursor: "pointer", borderRadius: "100px", boxShadow: activeTab === 'home' ? "0 8px 24px rgba(36,37,40,0.2)" : "none", fontSize: isMobile ? "0.85rem" : "0.95rem", whiteSpace: "nowrap" }}>
            <Home size={18} color={activeTab === 'home' ? yellowAccent : "currentColor"} strokeWidth={2.5} />
            <span>Home</span>
          </div>
          <div onClick={() => setActiveTab('schedule')} style={{ display: "flex", alignItems: "center", gap: 10, padding: isMobile ? "8px 14px" : "14px 18px", background: activeTab === 'schedule' ? charcoal : "transparent", color: activeTab === 'schedule' ? "#fff" : textLight, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", borderRadius: "100px", boxShadow: activeTab === 'schedule' ? "0 8px 24px rgba(36,37,40,0.2)" : "none", fontSize: isMobile ? "0.85rem" : "0.95rem", whiteSpace: "nowrap" }}>
            <CalendarIcon size={18} color={activeTab === 'schedule' ? yellowAccent : "currentColor"} strokeWidth={2.5} />
            <span>Schedule</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: isMobile ? "8px 14px" : "14px 18px", color: textLight, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", borderRadius: "100px", fontSize: isMobile ? "0.85rem" : "0.95rem", whiteSpace: "nowrap" }}>
            <Users size={18} strokeWidth={2.5} />
            <span>Contacts</span>
          </div>
          <div onClick={() => setActiveTab('settings')} style={{ display: "flex", alignItems: "center", gap: 10, padding: isMobile ? "8px 14px" : "14px 18px", background: activeTab === 'settings' ? charcoal : "transparent", color: activeTab === 'settings' ? "#fff" : textLight, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", borderRadius: "100px", boxShadow: activeTab === 'settings' ? "0 8px 24px rgba(36,37,40,0.2)" : "none", fontSize: isMobile ? "0.85rem" : "0.95rem", whiteSpace: "nowrap" }}>
            <Settings size={18} color={activeTab === 'settings' ? yellowAccent : "currentColor"} strokeWidth={2.5} />
            <span>Settings</span>
          </div>
          
          <div onClick={() => router.push("/pricing")} style={{ display: "flex", alignItems: "center", gap: 10, padding: isMobile ? "8px 14px" : "14px 18px", color: "#fbbf24", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", borderRadius: "100px", fontSize: isMobile ? "0.85rem" : "0.95rem", whiteSpace: "nowrap" }}>
            <Star size={18} strokeWidth={2.5} />
            <span>Upgrade</span>
          </div>

          {/* Inbox — visible to admin only */}
          {isAdmin && (
            <div
              onClick={() => setActiveTab('inbox')}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: isMobile ? "8px 14px" : "14px 18px", background: activeTab === 'inbox' ? "#166534" : "transparent", color: activeTab === 'inbox' ? "#fff" : "#16a34a", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", borderRadius: "100px", boxShadow: activeTab === 'inbox' ? "0 8px 24px rgba(22,101,52,0.2)" : "none", fontSize: isMobile ? "0.85rem" : "0.95rem", whiteSpace: "nowrap" }}
            >
              <Inbox size={18} strokeWidth={2.5} />
              <span>Inbox</span>
              {messages.length > 0 && (
                <span style={{ marginLeft: "auto", background: "#dc2626", color: "#fff", fontSize: "0.65rem", fontWeight: 800, padding: "1px 6px", borderRadius: "100px" }}>
                  {messages.length}
                </span>
              )}
            </div>
          )}
        </nav>

        {/* Sign out at bottom (desktop only) */}
        {!isMobile && (
          <button onClick={handleSignOut} disabled={isSigningOut} style={{ 
            marginTop: "auto", background: "#fff", border: "none", color: textLight, cursor: "pointer", padding: "14px", 
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: "100px", 
            fontWeight: 700, transition: "background 0.2s, color 0.2s" 
          }} 
          onMouseOver={(e) => { e.currentTarget.style.background = "#f7f7f7"; e.currentTarget.style.color = "#ef4444"; }} 
          onMouseOut={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = textLight; }}>
            {isSigningOut ? <div style={{ width: 14, height: 14, border: `2px solid ${textLight}`, borderTopColor: "transparent", animation: "spin 1s linear infinite", borderRadius: "50%" }} /> : (
              <>
                <LogOut size={16} strokeWidth={2.5} /> Sign out
              </>
            )}
          </button>
        )}
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto", padding: isMobile ? "0" : "8px", width: "100%" }}>
        
        {/* 2. Header & Live Clock */}
        <header style={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center", 
          justifyContent: "space-between", 
          marginBottom: isMobile ? "20px" : "32px",
          gap: isMobile ? 12 : 0
        }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            {activeTab === 'home' && (
              <>
                <h1 style={{ fontSize: isMobile ? "1.6rem" : "2.2rem", fontWeight: 800, margin: "0 0 4px 0", color: textDark, letterSpacing: "-1px" }}>Hi, {user.fullName.split(' ')[0]}!</h1>
                <p style={{ margin: 0, color: textLight, fontSize: isMobile ? "0.88rem" : "1rem", fontWeight: 600 }}>Let's take a look at your activity today</p>
              </>
            )}
            {activeTab === 'schedule' && (
              <>
                <h1 style={{ fontSize: isMobile ? "1.6rem" : "2.2rem", fontWeight: 800, margin: "0 0 4px 0", color: textDark, letterSpacing: "-1px" }}>Schedule</h1>
                <p style={{ margin: 0, color: textLight, fontSize: isMobile ? "0.88rem" : "1rem", fontWeight: 600 }}>Set up a new meeting with your team</p>
              </>
            )}
            {activeTab === 'settings' && (
              <>
                <h1 style={{ fontSize: isMobile ? "1.6rem" : "2.2rem", fontWeight: 800, margin: "0 0 4px 0", color: textDark, letterSpacing: "-1px" }}>Settings</h1>
                <p style={{ margin: 0, color: textLight, fontSize: isMobile ? "0.88rem" : "1rem", fontWeight: 600 }}>Manage your personal details and preferences</p>
              </>
            )}
            {activeTab === 'inbox' && (
              <>
                <h1 style={{ fontSize: isMobile ? "1.6rem" : "2.2rem", fontWeight: 800, margin: "0 0 4px 0", color: textDark, letterSpacing: "-1px" }}>📥 Support Inbox</h1>
                <p style={{ margin: 0, color: textLight, fontSize: isMobile ? "0.88rem" : "1rem", fontWeight: 600 }}>Messages from your users</p>
              </>
            )}
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Clock Pill */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: charcoal, padding: isMobile ? "8px 16px" : "12px 24px", borderRadius: "100px", boxShadow: "0 8px 24px rgba(36,37,40,0.2)" }}>
              <span style={{ fontSize: isMobile ? "0.85rem" : "1rem", fontWeight: 800, color: "#fff", fontVariantNumeric: "tabular-nums" }}>
                {currentTime ? formatTime(currentTime) : "--:--"}
              </span>
            </div>
            {/* Exit to Main Web Button */}
            <button
              onClick={() => router.replace("/")}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#fecaca", color: "#ef4444", border: "none",
                padding: isMobile ? "8px 16px" : "12px 24px", borderRadius: "100px",
                fontSize: isMobile ? "0.85rem" : "0.95rem", fontWeight: 700, cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "#f87171"; e.currentTarget.style.color = "#fff"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "#fecaca"; e.currentTarget.style.color = "#ef4444"; }}
            >
              <LogOut size={16} strokeWidth={2.5} /> Exit
            </button>
          </motion.div>
        </header>

        <motion.div 
          style={{ maxWidth: "1100px", width: "100%" }}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          
          {activeTab === 'home' && (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "350px 1fr", gap: isMobile ? 18 : 32 }}>
              {/* Left Column */}
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 18 : 32 }}>
                {/* Profile Card */}
                <motion.div variants={itemVariants} style={{ background: bgCard, borderRadius: "24px", padding: isMobile ? "24px 18px" : "32px", boxShadow: softShadow, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 80, height: 80, background: user.avatarUrl ? "#fff" : bgApp, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", fontWeight: 800, color: textDark, marginBottom: 16, overflow: "hidden", border: user.avatarUrl ? "4px solid #fff" : "none", boxShadow: "0 8px 16px rgba(0,0,0,0.08)" }}>
                    {user.avatarUrl ? <img src={user.avatarUrl} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : user.initials}
                  </div>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: textDark, margin: "0 0 4px 0" }}>{user.fullName}</h2>
                  <p style={{ margin: "0 0 24px 0", color: textLight, fontSize: "0.9rem", fontWeight: 600 }}>Plan: <span style={{ color: textDark }}>Workplace Basic</span></p>
                </motion.div>

                {/* Promo Card */}
                <motion.div variants={itemVariants} style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)", borderRadius: "24px", padding: isMobile ? "24px 18px" : "32px", boxShadow: "0 12px 32px rgba(37,99,235,0.3)", color: "#fff", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "relative", zIndex: 10 }}>
                    <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 800, marginBottom: 16 }}>XR Vision Pro</div>
                    <h3 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>Unlock Superpowers!</h3>
                    <p style={{ margin: "0 0 24px 0", fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>Upgrade now to unlock premium features and extended durations.</p>
                    <button onClick={() => router.push("/pricing")} style={{ background: "#fff", color: "#1d4ed8", border: "none", padding: "10px 20px", borderRadius: "12px", fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>Upgrade</button>
                  </div>
                  <div style={{ position: "absolute", bottom: -20, right: -20, width: 100, height: 100, background: "rgba(255,255,255,0.1)", borderRadius: "50%" }}></div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 18 : 32 }}>
                {/* Quick Actions Card */}
                <motion.div variants={itemVariants} style={{ background: bgCard, borderRadius: "24px", padding: isMobile ? "24px 16px" : "40px", boxShadow: softShadow }}>
                  
                  {/* Icon Row */}
                  <div style={{ display: "flex", gap: isMobile ? 20 : 48, marginBottom: isMobile ? 24 : 40, justifyContent: "center", flexWrap: isMobile ? "wrap" : "nowrap" }}>
                    {/* Schedule */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setActiveTab('schedule')}>
                      <motion.div whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(45,91,255,0.2)" }} style={{ width: isMobile ? 64 : 80, height: isMobile ? 64 : 80, borderRadius: isMobile ? "18px" : "24px", background: "#2D5BFF", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(45,91,255,0.1)" }}>
                        <CalendarIcon size={isMobile ? 26 : 32} strokeWidth={2.5} />
                      </motion.div>
                      <span style={{ fontWeight: 700, color: textDark, fontSize: isMobile ? "0.85rem" : "0.95rem" }}>Schedule</span>
                    </div>
                    {/* Join */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => {
                        const id = prompt("Enter Room ID to join:");
                        if (id) router.push(`/room/${id}`);
                      }}>
                      <motion.div whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(45,91,255,0.2)" }} style={{ width: isMobile ? 64 : 80, height: isMobile ? 64 : 80, borderRadius: isMobile ? "18px" : "24px", background: "#2D5BFF", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(45,91,255,0.1)" }}>
                        <Plus size={isMobile ? 28 : 36} strokeWidth={3} />
                      </motion.div>
                      <span style={{ fontWeight: 700, color: textDark, fontSize: isMobile ? "0.85rem" : "0.95rem" }}>Join</span>
                    </div>
                    {/* Host */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={handleStartMeeting}>
                      <motion.div whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(249,115,22,0.2)" }} style={{ width: isMobile ? 64 : 80, height: isMobile ? 64 : 80, borderRadius: isMobile ? "18px" : "24px", background: "#f97316", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(249,115,22,0.1)" }}>
                        {isStartingMeeting ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ width: 24, height: 24, border: `3px solid rgba(255,255,255,0.3)`, borderTopColor: "#fff", borderRadius: "50%" }} />
                        ) : (
                          <Video size={isMobile ? 28 : 36} strokeWidth={2.5} />
                        )}
                      </motion.div>
                      <span style={{ fontWeight: 700, color: textDark, fontSize: isMobile ? "0.85rem" : "0.95rem" }}>Host</span>
                    </div>
                  </div>

                  <div style={{ width: "100%", height: 1, background: "rgba(36,37,40,0.05)", marginBottom: 20 }}></div>

                  {/* Personal Meeting ID */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <span style={{ color: textDark, fontWeight: 800, fontSize: isMobile ? "0.95rem" : "1.1rem" }}>Personal Meeting ID</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, color: textLight, fontWeight: 700, fontSize: isMobile ? "0.95rem" : "1.1rem" }}>
                      {personalMeetingId}
                      <button style={{ background: "none", border: "none", color: textLight, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }} onClick={() => navigator.clipboard.writeText(personalMeetingId)}><Copy size={16} strokeWidth={2.5} /></button>
                    </div>
                  </div>
                </motion.div>

                {/* Upcoming Meetings */}
                <motion.div variants={itemVariants} style={{ background: bgCard, borderRadius: "24px", padding: isMobile ? "24px 18px" : "40px", boxShadow: softShadow }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h2 style={{ fontSize: isMobile ? "1.25rem" : "1.5rem", fontWeight: 800, color: textDark, margin: 0 }}>Meetings</h2>
                    <span style={{ color: "#2D5BFF", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>Visit Meetings</span>
                  </div>
                  
                  <div style={{ background: bgApp, padding: isMobile ? "28px 18px" : "40px 32px", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, textAlign: "center" }}>
                    <span style={{ color: textDark, fontWeight: 800, fontSize: isMobile ? "0.95rem" : "1.1rem" }}>No Upcoming Meetings</span>
                    <button style={{ background: "transparent", border: "2px solid rgba(36,37,40,0.08)", color: "#2D5BFF", fontWeight: 700, padding: "10px 20px", borderRadius: "100px", cursor: "pointer", fontSize: isMobile ? "0.85rem" : "0.95rem", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "rgba(45,91,255,0.05)"} onMouseOut={e => e.currentTarget.style.background = "transparent"}>Test Audio and Video</button>
                  </div>
                </motion.div>

              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <ScheduleMeetingForm userFullName={user.fullName} />
          )}

          {/* ── Admin Inbox ──────────────────────────────────────────── */}
          {activeTab === 'inbox' && isAdmin && (
            <motion.div variants={itemVariants} style={{ maxWidth: 680 }}>
              {inboxLoading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    style={{ width: 32, height: 32, border: "3px solid #bbf7d0", borderTopColor: "#16a34a", borderRadius: "50%" }}
                  />
                </div>
              ) : messages.length === 0 ? (
                <div style={{ background: bgCard, borderRadius: 24, padding: "60px 40px", textAlign: "center", boxShadow: softShadow }}>
                  <div style={{ fontSize: "3rem", marginBottom: 16 }}>📭</div>
                  <p style={{ color: textDark, fontWeight: 800, fontSize: "1.1rem", margin: "0 0 8px" }}>No messages yet</p>
                  <p style={{ color: textLight, fontWeight: 600, margin: 0 }}>When users send support messages, they'll show up here.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
                      style={{
                        background: bgCard,
                        borderRadius: 20,
                        padding: "18px 22px",
                        boxShadow: softShadow,
                        cursor: "pointer",
                        border: expandedId === msg.id ? "1.5px solid #bbf7d0" : "1.5px solid transparent",
                        transition: "border 0.2s",
                      }}
                    >
                      {/* Top row */}
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#dcfce7", border: "1.5px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#166534", fontSize: "1rem", flexShrink: 0 }}>
                          {msg.name.charAt(0).toUpperCase()}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ margin: 0, color: textDark, fontWeight: 800, fontSize: "0.92rem" }}>{msg.name}</p>
                          <p style={{ margin: 0, color: "#16a34a", fontWeight: 600, fontSize: "0.78rem" }}>{msg.email}</p>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <p style={{ margin: "0 0 4px", color: textLight, fontSize: "0.72rem", fontWeight: 600 }}>
                            {new Date(msg.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <span style={{ background: msg.status === 'resolved' ? '#dcfce7' : '#fef9c3', color: msg.status === 'resolved' ? '#166534' : '#854d0e', fontSize: "0.68rem", fontWeight: 800, padding: "2px 8px", borderRadius: "100px" }}>
                            {msg.status === 'resolved' ? '✓ Resolved' : '● Open'}
                          </span>
                        </div>
                      </div>

                      {/* Preview (collapsed) */}
                      {expandedId !== msg.id && (
                        <p style={{ margin: "8px 0 0 52px", color: textLight, fontWeight: 600, fontSize: "0.83rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {msg.message}
                        </p>
                      )}

                      {/* Full message (expanded) */}
                      <AnimatePresence>
                        {expandedId === msg.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ overflow: "hidden" }}
                          >
                            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "14px 16px", marginTop: 12 }}>
                              <p style={{ margin: 0, color: "#14532d", fontWeight: 600, fontSize: "0.88rem", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                                {msg.message}
                              </p>
                            </div>
                            <p style={{ margin: "10px 0 0", color: textLight, fontSize: "0.76rem", fontWeight: 600 }}>
                              Reply to:{" "}
                              <a
                                href={`mailto:${msg.email}?subject=Re: Your XyncRoom Support Request`}
                                onClick={e => e.stopPropagation()}
                                style={{ color: "#16a34a", fontWeight: 700, textDecoration: "none" }}
                              >
                                {msg.email}
                              </a>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div variants={itemVariants} style={{ background: bgCard, borderRadius: "40px", padding: "40px", boxShadow: softShadow, color: textDark }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0 0 24px 0" }}>Profile Picture</h2>
              <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", marginBottom: "40px" }}>
                <div style={{ width: 100, height: 100, background: bgApp, borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: 800, color: textLight, flexShrink: 0 }}>
                  {settingsAvatar ? <img src={settingsAvatar} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : user.initials}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <label style={{ cursor: "pointer", background: charcoal, color: "#fff", padding: "10px 20px", borderRadius: "100px", fontWeight: 700, fontSize: "0.9rem", display: "inline-block", textAlign: "center", width: "fit-content" }}>
                    Upload from device
                    <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarUpload} />
                  </label>
                  <span style={{ fontSize: "0.85rem", color: textLight, fontWeight: 600 }}>Or choose a preset:</span>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {PRESET_AVATARS.map((url, idx) => (
                      <div key={idx} onClick={() => setSettingsAvatar(url)} style={{ width: 48, height: 48, borderRadius: "50%", background: bgApp, cursor: "pointer", overflow: "hidden", border: settingsAvatar === url ? `2px solid ${charcoal}` : "2px solid transparent", flexShrink: 0 }}>
                        <img src={url} alt={`Preset ${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0 0 24px 0" }}>Personal Details</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: 700, color: textDark }}>Full Name</label>
                  <input type="text" value={settingsName} onChange={e => setSettingsName(e.target.value)} style={{ padding: "14px 16px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.1)", background: bgApp, fontSize: "1rem", outline: "none", fontFamily: fontFam, color: textDark }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: 700, color: textDark }}>Email Address</label>
                  <input type="email" value={settingsEmail} onChange={e => setSettingsEmail(e.target.value)} style={{ padding: "14px 16px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.1)", background: bgApp, fontSize: "1rem", outline: "none", fontFamily: fontFam, color: textDark }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: 700, color: textDark }}>Phone Number</label>
                  <input type="tel" value={settingsPhone} onChange={e => setSettingsPhone(e.target.value)} placeholder="+1 234 567 8900" style={{ padding: "14px 16px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.1)", background: bgApp, fontSize: "1rem", outline: "none", fontFamily: fontFam, color: textDark }} />
                </div>
              </div>
              
              {settingsMessage && (
                <div style={{ marginBottom: "24px", padding: "12px 16px", borderRadius: "12px", background: settingsMessage.toLowerCase().includes("error") ? "#fecaca" : "#d1fae5", color: settingsMessage.toLowerCase().includes("error") ? "#ef4444" : "#059669", fontSize: "0.9rem", fontWeight: 600 }}>
                  {settingsMessage}
                </div>
              )}

              <button onClick={handleSaveSettings} disabled={isSavingSettings} style={{ background: charcoal, color: "#fff", border: "none", padding: "16px 32px", borderRadius: "100px", fontSize: "1rem", fontWeight: 700, cursor: isSavingSettings ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 8px 24px rgba(36,37,40,0.2)", width: "fit-content" }}>
                {isSavingSettings ? "Saving..." : "Save Changes"}
              </button>
            </motion.div>
          )}

        </motion.div>
      </main>
    </div>
    </>
  );
}
