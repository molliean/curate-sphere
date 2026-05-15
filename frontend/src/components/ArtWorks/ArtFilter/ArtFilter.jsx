// Context hooks
import useArtworkContext from "../../../context/artwork/useArtworkContext";
// Component imports
import { SearchCategoryDropdown } from "./SearchCategoryDropdown";

const ArtFilter = () => {
  const {
    primaryCategories,
    century,
    classification,
    culture,
    medium,
    period,
    technique,
    worktype,
    handleResetFilterState,
  } = useArtworkContext();

  // Ensures all filters are loaded before displaying the categories
  const allFiltersLoaded =
    Object.values(century?.records).length > 0 &&
    Object.values(classification?.records).length > 0 &&
    Object.values(culture?.records).length > 0 &&
    Object.values(medium?.records).length > 0 &&
    Object.values(period?.records).length > 0 &&
    Object.values(technique?.records).length > 0 &&
    Object.values(worktype?.records).length > 0;

  return (
    <div>
      {/* Panel header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "140%",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--color-text-secondary)",
          }}
        >
          Filters
        </span>
        <button
          data-cy="reset-filter-btn"
          onClick={handleResetFilterState}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "140%",
            color: "var(--color-text-secondary)",
            textDecoration: "underline",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Clear all
        </button>
      </div>

      {/* Filter categories */}
      {allFiltersLoaded ? (
        <ul
          data-cy="filter-dropdown-ul"
          style={{ listStyle: "none", margin: 0, padding: 0 }}
        >
          {primaryCategories.map((category, idx) => (
            <SearchCategoryDropdown
              primaryCategory={category.title}
              subCategories={category.records}
              key={category.title + idx}
            />
          ))}
        </ul>
      ) : (
        <div
          style={{
            padding: "24px",
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "var(--color-text-secondary)",
            textAlign: "center",
          }}
        >
          Loading filters…
        </div>
      )}
    </div>
  );
};

export default ArtFilter;
