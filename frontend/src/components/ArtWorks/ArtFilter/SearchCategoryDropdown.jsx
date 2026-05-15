import { useState } from "react";
import { SearchFilterCheckBox } from "./SearchFilterCheckbox";

export const SearchCategoryDropdown = ({ primaryCategory, subCategories }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [displaySubCategories, setDisplaySubCategories] =
    useState(subCategories);

  ///////////////////////////
  // Search Functions / Actions
  ///////////////////////////
  const handleSearchQuery = (e) => {
    const { value } = e.target;
    filterSubCategoriesBySearch(value);
  };

  const filterSubCategoriesBySearch = (searchQuery) => {
    // begins search when query is at least 3 chars long
    if (searchQuery.length > 2)
      setDisplaySubCategories(
        Object.values(subCategories).filter((category) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    // resets results if user cleared search
    if (searchQuery.length === 0) setDisplaySubCategories(subCategories);
  };

  ///////////////////////////
  // Handle Show Dropdown
  ///////////////////////////
  const handleShowDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <li style={{ borderBottom: "1px solid var(--color-border)", listStyle: "none" }}>
      {/* Category header */}
      <div
        onClick={handleShowDropdown}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
          cursor: "pointer",
          userSelect: "none",
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
            color: "var(--color-text-primary)",
          }}
        >
          {primaryCategory}
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "var(--color-text-secondary)",
            display: "inline-block",
            transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.15s ease",
          }}
        >
          ▾
        </span>
      </div>

      {/* Expanded content */}
      {showDropdown && (
        <div style={{ paddingBottom: "12px" }}>
          {/* Search input */}
          <div style={{ padding: "0 16px 8px" }}>
            <input
              data-cy="subcategory-search-input"
              onChange={handleSearchQuery}
              type="text"
              placeholder="Search..."
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "140%",
                color: "var(--color-text-primary)",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                padding: "6px 10px",
                width: "100%",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          {/* Subcategory list */}
          <ul
            data-cy="subcategory-dropdown-ul"
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              listStyle: "none",
              margin: 0,
              padding: "0 8px",
            }}
          >
            {Object.values(displaySubCategories)?.map((category) => (
              <SearchFilterCheckBox
                primaryCategoryKey={primaryCategory}
                category={category}
                key={category.id}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};
