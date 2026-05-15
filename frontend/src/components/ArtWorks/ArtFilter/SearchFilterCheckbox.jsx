import { useState } from "react";
import useArtworkContext from "../../../context/artwork/useArtworkContext";

export const SearchFilterCheckBox = ({ category, primaryCategoryKey }) => {
  // this will start as false, static value from prop
  const [isChecked, setIsChecked] = useState(category.isChecked);
  // this will start as 0, static value from prop
  const [clickCount, setClickCount] = useState(category.clickCount);
  const [hovered, setHovered] = useState(false);
  const { handleToggleCheckbox, handleFilterObj } = useArtworkContext();

  // ensure work type is read as a single word with no spaces all lowercase
  if (primaryCategoryKey === "Work Type") {
    primaryCategoryKey = "worktype";
  }

  const handleClick = () => {
    setIsChecked((prev) => !prev);
    setClickCount((prev) => prev + 1);
    handleToggleCheckbox(
      primaryCategoryKey,
      category.id,
      category.name,
      !isChecked,
      clickCount + 1
    );
    handleFilterObj(
      primaryCategoryKey.toLowerCase(),
      category.name,
      category.id
    );
  };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        height: "36px",
        paddingLeft: "8px",
        paddingRight: "8px",
        backgroundColor: hovered ? "var(--color-surface)" : "transparent",
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        userSelect: "none",
        listStyle: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Custom 16×16 checkbox */}
      <div
        data-cy="subcategory-checkbox"
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "2px",
          border: `1.5px solid ${isChecked ? "var(--color-neutral-1000)" : "var(--color-border)"}`,
          backgroundColor: isChecked ? "var(--color-neutral-1000)" : "transparent",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.1s ease",
        }}
      >
        {isChecked && (
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 3L4 6L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Label */}
      <span
        data-cy="checkbox-category-name"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "160%",
          color: "var(--color-text-primary)",
          textTransform: "capitalize",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {category.name}
      </span>
    </li>
  );
};
