// React imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Service and context imports
import { register } from "../../services/authService";
import useGlobalContext from "../../context/global/useGlobalContext";

// Initial state for the form data
const initialFormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const FIELD_LABEL = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-text-secondary)",
  display: "block",
  marginBottom: "6px",
};

const FIELD_INPUT = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "160%",
  color: "var(--color-text-primary)",
  backgroundColor: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  padding: "12px",
  width: "100%",
  display: "block",
  outline: "none",
  boxSizing: "border-box",
};

///////////////////////////
// RegisterForm Component
///////////////////////////
const RegisterForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");

  const { setUser } = useGlobalContext();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        return alert("Passwords must match.");
      }

      const user = await register(formData);
      setUser(user);
      navigate("/"); // Navigate to the home page after registration
    } catch (err) {
      console.error("Registration error:", err);
      setMessage(err.message);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        marginTop: "64px",
        backgroundColor: "var(--color-surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "32px",
        paddingBottom: "48px",
        paddingLeft: "16px",
        paddingRight: "16px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          backgroundColor: "var(--color-background)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        {/* Card header */}
        <div
          style={{
            padding: "32px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "32px",
              lineHeight: "120%",
              color: "var(--color-text-primary)",
              margin: 0,
              textAlign: "center",
            }}
          >
            Create account
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "160%",
              color: "var(--color-text-secondary)",
              margin: 0,
              textAlign: "center",
            }}
          >
            Join the CurateSphere community and start building your first exhibition.
          </p>
        </div>

        {/* Form body */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "32px 40px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {message && (
            <span
              data-cy="error-message"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "var(--color-error)",
                textAlign: "center",
              }}
            >
              {message}
            </span>
          )}

          {/* Username field */}
          <div>
            <label htmlFor="username" style={FIELD_LABEL}>
              username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              style={FIELD_INPUT}
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={3}
            />
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email" style={FIELD_LABEL}>
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              style={FIELD_INPUT}
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address (e.g., user@example.com)."
            />
          </div>

          {/* Password field */}
          <div>
            <label htmlFor="password" style={FIELD_LABEL}>
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              style={FIELD_INPUT}
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm password field */}
          <div>
            <label htmlFor="confirmPassword" style={FIELD_LABEL}>
              confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              style={FIELD_INPUT}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
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
              width: "100%",
              cursor: "pointer",
            }}
          >
            create account
          </button>
        </form>

        {/* Card footer */}
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            borderTop: "1px solid var(--color-border)",
            borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
            padding: "20px 40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
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
            Already have an account?
          </span>
          <Link
            to="/login"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "160%",
              color: "var(--color-text-primary)",
              textDecoration: "underline",
            }}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
