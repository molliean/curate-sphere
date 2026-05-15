import { Link } from "react-router-dom";
import LoaderText from "../CommonComponents/Loaders/LoaderText";
import useGlobalContext from "../../context/global/useGlobalContext";

const PRIMARY_LINK_STYLE = {
  fontFamily: "var(--font-display)",
  fontSize: "32px",
  lineHeight: "120%",
  color: "var(--color-text-primary)",
  textDecoration: "none",
};

const ACCOUNT_LINK_STYLE = {
  fontFamily: "var(--font-body)",
  fontWeight: 600,
  fontSize: "20px",
  lineHeight: "130%",
  textDecoration: "none",
};

const BUTTON_LABEL_STYLE = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "140%",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  textDecoration: "none",
  display: "block",
  textAlign: "center",
  padding: "var(--space-2) var(--space-4)",
  borderRadius: "var(--radius-md)",
};

const MobileNav = ({ handleToggleMenu, isMenuOpen, setIsMenuOpen, handleResetContextState }) => {
  const { user, handleSignout, isLoading } = useGlobalContext();

  return (
    <div className="md:hidden">
      <button
        data-cy="hamburger-btn"
        onClick={handleToggleMenu}
        className="flex flex-col justify-center items-center focus:outline-none"
        style={{ gap: "6px", width: "40px", height: "40px" }}
        aria-label="Toggle menu"
      >
        <span className="block h-px" style={{ width: "24px", backgroundColor: "var(--color-text-primary)" }} />
        <span className="block h-px" style={{ width: "24px", backgroundColor: "var(--color-text-primary)" }} />
        <span className="block h-px" style={{ width: "24px", backgroundColor: "var(--color-text-primary)" }} />
      </button>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ backgroundColor: "var(--color-background)" }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between flex-shrink-0"
            style={{
              padding: "0 var(--space-6)",
              height: "64px",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "32px",
                lineHeight: "120%",
                color: "var(--color-text-primary)",
              }}
            >
              CurateSphere
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="focus:outline-none"
              aria-label="Close menu"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "32px",
                lineHeight: "120%",
                color: "var(--color-text-secondary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              ✕
            </button>
          </div>

          {/* Menu contents */}
          <div className="flex flex-col justify-between flex-1 overflow-y-auto">
            {isLoading ? (
              <div style={{ padding: "var(--space-8) var(--space-6)" }}>
                <LoaderText />
              </div>
            ) : (
              <>
                {/* Primary nav links */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-6)",
                    padding: "var(--space-8) var(--space-6) var(--space-3)",
                  }}
                >
                  {user && (
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      to={`/profiles/${user?.user?.id}`}
                      style={PRIMARY_LINK_STYLE}
                    >
                      My Collection
                    </Link>
                  )}
                  <Link
                    data-cy="mobile-nav-artwork-search"
                    onClick={() => setIsMenuOpen(false)}
                    to="/artworks/search"
                    style={PRIMARY_LINK_STYLE}
                  >
                    Artworks
                  </Link>
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    to="/exhibitions/explore"
                    style={PRIMARY_LINK_STYLE}
                  >
                    Exhibitions
                  </Link>
                </div>

                {/* Account links */}
                <div
                  style={{
                    borderTop: "1px solid var(--color-border)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-4)",
                    padding: "10px var(--space-6) var(--space-12)",
                  }}
                >
                  {user ? (
                    <>
                      <Link
                        data-cy="mobile-nav-profile-link"
                        onClick={() => setIsMenuOpen(false)}
                        to={`/profiles/${user?.user?.id}`}
                        style={{ ...ACCOUNT_LINK_STYLE, color: "var(--color-text-secondary)" }}
                      >
                        Profile
                      </Link>
                      <Link
                        data-cy="mobile-nav-settings"
                        onClick={() => setIsMenuOpen(false)}
                        to="/settings"
                        style={{ ...ACCOUNT_LINK_STYLE, color: "var(--color-text-secondary)" }}
                      >
                        Settings
                      </Link>
                      <Link
                        to="/"
                        onClick={() => {
                          handleResetContextState();
                          handleSignout();
                          setIsMenuOpen(false);
                        }}
                        style={{ ...ACCOUNT_LINK_STYLE, color: "var(--color-error)" }}
                      >
                        Logout
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        data-cy="mobile-nav-login"
                        onClick={() => setIsMenuOpen(false)}
                        to="/login"
                        style={{
                          ...BUTTON_LABEL_STYLE,
                          border: "1px solid var(--color-neutral-1000)",
                          color: "var(--color-neutral-1000)",
                        }}
                      >
                        Login
                      </Link>
                      <Link
                        data-cy="mobile-nav-register"
                        onClick={() => setIsMenuOpen(false)}
                        to="/register"
                        style={{
                          ...BUTTON_LABEL_STYLE,
                          backgroundColor: "var(--color-neutral-1000)",
                          color: "var(--color-neutral-0)",
                        }}
                      >
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
