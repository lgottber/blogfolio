import type { Metadata } from "next";
import Image from "next/image";
import OSWindow from "@/components/OSWindow";
import resumeData from "../../../data/resume.json";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn about Lauren — software engineer, music lover, cat mom. Resume, experience, and skills.",
};

const SKILL_COLORS: [string, string, string][] = [
  ["#ead8ff", "#c8aaf0", "#7a5890"],
  ["#d4f8ec", "#a0e8cc", "#2a6050"],
  ["#ffc8d8", "#f0a8c8", "#904060"],
];

export default function AboutMePage() {
  const r = resumeData;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Header — name + contact */}
      <OSWindow title="about_me.txt">
        <div style={{ padding: "20px 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              {/* Photo */}
              <div
                style={{
                  flexShrink: 0,
                  border: "3px solid #c8aaf0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "3px 3px 0 #c8aaf0",
                  background: "#f4eeff",
                  width: "100px",
                  height: "100px",
                }}
              >
                <Image
                  src="/photo.jpg"
                  alt={r.name}
                  width={100}
                  height={100}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    transform: "scale(1)",
                  }}
                />
              </div>

              <div>
                <h1
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "14px",
                    color: "#3a2858",
                    margin: "0 0 6px",
                    lineHeight: 1.6,
                  }}
                >
                  {r.name}
                </h1>
                <div
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "8px",
                    color: "#a080c0",
                    letterSpacing: "1px",
                  }}
                >
                  {r.title}
                </div>
              </div>
            </div>

            {/* Contact info block */}
            <div
              style={{
                background: "#f4eeff",
                border: "2px solid #c8aaf0",
                borderRadius: "6px",
                padding: "10px 14px",
                boxShadow: "2px 2px 0 #c8aaf0",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {[
                { icon: "✉", value: r.contact.email },
                { icon: "♥", value: r.contact.website },
                { icon: "✦", value: r.contact.location },
                { icon: "◈", value: `github: ${r.contact.github}` },
              ].map(({ icon, value }) => (
                <div
                  key={value}
                  style={{ display: "flex", gap: "7px", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#c8aaf0",
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: "14px",
                      color: "#7a5890",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              borderTop: "2px dashed #e8d8ff",
              marginTop: "16px",
              paddingTop: "14px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {r.summary && (
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "16px",
                  color: "#7a5890",
                  lineHeight: 1.8,
                  margin: 0,
                  flex: 1,
                  minWidth: "200px",
                }}
              >
                {r.summary}
              </p>
            )}
            <a
              href="/resume.pdf"
              download
              className="y2k-btn"
              style={{
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              ♥ download resume
            </a>
          </div>
        </div>
      </OSWindow>

      {/* Experience */}
      <OSWindow title="experience/">
        <div style={{ padding: "8px 0" }}>
          {r.experience.map((job, i) => (
            <div
              key={i}
              style={{
                padding: "16px 20px",
                borderBottom: i < r.experience.length - 1
                  ? "1px dashed #e8d8ff"
                  : "none",
              }}
            >
              {/* Company header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#3a2858",
                  }}
                >
                  {job.company}
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#a080c0",
                      marginLeft: "8px",
                    }}
                  >
                    {job.location}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "13px",
                    color: "#b098c8",
                    background: "#f4eeff",
                    border: "1px solid #c8aaf0",
                    padding: "3px 8px",
                    borderRadius: "3px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {job.period}
                </span>
              </div>

              {/* Roles */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  paddingLeft: "12px",
                  borderLeft: "3px solid var(--lavender-soft)",
                }}
              >
                {job.roles.map((
                  role: { title: string; period: string; bullets: string[] },
                  j: number,
                ) => (
                  <div key={j}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "4px",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Nunito', sans-serif",
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#7a5890",
                        }}
                      >
                        {role.title}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Nunito', sans-serif",
                          fontSize: "13px",
                          color: "#b098c8",
                        }}
                      >
                        {role.period}
                      </span>
                    </div>
                    <ul
                      style={{
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      {role.bullets.map((b: string, k: number) => (
                        <li
                          key={k}
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "flex-start",
                          }}
                        >
                          <span
                            style={{
                              color: "#c8aaf0",
                              flexShrink: 0,
                              fontFamily: "'Nunito', sans-serif",
                              fontSize: "15px",
                              fontWeight: 700,
                              marginTop: "3px",
                            }}
                          >
                            ♥
                          </span>
                          <span
                            style={{
                              fontFamily: "'Nunito', sans-serif",
                              fontSize: "15px",
                              color: "#5a4070",
                              lineHeight: 1.65,
                            }}
                          >
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </OSWindow>

      {/* Education */}
      <OSWindow title="education/">
        <div style={{ padding: "8px 0" }}>
          {r.education.map((edu, i) => (
            <div
              key={i}
              style={{
                padding: "14px 20px",
                borderBottom: i < r.education.length - 1
                  ? "1px dashed #e8d8ff"
                  : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#3a2858",
                      lineHeight: 1.7,
                    }}
                  >
                    {edu.degree}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: "15px",
                      color: "#a080c0",
                      fontWeight: 700,
                      marginTop: "2px",
                    }}
                  >
                    {edu.school}
                  </div>
                  {edu.note && (
                    <div
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: "14px",
                        color: "#b098c8",
                        fontStyle: "italic",
                        marginTop: "3px",
                      }}
                    >
                      {edu.note}
                    </div>
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "6px",
                    color: "#b098c8",
                    background: "#f4eeff",
                    border: "1px solid #c8aaf0",
                    padding: "4px 8px",
                    borderRadius: "3px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {edu.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </OSWindow>

      {/* Skills */}
      <OSWindow title="skills.exe">
        <div
          style={{
            padding: "14px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {(
            [
              ["languages", r.skills.languages],
              ["tools", r.skills.tools],
              ["other", r.skills.other],
            ] as [string, string[]][]
          ).map(([label, items], i) => {
            const [bg, border, text] = SKILL_COLORS[i % SKILL_COLORS.length];
            return (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "7px",
                    color: "#7a5890",
                    marginBottom: "8px",
                    letterSpacing: "1px",
                  }}
                >
                  {label} /
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {items.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: "7px",
                        background: bg,
                        border: `2px solid ${border}`,
                        color: text,
                        padding: "5px 10px",
                        borderRadius: "4px",
                        boxShadow: `1px 1px 0 ${border}`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </OSWindow>
    </div>
  );
}
