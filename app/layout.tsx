import type { Metadata } from "next";
import { Cinzel, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel-var",
  weight: ["400", "700", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-var",
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orient Grill Bergneustadt | Pizza · Döner · Orientalische Spezialitäten",
  description:
    "Orient Grill Bergneustadt – Frische Steinofen Pizza, Döner, Drehspieß und orientalische Spezialitäten. Die beste Pizza und den besten Döner im Oberbergischen Kreis.",
  keywords: [
    "Döner Bergneustadt",
    "Pizza Bergneustadt",
    "Grillrestaurant Bergneustadt",
    "türkisches Restaurant Bergneustadt",
    "Orient Grill Bergneustadt",
    "Steinofen Pizza Bergneustadt",
  ],
  openGraph: {
    title: "Orient Grill Bergneustadt",
    description: "Pizza · Döner · Orientalische Spezialitäten",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${cinzel.variable} ${playfair.variable} ${inter.variable}`}
    >
      <body className="font-inter bg-white text-[#1A1A1A] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
