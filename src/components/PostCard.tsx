"use client";

import Link from "next/link";
import { PostMeta } from "@/lib/posts";

const TAG_COLORS: Record<string, { text: string; bg: string; border: string }> =
  {
    default: { text: "#7a5890", bg: "#f0e8ff", border: "#c8aaf0" },
    tech: { text: "#2a6050", bg: "#d4f8ec", border: "#a0e8cc" },
    life: { text: "#906030", bg: "#fff4d0", border: "#f8d0a8" },
    design: { text: "#7a5890", bg: "#f0e8ff", border: "#c8aaf0" },
    music: { text: "#904060", bg: "#ffe0ee", border: "#f0a8c8" },
    gaming: { text: "#2a6050", bg: "#d4f8ec", border: "#a0e8cc" },
  };

export default function PostCard({ post }: { post: PostMeta }) {
  const tag = TAG_COLORS[post.tags?.[0] ?? "default"] ?? TAG_COLORS.default;

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
      <div
        className="os-window"
        style={{ transition: "all 0.15s ease", cursor: "pointer" }}
        onMouseOver={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translate(-2px, -2px)";
          el.style.boxShadow = "5px 5px 0px #c0a0e8";
        }}
        onMouseOut={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translate(0, 0)";
          el.style.boxShadow = "3px 3px 0px #c0a0e8";
        }}
      >
        {/* Title bar acting as file header */}
        <div className="os-titlebar">
          <span className="os-titlebar-title">
            📄 {post.title}
          </span>
        </div>

        <div style={{ padding: "12px 16px" }}>
          {post.description && (
            <p
              style={{
                fontFamily: "var(--font-nunito), sans-serif",
                fontSize: "15px",
                color: "var(--text-mid)",
                margin: "0 0 8px",
                lineHeight: 1.6,
              }}
            >
              {post.description}
            </p>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "6px",
            }}
          >
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {post.tags?.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-nunito), sans-serif",
                    fontSize: "12px",
                    color: tag.text,
                    border: `1px solid ${tag.border}`,
                    padding: "3px 7px",
                    background: tag.bg,
                    borderRadius: "3px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <time
              style={{
                fontFamily: "var(--font-nunito), sans-serif",
                fontSize: "13px",
                color: "var(--text-light)",
              }}
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
}
