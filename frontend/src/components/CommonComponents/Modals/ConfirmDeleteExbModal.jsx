const ConfirmDeleteExbModal = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) return null;

  return (
    /* Overlay */
    <div
      onClick={onClose}
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
        onClick={(e) => e.stopPropagation()}
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
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: 1,
              color: "var(--color-text-secondary)",
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* ── BODY ── */}
        <div style={{ padding: "24px" }}>
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
            exhibition and remove all associated artworks.
          </p>
        </div>

        {/* ── FOOTER ── */}
        <div
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

          <button
            type="button"
            onClick={onConfirm}
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

export default ConfirmDeleteExbModal;
