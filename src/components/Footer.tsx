export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "2px solid #c8aaf0",
        background: "linear-gradient(90deg, #ead8ff, #ffc8de, #ffe8d0)",
        padding: "8px 16px",
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: "13px",
          fontWeight: 700,
          color: "#a080c0",
        }}
      >
        © {year}
      </span>
    </footer>
  );
}
