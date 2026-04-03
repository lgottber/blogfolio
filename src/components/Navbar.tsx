"use client";
import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "home" },
  { href: "/blog", label: "blog" },
  { href: "/weekly", label: "weekly" },
  { href: "/about-me", label: "about me" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      {/* Title bar */}
      <div
        className="site-navbar-bar"
        style={{
          padding: "6px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            minWidth: 0,
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              minWidth: 0,
            }}
          >
            <CatGif src="/cats/cat1.gif" alt="dancing cat" />
            <span
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "clamp(12px, 2vw, 16px)",
                color: "var(--text-mid)",
                letterSpacing: "1px",
                whiteSpace: "nowrap",
              }}
            >
              Lauren&apos;s Blogfolio
            </span>
            <CatGif src="/cats/cat1.gif" alt="dancing cat" />
          </Link>
        </div>

        {/* Desktop nav */}
        <div
          className="nav-links-desktop"
          style={{ alignItems: "center", gap: "6px", flexShrink: 0 }}
        >
          {NAV_LINKS.map((l) => (
            <MenuLink key={l.href} href={l.href}>{l.label}</MenuLink>
          ))}
          <ThemeSwitcher />
        </div>

        {/* Mobile: theme + hamburger */}
        <div
          className="nav-hamburger"
          style={{ alignItems: "center", gap: "6px", flexShrink: 0 }}
        >
          <ThemeSwitcher />
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            style={{
              background: "rgba(255,255,255,0.4)",
              border: "1px solid rgba(255,255,255,0.5)",
              borderRadius: "4px",
              padding: "4px 6px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "3px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: "16px",
                  height: "2px",
                  background: "var(--text-mid)",
                  borderRadius: "1px",
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div
          className="nav-mobile-menu"
          style={{
            display: "flex",
            flexDirection: "column",
            background: "var(--window-bg)",
            borderBottom: "2px solid var(--window-border)",
            padding: "8px",
            gap: "4px",
          }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "15px",
                color: "var(--text-mid)",
                textDecoration: "none",
                padding: "10px 14px",
                borderRadius: "4px",
                background: "var(--lavender-pale)",
                border: "1px solid var(--window-border)",
                letterSpacing: "0.5px",
              }}
            >
              ♥ {l.label}
            </Link>
          ))}
        </div>
      )}

      {/* Marquee strip */}
      <div
        className="site-marquee-bar"
        style={{
          padding: "3px 0",
          fontSize: "13px",
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 700,
          color: "var(--text-light)",
          overflow: "hidden",
        }}
      >
        <div className="marquee-wrapper">
          <span className="marquee-content">
            ♥ welcome to lauren&apos;s blogfolio ♥ best viewed on desktop ♥
            always under construction ♥ spread love ♥ stay cute ✦ loading... ♥
            thanks for visiting ✦ you found my site ♥ welcome to lauren&apos;s
            blogfolio ♥
          </span>
        </div>
      </div>
    </header>
  );
}

function CatGif({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      style={{ imageRendering: "pixelated", objectFit: "contain" }}
      unoptimized
    />
  );
}

function MenuLink(
  { href, children }: { href: string; children: React.ReactNode },
) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "'Nunito', sans-serif",
        fontSize: "14px",
        color: "var(--text-mid)",
        textDecoration: "none",
        padding: "4px 10px",
        borderRadius: "3px",
        background: "rgba(255,255,255,0.4)",
        border: "1px solid rgba(255,255,255,0.5)",
        letterSpacing: "0.5px",
        transition: "all 0.12s",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Link>
  );
}
