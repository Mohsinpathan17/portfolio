import { useEffect } from "react";
import EngineeringEvidence from "../components/evidence/EngineeringEvidence";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  GitBranch,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import { ExternalLink, SectionLabel } from "../components/ui";
import { nexyral } from "../lib/content";
const decisions = [
  {
    icon: Layers3,
    title: "Separate the interface from the engine.",
    copy: "React components define the experience. A serverless Worker handles authenticated requests, model calls and storage. Provider secrets stay on the server.",
  },
  {
    icon: GitBranch,
    title: "Make changes recoverable.",
    copy: "AI revisions use the existing frontend as context. Source snapshots and stale-write protection help users revise without silently overwriting a newer app.",
  },
  {
    icon: ShieldCheck,
    title: "Treat generated code as untrusted.",
    copy: "Previewed code runs in a restricted browser frame. Model output and requests have size limits; ownership checks protect private project records.",
  },
  {
    icon: Code2,
    title: "Make the evidence inspectable.",
    copy: "The public workspace can be used without an account. Source exports, implementation reports, type checks and browser checks make the work easier to review.",
  },
];
export default function NexyralCase() {
  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target)
      target.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }, []);
  return (
    <article className="case-page">
      <section id="overview" className="case-hero container">
        <Link to="/#work" className="back-link">
          <ArrowLeft size={17} />
          Back to selected work
        </Link>
        <div className="case-title-row">
          <div>
            <span className="eyebrow">CASE STUDY / INDEPENDENT PRODUCT</span>
            <h1>
              NEXYRAL<span>From Intent to Execution.</span>
            </h1>
          </div>
          <div className="case-actions">
            <ExternalLink href={nexyral.live} className="button dark">
              Visit the live product
            </ExternalLink>
            <ExternalLink href={nexyral.repo}>Explore the source</ExternalLink>
          </div>
        </div>
        <p className="case-intro">
          What if someone could describe an app, try the result, and keep
          improving it — without losing the work they already liked?
        </p>
        <div className="case-facts">
          <div>
            <span>FOCUS</span>
            <strong>Product experience & engineering</strong>
          </div>
          <div>
            <span>PLATFORM</span>
            <strong>React · Cloudflare Worker · D1</strong>
          </div>
          <div>
            <span>STATUS</span>
            <strong>Live, with ongoing development</strong>
          </div>
        </div>
        <nav className="case-contents" aria-label="Case study contents">
          <a href="#overview">Overview</a>
          <a href="#workshop">Try the recovery pattern</a>
          <a href="#tradeoffs">The tradeoff</a>
          <a href="#implementation">Source evidence</a>
        </nav>
        <a
          href={nexyral.live}
          target="_blank"
          rel="noopener noreferrer"
          className="case-screen"
        >
          <img
            src="/images/nexyral.png"
            alt="The live NEXYRAL homepage and its interactive 3D Core"
            width="1440"
            height="1000"
          />
        </a>
      </section>
      <section className="case-story container">
        <SectionLabel number="01">THE IDEA</SectionLabel>
        <div>
          <h2>
            Turn a prompt into
            <br />a useful starting point.
          </h2>
          <p>
            Code generation is only one part of the experience. The real product
            question is what happens next: can someone try the app, change it,
            recover from a mistake, and keep the source?
          </p>
          <p>
            NEXYRAL brings that flow into one workspace. The website explains
            the idea in plain language, lets visitors try working examples, and
            gives signed-in users a way to generate and refine frontend
            projects.
          </p>
        </div>
      </section>
      <section className="case-flow-section">
        <div className="container">
          <SectionLabel number="02">THE EXPERIENCE</SectionLabel>
          <h2>One idea. A complete flow.</h2>
          <div className="case-flow">
            {[
              ["Describe", "Start with a clear request."],
              ["Generate", "Receive a React frontend."],
              ["Try", "Explore the app in a preview."],
              ["Refine", "Ask for changes or edit the code."],
              ["Keep", "Restore versions and export source."],
            ].map(([title, copy], i) => (
              <div key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                {i < 4 && <ArrowRight size={17} />}
              </div>
            ))}
          </div>
        </div>
      </section>
      <EngineeringEvidence />
      <section className="case-decisions container">
        <SectionLabel number="06">ARCHITECTURE BOUNDARIES</SectionLabel>
        <h2>
          A clear interface.
          <br />
          <span>Explicit boundaries.</span>
        </h2>
        <div className="decision-grid">
          {decisions.map(({ icon: Icon, title, copy }) => (
            <article key={title}>
              <Icon size={27} strokeWidth={1.5} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="case-evidence container">
        <div>
          <SectionLabel number="07">TRY IT. INSPECT IT.</SectionLabel>
          <h2>
            Less guessing.
            <br />
            <span>More evidence.</span>
          </h2>
          <p>
            Open the product, try the public workspace, or review the
            implementation report and source. The repository includes the checks
            and limitations behind the release.
          </p>
          <div className="case-evidence-links">
            <ExternalLink
              href={nexyral.live + "/playground"}
              className="button dark"
            >
              Try the open workspace
            </ExternalLink>
            <ExternalLink href={nexyral.report}>
              Read the implementation report
            </ExternalLink>
          </div>
        </div>
        <div className="case-delivered">
          <span className="eyebrow">WHAT’S IN THE PRODUCT</span>
          {[
            "Responsive website and interactive 3D identity",
            "Accounts and branded verification codes",
            "Frontend generation, preview and code editing",
            "AI revisions and source-version recovery",
            "Project export and in-product guidance",
          ].map((item) => (
            <p key={item}>
              <Check size={16} />
              {item}
            </p>
          ))}
          <details>
            <summary>Current scope & what comes next</summary>
            <p>
              The current generation flow produces frontend projects. Connected
              generated backends, automated project verification and production
              deployment are the next engineering stages. Website demonstrations
              and the 3D identity communicate the concept; they do not represent
              a live engineering run.
            </p>
          </details>
        </div>
      </section>
      <div className="case-next container">
        <Link to="/#work">
          Explore the other work
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}
