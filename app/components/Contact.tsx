"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const hours = [
  { days: "Mo – Fr", time: "11:00 – 22:00 Uhr" },
  { days: "Sa – So", time: "11:00 – 23:00 Uhr" },
  { days: "Feiertage", time: "12:00 – 22:00 Uhr" },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay, duration: 0.65, ease: EASE }}>
      {children}
    </motion.div>
  );
}

function getTodayLabel() {
  const d = new Date().getDay();
  return d === 0 || d === 6 ? "Sa – So" : "Mo – Fr";
}

const cardStyle: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: "16px",
  padding: "28px",
  border: "1px solid rgba(183,28,28,0.14)",
  boxShadow: "0 4px 24px rgba(183,28,28,0.08), inset 0 1px 0 #fff",
  borderTop: "3px solid #B71C1C",
};

export default function Contact() {
  const todayLabel = getTodayLabel();

  return (
    <section id="kontakt" style={{ background: "#FFF8F8", padding: "80px 24px 100px", position: "relative", overflow: "hidden" }}>
      <div className="oriental-pattern-light" style={{ position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <Reveal>
          <p className="font-cinzel" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#B71C1C", textTransform: "uppercase", marginBottom: "10px" }}>
            Kontakt &amp; Standort
          </p>
          <h2 className="font-cinzel" style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, color: "#8B0000", marginBottom: "48px", lineHeight: 1.1 }}>
            Besuchen Sie uns
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>

          {/* Map placeholder */}
          <Reveal delay={0.08}>
            <div style={{ ...cardStyle, padding: 0, overflow: "hidden", minHeight: "340px", display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1, position: "relative", background: "#FFF8F8", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "220px", overflow: "hidden" }}>
                {[20,40,60,80].map((p) => (
                  <div key={`h${p}`} style={{ position: "absolute", left: 0, right: 0, top: `${p}%`, height: "1px", background: "rgba(183,28,28,0.07)" }} />
                ))}
                {[20,40,60,80].map((p) => (
                  <div key={`v${p}`} style={{ position: "absolute", top: 0, bottom: 0, left: `${p}%`, width: "1px", background: "rgba(183,28,28,0.07)" }} />
                ))}
                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "8px", background: "rgba(183,28,28,0.09)", transform: "translateY(-50%)" }} />
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "8px", background: "rgba(183,28,28,0.07)", transform: "translateX(-50%)" }} />
                <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <svg width="38" height="46" viewBox="0 0 36 44" fill="none">
                    <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 26 18 26S36 31.5 36 18C36 8.06 27.94 0 18 0z" fill="#B71C1C" />
                    <circle cx="18" cy="18" r="7" fill="white" />
                  </svg>
                </div>
              </div>
              <div style={{ padding: "20px 24px 24px" }}>
                <p className="font-cinzel" style={{ fontSize: "14px", fontWeight: 700, color: "#8B0000", marginBottom: "4px" }}>Kölner Str. 191</p>
                <p className="font-inter" style={{ fontSize: "13px", color: "rgba(30,0,0,0.55)", marginBottom: "16px" }}>51702 Bergneustadt</p>
                <a
                  href="https://maps.google.com/?q=Kölner+Str.+191,+51702+Bergneustadt"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
                    padding: "11px 20px", borderRadius: "8px",
                    background: "linear-gradient(135deg, #B71C1C 0%, #8B0000 100%)",
                    color: "white", textDecoration: "none", fontSize: "13px", fontWeight: 600,
                    boxShadow: "0 3px 14px rgba(183,28,28,0.30)", transition: "filter 0.2s ease",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(1.08)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(1)")}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  In Google Maps öffnen
                </a>
              </div>
            </div>
          </Reveal>

          {/* Öffnungszeiten */}
          <Reveal delay={0.14}>
            <div style={cardStyle}>
              <p className="font-cinzel" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "#B71C1C", textTransform: "uppercase", marginBottom: "20px" }}>Öffnungszeiten</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {hours.map((h) => {
                  const active = h.days === todayLabel;
                  return (
                    <div key={h.days} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "10px 14px", borderRadius: "8px",
                      background: active ? "rgba(183,28,28,0.06)" : "transparent",
                      border: active ? "1px solid rgba(183,28,28,0.18)" : "1px solid transparent",
                    }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {active && <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#B71C1C", display: "inline-block" }} />}
                        <span className="font-inter" style={{ fontSize: "13px", fontWeight: active ? 600 : 400, color: active ? "#8B0000" : "rgba(30,0,0,0.55)" }}>{h.days}</span>
                      </span>
                      <span className="font-inter" style={{ fontSize: "13px", fontWeight: active ? 700 : 500, color: active ? "#B71C1C" : "rgba(30,0,0,0.68)" }}>{h.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Direktkontakt */}
          <Reveal delay={0.20}>
            <div style={cardStyle}>
              <p className="font-cinzel" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "#B71C1C", textTransform: "uppercase", marginBottom: "20px" }}>Direkt Kontakt</p>
              <p className="font-cinzel" style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 700, color: "#8B0000", marginBottom: "5px", letterSpacing: "0.02em" }}>02261 9877118</p>
              <p className="font-inter" style={{ fontSize: "13px", color: "rgba(30,0,0,0.48)", marginBottom: "24px" }}>Kölner Str. 191 · 51702 Bergneustadt</p>
              <a
                href="tel:022619877118"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
                  padding: "14px 20px", borderRadius: "10px", marginBottom: "10px",
                  background: "linear-gradient(135deg, #B71C1C 0%, #8B0000 100%)",
                  color: "white", textDecoration: "none", fontSize: "15px", fontWeight: 700,
                  boxShadow: "0 4px 18px rgba(183,28,28,0.35), inset 0 1px 0 rgba(255,255,255,0.14)",
                  transition: "filter 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(1.08)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(1)")}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.64a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Jetzt anrufen
              </a>
              <a
                href="https://maps.google.com/?q=Kölner+Str.+191,+51702+Bergneustadt"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
                  padding: "13px 20px", borderRadius: "10px",
                  background: "white", color: "#B71C1C",
                  border: "1.5px solid rgba(183,28,28,0.26)",
                  textDecoration: "none", fontSize: "14px", fontWeight: 600,
                  boxShadow: "0 2px 10px rgba(183,28,28,0.08)", transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FFF2F2")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "white")}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B71C1C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Route in Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
