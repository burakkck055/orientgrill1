"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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

type Category = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  items: MenuItem[];
};

function ItemCard({ item }: { item: MenuItem }) {
  const showId = item.id && !item.id.startsWith("vs-") && !item.id.startsWith("fi-") && !item.id.startsWith("burger-") && !item.id.startsWith("cola") && !item.id.startsWith("ayran") && !item.id.startsWith("adana") && !item.id.startsWith("haenchen") && !item.id.startsWith("koefte") && !item.id.startsWith("menu");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      whileHover={{ borderColor: "rgba(183,28,28,0.30)", boxShadow: "0 4px 20px rgba(183,28,28,0.09)" }}
      style={{
        borderRadius: "12px",
        padding: "14px 16px",
        background: "#FFFFFF",
        border: "1px solid rgba(183,28,28,0.10)",
        boxShadow: "0 2px 8px rgba(183,28,28,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        cursor: "default",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Name row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
        {showId && (
          <span className="font-cinzel" style={{ fontSize: "10px", color: "rgba(183,28,28,0.40)", minWidth: "22px", paddingTop: "3px", flexShrink: 0 }}>
            {item.id}
          </span>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" as const }}>
            <span className="font-playfair" style={{ fontSize: "15px", fontWeight: 600, color: "#1A1A1A", lineHeight: 1.3 }}>
              {item.name}
            </span>
            {item.isBestSeller && (
              <span className="font-cinzel" style={{ fontSize: "8px", color: "#B71C1C", background: "rgba(183,28,28,0.08)", border: "1px solid rgba(183,28,28,0.22)", borderRadius: "100px", padding: "1px 6px", letterSpacing: "0.08em", whiteSpace: "nowrap" as const }}>
                ⭐ TOP
              </span>
            )}
            {item.isNew && (
              <span className="font-cinzel" style={{ fontSize: "8px", color: "#fff", background: "linear-gradient(135deg, #B71C1C, #7F0000)", borderRadius: "100px", padding: "1px 6px", letterSpacing: "0.08em", whiteSpace: "nowrap" as const }}>
                NEU
              </span>
            )}
          </div>
          {item.description && (
            <p className="font-inter" style={{ fontSize: "12px", color: "rgba(30,0,0,0.48)", marginTop: "4px", lineHeight: 1.5 }}>
              {item.description}
            </p>
          )}
          {item.additives.length > 0 && (
            <p className="font-inter" style={{ fontSize: "10px", color: "rgba(30,0,0,0.28)", marginTop: "2px" }}>
              {item.additives.map((a) => `(${a})`).join(" ")}
            </p>
          )}
        </div>
      </div>

      {/* Price row — always full width, never squeezed */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", marginTop: "10px", paddingTop: "8px", borderTop: "1px solid rgba(183,28,28,0.07)", flexWrap: "wrap" as const }}>
        {item.prices.length === 1 ? (
          <span className="font-cinzel" style={{ fontSize: "15px", fontWeight: 700, color: "#B71C1C" }}>
            {item.prices[0]?.value}
          </span>
        ) : (
          item.prices.map((p) => (
            <div key={p.label} style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(183,28,28,0.05)", border: "1px solid rgba(183,28,28,0.14)", borderRadius: "6px", padding: "4px 10px" }}>
              {p.label && (
                <span className="font-inter" style={{ fontSize: "10px", color: "rgba(30,0,0,0.45)", fontWeight: 500 }}>{p.label}</span>
              )}
              <span className="font-cinzel" style={{ fontSize: "13px", fontWeight: 700, color: "#B71C1C" }}>{p.value}</span>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

function CategoryAccordion({ category, isOpen, onToggle }: { category: Category; isOpen: boolean; onToggle: () => void }) {
  return (
    <div id={category.id} style={{ borderBottom: "1px solid rgba(183,28,28,0.10)", scrollMarginTop: "80px" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left",
          borderLeft: isOpen ? "3px solid #B71C1C" : "3px solid transparent",
          paddingLeft: isOpen ? "20px" : "3px",
          transition: "border-color 0.2s ease, padding 0.2s ease",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(183,28,28,0.03)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "24px" }}>{category.emoji}</span>
          <div>
            <span className="font-cinzel" style={{ fontSize: "16px", fontWeight: 700, color: "#8B0000" }}>
              {category.name}
            </span>
            {category.description && (
              <p className="font-inter" style={{ fontSize: "12px", color: "rgba(30,0,0,0.42)", marginTop: "2px" }}>
                {category.description}
              </p>
            )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span className="font-cinzel" style={{ fontSize: "11px", color: "rgba(183,28,28,0.55)", background: "rgba(183,28,28,0.07)", borderRadius: "100px", padding: "3px 10px" }}>
            {category.items.length}
          </span>
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            width="18" height="18" viewBox="0 0 18 18" fill="none"
          >
            <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="#B71C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "12px", paddingBottom: "24px" }}>
              {category.items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Menu() {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(["steinofen-pizza"]));
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const toggleCategory = useCallback((id: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const categories = menuData.categories as Category[];

  const filteredItems = searchQuery.trim()
    ? categories.flatMap((cat) =>
        cat.items
          .filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item) => ({ item, category: cat }))
      )
    : [];

  return (
    <section id="speisekarte" ref={sectionRef} style={{ padding: "80px 24px", background: "#FFF8F8", position: "relative" }}>
      <div className="oriental-pattern-light" style={{ position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none" }} />

      <div style={{ maxWidth: "1024px", margin: "0 auto", position: "relative" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="font-cinzel"
          style={{ fontSize: "11px", fontWeight: 700, color: "#B71C1C", letterSpacing: "0.25em", textTransform: "uppercase" as const, textAlign: "center", marginBottom: "12px" }}
        >
          UNSERE SPEISEKARTE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          className="font-cinzel"
          style={{ fontSize: "clamp(26px, 5vw, 48px)", fontWeight: 900, textAlign: "center", color: "#8B0000", marginBottom: "40px" }}
        >
          Vollständige <span style={{ color: "#B71C1C" }}>Speisekarte</span>
        </motion.h2>

        {/* Sticky search bar */}
        <div style={{
          position: "sticky", top: "72px", zIndex: 20, marginBottom: "32px",
          background: "rgba(255,248,248,0.95)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          padding: "12px 0", borderBottom: "1px solid rgba(183,28,28,0.10)",
        }}>
          <div style={{ position: "relative", maxWidth: "500px" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <circle cx="7" cy="7" r="5" stroke="rgba(183,28,28,0.45)" strokeWidth="1.5" />
              <path d="M11 11L14 14" stroke="rgba(183,28,28,0.45)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Gericht suchen..."
              className="font-inter"
              style={{
                width: "100%", padding: "12px 16px 12px 42px", borderRadius: "10px",
                background: "#FFFFFF", border: "1px solid rgba(183,28,28,0.18)",
                color: "#1A1A1A", fontSize: "14px", outline: "none",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              onFocus={(e) => { e.target.style.borderColor = "rgba(183,28,28,0.45)"; e.target.style.boxShadow = "0 0 0 3px rgba(183,28,28,0.07)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(183,28,28,0.18)"; e.target.style.boxShadow = "none"; }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(30,0,0,0.35)", fontSize: "16px", lineHeight: 1, padding: "4px" }}>
                ×
              </button>
            )}
          </div>
        </div>

        {searchQuery.trim() ? (
          <div>
            <p className="font-inter" style={{ fontSize: "13px", color: "rgba(30,0,0,0.48)", marginBottom: "20px" }}>
              {filteredItems.length} Ergebnis{filteredItems.length !== 1 ? "se" : ""} gefunden für „{searchQuery}"
            </p>
            {filteredItems.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "12px" }}>
                {filteredItems.map(({ item, category }) => (
                  <div key={item.id}>
                    <p className="font-cinzel" style={{ fontSize: "9px", color: "rgba(183,28,28,0.48)", letterSpacing: "0.1em", marginBottom: "4px", textTransform: "uppercase" as const }}>
                      {category.emoji} {category.name}
                    </p>
                    <ItemCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-playfair" style={{ color: "rgba(30,0,0,0.38)", textAlign: "center", padding: "48px 0" }}>
                Kein Gericht gefunden.
              </p>
            )}
          </div>
        ) : (
          <div>
            {categories.map((category) => (
              <CategoryAccordion
                key={category.id}
                category={category}
                isOpen={openCategories.has(category.id)}
                onToggle={() => toggleCategory(category.id)}
              />
            ))}
          </div>
        )}

        {/* Additive legend */}
        <div style={{ marginTop: "48px", padding: "20px 24px", borderRadius: "12px", background: "rgba(183,28,28,0.04)", border: "1px solid rgba(183,28,28,0.10)" }}>
          <p className="font-cinzel" style={{ fontSize: "10px", color: "rgba(183,28,28,0.55)", letterSpacing: "0.12em", marginBottom: "10px" }}>
            ZUSATZSTOFFE
          </p>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "12px" }}>
            {Object.entries(menuData.additiveLegend).map(([key, val]) => (
              <span key={key} className="font-inter" style={{ fontSize: "11px", color: "rgba(30,0,0,0.38)" }}>
                <sup>{key}</sup> {val}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
