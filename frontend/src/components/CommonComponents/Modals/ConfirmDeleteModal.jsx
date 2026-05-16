import { removeArtworkFromExb } from "../../../services/exbService";

const ConfirmDeleteModal = ({
  isVisible,
  onClose,
  id,
  objectid,
  handleReloadResource,
}) => {
  const handleRemoveArtworkFromExb = async () => {
    try {
      const data = await removeArtworkFromExb(id, objectid);
      await handleReloadResource(id);
    } catch (err) {
      console.error(err);
      console.log(`Unable to communicate with db to remove artwork from exb`);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    /* Overlay */
    <div
      data-cy="confirm-delete-modal"
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
            Are you sure?
          </h2>
          <button
            type="button"
            onClick={onClose}
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
            This action cannot be undone. This will permanently delete this
            artwork from the exhibition.
          </p>
        </div>

        {/* ── FOOTER ── */}
        <div
          data-cy="action-btns"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "12px",
            padding: "16px 24px",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          {/* Cancel */}
          <button
            type="button"
            onClick={onClose}
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
            }}
          >
            Cancel
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={handleRemoveArtworkFromExb}
            style={{
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
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
