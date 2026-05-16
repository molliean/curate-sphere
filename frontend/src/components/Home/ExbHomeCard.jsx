import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCoverImg } from "../../services/exbService";
import useGlobalContext from "../../context/global/useGlobalContext";

const CAPTION = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "11px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

const ExbHomeCard = ({ id, title, startDate, endDate, location }) => {
  const [coverImg, setCoverImg] = useState(null);
  const { formatDate } = useGlobalContext();

  useEffect(() => {
    const fetchCover = async () => {
      const data = await getCoverImg(id);
      if (data && !data.error) setCoverImg(data);
    };
    fetchCover();
  }, [id]);

  const meta = [
    location,
    startDate && formatDate(startDate),
    endDate && formatDate(endDate),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div
      style={{
        backgroundColor: "var(--color-background)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        height: "200px",
      }}
    >
      {/* Image */}
      <Link to={`/exhibition/${id}`} style={{ display: "block", flex: "0 0 240px" }}>
        {coverImg ? (
          <img
            src={coverImg}
            alt={title}
            style={{ width: "240px", height: "200px", display: "block", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "240px",
              height: "200px",
              backgroundColor: "var(--color-accent-dark)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="10" width="36" height="28" rx="3" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <circle cx="18" cy="22" r="4" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <path d="M6 34L16 24L22 30L30 20L42 34" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </Link>

      {/* Metadata */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "130%",
            color: "var(--color-text-primary)",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </h3>
        {meta && (
          <span style={{ ...CAPTION, color: "var(--color-text-secondary)" }}>
            {meta}
          </span>
        )}
        <Link
          to={`/exhibition/${id}`}
          style={{
            marginTop: "auto",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "140%",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-neutral-1000)",
            borderRadius: "var(--radius-md)",
            padding: "6px 14px",
            textDecoration: "none",
            display: "inline-block",
            alignSelf: "flex-start",
          }}
        >
          View Exhibition
        </Link>
      </div>
    </div>
  );
};

export default ExbHomeCard;
