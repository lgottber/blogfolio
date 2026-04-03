"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDragHandle } from "./DragHandleContext";

type AccId =
  | "hat"
  | "flower"
  | "sunglasses"
  | "star"
  | "mustache"
  | "beard"
  | "bowtie"
  | "hearts";
type AccPos = { x: number; y: number }; // percent of canvas

// Default position for each accessory (x=left%, y=top%, width=%)
const ACC_DEFAULT: Record<AccId, { x: number; y: number; width: string }> = {
  hat: { x: 24, y: -4, width: "52%" },
  flower: { x: 25, y: 4, width: "24%" },
  sunglasses: { x: 14, y: 28, width: "72%" },
  star: { x: 25, y: 12, width: "20%" },
  mustache: { x: 28, y: 42, width: "44%" },
  beard: { x: 30, y: 54, width: "22%" },
  bowtie: { x: 32, y: 66, width: "36%" },
  hearts: { x: 22, y: 35, width: "22%" },
};

const TOOLS: { id: AccId; icon: string; label: string }[] = [
  { id: "hat", icon: "🎩", label: "top hat" },
  { id: "flower", icon: "🌸", label: "flowers" },
  { id: "sunglasses", icon: "🕶", label: "shades" },
  { id: "star", icon: "⭐", label: "stars" },
  { id: "mustache", icon: "👨", label: "stache" },
  { id: "beard", icon: "🧔", label: "beard" },
  { id: "bowtie", icon: "🎀", label: "bow tie" },
  { id: "hearts", icon: "💕", label: "hearts" },
];

const FLOWERS = [
  { cx: 8, cy: 10, r: 4.5 },
  { cx: 88, cy: 8, r: 3.5 },
  { cx: 5, cy: 50, r: 3.8 },
  { cx: 93, cy: 45, r: 4.2 },
  { cx: 12, cy: 88, r: 3.5 },
  { cx: 85, cy: 88, r: 4.0 },
  { cx: 47, cy: 4, r: 3.2 },
  { cx: 22, cy: 72, r: 2.8 },
  { cx: 75, cy: 70, r: 3.0 },
  { cx: 60, cy: 6, r: 2.5 },
  { cx: 3, cy: 28, r: 2.8 },
  { cx: 96, cy: 25, r: 2.5 },
];

function darkenHex(hex: string, amt = 45): string {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amt);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amt);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amt);
  return `#${r.toString(16).padStart(2, "0")}${
    g.toString(16).padStart(2, "0")
  }${b.toString(16).padStart(2, "0")}`;
}

const PALETTE = [
  "#ffffff",
  "#f8f0ff",
  "#ffc8d8",
  "#f0a8c8",
  "#ead8ff",
  "#c8aaf0",
  "#a0e8cc",
  "#6ee7b7",
  "#fde68a",
  "#f8d0a8",
  "#d4f8ec",
  "#ffecd4",
];

export default function CatPainter() {
  const [minimized, setMinimized] = useState(false);
  const dragHandle = useDragHandle();
  const isDraggable = Object.keys(dragHandle).length > 0;
  const [active, setActive] = useState<Set<AccId>>(new Set());
  const [selected, setSelected] = useState<AccId | null>(null);
  const [bgColor, setBgColor] = useState<string>("var(--window-bg)");
  const [positions, setPositions] = useState<Partial<Record<AccId, AccPos>>>(
    {},
  );

  const canvasRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<
    {
      id: AccId;
      startMouseX: number;
      startMouseY: number;
      startPosX: number;
      startPosY: number;
    } | null
  >(null);

  // Global drag tracking
  useEffect(() => {
    const applyDrag = (clientX: number, clientY: number) => {
      if (!dragging.current || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const dx = (clientX - dragging.current.startMouseX) / rect.width * 100;
      const dy = (clientY - dragging.current.startMouseY) / rect.height * 100;
      const id = dragging.current.id;
      const widthPct = parseFloat(ACC_DEFAULT[id].width);
      const newX = Math.max(
        0,
        Math.min(100 - widthPct, dragging.current.startPosX + dx),
      );
      const newY = Math.max(-5, Math.min(90, dragging.current.startPosY + dy));
      setPositions((p) => ({
        ...p,
        [id]: { x: newX, y: newY },
      }));
    };
    const onMouseMove = (e: MouseEvent) => applyDrag(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      applyDrag(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onMouseUp = () => {
      dragging.current = null;
    };
    const onTouchEnd = () => {
      dragging.current = null;
    };
    globalThis.addEventListener("mousemove", onMouseMove);
    globalThis.addEventListener("mouseup", onMouseUp);
    globalThis.addEventListener("touchmove", onTouchMove, { passive: false });
    globalThis.addEventListener("touchend", onTouchEnd);
    return () => {
      globalThis.removeEventListener("mousemove", onMouseMove);
      globalThis.removeEventListener("mouseup", onMouseUp);
      globalThis.removeEventListener("touchmove", onTouchMove);
      globalThis.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const toggle = (id: AccId) => {
    setSelected(id);
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // Initialize position to default if not already set
        setPositions((p) =>
          p[id]
            ? p
            : { ...p, [id]: { x: ACC_DEFAULT[id].x, y: ACC_DEFAULT[id].y } }
        );
      }
      return next;
    });
  };

  const onAccMouseDown = (e: React.MouseEvent, id: AccId) => {
    e.preventDefault();
    const pos = positions[id] ?? { x: ACC_DEFAULT[id].x, y: ACC_DEFAULT[id].y };
    dragging.current = {
      id,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startPosX: pos.x,
      startPosY: pos.y,
    };
  };

  const onAccTouchStart = (e: React.TouchEvent, id: AccId) => {
    e.stopPropagation();
    const touch = e.touches[0];
    const pos = positions[id] ?? { x: ACC_DEFAULT[id].x, y: ACC_DEFAULT[id].y };
    dragging.current = {
      id,
      startMouseX: touch.clientX,
      startMouseY: touch.clientY,
      startPosX: pos.x,
      startPosY: pos.y,
    };
  };

  const activeList = TOOLS.filter((t) => active.has(t.id)).map((t) => t.label);

  return (
    <div
      style={{
        border: "2px solid var(--window-border)",
        borderRadius: minimized ? "4px 4px 0 0" : "4px",
        borderBottom: minimized ? "none" : "2px solid var(--window-border)",
        background: "var(--window-bg)",
        boxShadow: "3px 3px 0 var(--window-shadow)",
        overflow: "hidden",
        fontFamily: "'Nunito', sans-serif",
        userSelect: "none",
        width: "100%",
        height: minimized ? undefined : "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Title bar ── */}
      <div
        {...(dragHandle as React.HTMLAttributes<HTMLElement>)}
        style={{
          background:
            "linear-gradient(90deg, var(--lavender-soft), var(--pink-soft))",
          borderBottom: "1px solid var(--window-border)",
          padding: "3px 6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "22px",
          cursor: isDraggable ? "grab" : undefined,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span className="os-titlebar-title">
            amari.exe
          </span>
        </div>
        <div className="os-titlebar-buttons">
          <span
            className="os-btn os-btn-yellow"
            onClick={() => setMinimized((m) => !m)}
            style={{ cursor: "pointer" }}
          >
            {minimized ? "▲" : "_"}
          </span>
        </div>
      </div>

      {/* Collapsible body */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: minimized ? "0fr" : "1fr",
          transition: "grid-template-rows 0.25s ease",
          flex: minimized ? "0 0 0" : 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          {/* ── Menu bar ── */}
          <div
            style={{
              background: "var(--window-bg)",
              borderBottom: "1px solid var(--window-border)",
              padding: "6px 6px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "18px",
            }}
          >
            <span
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "15px",
                fontWeight: 700,
                color: "var(--text-mid)",
                letterSpacing: "0.5px",
              }}
            >
              ✿ ♥ dress up amari! ♥ ✿
            </span>
          </div>

          {/* ── Toolbar + Canvas ── */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid var(--window-border)",
            }}
          >
            {/* Left toolbar */}
            <div
              style={{
                width: "52px",
                flexShrink: 0,
                borderRight: "1px solid var(--window-border)",
                background: "var(--window-bg)",
                padding: "4px 3px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2px",
                alignContent: "start",
              }}
            >
              {TOOLS.map(({ id, icon, label }) => (
                <button
                  type="button"
                  key={id}
                  title={label}
                  onClick={() => toggle(id)}
                  style={{
                    width: "22px",
                    height: "22px",
                    background: active.has(id)
                      ? "var(--lavender-soft)"
                      : "var(--lavender-pale)",
                    border: active.has(id)
                      ? "2px inset var(--window-border)"
                      : "2px outset var(--lavender-pale)",
                    cursor: "pointer",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    outline: selected === id
                      ? "1px dotted var(--text-mid)"
                      : "none",
                    outlineOffset: "1px",
                  }}
                >
                  {icon}
                </button>
              ))}

              <div
                style={{
                  gridColumn: "1 / -1",
                  borderTop: "1px solid var(--window-border)",
                  margin: "2px 0",
                }}
              />

              <div style={{ gridColumn: "1 / -1", paddingLeft: "2px" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    background: bgColor,
                    border: "2px solid var(--window-border)",
                    borderRadius: "2px",
                  }}
                />
              </div>
            </div>

            {/* Canvas */}
            <div
              style={{
                flex: 1,
                background: "var(--window-border)",
                padding: "3px",
                overflow: "hidden",
              }}
            >
              <div
                ref={canvasRef}
                style={{
                  background: bgColor,
                  width: "100%",
                  aspectRatio: "1 / 1",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Flower background */}
                <svg
                  viewBox="0 0 100 100"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                  }}
                >
                  {FLOWERS.map((f, i) => {
                    const petalColor = darkenHex(bgColor, 40);
                    const centerColor = darkenHex(bgColor, 15);
                    return (
                      <g key={i} transform={`translate(${f.cx}, ${f.cy})`}>
                        {[0, 72, 144, 216, 288].map((rot) => (
                          <ellipse
                            key={rot}
                            transform={`rotate(${rot})`}
                            cx={0}
                            cy={-f.r * 1.45}
                            rx={f.r * 0.55}
                            ry={f.r}
                            fill={petalColor}
                            opacity={0.75}
                          />
                        ))}
                        <circle
                          r={f.r * 0.5}
                          fill={centerColor}
                          opacity={0.9}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Amari base photo */}
                <Image
                  src="/amari-sticker.png"
                  alt="Amari"
                  fill
                  loading="eager"
                  draggable={false}
                  style={{ objectFit: "contain" }}
                  unoptimized
                />

                {/* Draggable PNG accessories */}
                {TOOLS.map(({ id }) => {
                  if (!active.has(id)) return null;
                  const pos = positions[id] ??
                    { x: ACC_DEFAULT[id].x, y: ACC_DEFAULT[id].y };
                  return (
                    <img
                      key={id}
                      src={`/accessories/${id}.png`}
                      alt={id}
                      draggable={false}
                      onMouseDown={(e) => onAccMouseDown(e, id)}
                      onTouchStart={(e) => onAccTouchStart(e, id)}
                      style={{
                        position: "absolute",
                        top: `${pos.y}%`,
                        left: `${pos.x}%`,
                        width: ACC_DEFAULT[id].width,
                        cursor: "grab",
                        zIndex: selected === id ? 10 : 5,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Right scroll gutter */}
            <div
              style={{
                width: "14px",
                background: "var(--lavender-pale)",
                borderLeft: "1px solid var(--window-border)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  background: "var(--lavender-pale)",
                  border: "1px outset var(--window-border)",
                  fontSize: "6px",
                  color: "var(--text-mid)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ▲
              </div>
              <div
                style={{
                  flex: 1,
                  background: "var(--lavender-soft)",
                  margin: "1px",
                  width: "8px",
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  background: "var(--lavender-pale)",
                  border: "1px outset var(--window-border)",
                  fontSize: "6px",
                  color: "var(--text-mid)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ▼
              </div>
            </div>
          </div>

          {/* ── Color palette ── */}
          <div
            style={{
              background: "var(--window-bg)",
              borderBottom: "1px solid var(--window-border)",
              padding: "3px 4px",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            {PALETTE.map((c) => (
              <div
                key={c}
                onClick={() => setBgColor(c)}
                style={{
                  width: "16px",
                  height: "16px",
                  background: c,
                  border: c === bgColor
                    ? "2px solid #3a2858"
                    : "1px solid var(--window-border)",
                  flexShrink: 0,
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          {/* ── Status bar ── */}
          <div
            style={{
              background: "var(--window-bg)",
              padding: "2px 6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "16px",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--text-mid)",
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {activeList.length === 0
                ? "click a tool to dress up amari ♥"
                : `wearing: ${activeList.join(", ")}`}
            </span>
            <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--text-light)",
                  borderLeft: "1px solid var(--window-border)",
                  paddingLeft: "4px",
                }}
              >
                800×800
              </span>
            </div>
          </div>

          {/* Pusheen gif */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "8px 0 4px",
              flex: 1,
            }}
          >
            <img
              src="/pusheen.gif"
              alt="pusheen"
              draggable={false}
              style={{
                maxHeight: "100%",
                imageRendering: "pixelated",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        {/* end overflow:hidden */}
      </div>
      {/* end grid collapse */}
    </div>
  );
}
