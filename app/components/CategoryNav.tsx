"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import menuData from "../../data/menu.json";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

function useTilt(maxDeg = 8) {
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sX = useSpring(rotX, { stiffness: 260, damping: 26 });
  const sY = useSpring(rotY, { stiffness: 260, damping: 26 });
  const ref = useRef<HTMLDivElement>(null);
  function onMove(e: React.MouseEvent) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    rotY.set(((e.clientX - r.left) / r.width - 0.5) * 2 * maxDeg);
    rotX.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * maxDeg);
  }
  function onLeave() { rotX.set(0); rotY.set(0); }
  return { ref, sX, sY, onMove, onLeave };
}

function CategoryCard({ category, index }: { category: (typeof menuData.categories)[0]; index: number }) {
  const tilt = useTilt(7);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.045, duration: 0.55, ease: EASE }}
      style={{ perspective: "800px" }}
    >
      <motion.div
        ref={tilt.ref}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        onClick={() => {
          window.dispatchEvent(new CustomEvent("open-category", { detail: category.id }));
          setTimeout(() => {
            document.getElementById(category.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 80);
        }}
        whileHover={{ y: -5, boxShadow: "0 10px 36px rgba(183,28,28,0.18), 0 3px 10px rgba(183,28,28,0.10), inset 0 1px 0 #fff" }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        style={{
          rotateX: tilt.sX,
          rotateY: tilt.sY,
          transformStyle: "preserve-3d",
          padding: "20px 10px",
          borderRadius: "14px",
          cursor: "pointer",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          background: "#FFFFFF",
          border: "1px solid rgba(183,28,28,0.14)",
          boxShadow: "0 2px 12px rgba(183,28,28,0.07), inset 0 1px 0 #fff",
          transition: "box-shadow 0.22s ease",
        }}
      >
        <span style={{ fontSize: "28px", lineHeight: 1 }}>{category.emoji}</span>
        <span
          className="font-cinzel"
          style={{
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em",
            color: "#B71C1C", textTransform: "uppercase",
          }}
        >
          {category.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function CategoryNav() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="sec-pad"
      style={{
        background: "#FFF8F8",
        borderTop: "1px solid rgba(183,28,28,0.10)",
        borderBottom: "1px solid rgba(183,28,28,0.08)",
      }}
    >
      {/* Subtle background image tint */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div className="oriental-pattern-light" style={{ position: "absolute", inset: 0, opacity: 0.035 }} />
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-cinzel"
          style={{ fontSize: "11px", fontWeight: 700, color: "#B71C1C", letterSpacing: "0.25em", textTransform: "uppercase", textAlign: "center", marginBottom: "12px" }}
        >
          SPEISEKARTE
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <h2 className="font-cinzel" style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700, color: "#8B0000", marginBottom: "4px" }}>
            Entdecken Sie unsere{" "}
            <span style={{ color: "#B71C1C" }}>Köstlichkeiten</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }} className="sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {menuData.categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
