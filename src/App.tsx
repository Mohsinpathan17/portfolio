import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Contact from "./components/Contact";
import Home from "./pages/Home";
import NexyralCase from "./pages/NexyralCase";
function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    document.title =
      location.pathname === "/work/nexyral"
        ? "NEXYRAL — A case study by Mohsin Pathan"
        : "Mohsin Pathan — Software, AI & thoughtful engineering";
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonical)
      canonical.href = "https://mohsinpathan.vercel.app" + location.pathname;
    const aliases: Record<string, string> = {
      summary: "about",
      skills: "about",
      projects: "work",
    };
    const hash = location.hash.slice(1);
    const target = hash ? document.getElementById(aliases[hash] ?? hash) : null;
    if (target)
      target.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.hash, location.key]);
  return null;
}
function NotFound() {
  return (
    <section className="not-found container">
      <span className="eyebrow">404 / A SMALL DETOUR</span>
      <h1>This page isn’t here.</h1>
      <p>The work is still right where you left it.</p>
      <Link to="/" className="button dark">
        Back to the portfolio →
      </Link>
    </section>
  );
}
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/nexyral" element={<NexyralCase />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Contact />
    </>
  );
}
