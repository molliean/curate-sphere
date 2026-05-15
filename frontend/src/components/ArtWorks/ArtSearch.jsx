// React imports
import { useEffect } from "react";
// Context hooks
import useArtworkContext from "../../context/artwork/useArtworkContext";
import useGlobalContext from "../../context/global/useGlobalContext";
// Component imports
import ArtGallery from "./ArtDisplay/ArtGallery";
import ArtFilter from "./ArtFilter/ArtFilter";
import ArtListMobile from "./ArtDisplay/ArtListMobile";
import ArtListDesktop from "./ArtDisplay/ArtListDesktop";

const CAPTION = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "11px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

const CONTROL_SELECT = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-text-secondary)",
  backgroundColor: "var(--color-background)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  padding: "6px 10px",
  outline: "none",
  cursor: "pointer",
};

///////////////////////////
// ArtSearch
///////////////////////////
const ArtSearch = () => {
  // Extracting values and functions from artwork context
  const {
    searchQuery,
    handleUpdateSearchQuery,
    displayView,
    records,
    handleSearchArtworksByTitle,
    handleGetNextPageOfArtworks,
    artFilter,
    info,
    handleSizeFilter,
    handleDisplayView,
  } = useArtworkContext();

  // Extracting global context function
  const { scrollToTop } = useGlobalContext();

  // Handles search input changes and performs the artwork search
  const handleSearchQuery = async (e) => {
    const { value } = e.target;
    handleUpdateSearchQuery(value);
    await handleSearchArtworksByTitle(value, artFilter);
  };

  // Find viewport width to determine mobile or desktop view
  const isMobile = window.innerWidth;

  // Scrolls to top on component mount
  useEffect(() => {
    scrollToTop();
  }, []);

  // If no records are available, return nothing
  if (!records) return;

  return (
    <div style={{ marginTop: "64px" }}>

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-background)",
          borderBottom: "1px solid var(--color-border)",
          paddingTop: "64px",
          paddingBottom: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "64px",
            lineHeight: "110%",
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
            margin: 0,
          }}
        >
          Artworks
        </h1>
        <input
          data-cy="art-search-input"
          onChange={handleSearchQuery}
          value={searchQuery}
          type="text"
          placeholder="Search by title..."
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "160%",
            color: "var(--color-text-primary)",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding: "12px 16px",
            width: "min(720px, calc(100% - 48px))",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* ── TWO-COLUMN BODY ──────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-start" }}>

        {/* Filter panel — sticky left column */}
        <div
          style={{
            width: "280px",
            flexShrink: 0,
            borderRight: "1px solid var(--color-border)",
            position: "sticky",
            top: "64px",
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            backgroundColor: "var(--color-background)",
          }}
        >
          <ArtFilter />
        </div>

        {/* Results area */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Controls bar */}
          <div
            style={{
              padding: "16px 32px",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "var(--color-background)",
            }}
          >
            {/* Result count — left */}
            <span style={{ ...CAPTION, color: "var(--color-text-secondary)" }}>
              Showing{" "}
              <span data-cy="displayed-artworks">{records.length}</span> of{" "}
              <span data-cy="total-artworks-available">{info?.totalrecords}</span>{" "}
              objects
            </span>

            {/* Right controls */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {/* Display toggle */}
              <select
                value={displayView}
                onChange={(e) => handleDisplayView(e.target.value)}
                name="art-display-style"
                id="art-display-style"
                style={CONTROL_SELECT}
              >
                <option disabled value="">
                  Display
                </option>
                <option value="gallery">Gallery</option>
                <option value="list">List</option>
              </select>

              {/* Load amount */}
              <select
                data-cy="filter-size-select"
                onChange={(e) => handleSizeFilter(e.target.name, e.target.value)}
                name="size"
                id="size"
                value={artFilter.size}
                style={CONTROL_SELECT}
              >
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>

          {/* Results grid */}
          <div style={{ padding: "32px" }}>
            {displayView === "list" ? (
              <>
                {isMobile < 768 ? <ArtListMobile /> : <ArtListDesktop />}
              </>
            ) : (
              <ArtGallery />
            )}
          </div>

          {/* Load more button */}
          {info.next && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "48px",
                paddingTop: "8px",
              }}
            >
              <button
                data-cy="load-more-btn"
                onClick={handleGetNextPageOfArtworks}
                style={{
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
                  padding: "10px 32px",
                  cursor: "pointer",
                }}
              >
                load more
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtSearch;
