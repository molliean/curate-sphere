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

export const ExbListItem = ({ title, date, location, id }) => {
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

  return (
    <li
      data-cy="exb-card"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "24px",
        padding: "16px 96px",
        borderBottom: "1px solid var(--color-border)",
        backgroundColor: hovered ? "var(--color-surface)" : "var(--color-background)",
        listStyle: "none",
        transition: "background-color 0.1s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "2px",
          overflow: "hidden",
          flexShrink: 0,
          backgroundColor: "var(--color-surface)",
        }}
      >
        {!isLoadingImg && (
          <img
            data-cy="exb-cover-img"
            src={
              imgUrl
                ? imgUrl
                : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
            }
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
      </div>

      {/* Exhibition info */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
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
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </span>
        <span data-cy="exb-card-date" style={CAPTION}>
          {date}
        </span>
        {location && (
          <span data-cy="exb-card-location" style={CAPTION}>
            {location}
          </span>
        )}
      </div>

      {/* View button */}
      <Link to={`/exhibition/${id}`} style={{ flexShrink: 0 }}>
        <button
          data-cy="exb-card-view-details-btn"
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
            padding: "8px 16px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          view
        </button>
      </Link>
    </li>
  );
};

export default ExbListItem;
