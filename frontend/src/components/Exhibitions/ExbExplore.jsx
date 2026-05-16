// React and hooks
import { useEffect, useState } from "react";
// Context hooks
import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";
// Services
import { getAllExhibitions } from "../../services/exbService";
// Components
import { ExbListItem } from "./ExbListItem";
import Loader from "../CommonComponents/Loaders/Loader";

const LABEL = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

const CONTROL_INPUT = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "160%",
  color: "var(--color-text-primary)",
  backgroundColor: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  padding: "8px 12px",
  outline: "none",
};

const ExbExplore = () => {
  // state
  const [query, setQuery] = useState("");
  const [sortInput, setSortInput] = useState("");
  const [displayedExbs, setDisplayedExbs] = useState([]);

  // context
  const { formatDate, user, scrollToTop } = useGlobalContext();
  const { handleGetAllExbs, handleSortExbs, exploreExbs, dispatch, isLoading } =
    useExbContext();

  ///////////////////////////
  // Sort Exbs
  ///////////////////////////
  const handleSortExhibitions = (e) => {
    const { value } = e.target;
    setSortInput(value);
    handleSortExbs(value, exploreExbs);
    setDisplayedExbs(exploreExbs);
  };

  ///////////////////////////
  // Search Exbs
  ///////////////////////////
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value.length > 3) {
      let searchResults = exploreExbs.filter((exb) => {
        let title = exb.title.toLowerCase();
        let query = value.toLowerCase();
        return title.includes(query);
      });
      setDisplayedExbs(searchResults);
    }
    if (value.length === 0) {
      setDisplayedExbs(exploreExbs);
    }
  };

  ///////////////////////////
  // Fetch All Exbs
  ///////////////////////////
  useEffect(() => {
    const fetchAllExbs = async () => {
      dispatch({ type: "startLoading/exb" });

      try {
        const data = await getAllExhibitions(user?.user.id);
        setDisplayedExbs(data);
      } catch (err) {
        console.error(err);
        console.log("Unable to fetch all exbs | ExbExplore");
      } finally {
        dispatch({ type: "stopLoading/exb" });
      }
    };
    fetchAllExbs();
  }, []);

  ///////////////////////////
  // Initial Fetch For All Exbs
  ///////////////////////////
  useEffect(() => {
    handleGetAllExbs();
    scrollToTop();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div style={{ marginTop: "64px", backgroundColor: "var(--color-background)" }}>

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          padding: "80px 96px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "48px",
            lineHeight: "110%",
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
            margin: 0,
            textAlign: "center",
          }}
        >
          Explore Exhibitions
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "160%",
            color: "var(--color-text-secondary)",
            margin: 0,
            textAlign: "center",
          }}
        >
          Browse curated exhibitions from the CurateSphere community.
        </p>
        <span style={{ ...LABEL, color: "var(--color-text-secondary)" }}>
          {displayedExbs.length}{" "}
          {displayedExbs.length === 1 ? "exhibition" : "exhibitions"}
        </span>
      </div>

      {/* ── CONTROLS BAR ────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-background)",
          borderBottom: "1px solid var(--color-border)",
          padding: "16px 96px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        {/* Sort selector — left */}
        <select
          data-cy="exb-explore-sort-select"
          value={sortInput}
          onChange={handleSortExhibitions}
          name="exb-sort"
          id="exb-sort"
          style={{
            ...CONTROL_INPUT,
            ...LABEL,
            color: "var(--color-text-secondary)",
            cursor: "pointer",
          }}
        >
          <option disabled value="">
            Sort
          </option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="a-z">A → Z</option>
          <option value="z-a">Z → A</option>
        </select>

        {/* Result count — center */}
        <span style={{ ...LABEL, color: "var(--color-text-secondary)" }}>
          {displayedExbs.length} results
        </span>

        {/* Search input — right */}
        <input
          data-cy="exb-explore-search-exb-input"
          type="text"
          onChange={handleSearchInputChange}
          value={query}
          placeholder="Search exhibitions..."
          style={{ ...CONTROL_INPUT, width: "260px" }}
        />
      </div>

      {/* ── EXHIBITION LIST ──────────────────────────────────────────────── */}
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {displayedExbs?.map((exb) => (
          <ExbListItem
            key={exb.id}
            id={exb.id}
            title={exb.title}
            date={`${formatDate(exb.startDate)} - ${formatDate(exb.endDate)}`}
            location={exb.location}
            artworkCount={exb.artworkCount}
            username={exb.User?.username}
          />
        ))}
      </ul>

    </div>
  );
};

export default ExbExplore;
