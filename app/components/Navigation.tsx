"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home",        href: "#home" },
  { label: "Speisekarte", href: "#speisekarte" },
  { label: "Best Seller", href: "#best-seller" },
  { label: "Bewertungen", href: "#bewertungen" },
  { label: "Kontakt",     href: "#kontakt" },
];

function NavLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg width="36" height="36" viewBox="0 0 80 80" aria-hidden>
        <path d="M40 5 L45.5 17 L58 12 L53.5 24.5 L66 30 L53.5 35.5 L58 48 L45.5 43.5 L40 55 L34.5 43.5 L22 48 L26.5 35.5 L14 30 L26.5 24.5 L22 12 L34.5 17 Z" fill="#B71C1C" />
        <path d="M40 18 L43 26 L51.5 23 L46.5 30 L51.5 37 L43 34 L40 42 L37 34 L28.5 37 L33.5 30 L28.5 23 L37 26 Z" fill="white" opacity="0.93" />
        <circle cx="40" cy="30" r="3" fill="#B71C1C" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span className="font-cinzel" style={{ color: "#8B0000", fontSize: "17px", fontWeight: 700, letterSpacing: "0.06em" }}>ORIENT GRILL</span>
        <span className="font-cinzel" style={{ color: "rgba(139,0,0,0.42)", fontSize: "8px", fontWeight: 400, letterSpacing: "0.28em" }}>BERGNEUSTADT</span>
      </div>
    </div>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={scrolled ? "glass-nav" : ""}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          background: scrolled ? undefined : "rgba(255,255,255,0.82)",
          borderBottom: scrolled ? undefined : "1px solid rgba(183,28,28,0.10)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#home" onClick={(e) => go(e, "#home")} style={{ textDecoration: "none" }}>
            <NavLogo />
          </a>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }} className="hidden md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className="font-inter"
                style={{ color: "rgba(30,0,0,0.60)", textDecoration: "none", fontSize: "14px", fontWeight: 500, letterSpacing: "0.01em", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#B71C1C")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(30,0,0,0.60)")}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:022619877118"
              className="font-inter"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "9px 18px", borderRadius: "8px",
                background: "linear-gradient(135deg, #B71C1C 0%, #8B0000 100%)",
                border: "1px solid rgba(183,28,28,0.30)",
                color: "#fff", textDecoration: "none",
                fontSize: "13px", fontWeight: 600,
                boxShadow: "0 3px 14px rgba(183,28,28,0.32), inset 0 1px 0 rgba(255,255,255,0.14)",
                transition: "filter 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.64a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              Jetzt anrufen
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            aria-label="Menü öffnen"
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "4px" }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={menuOpen ? (i === 0 ? { rotate: 45, y: 10 } : i === 1 ? { opacity: 0 } : { rotate: -45, y: -10 }) : { rotate: 0, y: 0, opacity: 1 }}
                style={{ display: "block", width: "24px", height: "2px", background: "#B71C1C", borderRadius: "2px" }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px",
            }}
          >
            <div style={{ marginBottom: "24px" }}><NavLogo /></div>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="font-cinzel"
                style={{ color: "rgba(30,0,0,0.70)", textDecoration: "none", fontSize: "20px", fontWeight: 400, letterSpacing: "0.1em", padding: "12px 24px", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#B71C1C")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(30,0,0,0.70)")}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="tel:022619877118"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.06 }}
              style={{
                marginTop: "16px", padding: "13px 30px", borderRadius: "8px",
                background: "linear-gradient(135deg, #B71C1C 0%, #8B0000 100%)",
                border: "1px solid rgba(183,28,28,0.30)",
                color: "#fff", textDecoration: "none", fontSize: "15px", fontWeight: 600,
              }}
            >
              📞 02261 9877118
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
