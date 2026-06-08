"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import menuData from "../../data/menu.json";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

type MenuItem = {
  id: string;
  name: string;
  description: string;
  prices: { label: string; value: string }[];
  additives: string[];
  isBestSeller: boolean;
  isNew: boolean;
  image: null;
};

type CategoryWithItems = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  items: MenuItem[];
};

function useTilt(maxDeg = 6) {
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sX = useSpring(rotX, { stiffness: 260, damping: 26 });
  const sY = useSpring(rotY, { stiffness: 260, damping: 26 });
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rotY.set(((e.clientX - r.left) / r.width - 0.5) * 2 * maxDeg);
    rotX.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * maxDeg);
  }
  function onLeave() { rotX.set(0); rotY.set(0); }
  return { ref, sX, sY, onMove, onLeave };
}

function BestSellerCard({ item, category, index }: { item: MenuItem; category: CategoryWithItems; index: number }) {
  const tilt = useTilt(6);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ delay: index * 0.07, duration: 0.65, ease: EASE }}
      style={{ perspective: "800px" }}
    >
      <motion.div
        ref={tilt.ref}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        whileHover={{ y: -8, boxShadow: "0 12px 44px rgba(183,28,28,0.18), 0 3px 10px rgba(183,28,28,0.10), inset 0 1px 0 #fff" }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        style={{
          rotateX: tilt.sX,
          rotateY: tilt.sY,
          transformStyle: "preserve-3d",
          height: "100%",
          background: "#FFFFFF",
          border: "1px solid rgba(183,28,28,0.14)",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(183,28,28,0.08), inset 0 1px 0 #fff",
          borderTop: "3px solid rgba(183,28,28,0.50)",
        }}
      >
        <div style={{ position: "relative", padding: "24px", height: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Bestseller badge */}
          <div style={{
            position: "absolute", top: "12px", right: "12px",
            background: "linear-gradient(135deg, #B71C1C 0%, #8B0000 100%)",
            borderRadius: "100px", padding: "3px 10px",
            display: "flex", alignItems: "center", gap: "4px",
          }}>
            <span style={{ fontSize: "9px" }}>⭐</span>
            <span className="font-cinzel" style={{ fontSize: "8px", color: "white", letterSpacing: "0.08em", fontWeight: 700 }}>
              BESTSELLER
            </span>
          </div>

          {/* Category label */}
          <span className="font-cinzel" style={{ fontSize: "10px", color: "rgba(183,28,28,0.55)", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>
            {category.name}
          </span>

          {/* Emoji */}
          <div style={{ textAlign: "center", fontSize: "40px", lineHeight: 1 }}>{category.emoji}</div>

          {/* Name */}
          <h3 className="font-playfair" style={{ fontSize: "17px", fontWeight: 600, color: "#1A1A1A", lineHeight: 1.3 }}>
            {item.name}
          </h3>

          {/* Description */}
          {item.description && (
            <p className="font-inter" style={{ fontSize: "13px", color: "rgba(30,0,0,0.52)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
              {item.description}
            </p>
          )}

          {/* Price */}
          <div style={{ marginTop: "auto", paddingTop: "10px", borderTop: "1px solid rgba(183,28,28,0.08)" }}>
            {item.prices.length === 1 ? (
              <span className="font-cinzel" style={{ fontSize: "20px", fontWeight: 700, color: "#B71C1C" }}>
                {item.prices[0]?.value}
              </span>
            ) : (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
                {item.prices.map((p) => (
                  <div key={p.label} style={{ background: "rgba(183,28,28,0.06)", border: "1px solid rgba(183,28,28,0.18)", borderRadius: "6px", padding: "5px 12px", display: "flex", gap: "6px", alignItems: "center" }}>
                    {p.label && <span className="font-inter" style={{ fontSize: "11px", color: "rgba(30,0,0,0.45)", fontWeight: 500 }}>{p.label}</span>}
                    <span className="font-cinzel" style={{ fontSize: "14px", fontWeight: 700, color: "#B71C1C" }}>{p.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BestSellers() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const bestSellerItems: { item: MenuItem; category: CategoryWithItems }[] = [];
  for (const category of menuData.categories as CategoryWithItems[]) {
    for (const item of category.items) {
      if (item.isBestSeller) bestSellerItems.push({ item, category });
    }
  }

  return (
    <section id="best-seller" ref={sectionRef} className="sec-pad" style={{ background: "#FFFFFF" }}>
      <div className="oriental-pattern-light" style={{ position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="font-cinzel"
          style={{ fontSize: "11px", fontWeight: 700, color: "#B71C1C", letterSpacing: "0.25em", textTransform: "uppercase" as const, textAlign: "center", marginBottom: "12px" }}
        >
          UNSERE TOP-GERICHTE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          className="font-cinzel"
          style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, textAlign: "center", color: "#8B0000", marginBottom: "12px" }}
        >
          Best Seller
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-inter"
          style={{ fontSize: "15px", color: "rgba(30,0,0,0.50)", textAlign: "center", marginBottom: "48px" }}
        >
          Die meistbestellten Gerichte unserer Gäste.
        </motion.p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
          {bestSellerItems.map(({ item, category }, i) => (
            <BestSellerCard key={item.id} item={item} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
