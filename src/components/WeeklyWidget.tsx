import Link from "next/link";
import { formatWeek, Song } from "../lib/weekly.ts";
import OSWindow from "./OSWindow.tsx";
import SpotifyEmbed from "./SpotifyEmbed.tsx";

interface Props {
  song: Song;
}

export default function WeeklyWidget({ song }: Props) {
  return (
    <OSWindow title="weekly_faves.txt">
      <div
        style={{
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {/* ── Song ── */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-nunito), sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--text-mid)",
              letterSpacing: "1px",
              marginBottom: "10px",
            }}
          >
            ♪ song of the week
          </div>

          {song.spotifyId && (
            <div style={{ marginTop: "10px" }}>
              <SpotifyEmbed
                spotifyId={song.spotifyId}
                title={song.title}
                artist={song.artist}
              />
            </div>
          )}

          {song.note && (
            <p
              style={{
                fontFamily: "var(--font-nunito), sans-serif",
                fontSize: "14px",
                color: "var(--text-mid)",
                fontStyle: "italic",
                marginTop: "8px",
                padding: "5px 10px",
                background: "var(--lavender-pale)",
                border: "1px dashed var(--window-border)",
                borderRadius: "4px",
              }}
            >
              &ldquo;{song.note}&rdquo;
            </p>
          )}
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
          <Link
            href="/weekly"
            style={{
              fontFamily: "var(--font-nunito), sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              color: "var(--text-mid)",
              textDecoration: "none",
              padding: "3px 8px",
              border: "1px solid var(--window-border)",
              background: "var(--lavender-soft)",
              borderRadius: "3px",
            }}
          >
            see all ♥
          </Link>
        </div>
      </div>
    </OSWindow>
  );
}
