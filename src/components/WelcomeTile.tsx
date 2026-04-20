import Image from "next/image";
import OSWindow from "./OSWindow";

export default function WelcomeTile() {
  return (
    <OSWindow title="welcome.txt" fillHeight>
      <div className="welcome-split" style={{ display: "flex", height: "100%" }}>
        {/* Photo — left half */}
        <div
          className="welcome-split-photo"
          style={{
            position: "relative",
            width: "40%",
            flexShrink: 0,
            borderRight: "1px solid var(--window-border)",
          }}
        >
          <Image
            src="/laurenAnime.jpg"
            alt="Lauren"
            fill
            priority
            sizes="(max-width: 600px) 100vw, 40vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>

        {/* Content — right half */}
        <div style={{ flex: 1, padding: "18px 20px", overflow: "auto" }}>
          <div style={{ marginBottom: "14px" }}>
            <h1
              style={{
                fontFamily: "var(--font-nunito), sans-serif",
                fontSize: "20px",
                fontWeight: 800,
                color: "var(--text)",
                margin: 0,
              }}
            >
              Welcome to My Blogfolio!
            </h1>
          </div>
          <div
            style={{
              borderTop: "1px dashed var(--lavender-soft)",
              marginBottom: "12px",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-nunito), sans-serif",
              fontSize: "15px",
              color: "var(--text-mid)",
              lineHeight: 1.85,
              margin: "0 0 12px",
            }}
          >
            I&apos;m a software engineer who loves a creative outlet. I hope you
            have fun exploring my projects, listening to my weekly music picks,
            and maybe even reading a blog post or two! Feel free to rearrange
            the tiles however you like, everything is draggable!
          </p>
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              marginBottom: "12px",
            }}
          >
            {[
              { icon: "✍️", text: "amatuer artist" },
              { icon: "🎵", text: "music lover" },
              { icon: "🐱", text: "cat mom" },
              { icon: "✨", text: "camp fanatic" },
            ].map(({ icon, text }) => (
              <span
                key={text}
                style={{
                  fontFamily: "var(--font-nunito), sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  background: "var(--lavender-pale)",
                  color: "var(--text-mid)",
                  border: "1px solid var(--window-border)",
                  borderRadius: "20px",
                  padding: "4px 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span style={{ fontSize: "9px" }}>{icon}</span> {text}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "3px" }}>
            {[
              "var(--pink-mid)",
              "var(--lavender)",
              "var(--mint)",
              "var(--peach)",
              "var(--pink-soft)",
              "var(--lavender-soft)",
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "8px",
                  background: c,
                  borderRadius: "4px",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </OSWindow>
  );
}
