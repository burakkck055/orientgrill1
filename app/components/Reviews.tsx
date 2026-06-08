"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const REVIEWS = [
  { author: "Max M.", initial: "M", text: "Beste Pizza in Bergneustadt! Der Teig ist herrlich knusprig und die Beläge sind großzügig. Werde definitiv wiederkommen." },
  { author: "Ayse K.", initial: "A", text: "Der Döner mit Abstand der Beste den ich je gegessen habe. Frisches Fleisch, leckere Soßen und sehr nettes Personal." },
  { author: "Thomas B.", initial: "T", text: "Sehr freundlich und schnell. Die Adana-Spieße sind einfach unglaublich. Echte orientalische Küche auf höchstem Niveau!" },
  { author: "Sarah L.", initial: "S", text: "Die Schahin Pizza ist meine absolute Lieblingspizza. Immer frisch und lecker. Top Qualität, immer gerne wieder!" },
  { author: "Familie W.", initial: "F", text: "Toller Service, schnelle Lieferung und geschmacklich einfach perfekt. Orient Grill ist unser Stamm-Restaurant." },
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: EASE }}>
      {children}
    </motion.div>
  );
}

export default function Reviews() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % REVIEWS.length), 3800);
    return () => clearInterval(id);
  }, []);

  const visible = [
    REVIEWS[active % REVIEWS.length],
    REVIEWS[(active + 1) % REVIEWS.length],
    REVIEWS[(active + 2) % REVIEWS.length],
  ];

  return (
    <section id="bewertungen" style={{ background: "#FFFFFF", padding: "80px 24px 100px", position: "relative", overflow: "hidden" }}>
      {/* Background image strip (top/bottom corners) for ambiance */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03 }}>
        <div className="oriental-pattern-light" style={{ position: "absolute", inset: 0 }} />
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <p className="font-cinzel" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#B71C1C", textTransform: "uppercase", marginBottom: "10px" }}>
              Bewertungen
            </p>
            <h2 className="font-cinzel" style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, color: "#8B0000", marginBottom: "14px", lineHeight: 1.1 }}>
              Was unsere Gäste sagen
            </h2>
            {/* Google rating pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 18px", borderRadius: "100px", background: "#FFF2F2", border: "1px solid rgba(183,28,28,0.18)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-cinzel" style={{ fontSize: "14px", fontWeight: 700, color: "#8B0000" }}>4,9</span>
              <span className="font-inter" style={{ fontSize: "12px", color: "rgba(30,0,0,0.50)" }}>Google Bewertung</span>
            </div>
          </div>
        </Reveal>

        {/* Desktop: 3 cards */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {visible.map((r, i) => (
            <motion.div
              key={`${active}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: EASE }}
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "28px",
                border: "1px solid rgba(183,28,28,0.14)",
                boxShadow: "0 4px 24px rgba(183,28,28,0.08), inset 0 1px 0 #fff",
                borderTop: "3px solid rgba(183,28,28,0.55)",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "42px", height: "42px", borderRadius: "12px", flexShrink: 0,
                  background: "linear-gradient(135deg, #B71C1C 0%, #8B0000 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span className="font-cinzel" style={{ color: "white", fontSize: "15px", fontWeight: 700 }}>{r.initial}</span>
                </div>
                <div>
                  <p className="font-inter" style={{ fontSize: "13px", fontWeight: 700, color: "#1A1A1A" }}>{r.author}</p>
                  <p className="font-inter" style={{ fontSize: "11px", color: "rgba(183,28,28,0.55)" }}>Verifizierter Gast</p>
                </div>
              </div>
              <Stars />
              <p className="font-playfair" style={{ fontSize: "14px", fontStyle: "italic", color: "rgba(30,0,0,0.62)", lineHeight: 1.65 }}>"{r.text}"</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "28px",
              border: "1px solid rgba(183,28,28,0.14)",
              boxShadow: "0 4px 24px rgba(183,28,28,0.08)",
              borderTop: "3px solid rgba(183,28,28,0.55)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(135deg, #B71C1C 0%, #8B0000 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="font-cinzel" style={{ color: "white", fontSize: "14px", fontWeight: 700 }}>{REVIEWS[active].initial}</span>
              </div>
              <div>
                <p className="font-inter" style={{ fontSize: "13px", fontWeight: 700, color: "#1A1A1A" }}>{REVIEWS[active].author}</p>
                <p className="font-inter" style={{ fontSize: "11px", color: "rgba(183,28,28,0.55)" }}>Verifizierter Gast</p>
              </div>
            </div>
            <Stars />
            <p className="font-playfair" style={{ fontSize: "15px", fontStyle: "italic", color: "rgba(30,0,0,0.62)", lineHeight: 1.65, marginTop: "12px" }}>"{REVIEWS[active].text}"</p>
          </motion.div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "32px" }}>
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === active ? "#B71C1C" : "rgba(183,28,28,0.22)",
                border: "none", cursor: "pointer",
                transition: "width 0.3s ease, background 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
