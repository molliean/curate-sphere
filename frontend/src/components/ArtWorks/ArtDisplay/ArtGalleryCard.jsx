import { Link } from "react-router-dom";
import Modal from "../../CommonComponents/Modals/Modal";
import { useState } from "react";
import useExbContext from "../../../context/exb/useExbContext";

const CAPTION = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "11px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

const ArtGalleryCard = ({
  year,
  people,
  division,
  title,
  img,
  ArtworkObjectid,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { myExbs } = useExbContext();

  ///////////////////////////
  // Modal Actions
  ///////////////////////////
  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <div
      data-cy="art-gallery-card"
      style={{
        backgroundColor: "var(--color-background)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <Link to={`/artwork/${ArtworkObjectid}`} style={{ display: "block" }}>
        {img ? (
          <img
            src={img}
            alt={title}
            style={{ width: "100%", display: "block", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              minHeight: "180px",
              backgroundColor: "var(--color-accent-dark)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="6"
                y="10"
                width="36"
                height="28"
                rx="3"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <circle
                cx="18"
                cy="22"
                r="4"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <path
                d="M6 34L16 24L22 30L30 20L42 34"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </Link>

      {/* Metadata */}
      <div
        style={{
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          flex: 1,
        }}
      >
        {/* Artist */}
        {people?.[0]?.name && (
          <span style={{ ...CAPTION, color: "var(--color-text-secondary)" }}>
            {people[0].name}
          </span>
        )}
        {/* Title */}
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "160%",
            fontStyle: "italic",
            color: "var(--color-text-primary)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </span>
        {/* Date */}
        {year && (
          <span style={{ ...CAPTION, color: "var(--color-text-secondary)" }}>
            {year}
          </span>
        )}
        {/* Medium / division */}
        {division && (
          <span
            style={{
              ...CAPTION,
              color: "var(--color-text-secondary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {division}
          </span>
        )}
      </div>

      {/* Action row */}
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          padding: "8px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to={`/artwork/${ArtworkObjectid}`}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "11px",
            lineHeight: "140%",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--color-text-secondary)",
            textDecoration: "none",
          }}
        >
          details
        </Link>

        <button
          data-cy="add-artwork-plus"
          onClick={showModal}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "11px",
            lineHeight: "140%",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            backgroundColor: "var(--color-neutral-1000)",
            color: "var(--color-neutral-0)",
            border: "none",
            borderRadius: "var(--radius-sm)",
            padding: "4px 10px",
            cursor: "pointer",
          }}
        >
          + add
        </button>

        <Modal
          ArtworkObjectid={ArtworkObjectid}
          exbs={myExbs}
          isVisible={isModalVisible}
          onClose={hideModal}
        >
          <p className="mt-4 px-4 py-2 bg-black text-white">
            Add to Exhibition
          </p>
          <button
            onClick={hideModal}
            className="mt-4 px-4 py-2 bg-black text-white"
          >
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default ArtGalleryCard;
