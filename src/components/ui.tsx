import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
export function ExternalLink({
  href,
  children,
  className = "text-link",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number}</span>
      {children}
    </div>
  );
}
