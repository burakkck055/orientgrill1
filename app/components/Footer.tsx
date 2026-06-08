"use client";

import menuData from "../../data/menu.json";

const openingHours = [
  { days: "Mo – Fr", hours: "11:00 – 22:00 Uhr" },
  { days: "Sa – So", hours: "11:00 – 23:00 Uhr" },
  { days: "Feiertage", hours: "12:00 – 22:00 Uhr" },
];

function FooterLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg width="34" height="34" viewBox="0 0 80 80" aria-hidden>
        <path d="M40 5 L45.5 17 L58 12 L53.5 24.5 L66 30 L53.5 35.5 L58 48 L45.5 43.5 L40 55 L34.5 43.5 L22 48 L26.5 35.5 L14 30 L26.5 24.5 L22 12 L34.5 17 Z" fill="#B71C1C" />
        <path d="M40 18 L43 26 L51.5 23 L46.5 30 L51.5 37 L43 34 L40 42 L37 34 L28.5 37 L33.5 30 L28.5 23 L37 26 Z" fill="white" opacity="0.93" />
        <circle cx="40" cy="30" r="3" fill="#B71C1C" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span className="font-cinzel" style={{ color: "#8B0000", fontSize: "18px", fontWeight: 700, letterSpacing: "0.05em" }}>ORIENT GRILL</span>
        <span className="font-cinzel" style={{ fontSize: "8px", color: "rgba(139,0,0,0.45)", letterSpacing: "0.28em", textTransform: "uppercase" as const }}>BERGNEUSTADT</span>
      </div>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="rgba(183,28,28,0.08)" />
      <rect x="6" y="6" width="12" height="12" rx="3" stroke="rgba(183,28,28,0.55)" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="rgba(183,28,28,0.55)" strokeWidth="1.5" />
      <circle cx="16" cy="8" r="0.8" fill="rgba(183,28,28,0.55)" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="rgba(183,28,28,0.08)" />
      <path d="M16 8h-2a1 1 0 00-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V9a4 4 0 014-4h2v3z" fill="rgba(183,28,28,0.55)" />
    </svg>
  );
}

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const featuredCategories = menuData.categories.slice(0, 8);

  return (
    <footer style={{ background: "#FFF8F8", position: "relative", overflow: "hidden" }}>
      <div className="oriental-pattern-light" style={{ position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none" }} />

      {/* Top divider */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent 0%, rgba(183,28,28,0.40) 30%, rgba(183,28,28,0.65) 50%, rgba(183,28,28,0.40) 70%, transparent 100%)" }} />

      <div className="footer-inner">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "40px" }} className="sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1: Logo + tagline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <FooterLogo />
            <p className="font-inter" style={{ fontSize: "13px", color: "rgba(30,0,0,0.50)", lineHeight: 1.7 }}>
              Pizza · Döner · Orientalische Spezialitäten.<br />
              Täglich frisch zubereitet mit besten Zutaten.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <a href="#" style={{ textDecoration: "none" }}><FacebookIcon /></a>
              <a href="#" style={{ textDecoration: "none" }}><InstagramIcon /></a>
            </div>
            <p className="font-inter" style={{ fontSize: "12px", color: "rgba(30,0,0,0.28)", marginTop: "8px" }}>
              © 2025 Orient Grill Bergneustadt
            </p>
          </div>

          {/* Col 2: Speisekarte */}
          <div>
            <p className="font-cinzel" style={{ fontSize: "11px", fontWeight: 700, color: "#B71C1C", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "20px" }}>
              SPEISEKARTE
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {featuredCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  onClick={(e) => handleNavClick(e, `#${cat.id}`)}
                  className="font-inter"
                  style={{ fontSize: "13px", color: "rgba(30,0,0,0.52)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#B71C1C")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(30,0,0,0.52)")}
                >
                  <span style={{ fontSize: "12px" }}>{cat.emoji}</span>
                  {cat.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Öffnungszeiten */}
          <div>
            <p className="font-cinzel" style={{ fontSize: "11px", fontWeight: 700, color: "#B71C1C", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "20px" }}>
              ÖFFNUNGSZEITEN
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {openingHours.map((h) => (
                <div key={h.days} style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                  <span className="font-inter" style={{ fontSize: "13px", color: "rgba(30,0,0,0.50)" }}>{h.days}</span>
                  <span className="font-inter" style={{ fontSize: "13px", color: "rgba(30,0,0,0.72)", fontWeight: 500 }}>{h.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Kontakt */}
          <div>
            <p className="font-cinzel" style={{ fontSize: "11px", fontWeight: 700, color: "#B71C1C", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "20px" }}>
              KONTAKT
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B71C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "2px", flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="font-inter" style={{ fontSize: "13px", color: "rgba(30,0,0,0.55)", lineHeight: 1.6 }}>
                  Kölner Str. 191<br />51702 Bergneustadt
                </span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B71C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.64a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <a
                  href="tel:022619877118"
                  className="font-inter"
                  style={{ fontSize: "13px", color: "rgba(30,0,0,0.55)", textDecoration: "none", fontWeight: 500, transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#B71C1C")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(30,0,0,0.55)")}
                >
                  02261 9877118
                </a>
              </div>
              <a
                href="https://maps.google.com/?q=Kölner+Str.+191,+51702+Bergneustadt"
                target="_blank" rel="noopener noreferrer"
                className="font-inter"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "9px 16px", borderRadius: "8px", marginTop: "4px",
                  background: "linear-gradient(135deg, #B71C1C 0%, #8B0000 100%)",
                  color: "white", textDecoration: "none", fontSize: "12px", fontWeight: 600,
                  boxShadow: "0 3px 12px rgba(183,28,28,0.28)", transition: "filter 0.2s ease",
                  width: "fit-content",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(1.08)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(1)")}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Route planen
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: "48px", paddingTop: "20px", borderTop: "1px solid rgba(183,28,28,0.12)", display: "flex", flexWrap: "wrap" as const, justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
          <p className="font-inter" style={{ fontSize: "12px", color: "rgba(30,0,0,0.30)" }}>
            Alle Rechte vorbehalten
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Impressum", "Datenschutz"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-inter"
                style={{ fontSize: "12px", color: "rgba(30,0,0,0.35)", textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#B71C1C")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(30,0,0,0.35)")}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
