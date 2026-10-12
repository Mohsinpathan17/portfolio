import { useEffect, useRef } from "react";
import { Download, X } from "lucide-react";
import { profile, nexyral } from "../lib/content";
import { ExternalLink } from "./ui";
export default function ProfileDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    node?.showModal();
    return () => node?.close();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="profile-dialog"
      aria-labelledby="profile-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) {
          const r = dialog.current.getBoundingClientRect();
          if (
            event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="dialog-close"
        onClick={onClose}
        aria-label="Close profile snapshot"
        autoFocus
      >
        <X size={20} />
      </button>
      <span className="eyebrow">THE SHORT VERSION</span>
      <h2 id="profile-title">Mohsin Pathan.</h2>
      <p>
        Computer engineer in Pune, working across web products and applied
        machine learning.
      </p>
      <dl>
        <div>
          <dt>Education</dt>
          <dd>B.E. Computer Science, SPPU · 2026</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>React / TypeScript · Python / Flask · applied ML</dd>
        </div>
        <div>
          <dt>Flagship work</dt>
          <dd>NEXYRAL — a live AI frontend-building workspace</dd>
        </div>
        <div>
          <dt>Research</dt>
          <dd>Kharif crop pest prediction · ICRTSET-2026</dd>
        </div>
        <div>
          <dt>Looking for</dt>
          <dd>Engineering roles, freelance work and collaboration</dd>
        </div>
      </dl>
      <div className="dialog-links">
        <ExternalLink href={nexyral.live}>Try NEXYRAL</ExternalLink>
        <ExternalLink href={profile.github}>GitHub</ExternalLink>
      </div>
      <a href={profile.resume} className="button dark" download>
        <Download size={17} />
        Download résumé
      </a>
      <a href={`mailto:${profile.email}`} className="profile-email">
        {profile.email}
      </a>
    </dialog>
  );
}
