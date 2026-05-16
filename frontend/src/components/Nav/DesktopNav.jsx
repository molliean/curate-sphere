import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LoaderText from "../CommonComponents/Loaders/LoaderText";
import useGlobalContext from "../../context/global/useGlobalContext";

const NAV_LINK_STYLE = {
  fontFamily: "var(--font-body)",
  fontWeight: 600,
  fontSize: "20px",
  lineHeight: "130%",
  color: "var(--color-text-primary)",
  textDecoration: "none",
  paddingTop: "var(--space-1)",
  paddingBottom: "var(--space-1)",
};

const DROPDOWN_ITEM_STYLE = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignSelf: "stretch",
  padding: "10px 12px",
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "160%",
  textDecoration: "none",
  cursor: "pointer",
  backgroundColor: "transparent",
  border: "none",
};

const DesktopNav = ({ setIsMenuOpen, handleResetContextState }) => {
  const { user, handleSignout, isLoading } = useGlobalContext();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const { pathname } = useLocation();

  const linkStyle = (prefix) => ({
    ...NAV_LINK_STYLE,
    borderBottom: (prefix === "/" ? pathname === "/" : pathname.startsWith(prefix))
      ? "2px solid var(--color-accent)"
      : "2px solid transparent",
  });

  return (
    <div className="hidden md:flex items-center" style={{ gap: "var(--space-10)" }}>
      {isLoading ? (
        <LoaderText />
      ) : (
        <>
          <ul className="flex items-center list-none m-0 p-0" style={{ gap: "40px" }}>
            {user && (
              <li>
                <Link
                  to="/"
                  style={linkStyle("/")}
                >
                  My Collection
                </Link>
              </li>
            )}

            <li>
              <Link
                data-cy="desktop-nav-artwork-search"
                to="/artworks/search"
                style={linkStyle("/artworks")}
              >
                Artworks
              </Link>
            </li>

            <li>
              <Link
                to="/exhibitions/explore"
                style={linkStyle("/exhibitions")}
              >
                Exhibitions
              </Link>
            </li>

            {!user && (
              <>
                <li>
                  <Link
                    data-cy="desktop-nav-login"
                    onClick={() => setIsMenuOpen(false)}
                    to="/login"
                    style={linkStyle("/login")}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    data-cy="desktop-nav-register"
                    onClick={() => setIsMenuOpen(false)}
                    to="/register"
                    style={linkStyle("/register")}
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>

          {user && (
            <div className="relative">
              <button
                onClick={() => setAvatarOpen((prev) => !prev)}
                className="rounded-full flex items-center justify-center font-semibold focus:outline-none"
                style={{
                  width: "30px",
                  height: "30px",
                  fontSize: "13px",
                  backgroundColor: "var(--color-neutral-900)",
                  color: "var(--color-neutral-0)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {(user?.user?.username || user?.user?.email || "U")[0].toUpperCase()}
              </button>

              {avatarOpen && (
                <ul
                  className="absolute right-0 top-full mt-2 z-50 list-none"
                  style={{
                    width: "160px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: "var(--color-background)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    margin: 0,
                  }}
                >
                  <li style={{ alignSelf: "stretch" }}>
                    <Link
                      data-cy="desktop-nav-profile"
                      onClick={() => {
                        setAvatarOpen(false);
                        setIsMenuOpen(false);
                      }}
                      to={`/profiles/${user?.user?.id}`}
                      style={{ ...DROPDOWN_ITEM_STYLE, color: "var(--color-text-primary)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "var(--color-surface)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      Profile
                    </Link>
                  </li>
                  <li style={{ alignSelf: "stretch" }}>
                    <Link
                      data-cy="desktop-nav-settings"
                      onClick={() => {
                        setAvatarOpen(false);
                        setIsMenuOpen(false);
                      }}
                      to="/settings"
                      style={{ ...DROPDOWN_ITEM_STYLE, color: "var(--color-text-primary)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "var(--color-surface)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      Settings
                    </Link>
                  </li>
                  <li
                    aria-hidden="true"
                    style={{
                      alignSelf: "stretch",
                      height: "1px",
                      backgroundColor: "var(--color-border)",
                      flexShrink: 0,
                    }}
                  />
                  <li style={{ alignSelf: "stretch" }}>
                    <Link
                      data-cy="desktop-nav-logout"
                      to="/"
                      onClick={() => {
                        setAvatarOpen(false);
                        handleResetContextState();
                        handleSignout();
                      }}
                      style={{ ...DROPDOWN_ITEM_STYLE, color: "var(--color-error)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "var(--color-surface)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DesktopNav;
