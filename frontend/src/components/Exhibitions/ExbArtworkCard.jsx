// Import necessary React components and hooks
import { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
// Import modals and context
import Modal from "../CommonComponents/Modals/Modal";
import ConfirmDeleteModal from "../CommonComponents/Modals/ConfirmDeleteModal";
import useExbContext from "../../context/exb/useExbContext";
// Import services
import { getArtworkDetail } from "../../services/artworkService";

const CAPTION = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "11px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

///////////////////////////
// ExbArtworkCard Component
///////////////////////////
const ExbArtworkCard = ({ ArtworkObjectid, isUsersExb }) => {
  // Initialize hooks
  const location = useLocation();
  const { myExbs, handleGetExbArtworks } = useExbContext();
  const { id } = useParams();

  // State management
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [artworkData, setArtworkData] = useState({});

  // Destructure artwork data for easier access
  const { primaryimageurl, dated, division, people, title, objectid } =
    artworkData;

  ///////////////////////////
  // Modal Actions
  ///////////////////////////
  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  ///////////////////////////
  // Fetch Artwork Details
  ///////////////////////////
  const fetchArtworkDetails = async () => {
    const data = await getArtworkDetail(ArtworkObjectid);
    setArtworkData(data);
  };

  useEffect(() => {
    fetchArtworkDetails();
  }, []); // Empty dependency array ensures this effect runs once after initial render

  const onDetailPage = location.pathname === `/exhibition/${id}`;

  return (
    <div
      data-cy="exb-artwork-card"
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
      <Link to={`/artwork/${objectid}`} style={{ display: "block", flexShrink: 0 }}>
        {primaryimageurl ? (
          <img
            src={primaryimageurl}
            alt={title || "Artwork"}
            style={{ width: "100%", height: "240px", display: "block", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "240px",
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

      {/* Label: metadata left, quick-add right, both bottom-aligned */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          gap: "2px",
          padding: "16px",
          backgroundColor: "var(--color-background)",
        }}
      >
        {/* Metadata */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Title + artist grouped */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {people?.[0]?.name && (
              <span style={{ ...CAPTION, color: "var(--color-text-primary)" }}>
                {people[0].name}
              </span>
            )}
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
          </div>
          {dated && (
            <span style={{ ...CAPTION, color: "var(--color-text-secondary)" }}>
              {dated}
            </span>
          )}
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

        {/* Quick remove (owner on detail page) */}
        {isUsersExb && onDetailPage && (
          <>
            <button
              data-cy="remove-artwork-from-exb"
              onClick={showModal}
              aria-label="Remove artwork"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "32px",
                lineHeight: "120%",
                color: "var(--color-text-primary)",
                flexShrink: 0,
              }}
            >
              ×
            </button>
            <ConfirmDeleteModal
              handleReloadResource={handleGetExbArtworks}
              id={id}
              objectid={objectid}
              isVisible={isModalVisible}
              onClose={hideModal}
            />
          </>
        )}

        {/* Quick add (visitor only) */}
        {!isUsersExb && (
          <>
            <button
              onClick={showModal}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "32px",
                lineHeight: "120%",
                color: "var(--color-text-primary)",
                flexShrink: 0,
              }}
            >
              +
            </button>
            <Modal
              ArtworkObjectid={ArtworkObjectid}
              exbs={myExbs}
              isVisible={isModalVisible}
              onClose={hideModal}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ExbArtworkCard;
