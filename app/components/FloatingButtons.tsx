"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        zIndex: 100,
        display: "flex",
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "2px solid #B71C1C",
        boxShadow: "0 -4px 24px rgba(183,28,28,0.14)",
      }}
    >
      {/* Jetzt anrufen */}
      <a
        href="tel:022619877118"
        style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          gap: "9px", padding: "15px 12px",
          background: "linear-gradient(135deg, #B71C1C 0%, #8B0000 100%)",
          color: "white", textDecoration: "none",
          fontSize: "14px", fontWeight: 700,
          fontFamily: "var(--font-inter-var), Inter, sans-serif",
          borderRight: "1px solid rgba(255,255,255,0.18)",
          transition: "filter 0.2s ease",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(1.08)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(1)")}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.64a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
        <span>Jetzt anrufen</span>
        <span style={{ fontSize: "12px", opacity: 0.85, fontWeight: 500 }}>02261 9877118</span>
      </a>

      {/* Google Maps */}
      <a
        href="https://maps.google.com/?q=Kölner+Str.+191,+51702+Bergneustadt"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          gap: "9px", padding: "15px 12px",
          background: "white", color: "#B71C1C",
          textDecoration: "none",
          fontSize: "14px", fontWeight: 700,
          fontFamily: "var(--font-inter-var), Inter, sans-serif",
          transition: "background 0.2s ease",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FFF2F2")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "white")}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B71C1C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>Route planen</span>
        <span style={{ fontSize: "11px", opacity: 0.55, fontWeight: 400 }}>Kölner Str. 191</span>
      </a>
    </motion.div>
  );
}
