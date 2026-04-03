"use client";
import { useState } from "react";
import { useDragHandle } from "./DragHandleContext";

interface OSWindowProps {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  fillHeight?: boolean;
}

export default function OSWindow(
  { title, children, style, contentStyle, fillHeight }: OSWindowProps,
) {
  const [minimized, setMinimized] = useState(false);
  const dragHandle = useDragHandle();
  const isDraggable = Object.keys(dragHandle).length > 0;

  return (
    <div
      className="os-window"
      style={{
        ...style,
        borderBottom: minimized ? "none" : undefined,
        borderRadius: minimized ? "8px 8px 0 0" : undefined,
        ...(fillHeight
          ? { display: "flex", flexDirection: "column", height: "100%" }
          : undefined),
      }}
    >
      <div
        {...(dragHandle as React.HTMLAttributes<HTMLElement>)}
        className="os-titlebar"
        style={{
          ...(minimized ? { borderBottom: "none" } : undefined),
          cursor: isDraggable ? "grab" : undefined,
          flexShrink: 0,
        }}
      >
        <span className="os-titlebar-title">{title}</span>
        <div className="os-titlebar-buttons">
          <span
            className="os-btn os-btn-yellow"
            onClick={() => setMinimized((m) => !m)}
            title={minimized ? "restore" : "minimize"}
            style={{ cursor: "pointer" }}
          >
            {minimized ? "▲" : "_"}
          </span>
        </div>
      </div>

      {/* grid-template-rows trick: animates from full height to 0 */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: minimized ? "0fr" : "1fr",
          transition: "grid-template-rows 0.25s ease",
          ...(fillHeight ? { flex: 1, minHeight: 0 } : undefined),
        }}
      >
        <div style={{ overflow: "hidden", ...contentStyle }}>
          {children}
        </div>
      </div>
    </div>
  );
}
