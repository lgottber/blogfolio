import type { Metadata } from "next";
import Link from "next/link";
import { formatWeek, getWeeklyData, Song } from "@/lib/weekly";
import OSWindow from "@/components/OSWindow";

export const metadata: Metadata = {
  title: "weekly faves — Lauren's Blogfolio",
};

export default function WeeklyPage() {
  const { songs } = getWeeklyData();
  const allSongs = [songs.current, ...songs.herstory];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <Link href="/" className="y2k-btn">♥ back</Link>
      </div>

      {/* Header banner */}
      <OSWindow title="weekly_faves/archive">
        <div style={{ padding: "20px 24px", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-nunito), sans-serif",
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--text)",
              lineHeight: 2,
              marginBottom: "6px",
            }}
          >
            ✦ weekly faves ✦
          </div>
          <p
            style={{
              fontFamily: "var(--font-nunito), sans-serif",
              fontSize: "15px",
              color: "var(--text-mid)",
              margin: 0,
            }}
          >
            a running log of what i was listening to each week
          </p>
        </div>
      </OSWindow>

      {/* Week cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {allSongs.map((song, i) => (
          <WeekCard key={song.week} song={song} isCurrent={i === 0} />
        ))}
      </div>
    </div>
  );
}

function WeekCard({ song, isCurrent }: { song: Song; isCurrent: boolean }) {
  return (
    <div
      style={{
        border: "2px solid var(--window-border)",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: isCurrent
          ? "4px 4px 0 var(--lavender)"
          : "3px 3px 0 var(--window-shadow)",
        background: "var(--window-bg)",
      }}
    >
      {/* Card title bar */}
      <div
        style={{
          background: isCurrent
            ? "linear-gradient(90deg, var(--lavender-soft), var(--pink-soft))"
            : "linear-gradient(90deg, var(--lavender-pale), var(--window-bg))",
          borderBottom: "2px solid var(--window-border)",
          padding: "6px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-nunito), sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            color: "var(--text-mid)",
          }}
        >
          wk of {formatWeek(song.week)}
        </span>
        {isCurrent
          ? (
            <span
              style={{
                fontFamily: "var(--font-nunito), sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                background: "var(--lavender)",
                color: "white",
                padding: "2px 8px",
                borderRadius: "3px",
              }}
            >
              current ♥
            </span>
          )
          : (
            <span
              style={{
                fontFamily: "var(--font-nunito), sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--text-light)",
              }}
            >
              archive ✦
            </span>
          )}
      </div>

      {/* Card body */}
      <div
        style={{
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* Song */}
        <div
          style={{
            background: "var(--lavender-pale)",
            border: "1px dashed var(--lavender)",
            borderRadius: "8px",
            padding: "10px 12px",
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          {/* Record */}
          <div
            style={{
              width: "34px",
              height: "34px",
              flexShrink: 0,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 50% 50%, #4a3060 18%, #2a1840 18%, #2a1840 32%, #8868b0 32%, #8868b0 36%, #2a1840 36%)",
              border: "2px solid #4a3060",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "2px 2px 0 var(--lavender)",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#ead8ff",
                border: "1px solid #c8aaf0",
              }}
            />
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "var(--font-nunito), sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--lavender)",
                marginBottom: "4px",
                letterSpacing: "1px",
              }}
            >
              ♪ song
            </div>
            <div
              style={{
                fontFamily: "var(--font-nunito), sans-serif",
                fontSize: "15px",
                fontWeight: 700,
                color: "var(--text)",
                lineHeight: 1.7,
                wordBreak: "break-word",
              }}
            >
              {song.title}
            </div>
            <div
              style={{
                fontFamily: "var(--font-nunito), sans-serif",
                fontSize: "14px",
                color: "var(--text-mid)",
                marginTop: "1px",
              }}
            >
              {song.artist}
            </div>
            {song.note && (
              <div
                style={{
                  fontFamily: "var(--font-nunito), sans-serif",
                  fontSize: "13px",
                  color: "var(--text-light)",
                  fontStyle: "italic",
                  marginTop: "3px",
                }}
              >
                &ldquo;{song.note}&rdquo;
              </div>
            )}
          </div>
        </div>

        {/* Spotify embed */}
        {song.spotifyId && (
          <iframe
            src={`https://open.spotify.com/embed/track/${song.spotifyId}?utm_source=generator`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ display: "block", borderRadius: "12px" }}
          />
        )}
      </div>
    </div>
  );
}
