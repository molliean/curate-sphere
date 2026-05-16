// React and hooks
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
// Services and Context
import { createExb, editExb } from "../../services/exbService";
import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";
// Components
import PromptSignIn from "../CommonComponents/Modals/PromptSignIn";

// Initial form data state
const initialFormData = {
  title: "",
  location: "",
  description: "",
  startDate: "",
  endDate: "",
  userId: null,
};

// ─── Style constants ───────────────────────────────────────────────────────────

const LABEL_STYLE = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-text-secondary)",
};

const INPUT_STYLE = {
  width: "100%",
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "160%",
  color: "var(--color-text-primary)",
  backgroundColor: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  padding: "12px",
  outline: "none",
  boxSizing: "border-box",
};

const BTN_PRIMARY = {
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
};

const BTN_DESTRUCTIVE = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  backgroundColor: "var(--color-error)",
  color: "var(--color-neutral-0)",
  border: "none",
  borderRadius: "var(--radius-md)",
  padding: "8px 16px",
  cursor: "pointer",
};

// Exhibition Form Component
const ExbForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { handleGetExbDetail, showExb, handleGetUserExbs, handleDeleteExb } =
    useExbContext();
  const { user, formatDateForEdit } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();

  ///////////////////////////
  // Form Actions
  ///////////////////////////

  // Handle input changes
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await editExb(formData, id);
      } else {
        await createExb(formData);
      }
      handleGetUserExbs();
      navigate(id ? -1 : "/");
    } catch (err) {
      console.error(err);
    }
  };

  ///////////////////////////
  // Fetch Exhibition Details on Load
  ///////////////////////////

  useEffect(() => {
    if (id) {
      // Fetch existing exhibition details for editing
      const fetchExbDetails = async () => {
        try {
          await handleGetExbDetail(id);
        } catch (err) {
          console.error(err, " <-- unable to fetch exhibition details");
        }
      };
      fetchExbDetails();
    } else {
      // Initialize form for creating a new exhibition
      setFormData({ ...initialFormData, userId: user?.user.id });
    }
  }, [id]);

  // Update form data when exhibition details are fetched
  useEffect(() => {
    if (id && showExb) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...showExb,
      }));
    }
  }, [showExb, id]);

  // Redirect to sign-in if the user is not logged in
  if (!user) {
    return (
      <div style={{ marginTop: "64px", minHeight: "calc(100vh - 64px)" }}>
        <PromptSignIn text={"view your exhibitions"} />
      </div>
    );
  }

  const isEditMode = Boolean(id);

  return (
    /* Overlay */
    <div
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
            data-cy="manage-exb-form-title"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "130%",
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            {isEditMode ? "Edit exhibition" : "Create exhibition"}
          </h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: 1,
              color: "var(--color-text-secondary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0",
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* ── BODY ── */}
        <form
          data-cy="exb-form"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              padding: "24px",
            }}
          >
            {/* Exhibition Title */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={LABEL_STYLE} htmlFor="title">
                Exhibition Title
              </label>
              <input
                value={formData.title}
                onChange={handleChange}
                style={INPUT_STYLE}
                type="text"
                id="title"
                name="title"
                required
                placeholder="Enter exhibition title"
              />
            </div>

            {/* Date row — start + end side by side */}
            <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  flex: 1,
                }}
              >
                <label style={LABEL_STYLE} htmlFor="startDate">
                  Start Date
                </label>
                <input
                  value={formatDateForEdit(formData.startDate)}
                  onChange={handleChange}
                  style={INPUT_STYLE}
                  type="date"
                  id="startDate"
                  name="startDate"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  flex: 1,
                }}
              >
                <label style={LABEL_STYLE} htmlFor="endDate">
                  End Date
                </label>
                <input
                  value={formatDateForEdit(formData.endDate)}
                  onChange={handleChange}
                  style={INPUT_STYLE}
                  type="date"
                  id="endDate"
                  name="endDate"
                />
              </div>
            </div>

            {/* Location */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={LABEL_STYLE} htmlFor="location">
                Location
              </label>
              <input
                value={formData.location}
                onChange={handleChange}
                style={INPUT_STYLE}
                type="text"
                id="location"
                name="location"
                placeholder="City, venue, or address"
              />
            </div>

            {/* Description */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={LABEL_STYLE} htmlFor="description">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={handleChange}
                style={{ ...INPUT_STYLE, height: "96px", resize: "vertical" }}
                id="description"
                name="description"
                placeholder="Describe your exhibition"
              />
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: isEditMode ? "space-between" : "flex-end",
              gap: "12px",
              padding: "16px 24px",
              borderTop: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            {/* Edit mode: delete button on the left */}
            {isEditMode && (
              <button
                type="button"
                onClick={async () => {
                  await handleDeleteExb(id);
                  handleGetUserExbs();
                  navigate("/");
                }}
                style={BTN_DESTRUCTIVE}
              >
                Delete exhibition
              </button>
            )}

            {/* Cancel + Submit on the right */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={BTN_GHOST}
              >
                Cancel
              </button>
              <button type="submit" style={BTN_PRIMARY}>
                {isEditMode ? "Save changes" : "Create Exhibition"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExbForm;
