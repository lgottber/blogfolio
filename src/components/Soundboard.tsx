"use client";
import { useRef, useState } from "react";
import { useDragHandle } from "./DragHandleContext";

interface Sound {
  id: string;
  label: string;
  icon: string;
  src: string;
}

const SOUNDS: Sound[] = [
  {
    id: "death",
    label: "Death To All Of Them",
    icon: "💀",
    src: "/sounds/death.mp3",
  },
  { id: "icon", label: "She's An Icon", icon: "👑", src: "/sounds/icon.mp3" },
  { id: "sayin", label: "Just Sayin'", icon: "💅", src: "/sounds/sayin.mp3" },
  {
    id: "dontcare",
    label: "I Don't Care What You Think",
    icon: "🙄",
    src: "/sounds/dontcare.mp3",
  },
  { id: "darlene", label: "Waaaa", icon: "🤠", src: "/sounds/darlene.mp3" },
  {
    id: "pretty",
    label: "Not Very Pretty",
    icon: "🪞",
    src: "/sounds/pretty.mp3",
  },
  {
    id: "herses",
    label: "She Already Done Had Herses",
    icon: "💎",
    src: "/sounds/herses.mp3",
  },
  { id: "vogue", label: "Vogue Drop", icon: "✨", src: "/sounds/vogue.mp3" },
];

export default function Soundboard() {
  const [minimized, setMinimized] = useState(false);
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dragHandle = useDragHandle();
  const isDraggable = Object.keys(dragHandle).length > 0;

  const play = (sound: Sound) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audio = new Audio(sound.src);
    audioRef.current = audio;
    setPlaying(sound.id);
    audio.play().catch(() => {});
    audio.onended = () => setPlaying(null);
  };

  const activeSound = SOUNDS.find((s) => s.id === playing) ?? null;

  return (
    <div
      className="os-window"
      style={{
        borderRadius: minimized ? "8px 8px 0 0" : undefined,
        borderBottom: minimized ? "none" : undefined,
        fontFamily: "var(--font-nunito), sans-serif",
        userSelect: "none",
        width: "100%",
      }}
    >
      {/* Title bar */}
      <div
        {...(dragHandle as React.HTMLAttributes<HTMLElement>)}
        className="os-titlebar"
        style={{ cursor: isDraggable ? "grab" : undefined }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span className="os-titlebar-title">
            soundboard.exe
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
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* ── Retro TV ── */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "260px",
                }}
              >
                {/* Antenna */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "24px",
                    marginBottom: "-2px",
                    paddingLeft: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "3px",
                      height: "18px",
                      background: "#8090b0",
                      borderRadius: "2px",
                      transform: "rotate(-12deg)",
                      transformOrigin: "bottom center",
                    }}
                  />
                  <div
                    style={{
                      width: "3px",
                      height: "18px",
                      background: "#8090b0",
                      borderRadius: "2px",
                      transform: "rotate(12deg)",
                      transformOrigin: "bottom center",
                    }}
                  />
                </div>

                {/* TV body */}
                <div
                  style={{
                    background: "linear-gradient(160deg, #dce8ff, #c8d8f0)",
                    border: "3px solid #a0b8d8",
                    borderRadius: "16px",
                    padding: "8px",
                    boxShadow:
                      "4px 4px 0 #a0b8d8, inset 0 1px 0 rgba(255,255,255,0.6)",
                  }}
                >
                  {/* Screen bezel */}
                  <div
                    style={{
                      background: "#2a3858",
                      borderRadius: "10px",
                      padding: "4px",
                      boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.4)",
                    }}
                  >
                    {/* Screen */}
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "4/3",
                        borderRadius: "7px",
                        overflow: "hidden",
                        position: "relative",
                        background: "#0a1428",
                      }}
                    >
                      {activeSound
                        ? (
                          /* Playing — show GIF */
                          <img
                            key={activeSound.id}
                            src={`/tv/${activeSound.id}.gif`}
                            alt={activeSound.label}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        )
                        : (
                          /* Idle — static/channel screen */
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                              background:
                                "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)",
                            }}
                          >
                            <div style={{ fontSize: "22px" }}>📺</div>
                            <div
                              style={{
                                fontSize: "5px",
                                color: "var(--text-mid)",
                                letterSpacing: "1px",
                              }}
                            >
                              no signal
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "3px",
                                marginTop: "2px",
                              }}
                            >
                              {[
                                "#f0a0a0",
                                "#f0d080",
                                "#a0e0a0",
                                "#80c0f0",
                                "#c0a0f0",
                              ].map((c) => (
                                <div
                                  key={c}
                                  style={{
                                    width: "10px",
                                    height: "10px",
                                    background: c,
                                    opacity: 0.6,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Scanline overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          pointerEvents: "none",
                          background:
                            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 3px)",
                          borderRadius: "7px",
                        }}
                      />

                      {/* Screen glare */}
                      <div
                        style={{
                          position: "absolute",
                          top: "6%",
                          left: "6%",
                          width: "30%",
                          height: "18%",
                          background: "rgba(255,255,255,0.07)",
                          borderRadius: "50%",
                          transform: "rotate(-20deg)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* TV controls row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "6px",
                      padding: "0 4px",
                    }}
                  >
                    {/* Speaker grille */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          style={{
                            width: "20px",
                            height: "2px",
                            background: "#8090b0",
                            borderRadius: "1px",
                          }}
                        />
                      ))}
                    </div>

                    {/* Channel label */}
                    <div
                      style={{
                        fontFamily: "var(--font-nunito), sans-serif",
                        fontSize: "5px",
                        color: "var(--text-mid)",
                        background: "var(--window-bg)",
                        padding: "2px 6px",
                        borderRadius: "3px",
                        border: "1px solid var(--window-border)",
                      }}
                    >
                      {activeSound
                        ? `CH ${SOUNDS.indexOf(activeSound) + 1}`
                        : "CH --"}
                    </div>

                    {/* Knobs */}
                    <div style={{ display: "flex", gap: "4px" }}>
                      {["#e0b090", "#90c0e0"].map((c, i) => (
                        <div
                          key={i}
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: c,
                            border: "1.5px solid #8090b0",
                            boxShadow: "1px 1px 0 rgba(0,0,0,0.2)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* TV stand */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "6px",
                      background: "#a0b8d8",
                      borderRadius: "0 0 4px 4px",
                      border: "1px solid #8090b0",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── Sound buttons ── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px",
              }}
            >
              {SOUNDS.map((sound) => {
                const isPlaying = playing === sound.id;
                return (
                  <button
                    type="button"
                    key={sound.id}
                    onClick={() => play(sound)}
                    style={{
                      background: isPlaying
                        ? "var(--lavender-soft)"
                        : "var(--lavender-pale)",
                      border: isPlaying
                        ? "2px inset var(--window-border)"
                        : "2px outset var(--lavender-pale)",
                      borderRadius: "3px",
                      padding: "8px 6px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      transition: "background 0.1s",
                    }}
                  >
                    <span
                      style={{ fontSize: "16px", lineHeight: 1, flexShrink: 0 }}
                    >
                      {sound.icon}
                    </span>
                    <div style={{ textAlign: "left" }}>
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "var(--text)",
                          letterSpacing: "0.3px",
                        }}
                      >
                        {sound.label}
                      </div>
                      {isPlaying && (
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "var(--text-mid)",
                            marginTop: "2px",
                          }}
                        >
                          ▶ playing...
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status bar */}
          <div
            style={{
              background: "var(--window-bg)",
              borderTop: "1px solid var(--window-border)",
              padding: "2px 6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "16px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--text-mid)",
              }}
            >
              {activeSound
                ? `📺 ${activeSound.label}`
                : "click a sound to play ♥"}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--text-light)",
                borderLeft: "1px solid var(--window-border)",
                paddingLeft: "4px",
              }}
            >
              {SOUNDS.length} sounds
            </span>
          </div>
        </div>
        {/* end overflow:hidden */}
      </div>
      {/* end grid collapse */}
    </div>
  );
}
