// React Router
import { Link, useLocation } from "react-router-dom";
// Custom Hooks and Contexts
import useGlobalContext from "../../context/global/useGlobalContext";
import useArtworkContext from "../../context/artwork/useArtworkContext";
import useExbContext from "../../context/exb/useExbContext";
// Services
import { getUser } from "../../services/authService";
// React Hooks
import { useEffect, useRef } from "react";
// Components
import ExbHomeCard from "./ExbHomeCard";
import ArtGalleryCard from "../ArtWorks/ArtDisplay/ArtGalleryCard";

// ─── Type style constants ──────────────────────────────────────────────────────

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

const BTN_PRIMARY = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  backgroundColor: "var(--color-neutral-1000)",
  color: "var(--color-neutral-0)",
  border: "none",
  borderRadius: "var(--radius-md)",
  padding: "8px 16px",
  cursor: "pointer",
};

const ARROW_BTN = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: "var(--color-background)",
  border: "1px solid var(--color-border)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  color: "var(--color-text-primary)",
};

const Home = () => {
  const location = useLocation();
  const { user, setUser, setIsLoading } = useGlobalContext();
  const { handleGetAllArtworks, handleGetAllFilterObjs, records } =
    useArtworkContext();
  const { handleGetUserExbs, myExbs } = useExbContext();

  const exbScrollRef = useRef(null);
  const artScrollRef = useRef(null);

  ///////////////////////////
  // Fetches User
  ///////////////////////////
  const fetchUser = async () => {
    if (!user.token) return;
    try {
      const data = getUser();
      setUser(data);
    } catch (err) {
      console.error(err);
      console.log(`Could not get user | context`);
    }
  };

  //////////////////////////////////////////////////////
  // Fetches User, Artworks, Filters, and User Exbs
  //////////////////////////////////////////////////////
  // this prevents redundant fetch calls if necessary data already exists
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      // user
      await fetchUser();

      // artworks
      if (records.length === 0) {
        await handleGetAllArtworks();
        await handleGetAllFilterObjs();
      }
      // user exbs
      if (myExbs.length === 0) {
        await handleGetUserExbs();
      }
    } catch (err) {
      console.error(err);
      console.log(
        `Unable to fetch all data | user, artworks, filter objs, user exbs`
      );
    } finally {
      setIsLoading(false);
    }
  };

  ///////////////////////////
  // useEffect to run all fetches
  ///////////////////////////
  useEffect(() => {
    fetchAllData();
    const token = localStorage.getItem("token");
  }, []);

  // Carousel scroll helpers
  const scrollExbs = (dir) => {
    if (!exbScrollRef.current) return;
    exbScrollRef.current.scrollBy({ left: dir * 400, behavior: "smooth" });
  };

  const scrollArts = (dir) => {
    if (!artScrollRef.current) return;
    artScrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  const hasExbs = myExbs?.length > 0;
  const showExbArrows = myExbs?.length >= 3;
  const totalArtworks = myExbs?.reduce(
    (sum, exb) => sum + (exb?.artworks?.length || 0),
    0
  );

  return (
    <div
      style={{
        marginTop: "64px",
        backgroundColor: "var(--color-background)",
        padding: "64px 96px 96px",
        display: "flex",
        flexDirection: "column",
        gap: "64px",
      }}
    >
      {/* ── ZONE 1 — GREETING ──────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h1
          data-cy="welcome-message"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "48px",
            lineHeight: "110%",
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
            margin: 0,
          }}
        >
          Welcome back, {user?.user?.username}
        </h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <span
            style={{
              ...CAPTION,
              color: "var(--color-text-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-full)",
              padding: "4px 8px",
            }}
          >
            {myExbs?.length || 0} exhibitions
          </span>
          <span
            style={{
              ...CAPTION,
              color: "var(--color-text-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-full)",
              padding: "4px 8px",
            }}
          >
            {totalArtworks} artworks
          </span>
        </div>
      </div>

      {/* ── ZONE 2 — MY EXHIBITIONS ────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Section header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ ...LABEL, color: "var(--color-text-secondary)" }}>
            My Exhibitions
          </span>
          <Link to="/exhibitions/create" state={{ previousLocation: location }} style={{ textDecoration: "none" }}>
            <button data-cy="user-exbs-btn" style={BTN_PRIMARY}>
              + New Exhibition
            </button>
          </Link>
        </div>

        {hasExbs ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Carousel */}
            <div style={{ position: "relative" }}>
              {showExbArrows && (
                <button
                  onClick={() => scrollExbs(-1)}
                  aria-label="Scroll exhibitions left"
                  style={{ ...ARROW_BTN, left: "-16px" }}
                >
                  ←
                </button>
              )}

              <div
                ref={exbScrollRef}
                className="hide-scrollbar"
                style={{ display: "flex", gap: "24px", overflowX: "auto" }}
              >
                {myExbs.map((exb) => (
                  <div
                    key={exb.id}
                    style={{ flex: "0 0 calc(33.333% - 16px)", minWidth: "300px" }}
                  >
                    <ExbHomeCard
                      id={exb.id}
                      title={exb.title}
                      startDate={exb.startDate}
                      endDate={exb.endDate}
                      location={exb.location}
                    />
                  </div>
                ))}
              </div>

              {showExbArrows && (
                <button
                  onClick={() => scrollExbs(1)}
                  aria-label="Scroll exhibitions right"
                  style={{ ...ARROW_BTN, right: "-16px" }}
                >
                  →
                </button>
              )}
            </div>

            {/* View all link */}
            {myExbs.length > 3 && (
              <div style={{ textAlign: "right" }}>
                <Link
                  to="/exhibitions/dashboard"
                  style={{
                    ...LABEL,
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                  }}
                >
                  View all {myExbs.length} exhibitions →
                </Link>
              </div>
            )}
          </div>
        ) : (
          /* Empty state */
          <div
            style={{
              border: "1px dashed var(--color-border)",
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--color-surface)",
              padding: "48px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* Icon box */}
            <div
              style={{
                width: "64px",
                height: "64px",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "var(--color-surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "32px",
                  lineHeight: "120%",
                  color: "var(--color-text-secondary)",
                }}
              >
                ○
              </span>
            </div>

            {/* Heading */}
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "130%",
                color: "var(--color-text-primary)",
                textAlign: "center",
                width: "320px",
              }}
            >
              No exhibitions yet
            </span>

            {/* Subtext */}
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "160%",
                color: "var(--color-text-secondary)",
                textAlign: "center",
                width: "320px",
              }}
            >
              Create your first exhibition
            </span>

            {/* Ghost CTA button */}
            <Link to="/exhibitions/create" state={{ previousLocation: location }} style={{ textDecoration: "none" }}>
              <button
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "140%",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  backgroundColor: "transparent",
                  color: "var(--color-neutral-1000)",
                  border: "1px solid var(--color-neutral-1000)",
                  borderRadius: "var(--radius-md)",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                add exhibition
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* ── ZONE 3 — FROM THE COLLECTION ───────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          borderTop: "1px solid var(--color-border)",
          paddingTop: "64px",
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ ...LABEL, color: "var(--color-text-secondary)" }}>
            From the Collection
          </span>
          <Link
            to="/artworks/search"
            style={{
              ...LABEL,
              color: "var(--color-text-secondary)",
              textDecoration: "none",
            }}
          >
            Browse all →
          </Link>
        </div>

        {/* Artwork carousel */}
        {records.length > 0 && (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => scrollArts(-1)}
              aria-label="Scroll artworks left"
              style={{ ...ARROW_BTN, left: "-16px" }}
            >
              ←
            </button>

            <div
              ref={artScrollRef}
              className="hide-scrollbar"
              style={{ display: "flex", gap: "24px", overflowX: "auto" }}
            >
              {records.slice(0, 12).map((record, idx) => (
                <div
                  key={record.id + idx}
                  style={{ flex: "0 0 calc(25% - 18px)", minWidth: "220px" }}
                >
                  <ArtGalleryCard
                    ArtworkObjectid={record.objectid}
                    img={record.primaryimageurl}
                    division={record.division}
                    title={record.title}
                    year={record.dated}
                    people={record.people}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollArts(1)}
              aria-label="Scroll artworks right"
              style={{ ...ARROW_BTN, right: "-16px" }}
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
