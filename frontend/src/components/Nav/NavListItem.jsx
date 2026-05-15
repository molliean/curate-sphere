import { useState } from "react";
import { Link } from "react-router-dom";

export const NavListItem = ({ dropDownItems, listItemText, setIsMenuOpen, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <li
        data-cy="nav-category"
        className="cursor-default select-none list-none"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: "20px",
          lineHeight: "130%",
          color: "var(--color-text-primary)",
          paddingTop: "var(--space-1)",
          paddingBottom: "var(--space-1)",
          borderBottom: isActive ? "2px solid var(--color-accent)" : "2px solid transparent",
        }}
      >
        {listItemText}
      </li>

      {isHovered && (
        <ul
          data-cy={`nav-dropdown-menu-${listItemText.toLowerCase()}`}
          className="absolute top-full left-0 w-48 rounded py-1 z-50 list-none m-0"
          style={{
            backgroundColor: "var(--color-background)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          {dropDownItems.map((item, idx) => {
            const formattedItemText = item.text.replace(" ", "-").toLowerCase();
            return (
              <Link
                data-cy={`nav-dropdown-item-${formattedItemText}`}
                key={item.text + idx}
                to={item.path}
              >
                <li
                  onClick={() => {
                    setIsHovered(false);
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2.5 text-xs uppercase cursor-pointer transition-colors"
                  style={{
                    fontFamily: "var(--font-body)",
                    letterSpacing: "0.06em",
                    color: "var(--color-text-secondary)",
                    listStyle: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-surface)";
                    e.currentTarget.style.color = "var(--color-text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "";
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                  }}
                >
                  {item.text}
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};
