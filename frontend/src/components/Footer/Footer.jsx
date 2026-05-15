const CAPTION = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "11px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-text-secondary)",
};

const Footer = () => {
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 96px",
        borderTop: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <span style={CAPTION}>
        © 2026 CurateSphere · Cassius Reynolds &amp; Mollie Anderson
      </span>
      <span style={CAPTION}>Harvard Art Museums API ↗</span>
    </footer>
  );
};

export default Footer;
