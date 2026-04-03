import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorEffects from "@/components/CursorEffects";

export const metadata: Metadata = {
  title: "Lauren's Blogfolio",
  description: "Lauren's personal blogfolio ♥",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
