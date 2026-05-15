import { useState } from "react";
import { Link } from "react-router-dom";
import useExbContext from "../../context/exb/useExbContext";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleResetExbState } = useExbContext();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleResetContextState = () => {
    handleResetExbState();
  };

  return (
    <nav
      className="fixed z-50 top-0 left-0 w-full h-[56px] md:h-[64px] flex items-center justify-between px-[16px] md:px-[48px] border-b"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-border)",
      }}
    >
      <Link data-cy="home-link" to="/">
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "32px",
            lineHeight: "120%",
            color: "var(--color-text-primary)",
            margin: 0,
          }}
        >
          Curate Sphere
        </h1>
      </Link>

      <MobileNav
        handleResetContextState={handleResetContextState}
        isMenuOpen={isMenuOpen}
        handleToggleMenu={toggleMenu}
        setIsMenuOpen={setIsMenuOpen}
      />
      <DesktopNav
        handleResetContextState={handleResetContextState}
        setIsMenuOpen={setIsMenuOpen}
      />
    </nav>
  );
};

export default Nav;
