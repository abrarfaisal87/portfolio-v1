import { useEffect, useRef, useState } from "react";
import { RiArrowRightUpLine, RiCloseLine, RiMenu3Line, RiPauseMiniFill, RiPlayMiniFill } from "@remixicon/react";
import PropTypes from "prop-types";

const links = [
  { label: "Career", href: "#career" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
];
export default function Navbar({ motionEnabled, onToggleMotion, reducedMotion }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef(null);
  const menuLinks = useRef(null);

  useEffect(() => {
    if (open) menuLinks.current?.querySelector("a")?.focus();
    const closeOnEscape = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      });
    }, { rootMargin: "-15% 0px -65% 0px" });
    document.querySelectorAll("main > section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <nav className="navigation page-width" aria-label="Main navigation">
        <a className="wordmark" href="#home" onClick={() => setOpen(false)} aria-label="Abrar Faisal, home">
          Abrar Faisal<span>.</span>
        </a>
        <div ref={menuLinks} className={`nav-links ${open ? "is-open" : ""}`} id="navigation-links">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}
              className={active === link.href ? "is-active" : ""}
              aria-current={active === link.href ? "location" : undefined}>
              {link.label}<span className="nav-dot" />
            </a>
          ))}
          <a className="mobile-contact" href="#contact" onClick={() => setOpen(false)}>Let’s talk <RiArrowRightUpLine size={18} /></a>
        </div>
        <div className="nav-actions">
          <button className="motion-control" onClick={onToggleMotion} aria-pressed={motionEnabled}
            disabled={reducedMotion} title={reducedMotion ? "Reduced motion follows your system preference" : "Toggle animations"}
            aria-label={motionEnabled ? "Pause animations" : "Enable animations"}>
            {motionEnabled ? <RiPauseMiniFill size={18} /> : <RiPlayMiniFill size={18} />}
            <span>Motion {motionEnabled ? "on" : "off"}</span>
          </button>
          <a className="nav-contact" href="#contact">Let’s talk <RiArrowRightUpLine size={18} /></a>
          <button ref={menuButton} className="menu-toggle" onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="navigation-links">
            {open ? <RiCloseLine size={25} /> : <RiMenu3Line size={25} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
Navbar.propTypes = {
  motionEnabled: PropTypes.bool.isRequired,
  onToggleMotion: PropTypes.func.isRequired,
  reducedMotion: PropTypes.bool.isRequired,
};
