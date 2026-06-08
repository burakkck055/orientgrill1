"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* ── Background image — desktop ── */}
      <div className="hidden sm:block" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/Images/Logo.png"
          alt="Orientalischer Hintergrund"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          quality={95}
        />
      </div>

      {/* ── Background image — mobile ── */}
      <div className="sm:hidden" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/Images/Logo_Handy.png"
          alt="Orientalischer Hintergrund"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center top" }}
          quality={95}
        />
      </div>

      {/* Subtle center brightening so text stands out */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.55) 0%, transparent 80%)",
        }}
      />

      {/* Content */}
      <div className="hero-pad">
        {/* Logo emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.78 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
          style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}
        >
          <svg width="88" height="88" viewBox="0 0 80 80" aria-label="Orient Grill Logo">
            <path
              d="M40 5 L45.5 17 L58 12 L53.5 24.5 L66 30 L53.5 35.5 L58 48 L45.5 43.5 L40 55 L34.5 43.5 L22 48 L26.5 35.5 L14 30 L26.5 24.5 L22 12 L34.5 17 Z"
              fill="#B71C1C"
            />
            <path
              d="M40 18 L43 26 L51.5 23 L46.5 30 L51.5 37 L43 34 L40 42 L37 34 L28.5 37 L33.5 30 L28.5 23 L37 26 Z"
              fill="white"
              opacity="0.93"
            />
            <circle cx="40" cy="30" r="3" fill="#B71C1C" />
          </svg>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.9, ease: EASE }}
          className="font-cinzel"
          style={{
            fontSize: "clamp(42px, 10vw, 106px)",
            fontWeight: 900,
            letterSpacing: "-0.01em",
            lineHeight: 0.95,
            color: "#8B0000",
            marginBottom: "8px",
            textShadow: "0 2px 20px rgba(255,255,255,0.7)",
          }}
        >
          ORIENT GRILL
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.50, duration: 0.8, ease: EASE }}
          className="font-cinzel"
          style={{
            fontSize: "clamp(13px, 3.2vw, 30px)",
            fontWeight: 400,
            color: "rgba(139,0,0,0.52)",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            marginBottom: "26px",
          }}
        >
          BERGNEUSTADT
        </motion.div>

        {/* Ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.60, duration: 0.8, ease: EASE }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "26px" }}
        >
          <svg width="260" height="18" viewBox="0 0 260 18" fill="none">
            <line x1="0" y1="9" x2="110" y2="9" stroke="url(#rg1)" strokeWidth="1" />
            <polygon points="130,2 138,9 130,16 122,9" fill="#B71C1C" opacity="0.50" />
            <line x1="150" y1="9" x2="260" y2="9" stroke="url(#rg2)" strokeWidth="1" />
            <defs>
              <linearGradient id="rg1" x1="0" y1="0" x2="110" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#B71C1C" stopOpacity="0" />
                <stop offset="100%" stopColor="#B71C1C" stopOpacity="0.50" />
              </linearGradient>
              <linearGradient id="rg2" x1="0" y1="0" x2="110" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#B71C1C" stopOpacity="0.50" />
                <stop offset="100%" stopColor="#B71C1C" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Taglines */}
        {[
          { text: "Frische Zutaten.", delay: 0.68 },
          { text: "Steinofen Pizza.", delay: 0.78 },
          { text: "Orientalische Spezialitäten.", delay: 0.88 },
        ].map((line) => (
          <motion.p
            key={line.text}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: line.delay, duration: 0.7, ease: EASE }}
            className="font-playfair"
            style={{
              fontSize: "clamp(14px, 2vw, 20px)",
              fontStyle: "italic",
              color: "rgba(30,0,0,0.58)",
              lineHeight: 1.65,
              marginBottom: "2px",
            }}
          >
            {line.text}
          </motion.p>
        ))}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: EASE }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginTop: "36px", width: "100%" }}
        >
          {/* Row 1: Speisekarte + Anrufen */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
            <motion.a
              href="#speisekarte"
              onClick={(e) => { e.preventDefault(); document.getElementById("speisekarte")?.scrollIntoView({ behavior: "smooth" }); }}
              whileTap={{ y: 1, filter: "brightness(0.94)" }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "13px 24px", borderRadius: "10px",
                background: "linear-gradient(135deg, #B71C1C 0%, #8B0000 100%)",
                border: "1px solid rgba(183,28,28,0.30)",
                color: "#fff", textDecoration: "none",
                fontSize: "15px", fontWeight: 600, letterSpacing: "0.02em",
                boxShadow: "0 4px 20px rgba(183,28,28,0.40), inset 0 1px 0 rgba(255,255,255,0.15)",
                transition: "box-shadow 0.22s ease, filter 0.22s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1)"; }}
            >
              Speisekarte entdecken
            </motion.a>

            <motion.a
              href="tel:022619877118"
              whileTap={{ y: 1 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "13px 24px", borderRadius: "10px",
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(12px)",
                border: "1.5px solid rgba(183,28,28,0.30)",
                color: "#B71C1C", textDecoration: "none",
                fontSize: "15px", fontWeight: 600, letterSpacing: "0.02em",
                boxShadow: "0 2px 12px rgba(183,28,28,0.12)",
                transition: "background 0.22s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.98)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.88)"; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B71C1C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.64a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              02261 9877118
            </motion.a>
          </div>

          {/* Row 2: PDF Download */}
          <motion.a
            href="/speisekarte.pdf"
            download="Speisekarte Orient Grill.pdf"
            whileTap={{ y: 1 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "10px 20px", borderRadius: "8px",
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(12px)",
              border: "1.5px solid rgba(183,28,28,0.22)",
              color: "#8B0000", textDecoration: "none",
              fontSize: "13px", fontWeight: 600,
              boxShadow: "0 2px 10px rgba(183,28,28,0.10)",
              transition: "background 0.22s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.95)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.72)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B0000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Speisekarte als PDF herunterladen
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: "absolute", bottom: "28px", left: "50%",
          transform: "translateX(-50%)", zIndex: 10,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
        }}
      >
        <span className="font-inter" style={{ fontSize: "10px", color: "rgba(139,0,0,0.38)", letterSpacing: "0.16em" }}>SCROLL</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M5 8L10 13L15 8" stroke="rgba(183,28,28,0.40)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
