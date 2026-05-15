// React and React Router imports
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Service and utility imports
import { getArtworkDetail } from "../../../services/artworkService";
import { updateUserImgsByArtworkUrl } from "../../../services/profileService";
import { getUser } from "../../../services/authService";
import {
  getItemIndexedDB,
  setItemIndexedDB,
} from "../../../utils/indexedDB.config";
// Context hooks
import useExbContext from "../../../context/exb/useExbContext";
import useArtworkContext from "../../../context/artwork/useArtworkContext";
import useGlobalContext from "../../../context/global/useGlobalContext";
// Component imports
import Modal from "../../CommonComponents/Modals/Modal";
import Loader from "../../CommonComponents/Loaders/Loader";
import LoaderRipple from "../../CommonComponents/Loaders/LoaderRipple";
import { ArtDetailActionBtn } from "./ArtDetailActionBtn";
import { ArtInfoSection } from "./ArtInfoSection";
import FixedAlert from "../../CommonComponents/Modals/FixedAlert";
// FontAwesome icons
import {
  faAsterisk,
  faLink,
  faMountain,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// ─── Style constants ───────────────────────────────────────────────────────────

const CAPTION = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "11px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

const SECTION_HEADER = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "11px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-text-secondary)",
  marginBottom: "24px",
  display: "block",
};

const FIELD_LABEL = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "11px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-text-secondary)",
};

const FIELD_VALUE = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "160%",
  color: "var(--color-text-primary)",
};

const BTN_GHOST = {
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
  textDecoration: "none",
  display: "inline-block",
};

// Reusable field pair used in metadata sections
const Field = ({ label, value }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <span style={FIELD_LABEL}>{label}</span>
    <span style={FIELD_VALUE}>{value}</span>
  </div>
);

// Section wrapper with top border
const Section = ({ title, children, style = {} }) => (
  <div
    style={{
      borderTop: "1px solid var(--color-border)",
      paddingTop: "40px",
      marginBottom: "40px",
      ...style,
    }}
  >
    <span style={SECTION_HEADER}>{title}</span>
    {children}
  </div>
);

const initialCopyState = {
  showCopiedUrlModal: false,
  copyUrlMessage: "",
  copyError: false,
};

const ArtDetail = () => {
  // Local state declarations
  const [artListInfo, setArtListInfo] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [copyState, setCopyState] = useState(initialCopyState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Context hooks
  const { isLoading, dispatch, showArtwork, fetchArtworkListInfo } =
    useArtworkContext();
  const { user, setUser, scrollToTop } = useGlobalContext();
  const { myExbs } = useExbContext();
  const { id } = useParams();
  const navigate = useNavigate();

  // Destructuring artwork details for easier access
  const { primaryimageurl, title, classification } = showArtwork;

  ///////////////////////////
  // Modal Actions
  ///////////////////////////
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  ///////////////////////////
  // Handle Update Profile Img
  ///////////////////////////
  const handleUpdateUserImgByArtworkUrl = async (imgUrl, imgType) => {
    try {
      const data = await updateUserImgsByArtworkUrl(
        imgUrl,
        imgType,
        user.user.id
      );
      if (data.message) setMessage(data.message);
      if (data.error) setError(data.error);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(getUser());
      }
    } catch (err) {
      console.error("Could not communicate with backend to update user image");
    }
  };

  ///////////////////////////
  // Fetch Artwork Details by Id
  ///////////////////////////
  const fetchArtworkDetails = async () => {
    try {
      const cachedArtwork = await getItemIndexedDB(id, "artworks");
      if (cachedArtwork) {
        dispatch({ type: "getArtworkDetail/artworks", payload: cachedArtwork });
        return;
      }

      dispatch({ type: "startLoading/artworks" });
      setIsLoadingImg(true);

      const data = await getArtworkDetail(id);
      dispatch({ type: "getArtworkDetail/artworks", payload: data });
      await setItemIndexedDB(id, data, "artworks");
    } catch (err) {
      console.error(
        "Unable to communicate with DB to get artwork detail | ArtDetail.jsx"
      );
    } finally {
      dispatch({ type: "stopLoading/artworks" });
      setIsLoadingImg(false);
    }
  };

  ///////////////////////////
  // Copy URL Handler
  ///////////////////////////
  const handleCopyUrl = () => {
    setCopyState((prevState) => ({
      ...prevState,
      showCopiedUrlModal: true,
    }));

    try {
      navigator.clipboard.writeText(window.location.href);
      setCopyState((prevState) => ({
        ...prevState,
        copyUrlMessage: "Copied link!",
        copyError: false,
      }));
    } catch (err) {
      console.error("Unable to copy the current URL to clipboard");
      setCopyState((prevState) => ({
        ...prevState,
        copyUrlMessage: "Unable to copy the current URL to clipboard",
        copyError: true,
      }));
    }
  };

  // Fetch artwork details on component mount or when ID changes
  useEffect(() => {
    fetchArtworkDetails();
    scrollToTop();
  }, [id]);

  // Update artwork info when showArtwork changes
  useEffect(() => {
    const updateArtworkInfo = async () => {
      if (showArtwork) {
        const data = fetchArtworkListInfo();
        setArtListInfo(data);
      }
    };
    updateArtworkInfo();
  }, [showArtwork]);

  if (isLoading) return <Loader />;

  const artist = showArtwork.people?.[0]?.name;

  // Left column: identification fields
  const identificationFields = [
    { label: "Object ID", value: showArtwork.id },
    { label: "People", value: artist },
    { label: "Classification", value: showArtwork.classification },
    { label: "Work Type", value: showArtwork.worktype },
    { label: "Date", value: showArtwork.dated },
    { label: "Culture", value: showArtwork.culture },
  ].filter((f) => f.value);

  // Right column: physical description fields
  const physicalFields = [
    { label: "Medium", value: showArtwork.medium },
    { label: "Dimensions", value: showArtwork.dimensions },
  ].filter((f) => f.value);

  // Right column: acquisition fields
  const acquisitionFields = [
    { label: "Credit Line", value: showArtwork.creditline },
    { label: "Copyright", value: showArtwork.copyright },
    { label: "Accession Year", value: showArtwork.accessionyear },
    { label: "Division", value: showArtwork.division },
    { label: "Contact", value: showArtwork.contact },
  ].filter((f) => f.value);

  return (
    <div style={{ marginTop: "64px" }}>

      {/* ── BREADCRUMB ROW ──────────────────────────────────────────────────── */}
      <div
        data-cy="artwork-detail-header"
        style={{
          backgroundColor: "var(--color-background)",
          padding: "20px 96px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          data-cy="art-detail-back-btn"
          onClick={() => navigate(-1)}
          style={{
            ...CAPTION,
            color: "var(--color-text-secondary)",
            cursor: "pointer",
          }}
        >
          ← Back to results
        </span>
        <span style={{ ...CAPTION, color: "var(--color-text-secondary)" }}>
          Object {id}
        </span>
      </div>

      {/* ── IMAGE ZONE ──────────────────────────────────────────────────────── */}
      <div
        data-cy="art-detail-img-section"
        style={{
          backgroundColor: "var(--color-background)",
          borderBottom: "1px solid var(--color-border)",
          padding: "64px 96px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {/* Artwork image — top of zone */}
        {isLoadingImg ? (
          <div
            style={{
              width: "100%",
              maxWidth: "800px",
              display: "flex",
              justifyContent: "center",
              padding: "64px 0",
            }}
          >
            <LoaderRipple />
          </div>
        ) : (
          <img
            src={
              primaryimageurl
                ? primaryimageurl
                : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
            }
            alt={title}
            style={{
              maxWidth: "800px",
              width: "100%",
              height: "auto",
              display: "block",
              outline: "1px solid var(--color-border)",
            }}
          />
        )}

        {/* Artist + Title group — 8px gap between them */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {artist && (
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "140%",
                color: "var(--color-text-primary)",
                textAlign: "center",
              }}
            >
              {artist}
            </span>
          )}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "32px",
              lineHeight: "120%",
              letterSpacing: "-0.01em",
              color: "var(--color-text-primary)",
              margin: 0,
              textAlign: "center",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Action buttons */}
        <div
          data-cy="art-detail-action-btns-ul"
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={showModal}
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
            }}
          >
            + Add to Exhibition
          </button>
          <button onClick={handleCopyUrl} style={BTN_GHOST}>
            ⎘ Copy link
          </button>
          {showArtwork.url && (
            <a
              href={showArtwork.url}
              target="_blank"
              rel="noopener noreferrer"
              style={BTN_GHOST}
            >
              View Original Record ↗
            </a>
          )}
        </div>
      </div>

      {/* ── METADATA CONTENT ────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-background)",
          padding: "0 96px 96px",
        }}
      >
        {/* Two-column section grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 80px",
          }}
        >
          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Identification & Creation */}
            {identificationFields.length > 0 && (
              <Section title="Identification &amp; Creation">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px 40px",
                  }}
                >
                  {identificationFields.map(({ label, value }) => (
                    <Field key={label} label={label} value={value} />
                  ))}
                </div>
              </Section>
            )}

            {/* Provenance */}
            {showArtwork.provenance && (
              <Section title="Provenance">
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "160%",
                    color: "var(--color-text-secondary)",
                    margin: 0,
                  }}
                >
                  {showArtwork.provenance}
                </p>
              </Section>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div>
            {/* Physical Description */}
            {physicalFields.length > 0 && (
              <Section title="Physical Description">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px 40px",
                  }}
                >
                  {physicalFields.map(({ label, value }) => (
                    <Field key={label} label={label} value={value} />
                  ))}
                </div>
              </Section>
            )}

            {/* Acquisition & Rights */}
            {acquisitionFields.length > 0 && (
              <Section title="Acquisition &amp; Rights">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px 40px",
                  }}
                >
                  {acquisitionFields.map(({ label, value }) => (
                    <Field key={label} label={label} value={value} />
                  ))}
                </div>
              </Section>
            )}
          </div>
        </div>

        {/* View full record — full width below columns */}
        {showArtwork.url && (
          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              paddingTop: "40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "32px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "160%",
                color: "var(--color-text-secondary)",
              }}
            >
              View the complete record for this object on the Harvard Art Museums website.
            </span>
            <a
              href={showArtwork.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...BTN_GHOST, flexShrink: 0 }}
            >
              View at Harvard ↗
            </a>
          </div>
        )}
      </div>

      {/* ── MODALS ──────────────────────────────────────────────────────────── */}
      {isModalVisible && (
        <Modal
          ArtworkObjectid={showArtwork.objectid}
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
      )}

      {copyState.showCopiedUrlModal && (
        <FixedAlert
          onClose={() =>
            setCopyState((prevState) => ({
              ...prevState,
              showCopiedUrlModal: false,
            }))
          }
          message={copyState.copyUrlMessage}
          success={!copyState.copyError}
        />
      )}
      {(message || error) && (
        <FixedAlert
          onClose={() => {
            setMessage("");
            setError("");
          }}
          message={message || error}
          success={!error}
        />
      )}
    </div>
  );
};

export default ArtDetail;
