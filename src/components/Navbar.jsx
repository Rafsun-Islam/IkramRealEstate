import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { siteData } from "../data/siteData";
import logo from "../assets/images/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((current) => !current);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" onClick={closeMenu}>
          <img src={logo} alt={`${siteData.name} logo`} />
          <span>{siteData.name}</span>
        </Link>

        <button
          type="button"
          className="site-header__toggle"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav
          id="primary-navigation"
          className={`site-header__nav ${isOpen ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          <ul>
            {siteData.navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "site-header__link is-active"
                      : "site-header__link"
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link to="/contact" className="site-header__cta" onClick={closeMenu}>
            Schedule Visit
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;