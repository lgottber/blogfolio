"use client";
import { useEffect } from "react";

const CHARS = ["✦", "♥", "✿", "★", "✶", "♡", "✸", "·"];
const COLORS = [
  "#ffc8d8",
  "#c8aaf0",
  "#a0e8cc",
  "#fde68a",
  "#f0a8c8",
  "#ead8ff",
  "#f8d0a8",
  "#b8f0d8",
];

export default function CursorEffects() {
  useEffect(() => {
    const styleId = "cursor-sparkle-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes sparkle-rise {
          0%   { transform: translate(-50%, -50%) scale(1) rotate(0deg);   opacity: 1; }
          100% { transform: translate(calc(-50% + var(--dx)), calc(-50% - 36px)) scale(0.1) rotate(var(--rot)); opacity: 0; }
        }
        .cursor-sparkle {
          position: fixed;
          pointer-events: none;
          z-index: 99999;
          animation: sparkle-rise 0.75s ease-out forwards;
          line-height: 1;
          user-select: none;
        }
      `;
      document.head.appendChild(style);
    }

    let lastTime = 0;

    const createSparkle = (x: number, y: number, burst = false) => {
      const el = document.createElement("span");
      el.className = "cursor-sparkle";
      el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
      const ox = (Math.random() - 0.5) * (burst ? 28 : 14);
      const oy = (Math.random() - 0.5) * (burst ? 20 : 10);
      el.style.left = `${x + ox}px`;
      el.style.top = `${y + oy}px`;
      el.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      el.style.fontSize = `${
        burst ? 10 + Math.random() * 10 : 8 + Math.random() * 7
      }px`;
      el.style.setProperty("--dx", `${(Math.random() - 0.5) * 24}px`);
      el.style.setProperty("--rot", `${Math.random() * 360}deg`);
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 850);
    };

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 55) return;
      lastTime = now;
      createSparkle(e.clientX, e.clientY);
    };

    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 7; i++) {
        setTimeout(() => createSparkle(e.clientX, e.clientY, true), i * 35);
      }
    };

    globalThis.addEventListener("mousemove", onMove);
    globalThis.addEventListener("click", onClick);
    return () => {
      globalThis.removeEventListener("mousemove", onMove);
      globalThis.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
