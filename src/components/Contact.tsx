import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "../lib/content";
import { ExternalLink, SectionLabel } from "./ui";
export default function Contact() {
  const [copied, setCopied] = useState(false),
    [notice, setNotice] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setNotice("Email address copied.");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setNotice(
        "Copy is unavailable. You can select the email address or open your email app.",
      );
    }
  }
  return (
    <>
      <section id="contact" className="contact-section container">
        <SectionLabel number="05">LET’S BUILD SOMETHING</SectionLabel>
        <div className="contact-grid">
          <div>
            <h2>
              A good conversation
              <br />
              can start something
              <br />
              <span>great.</span>
            </h2>
            <p>
              Have a role, a project or an interesting problem?
              <br />
              I’d like to hear about it.
            </p>
            <a
              className="contact-email"
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Let’s build something")}`}
            >
              Email Mohsin
              <ArrowUpRight />
            </a>
          </div>
          <div className="contact-card">
            <span className="availability">
              <i />
              Open to opportunities
            </span>
            <h3>Start with a hello.</h3>
            <a className="email-address" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <button className="copy-email" onClick={() => void copy()}>
              {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
              {copied ? "Copied" : "Copy email address"}
            </button>
            <p className="copy-notice" role="status">
              {notice}
            </p>
            <div className="contact-socials">
              <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
              <ExternalLink href={profile.github}>GitHub</ExternalLink>
              <a href={profile.resume} download className="text-link">
                Résumé
                <ArrowUpRight size={17} />
              </a>
            </div>
            <span className="contact-location">
              PUNE, INDIA · IST / UTC +05:30
            </span>
          </div>
        </div>
      </section>
      <footer className="site-footer container">
        <Link to="/" className="wordmark" aria-label="Mohsin Pathan home">
          mp<span>.</span>
        </Link>
        <p>© {new Date().getFullYear()} Mohsin Pathan</p>
        <a href="/#top">Back to top ↑</a>
      </footer>
    </>
  );
}
