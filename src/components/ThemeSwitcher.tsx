"use client";
import { useEffect, useState } from "react";

const THEMES = [
  { id: "lavender", label: "lavender dream", color: "#c4a8f0", dot: "#ead8ff" },
  { id: "bubblegum", label: "bubblegum", color: "#f060a0", dot: "#ffb0d0" },
  { id: "lilac", label: "lilac haze", color: "#9b7fe8", dot: "#e0d8ff" },
  { id: "ocean", label: "ocean blue", color: "#60a8e0", dot: "#c0e8ff" },
  { id: "sage", label: "sage retro", color: "#78a878", dot: "#c8e0c4" },
  { id: "sunset", label: "sunset", color: "#f09050", dot: "#ffd8b0" },
] as const;

type ThemeId = typeof THEMES[number]["id"];

export default function ThemeSwitcher() {
  const [current, setCurrent] = useState<ThemeId>("lavender");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("theme") ?? "lavender") as ThemeId;
    setCurrent(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  const apply = (id: ThemeId) => {
    setCurrent(id);
    setOpen(false);
    document.documentElement.dataset.theme = id;
    localStorage.setItem("theme", id);
  };

  const active = THEMES.find((t) => t.id === current)!;

  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title="change theme"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          background: "rgba(255,255,255,0.35)",
          border: "1px solid rgba(255,255,255,0.6)",
          borderRadius: "20px",
          padding: "5px 12px 5px 8px",
          cursor: "pointer",
          fontFamily: "var(--font-nunito), sans-serif",
          fontSize: "13px",
          color: active.color,
        }}
      >
        ✦ vibe
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            background: "white",
            border: "2px solid var(--window-border)",
            borderRadius: "8px",
            boxShadow: "3px 3px 0 var(--window-shadow)",
            overflow: "hidden",
            zIndex: 1000,
            minWidth: "160px",
          }}
        >
          {/* Dropdown titlebar */}
          <div
            style={{
              background:
                "linear-gradient(90deg, var(--lavender-soft), var(--pink-soft))",
              borderBottom: "1px solid var(--window-border)",
              padding: "4px 8px",
              fontFamily: "var(--font-nunito), sans-serif",
              fontSize: "13px",
              color: "var(--text-mid)",
            }}
          >
            ✦ pick a vibe
          </div>

          {THEMES.map((t) => (
            <button
              type="button"
              key={t.id}
              onClick={() => apply(t.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                padding: "7px 10px",
                background: current === t.id ? t.dot : "white",
                border: "none",
                borderBottom: "1px solid #f0e8ff",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background:
                    `radial-gradient(circle at 35% 35%, ${t.dot}, ${t.color})`,
                  border: current === t.id
                    ? `2px solid ${t.color}`
                    : "1.5px solid rgba(0,0,0,0.1)",
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-nunito), sans-serif",
                  fontSize: "13px",
                  color: current === t.id ? t.color : "#7a5890",
                }}
              >
                {t.label}
                {current === t.id && " ♥"}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
