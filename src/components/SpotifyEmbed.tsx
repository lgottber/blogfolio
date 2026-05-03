"use client";
import { useState } from "react";

interface Props {
  spotifyId: string;
  title: string;
  artist: string;
  height?: number;
}

export default function SpotifyEmbed(
  { spotifyId, title, artist, height = 80 }: Props,
) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator`}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        style={{
          display: "block",
          borderRadius: height > 100 ? "12px" : "8px",
        }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      style={{
        width: "100%",
        height: `${height}px`,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "#191414",
        border: "none",
        borderRadius: height > 100 ? "12px" : "8px",
        padding: "0 16px",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {/* Spotify-green play circle */}
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "#1db954",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="white"
          style={{ marginLeft: "2px" }}
        >
          <polygon points="2,1 13,7 2,13" />
        </svg>
      </div>

      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-nunito), sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            color: "white",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-nunito), sans-serif",
            fontSize: "12px",
            color: "#b3b3b3",
            marginTop: "2px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {artist}
        </div>
      </div>

      <div
        style={{
          marginLeft: "auto",
          fontFamily: "var(--font-nunito), sans-serif",
          fontSize: "11px",
          color: "#b3b3b3",
          flexShrink: 0,
        }}
      >
        tap to play
      </div>
    </button>
  );
}
