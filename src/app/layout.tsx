import type { Metadata } from "next";
import { Nunito, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorEffects from "@/components/CursorEffects";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lauren's Blogfolio",
    template: "%s — Lauren's Blogfolio",
  },
  description:
    "Lauren's personal site — blog posts, weekly music picks, and a Y2K-inspired corner of the internet. Always under construction ♥",
  authors: [{ name: "Lauren" }],
  keywords: ["blog", "personal site", "music", "weekly faves", "y2k"],
  openGraph: {
    type: "website",
    siteName: "Lauren's Blogfolio",
    title: "Lauren's Blogfolio",
    description:
      "Lauren's personal site — blog posts, weekly music picks, and a Y2K-inspired corner of the internet.",
  },
  twitter: {
    card: "summary",
    title: "Lauren's Blogfolio",
    description:
      "Lauren's personal site — blog posts, weekly music picks, and a Y2K-inspired corner of the internet.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${pressStart.variable}`}>
      <body>
        <CursorEffects />
        <Navbar />
        <main
          style={{
            display: "block",
            maxWidth: "896px",
            width: "100%",
            margin: "0 auto",
            padding: "2rem 1rem",
            boxSizing: "border-box",
          }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
