export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "2px solid var(--window-border)",
        background:
          "linear-gradient(90deg, var(--navbar-from), var(--navbar-via), var(--navbar-to))",
        padding: "8px 16px",
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-nunito), sans-serif",
          fontSize: "13px",
          fontWeight: 700,
          color: "var(--text-mid)",
        }}
      >
        © {year}
      </span>
    </footer>
  );
}
