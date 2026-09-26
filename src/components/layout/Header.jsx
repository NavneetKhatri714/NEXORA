import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "About", href: "#about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    setMenuOpen(false);
    if (window.location.pathname !== "/") {
      e.preventDefault();
      navigate("/" + href);
    }
  };

  return (
    <header className={`nx-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nx-header__inner">
        <Link to="/" className="nx-logo" onClick={() => setMenuOpen(false)}>
          <span className="nx-logo__mark">N</span>
          <span className="nx-logo__text">NEXORA</span>
        </Link>

        <nav className={`nx-nav ${menuOpen ? "is-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
              {link.label}
            </a>
          ))}
          <div className="nx-nav__mobile-cta">
            <Link to="/auth" className="btn btn-primary btn-sm">
              Get Started →
            </Link>
          </div>
        </nav>

        <div className="nx-header__right">
          <Link to="/auth" className="btn btn-primary btn-sm nx-header__cta">
            Get Started →
          </Link>
          <button
            className={`nx-burger ${menuOpen ? "is-open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
