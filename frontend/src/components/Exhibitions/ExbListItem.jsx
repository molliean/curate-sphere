import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCoverImg } from "../../services/exbService";

const CAPTION = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "11px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-text-secondary)",
};

export const ExbListItem = ({ title, date, location, id, artworkCount, username }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [hovered, setHovered] = useState(false);

  const fetchExbCoverImg = async () => {
    setIsLoadingImg(true);
    try {
      const data = await getCoverImg(id);
      if (!data.error) {
        setImgUrl(data);
      }
    } catch (err) {
      console.error(err);
      console.log(`Unable to get info of exb on backend`);
    } finally {
      setIsLoadingImg(false);
    }
  };

  useEffect(() => {
    fetchExbCoverImg();
  }, []);

  const artworkLabel = (() => {
    const count = parseInt(artworkCount, 10);
    if (isNaN(count) && !username) return null;
    const parts = [];
    if (!isNaN(count)) parts.push(`${count} ${count === 1 ? "artwork" : "artworks"}`);
    if (username) parts.push(`curated by ${username}`);
    return parts.join(" · ");
  })();

  return (
    <li
      data-cy="exb-card"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 64px",
        borderBottom: "1px solid var(--color-border)",
        backgroundColor: hovered ? "var(--color-surface)" : "var(--color-background)",
        listStyle: "none",
        transition: "background-color 0.1s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left side: thumbnail + metadata */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Thumbnail */}
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "2px",
            overflow: "hidden",
            flexShrink: 0,
            backgroundColor: "var(--color-accent-dark)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!isLoadingImg && imgUrl ? (
            <img
              data-cy="exb-cover-img"
              src={imgUrl}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="6" y="10" width="36" height="28" rx="3" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <circle cx="18" cy="22" r="4" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <path d="M6 34L16 24L22 30L30 20L42 34" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        {/* Metadata */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            minWidth: 0,
          }}
        >
          <span
            data-cy="exb-card-title"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "130%",
              color: "var(--color-text-primary)",
            }}
          >
            {title}
          </span>
          <span
            data-cy="exb-card-date"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "160%",
              color: "var(--color-text-primary)",
            }}
          >
            {date}
          </span>
          {location && (
            <span data-cy="exb-card-location" style={CAPTION}>
              {location}
            </span>
          )}
          {artworkLabel && (
            <span style={CAPTION}>{artworkLabel}</span>
          )}
        </div>
      </div>

      {/* View button */}
      <Link to={`/exhibition/${id}`} style={{ flexShrink: 0, textDecoration: "none" }}>
        <button
          data-cy="exb-card-view-details-btn"
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
            whiteSpace: "nowrap",
          }}
        >
          view →
        </button>
      </Link>
    </li>
  );
};

export default ExbListItem;
