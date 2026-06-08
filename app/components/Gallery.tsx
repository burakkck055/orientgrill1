"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const galleryItems = [
  {
    emoji: "🍕",
    label: "Steinofen Pizza",
    background: "radial-gradient(ellipse at 50% 50%, #B71C1C 0%, #FF6B35 40%, #2D0A0A 100%)",
    aspect: "aspect-square",
  },
  {
    emoji: "🥙",
    label: "Frischer Döner",
    background: "radial-gradient(ellipse at 40% 60%, #8B4513 0%, #D2691E 40%, #1A0A00 100%)",
    aspect: "aspect-[3/4]",
  },
  {
    emoji: "🔥",
    label: "Adana vom Grill",
    background: "radial-gradient(ellipse at 50% 40%, #7F0000 0%, #C62828 50%, #0D0505 100%)",
    aspect: "aspect-[4/3]",
  },
  {
    emoji: "🍔",
    label: "Premium Burger",
    background: "radial-gradient(ellipse at 50% 50%, #C68642 0%, #A0522D 50%, #1A0A00 100%)",
    aspect: "aspect-[3/4]",
  },
  {
    emoji: "🛶",
    label: "Türkische Pide",
    background: "radial-gradient(ellipse at 50% 50%, #D4AF37 0%, #B8860B 50%, #1A1400 100%)",
    aspect: "aspect-square",
  },
  {
    emoji: "🥗",
    label: "Frischer Salat",
    background: "radial-gradient(ellipse at 50% 50%, #2E7D32 0%, #1B5E20 50%, #050A05 100%)",
    aspect: "aspect-[4/3]",
  },
  {
    emoji: "🍝",
    label: "Hausgemachte Pasta",
    background: "radial-gradient(ellipse at 50% 50%, #C68642 0%, #8B4513 50%, #1A0800 100%)",
    aspect: "aspect-[3/4]",
  },
  {
    emoji: "🍗",
    label: "Hänchenspieß",
    background: "radial-gradient(ellipse at 50% 50%, #D4AF37 0%, #CD8500 50%, #150E00 100%)",
    aspect: "aspect-square",
  },
  {
    emoji: "🌟",
    label: "Orient Spezial",
    background:
      "radial-gradient(ellipse at 50% 50%, #B71C1C 0%, #D4AF37 40%, #2D0A0A 100%)",
    aspect: "aspect-[4/3]",
  },
];

function GalleryItem({ item, index }: { item: (typeof galleryItems)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: EASE }}
      style={{
        breakInside: "avoid",
        marginBottom: "16px",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <motion.div
        whileHover={{ scale: 1.03, filter: "brightness(1.1)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ position: "relative" }}
      >
        <div
          className={item.aspect}
          style={{
            background: item.background,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <span style={{ fontSize: "56px", filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.6))" }}>
            {item.emoji}
          </span>

          {/* Overlay at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "20px 16px 14px",
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
              backdropFilter: "blur(2px)",
            }}
          >
            <span
              className="font-cinzel"
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.9)",
                letterSpacing: "0.05em",
              }}
            >
              {item.label}
            </span>
          </div>

          {/* Gold glow hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{
              position: "absolute",
              inset: 0,
              border: "1px solid rgba(212,175,55,0.5)",
              borderRadius: "16px",
              boxShadow: "inset 0 0 24px rgba(212,175,55,0.1)",
              pointerEvents: "none",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="galerie"
      ref={sectionRef}
      style={{
        padding: "80px 24px",
        background: "linear-gradient(180deg, #0D0D0D 0%, #0A0A0A 100%)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="font-cinzel"
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#D4AF37",
            letterSpacing: "0.25em",
            textTransform: "uppercase" as const,
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          GALERIE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          className="font-cinzel"
          style={{
            fontSize: "clamp(26px, 5vw, 48px)",
            fontWeight: 900,
            textAlign: "center",
            color: "rgba(255,255,255,0.92)",
            marginBottom: "48px",
          }}
        >
          Aus unserer{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #D4AF37 0%, #E8C85A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Küche
          </span>
        </motion.h2>

        {/* Masonry grid */}
        <div
          style={{
            columns: 2,
            columnGap: "16px",
          }}
          className="md:columns-3"
        >
          {galleryItems.map((item, i) => (
            <GalleryItem key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
