import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "../lib/content";
const links = [
  ["Work", "work"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Contact", "contact"],
];
export default function Header() {
  const [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => {
    function onScroll() {
      setScrolled(scrollY > 16);
    }
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    function key(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [open]);
  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-row">
        <Link to="/" className="wordmark" aria-label="Mohsin Pathan home">
          mp<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([name, id]) => (
            <Link
              key={id}
              to={`/#${id}`}
              aria-current={location.hash === `#${id}` ? "location" : undefined}
            >
              {name}
            </Link>
          ))}
        </nav>
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener"
          className="nav-resume"
        >
          Résumé
          <ArrowUpRight size={16} />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav container"
          aria-label="Mobile navigation"
        >
          {links.map(([name, id]) => (
            <Link key={id} to={`/#${id}`} onClick={() => setOpen(false)}>
              {name}
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
