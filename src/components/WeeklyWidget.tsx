import Link from "next/link";
import { formatWeek, HairColor, Song } from "@/lib/weekly";
import OSWindow from "./OSWindow";

interface Props {
  song: Song;
  hairColor: HairColor;
}

export default function WeeklyWidget({ song, hairColor }: Props) {
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          {/* ── Song ── */}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                color: "#b098c8",
                letterSpacing: "1px",
                marginBottom: "10px",
              }}
            >
              ♪ song of the week
            </div>

            {song.spotifyId && (
              <div
                style={{
                  marginTop: "10px",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <iframe
                  src={`https://open.spotify.com/embed/track/${song.spotifyId}?utm_source=generator`}
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  style={{ display: "block" }}
                />
              </div>
            )}

            {song.note && (
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "14px",
                  color: "#7a5890",
                  fontStyle: "italic",
                  marginTop: "8px",
                  padding: "5px 10px",
                  background: "#f4eeff",
                  border: "1px dashed #c8aaf0",
                  borderRadius: "4px",
                }}
              >
                &ldquo;{song.note}&rdquo;
              </p>
            )}
          </div>

          {/* ── Hair color ── */}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                color: "#b098c8",
                letterSpacing: "1px",
                marginBottom: "10px",
              }}
            >
              ✂ hair color of the week
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Swatch */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: hairColor.hex,
                    border: "3px solid white",
                    boxShadow:
                      `2px 2px 0 #c8aaf0, 0 0 0 2px ${hairColor.hex}55`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "9px",
                    left: "10px",
                    width: "11px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.5)",
                    transform: "rotate(-30deg)",
                  }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#3a2858",
                    lineHeight: 1.7,
                  }}
                >
                  {hairColor.name}
                </div>
              </div>
            </div>

            {hairColor.note && (
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "14px",
                  color: "#7a5890",
                  fontStyle: "italic",
                  marginTop: "8px",
                  padding: "5px 10px",
                  background: `${hairColor.hex}22`,
                  border: `1px dashed ${hairColor.hex}99`,
                  borderRadius: "4px",
                }}
              >
                &ldquo;{hairColor.note}&rdquo;
              </p>
            )}
          </div>
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
              fontFamily: "'Nunito', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              color: "#b098c8",
            }}
          >
            wk of {formatWeek(song.week)}
          </span>
          <Link
            href="/weekly"
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              color: "#7a5890",
              textDecoration: "none",
              padding: "3px 8px",
              border: "1px solid #c8aaf0",
              background: "#ead8ff",
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
