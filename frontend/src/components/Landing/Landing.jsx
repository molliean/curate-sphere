// React Router
import { Link } from "react-router-dom";
// React Hooks
import { useEffect } from "react";
// Custom Hooks and Contexts
import useArtworkContext from "../../context/artwork/useArtworkContext";
import useGlobalContext from "../../context/global/useGlobalContext";

// ─── Type style constants (px throughout — resets.css sets html font-size: 62.5%) ───

const DISPLAY = {
  fontFamily: "var(--font-display)",
  fontWeight: 400,
  fontSize: "64px",
  lineHeight: "110%",
  letterSpacing: "-0.02em",
  textAlign: "center",
};

const H2 = {
  fontFamily: "var(--font-display)",
  fontWeight: 400,
  fontSize: "32px",
  lineHeight: "120%",
};

const BODY_LG = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "160%",
  textAlign: "center",
};

const BODY = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "160%",
};

const LABEL = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

const CAPTION = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "11px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

const BTN_BASE = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  padding: "8px 16px",
  borderRadius: "var(--radius-md)",
  border: "none",
  cursor: "pointer",
};

// ─── Static content ───────────────────────────────────────────────────────────

const STEP_CARDS = [
  {
    num: "01",
    title: "Search the collection",
    body: "Explore 248,000+ artworks from the Harvard Art Museums spanning centuries and cultures.",
  },
  {
    num: "02",
    title: "Build your exhibition",
    body: "Select artworks that speak to you and organize them into a themed exhibition with your own title and description.",
  },
  {
    num: "03",
    title: "Share with the community",
    body: "Publish your exhibition and explore what others have curated from the same collection.",
  },
];

// Proportional flex weights from Figma mosaic widths
const MOSAIC_TOP_FLEX = [490, 536, 354, 327];
const MOSAIC_BOTTOM_FLEX = [320, 530, 327, 335];

// ─── Component ────────────────────────────────────────────────────────────────

const Landing = () => {
  const { setIsLoading } = useGlobalContext();
  const { handleGetAllArtworks, handleGetAllFilterObjs, records } =
    useArtworkContext();

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      if (records.length === 0) {
        await handleGetAllArtworks();
        await handleGetAllFilterObjs();
      }
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch all data | artworks, filter objs`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const featuredCards = records.length > 0 ? records.slice(0, 5) : Array(5).fill(null);

  return (
    <div style={{ backgroundColor: "var(--color-background)" }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{ position: "relative" }}>

        {/* Mosaic — top row */}
        <div style={{ display: "flex", height: "452px", overflow: "hidden" }}>
          {MOSAIC_TOP_FLEX.map((flex, i) => (
            <div
              key={i}
              style={{
                flex,
                overflow: "hidden",
                backgroundColor: "var(--color-neutral-300)",
              }}
            >
              {records[i]?.primaryimageurl && (
                <img
                  src={records[i].primaryimageurl}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mosaic — bottom row */}
        <div style={{ display: "flex", height: "452px", overflow: "hidden" }}>
          {MOSAIC_BOTTOM_FLEX.map((flex, i) => (
            <div
              key={i}
              style={{
                flex,
                overflow: "hidden",
                backgroundColor: "var(--color-neutral-300)",
              }}
            >
              {records[4 + i]?.primaryimageurl && (
                <img
                  src={records[4 + i].primaryimageurl}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Hero text — centered overlay */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            padding: "64px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            width: "min(744px, 90vw)",
          }}
        >
          <h1
            data-cy="landing-title"
            style={{ ...DISPLAY, color: "var(--color-neutral-0)", margin: 0 }}
          >
            Your exhibition,<br />your vision
          </h1>
          <p
            data-cy="landing-description"
            style={{
              ...BODY_LG,
              color: "var(--color-neutral-0)",
              opacity: 0.75,
              maxWidth: "616px",
              margin: 0,
            }}
          >
            Discover, curate, and share personal art exhibitions from 248,000+
            objects in the Harvard Art Museums collection.
          </p>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Link to="/artworks/search">
              <button
                data-cy="landing-search-artworks-btn"
                style={{
                  ...BTN_BASE,
                  backgroundColor: "var(--color-neutral-0)",
                  color: "var(--color-neutral-1000)",
                }}
              >
                start curating
              </button>
            </Link>
            <Link to="/exhibitions/explore">
              <button
                data-cy="landing-explore-exbs-btn"
                style={{
                  ...BTN_BASE,
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                  color: "var(--color-neutral-0)",
                  border: "1px solid var(--color-neutral-0)",
                }}
              >
                explore exhibitions
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          padding: "80px 96px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <span style={{ ...LABEL, color: "var(--color-text-secondary)" }}>
          how it works
        </span>

        {/* Cards separated by 1px gap (border color shows through) */}
        <div
          style={{
            display: "flex",
            gap: "1px",
            backgroundColor: "var(--color-border)",
          }}
        >
          {STEP_CARDS.map((card) => (
            <div
              key={card.num}
              style={{
                flex: 1,
                padding: "32px 64px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                backgroundColor: "var(--color-background)",
              }}
            >
              <span style={{ ...H2, color: "var(--color-accent)" }}>
                {card.num}
              </span>
              <span style={{ ...H2, color: "var(--color-text-primary)" }}>
                {card.title}
              </span>
              <p style={{ ...BODY, color: "var(--color-text-secondary)", margin: 0 }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FROM THE COLLECTION ───────────────────────────────────────────── */}
      <div
        style={{
          padding: "80px 96px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ ...LABEL, color: "var(--color-text-secondary)" }}>
            from the collection
          </span>
          <Link
            to="/artworks/search"
            style={{ ...BODY, color: "var(--color-text-primary)", textDecoration: "none" }}
          >
            Browse all →
          </Link>
        </div>

        <div style={{ display: "flex", gap: "24px" }}>
          {featuredCards.map((record, i) => (
            <div
              key={record?.id ?? i}
              style={{
                flex: 1,
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "349px",
              }}
            >
              {/* Image */}
              <div
                style={{
                  height: "240px",
                  flexShrink: 0,
                  overflow: "hidden",
                  backgroundColor: "var(--color-surface)",
                  borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
                }}
              >
                {record?.primaryimageurl && (
                  <img
                    src={record.primaryimageurl}
                    alt={record.title ?? ""}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                )}
              </div>

              {/* Label */}
              <div
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  flex: 1,
                  overflow: "hidden",
                  backgroundColor: "var(--color-background)",
                }}
              >
                <span style={{ ...CAPTION, color: "var(--color-neutral-1000)" }}>
                  {record?.people?.[0]?.name ?? ""}
                </span>
                <span
                  style={{
                    ...BODY,
                    color: "var(--color-text-primary)",
                    fontStyle: "italic",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {record?.title ?? ""}
                </span>
                <span style={{ ...CAPTION, color: "var(--color-text-secondary)" }}>
                  {record?.dated ?? ""}
                </span>
                <span
                  style={{
                    ...CAPTION,
                    color: "var(--color-text-secondary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {record?.medium ?? ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BAND ──────────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-neutral-1000)",
          padding: "120px 96px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}
      >
        <h2
          style={{ ...DISPLAY, color: "var(--color-neutral-0)", margin: 0 }}
        >
          Start curating today.
        </h2>
        <p style={{ ...BODY_LG, color: "rgba(255, 255, 255, 0.7)", margin: 0 }}>
          Join the CurateSphere community and build your first exhibition in minutes.
        </p>
        <div style={{ display: "flex", gap: "32px" }}>
          <Link to="/register">
            <button
              style={{
                ...BTN_BASE,
                backgroundColor: "var(--color-neutral-0)",
                color: "var(--color-neutral-1000)",
              }}
            >
              create free account
            </button>
          </Link>
          <Link to="/exhibitions/explore">
            <button
              style={{
                ...BTN_BASE,
                backgroundColor: "transparent",
                color: "rgba(255, 255, 255, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.7)",
              }}
            >
              explore exhibitions
            </button>
          </Link>
        </div>
        <span style={{ ...CAPTION, color: "rgba(255, 255, 255, 0.75)" }}>
          Powered by the Harvard Art Museums API
        </span>
      </div>

    </div>
  );
};

export default Landing;
