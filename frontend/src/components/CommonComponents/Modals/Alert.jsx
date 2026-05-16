import { useEffect } from "react";

const Alert = ({ message, success, setMessage, onClose }) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 1000);
  }, []);

  return (
    <div
      className="fade-in-out"
      style={{
        position: "absolute",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "16px",
        padding: "12px 16px",
        width: "320px",
        backgroundColor: success ? "var(--color-accent-subtle)" : "#FEF3F2",
        border: `1px solid ${success ? "var(--color-accent)" : "var(--color-error)"}`,
        borderRadius: "var(--radius-md)",
        zIndex: 200,
      }}
    >
      {/* Dot indicator */}
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: success ? "var(--color-accent)" : "var(--color-error)",
          flexShrink: 0,
        }}
      />

      {/* Message */}
      <span
        data-cy="alert"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "160%",
          color: "var(--color-text-primary)",
          flex: 1,
        }}
      >
        {message}
      </span>

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          lineHeight: 1,
          color: "var(--color-text-secondary)",
          flexShrink: 0,
        }}
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
};

export default Alert;
