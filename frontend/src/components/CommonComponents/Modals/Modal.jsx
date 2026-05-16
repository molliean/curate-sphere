// Import React and Hooks
import { useState } from "react";
// Import Router components
import { Link, useLocation } from "react-router-dom";
// Import FontAwesome for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// Import Services
import { postAddArtworkToExb } from "../../../services/exbService";
// Import Context
import useGlobalContext from "../../../context/global/useGlobalContext";
// Import Components
import PromptSignIn from "./PromptSignIn";
import useExbContext from "../../../context/exb/useExbContext";

// ─── Style constants ───────────────────────────────────────────────────────────

const LABEL = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-text-secondary)",
};

///////////////////////////
// Modal Component
///////////////////////////
const Modal = ({ isVisible, onClose, exbs = [], ArtworkObjectid }) => {
  // State to manage messages and filtered exhibitions
  const [message, setMessage] = useState("");
  const [displayUserExbs, setDisplayUserExbs] = useState(exbs);
  const location = useLocation();
  const { user } = useGlobalContext();
  const { myExbs } = useExbContext();

  ///////////////////////////
  // Search Functions / Actions
  ///////////////////////////
  const handleSearchQuery = (e) => {
    const { value } = e.target;
    filterdisplayUserExbsBySearch(value);
  };

  const filterdisplayUserExbsBySearch = (searchQuery) => {
    // Begin search when query is at least 3 characters long
    if (searchQuery.length > 2) {
      setDisplayUserExbs(
        displayUserExbs.filter((exb) =>
          exb.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else if (searchQuery.length === 0) {
      // Reset results if user clears search
      setDisplayUserExbs(exbs);
    }
  };

  ///////////////////////////
  // Add artwork to exhibition
  ///////////////////////////
  const handleAddArtworkToExb = async (exbId, objectid) => {
    try {
      const data = await postAddArtworkToExb(exbId, objectid);
      if (data.message) {
        setMessage(data.message);
      }
    } catch (err) {
      console.error("Cannot communicate with DB to add artwork to exhibition");
    }
  };

  // Return null if modal is not visible
  if (!isVisible) {
    return null;
  }

  const handleClose = () => {
    onClose();
    setMessage("");
  };

  return (
    /* Overlay */
    <div
      data-cy="default-modal"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Modal shell */}
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          backgroundColor: "var(--color-background)",
          border: "1px solid var(--color-border-strong)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          margin: "16px",
        }}
      >
        {/* ── HEADER ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "130%",
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            Add to exhibition
          </h2>
          <button
            data-cy="default-modal-close"
            type="button"
            onClick={handleClose}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: 1,
              color: "var(--color-text-secondary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* ── BODY ── */}
        <div
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {!user ? (
            /* Not signed in */
            <>
              <PromptSignIn text={"add artwork"} mt0 />
              <button
                data-cy="close-prompt-modal"
                type="button"
                onClick={handleClose}
                style={{
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
                  alignSelf: "flex-end",
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {/* Create exhibition prompt when no exhibitions exist */}
              {myExbs?.length < 1 && (
                <Link
                  to="/exhibitions/create"
                  state={{ previousLocation: location }}
                  style={{ textDecoration: "none" }}
                >
                  <p
                    data-cy="modal-create-first-exb-prompt-btn"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "160%",
                      color: "var(--color-text-secondary)",
                      margin: 0,
                      textAlign: "center",
                    }}
                  >
                    No exhibitions yet.{" "}
                    <span style={{ color: "var(--color-text-primary)", textDecoration: "underline" }}>
                      Create your first exhibition
                    </span>
                  </p>
                </Link>
              )}

              {/* Success toast */}
              {message === "success" && (
                <div
                  data-cy="success-message"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "12px 16px",
                    backgroundColor: "var(--color-accent-subtle)",
                    border: "1px solid var(--color-accent)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-accent)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "160%",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    Changes saved
                  </span>
                </div>
              )}

              {/* Error message */}
              {message && message !== "success" && (
                <p
                  data-cy="error-message"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "160%",
                    color: "var(--color-error)",
                    margin: 0,
                  }}
                >
                  {message}
                </p>
              )}

              {/* Search + list */}
              {exbs?.length > 0 && (
                <>
                  {/* Search input */}
                  <div style={{ position: "relative" }}>
                    <input
                      data-cy="exb-search"
                      onChange={handleSearchQuery}
                      placeholder="Search exhibitions"
                      type="text"
                      style={{
                        width: "100%",
                        fontFamily: "var(--font-body)",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "160%",
                        color: "var(--color-text-primary)",
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-md)",
                        padding: "12px 40px 12px 12px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-text-secondary)",
                        fontSize: "14px",
                        pointerEvents: "none",
                      }}
                    />
                  </div>

                  {/* Exhibition list */}
                  <ul
                    data-cy="exb-list"
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: "10px 12px",
                      display: "flex",
                      flexDirection: "column",
                      maxHeight: "280px",
                      overflowY: "auto",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                    }}
                  >
                    {displayUserExbs?.map((exb, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleAddArtworkToExb(exb.id, ArtworkObjectid)}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "var(--color-surface)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "transparent")
                        }
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "10px",
                          padding: "10px 0",
                          borderBottom:
                            idx < displayUserExbs.length - 1
                              ? "1px solid var(--color-border)"
                              : "none",
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          transition: "background-color 0.1s",
                          borderRadius: "var(--radius-sm)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "160%",
                            color: "var(--color-text-primary)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            flex: 1,
                          }}
                        >
                          {exb.title}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "160%",
                            color: "var(--color-text-secondary)",
                            flexShrink: 0,
                          }}
                        >
                          +
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
