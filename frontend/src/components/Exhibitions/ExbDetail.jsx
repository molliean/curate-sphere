// Import React and hooks
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// Import context hooks
import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";
// Import components
import Masonry from "react-masonry-css";
import ExbArtworkCard from "./ExbArtworkCard";
import Loader from "../CommonComponents/Loaders/Loader";

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

const BTN_DESTRUCTIVE = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  backgroundColor: "transparent",
  color: "var(--color-error)",
  border: "1px solid var(--color-error)",
  borderRadius: "var(--radius-md)",
  padding: "8px 16px",
  cursor: "pointer",
};

const BTN_GHOST = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  backgroundColor: "transparent",
  color: "var(--color-text-primary)",
  border: "1px solid var(--color-neutral-1000)",
  borderRadius: "var(--radius-md)",
  padding: "8px 16px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};

///////////////////////////
// ExbDetail Component
///////////////////////////
const ExbDetail = () => {
  // Extracting necessary hooks and context values
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, scrollToTop } = useGlobalContext();
  const { formatDate } = useGlobalContext();
  const {
    handleGetExbDetail,
    showExb,
    handleDeleteExb,
    handleGetUserExbs,
    dispatch,
    isLoading,
  } = useExbContext();

  // UI state for description expand/collapse
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  ///////////////////////////
  // Masonry Grid Config
  ///////////////////////////
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  ///////////////////////////
  // Fetch Exhibition Detail
  ///////////////////////////
  useEffect(() => {
    const fetchExbDetail = async () => {
      dispatch({ type: "startLoading/exb" });
      try {
        // Fetching exhibition detail and updating the state
        await handleGetExbDetail(id);
      } catch (err) {
        console.error("Unable to get exb detail | ExbDetail", err);
      } finally {
        dispatch({ type: "stopLoading/exb" });
      }
    };

    fetchExbDetail();
    scrollToTop();
  }, []);

  ///////////////////////////
  // Handle Delete Exhibition
  ///////////////////////////
  const handleDeleteButton = async () => {
    try {
      await handleDeleteExb(id);
      handleGetUserExbs();
      navigate("/exhibitions/dashboard");
    } catch (err) {
      console.error("Error deleting exhibition", err);
    }
  };

  // Determine if the exhibition belongs to the current user
  const isUsersExb = showExb.userId === user?.user.id;

  // Show loader while fetching data
  if (isLoading) return <Loader />;

  const descriptionLong = showExb?.description?.length > 240;
  const curatorName = showExb?.User?.username || showExb?.user?.username;

  return (
    <div style={{ marginTop: "64px" }}>

      {/* ── BREADCRUMB ROW ──────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-background)",
          borderBottom: "1px solid var(--color-border)",
          padding: "20px 96px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/exhibitions/explore"
          style={{
            ...CAPTION,
            color: "var(--color-text-secondary)",
            textDecoration: "none",
          }}
        >
          ← Back to exhibitions
        </Link>
      </div>

      {/* ── EXHIBITION HEADER ZONE ──────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          padding: "64px 96px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Location · date range */}
        <span style={{ ...LABEL, color: "var(--color-text-secondary)" }}>
          {showExb.location}
          {showExb.location && (showExb.startDate || showExb.endDate) && " · "}
          {formatDate(showExb.startDate)}
          {showExb.startDate && showExb.endDate && " – "}
          {formatDate(showExb.endDate)}
        </span>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "64px",
            lineHeight: "110%",
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
            margin: 0,
            textAlign: "center",
          }}
        >
          {showExb.title}
        </h1>

        {/* Description with Read more toggle */}
        {showExb.description && (
          <div
            style={{
              maxWidth: "640px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "160%",
                color: "var(--color-text-secondary)",
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: isDescExpanded ? "unset" : 3,
                WebkitBoxOrient: "vertical",
                overflow: isDescExpanded ? "visible" : "hidden",
              }}
            >
              {showExb.description}
            </p>
            {descriptionLong && (
              <button
                onClick={() => setIsDescExpanded((prev) => !prev)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "140%",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--color-text-secondary)",
                  textDecoration: "underline",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {isDescExpanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        )}

        {/* Owner only: Edit and Delete buttons */}
        {isUsersExb && (
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            <Link to={`/exhibitions/${id}/edit`} style={{ textDecoration: "none" }}>
              <button data-cy="edit-exb-btn" style={BTN_PRIMARY}>
                Edit exhibition
              </button>
            </Link>
            <button
              data-cy="delete-exb-btn"
              onClick={handleDeleteButton}
              style={BTN_DESTRUCTIVE}
            >
              Delete exhibition
            </button>
          </div>
        )}
      </div>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-background)",
          borderBottom: "1px solid var(--color-border)",
          padding: "16px 96px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left: artwork count + curator */}
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <span style={{ ...LABEL, color: "var(--color-text-primary)" }}>
            {showExb?.artworks?.length || 0}{" "}
            {showExb?.artworks?.length === 1 ? "artwork" : "artworks"}
          </span>
          {curatorName && (
            <span style={{ ...LABEL, color: "var(--color-text-secondary)" }}>
              Curated by {curatorName}
            </span>
          )}
        </div>

        {/* Owner only: + Add artworks */}
        {isUsersExb && (
          <Link to="/artworks/search" style={BTN_GHOST}>
            + Add artworks
          </Link>
        )}
      </div>

      {/* ── ARTWORK GRID ZONE ────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-background)",
          padding: "64px 96px",
        }}
      >
        {showExb?.artworks?.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {showExb.artworks.map((record) => (
              <ExbArtworkCard
                isUsersExb={isUsersExb}
                key={record.ArtworkObjectid}
                ArtworkObjectid={record.ArtworkObjectid}
              />
            ))}
          </Masonry>
        ) : (
          <p
            data-cy="exb-detail-no-artworks-message"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "160%",
              color: "var(--color-text-secondary)",
              textAlign: "center",
              margin: 0,
            }}
          >
            No artworks found in this exhibition
          </p>
        )}
      </div>

    </div>
  );
};

export default ExbDetail;
