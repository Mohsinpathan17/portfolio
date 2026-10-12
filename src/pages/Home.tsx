import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  Asterisk,
  Braces,
  BrainCircuit,
  Download,
  FileText,
  GitBranch,
  Layers3,
} from "lucide-react";
import Assembly from "../components/scene/Assembly";
import ProfileDialog from "../components/ProfileDialog";
import { ExternalLink, SectionLabel } from "../components/ui";
import { experience, nexyral, profile } from "../lib/content";
const approaches = [
  {
    label: "Understand the problem",
    title: "A useful product starts with a clear problem.",
    copy: "I start with the person using the product: what they need to do, what can go wrong, and what a good result looks like.",
    example:
      "In NEXYRAL, an idea becomes a specific app request before generation begins.",
    icon: BrainCircuit,
  },
  {
    label: "Build the whole flow",
    title: "The happy path is only the beginning.",
    copy: "I think through the loading, empty, error and recovery states alongside the interface. Small details decide whether a product feels dependable.",
    example:
      "Failed AI revisions keep the previous NEXYRAL app intact. Saved versions give users a way back.",
    icon: Layers3,
  },
  {
    label: "Check, ship, improve",
    title: "Make the work easy to try and inspect.",
    copy: "I use source control, build checks and browser testing, then refine the product from actual behavior. I value a working example over a vague promise.",
    example:
      "NEXYRAL has a public interactive workspace, downloadable source and documented implementation checks.",
    icon: GitBranch,
  },
];
export default function Home() {
  const [snapshot, setSnapshot] = useState(false),
    [approach, setApproach] = useState(0);
  const snapshotTrigger = useRef<HTMLButtonElement>(null);
  const current = approaches[approach];
  const Icon = current.icon;
  return (
    <>
      <section id="top" className="hero container">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <Asterisk className="small-cross" size={29} strokeWidth={1.7} />
            SOFTWARE & APPLIED AI
          </div>
          <h1>
            Useful software.
            <br />
            <span>
              Thoughtfully
              <br className="hero-break" /> built.
            </span>
          </h1>
          <p>
            I’m <strong>Mohsin Pathan</strong>, a computer engineer in Pune. I
            turn ideas into web products and applied ML systems, with care for
            how they work and how they feel.
          </p>
          <div className="hero-actions">
            <a className="button dark" href="#work">
              Explore my work
              <ArrowDownRight size={19} />
            </a>
            <a className="button quiet" href={profile.resume} download>
              View résumé
              <Download size={17} />
            </a>
          </div>
          <div className="hero-meta">
            <span className="availability">
              <i />
              Open to engineering roles
            </span>
            <span>PUNE, INDIA</span>
          </div>
          <button
            className="snapshot-link"
            ref={snapshotTrigger}
            onClick={() => setSnapshot(true)}
          >
            <FileText size={15} />
            Just a minute? Read my quick profile
            <ArrowUpRight size={15} />
          </button>
        </div>
        <Assembly />
      </section>
      <div className="focus-strip container">
        <span>THREE WAYS I THINK</span>
        <div>
          <Braces size={18} />
          Interfaces that feel considered
        </div>
        <div>
          <BrainCircuit size={18} />
          Intelligence with a purpose
        </div>
        <div>
          <Layers3 size={18} />
          Systems that hold together
        </div>
      </div>
      <section id="work" className="work-section container">
        <div className="section-heading">
          <div>
            <SectionLabel number="01">SELECTED WORK</SectionLabel>
            <h2>
              Don’t just read about it.
              <br />
              <span>Try the work.</span>
            </h2>
          </div>
          <ExternalLink href={profile.github}>More on GitHub</ExternalLink>
        </div>
        <article className="flagship">
          <div className="flagship-copy">
            <div className="project-status">
              <i />
              LIVE PRODUCT<span> / FLAGSHIP PROJECT</span>
            </div>
            <h3>
              NEXYRAL<span>From Intent to Execution.</span>
            </h3>
            <p>
              An AI workspace that turns a plain-language idea into a frontend
              you can try, refine and keep.
            </p>
            <ul className="feature-lines">
              <li>Generate, preview and edit an app</li>
              <li>Ask for changes in plain English</li>
              <li>Recover versions and export the source</li>
            </ul>
            <div className="project-tags">
              <span>React + TypeScript</span>
              <span>Cloudflare</span>
              <span>3D interfaces</span>
            </div>
            <Link className="button light" to="/work/nexyral">
              Explore the case study
              <ArrowUpRight size={17} />
            </Link>
            <div className="flagship-links">
              <ExternalLink href={nexyral.live}>Live website</ExternalLink>
              <ExternalLink href={nexyral.repo}>Source code</ExternalLink>
            </div>
          </div>
          <a
            href={nexyral.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flagship-screen"
            aria-label="Visit the live NEXYRAL website"
          >
            <div className="browser-bar">
              <i />
              <i />
              <i />
              <span>nexyral.online</span>
              <ArrowUpRight size={14} />
            </div>
            <img
              src="/images/nexyral.png"
              alt="NEXYRAL’s live app-building website with its interactive engineering Core"
              loading="lazy"
              width="1440"
              height="1000"
            />
            <span className="screen-caption">
              A real product you can open, explore and build with.
              <ArrowUpRight size={16} />
            </span>
          </a>
        </article>
        <div className="secondary-projects">
          <article className="project-card">
            <div
              className="crop-visual"
              aria-label="KrishiSetu pipeline: environmental data to features to pest risk"
            >
              <div className="crop-top">
                <span>KRISHISETU / APPLIED ML</span>
                <span>FIELD → MODEL</span>
              </div>
              <div className="crop-orbit">
                <div className="crop-leaf">
                  <svg viewBox="0 0 90 100" aria-hidden="true">
                    <path d="M45 90C-8 40 30 10 75 4c11 53-3 77-30 86Z" />
                    <path d="M45 90 63 25M49 69 27 48M53 54 70 43" />
                  </svg>
                </div>
                <span className="crop-node n1">SOIL</span>
                <span className="crop-node n2">WEATHER</span>
                <span className="crop-node n3">FEATURES</span>
              </div>
              <div className="crop-flow">
                <span>Environmental data</span>
                <span>→</span>
                <span>Pest risk</span>
              </div>
            </div>
            <div className="project-card-copy">
              <span className="eyebrow">02 / MACHINE LEARNING & RESEARCH</span>
              <h3>KrishiSetu</h3>
              <p>
                Exploring crop pest prediction across Maharashtra with
                environmental data, model comparison and a Flask interface.
              </p>
              <div className="project-tags">
                <span>Python</span>
                <span>Scikit-learn</span>
                <span>Flask</span>
              </div>
              <ExternalLink href="https://github.com/Mohsinpathan17/Krishisetu">
                Explore the repository
              </ExternalLink>
            </div>
          </article>
          <article className="project-card">
            <a
              className="punch-visual"
              href="https://websiteswithpunch.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Websites With Punch"
            >
              <div className="punch-content">
                <span>WEBSITES WITH</span>
                <strong>
                  PUNCH
                  <span>
                    <ArrowUpRight size={53} strokeWidth={1.6} />
                  </span>
                </strong>
                <p>
                  Built to turn attention
                  <br />
                  into a conversation.
                </p>
                <div className="punch-browser-lines">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <span className="punch-caption">
                CLIENT WEB / DESIGN TO DEPLOYMENT
              </span>
            </a>
            <div className="project-card-copy">
              <span className="eyebrow">03 / COLLABORATIVE CLIENT PROJECT</span>
              <h3>Websites With Punch</h3>
              <p>
                A lead-focused agency website for HVAC and solar businesses,
                built collaboratively from design through deployment.
              </p>
              <div className="project-tags">
                <span>React</span>
                <span>TypeScript</span>
                <span>Tailwind CSS</span>
              </div>
              <div className="project-inline-links">
                <ExternalLink href="https://websiteswithpunch.com">
                  Live website
                </ExternalLink>
                <ExternalLink href="https://github.com/Mohsinpathan17/websites-with-punch">
                  Source code
                </ExternalLink>
              </div>
            </div>
          </article>
        </div>
        <div className="smaller-project">
          <span className="eyebrow">ALSO BUILT</span>
          <div>
            <h3>Flask Student Management</h3>
            <p>A practical CRUD application for managing student records.</p>
          </div>
          <ExternalLink href="https://github.com/Mohsinpathan17/flask-student-management">
            View source
          </ExternalLink>
        </div>
      </section>
      <section className="approach-section">
        <div className="container approach-grid">
          <div>
            <SectionLabel number="02">THE APPROACH</SectionLabel>
            <h2>
              Good engineering
              <br />
              is in the
              <br />
              <span>decisions.</span>
            </h2>
            <div
              className="approach-tabs"
              role="group"
              aria-label="Engineering approach"
            >
              {approaches.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => setApproach(i)}
                  aria-pressed={approach === i}
                >
                  <span>0{i + 1}</span>
                  {item.label}
                  <ArrowUpRight size={17} />
                </button>
              ))}
            </div>
          </div>
          <div className="approach-detail" aria-live="polite">
            <div className="approach-symbol">
              <Icon size={44} strokeWidth={1.2} />
              <span>0{approach + 1}</span>
            </div>
            <h3>{current.title}</h3>
            <p>{current.copy}</p>
            <div className="decision-example">
              <span className="eyebrow">IN PRACTICE / NEXYRAL</span>
              <p>{current.example}</p>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="about-section container">
        <div>
          <SectionLabel number="03">A LITTLE ABOUT ME</SectionLabel>
          <h2>
            Curiosity brought me here.
            <br />
            <span>Building keeps me here.</span>
          </h2>
          <p className="about-lead">
            I enjoy connecting the pieces: an interface someone can understand,
            the logic behind it, and a system that makes it useful.
          </p>
          <p>
            My background is in computer engineering, Python and applied machine
            learning. I also build web products, work on client websites, and
            evaluate AI outputs. That mix keeps me interested in both the
            experience and the engineering behind it.
          </p>
          <ExternalLink href={profile.linkedin}>
            Connect on LinkedIn
          </ExternalLink>
        </div>
        <div className="toolkit">
          <span className="eyebrow">TOOLS I WORK WITH</span>
          <div>
            <span className="toolkit-index">01</span>
            <div>
              <h3>Interfaces</h3>
              <p>
                React · TypeScript · JavaScript
                <br />
                Tailwind CSS · Three.js · Figma
              </p>
            </div>
          </div>
          <div>
            <span className="toolkit-index">02</span>
            <div>
              <h3>Intelligence</h3>
              <p>
                Python · Pandas · NumPy
                <br />
                Scikit-learn · XGBoost · LSTM
              </p>
            </div>
          </div>
          <div>
            <span className="toolkit-index">03</span>
            <div>
              <h3>Foundations</h3>
              <p>
                Flask · Node.js · SQL
                <br />
                Cloudflare · Firebase · Git · Docker
              </p>
            </div>
          </div>
          <a href={profile.resume} download className="toolkit-resume">
            The complete background
            <Download size={17} />
          </a>
        </div>
      </section>
      <section id="experience" className="experience-section container">
        <div className="section-heading">
          <div>
            <SectionLabel number="04">EXPERIENCE & FOUNDATIONS</SectionLabel>
            <h2>
              Learning by
              <br />
              <span>doing the work.</span>
            </h2>
          </div>
          <span className="section-note">PRODUCTS. PEOPLE. PRACTICE.</span>
        </div>
        <div className="experience-list">
          {experience.map((item) => (
            <article key={item.role}>
              <span className="experience-date">{item.date}</span>
              <div>
                <h3>{item.role}</h3>
                <span className="experience-company">{item.company}</span>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="foundations">
          <article>
            <span className="eyebrow">EDUCATION / 2026</span>
            <h3>
              Computer Science,
              <br />
              Bachelor of Engineering.
            </h3>
            <p>
              Government College of Engineering & Research, Avasari Khurd
              <br />
              Savitribai Phule Pune University
            </p>
            <span className="foundation-note">CGPA 7.44 / 10</span>
          </article>
          <article id="research">
            <span className="eyebrow">RESEARCH / ICRTSET-2026</span>
            <h3>
              Machine learning.
              <br />A real-world question.
            </h3>
            <p>
              Pest Outbreak Prediction for Kharif Crops Using Machine Learning —
              research on environmental features and classification models for
              agricultural pest risk.
            </p>
            <ExternalLink href="https://github.com/Mohsinpathan17/Krishisetu">
              Explore the project
            </ExternalLink>
          </article>
        </div>
      </section>
      {snapshot && (
        <ProfileDialog
          onClose={() => {
            setSnapshot(false);
            requestAnimationFrame(() => snapshotTrigger.current?.focus());
          }}
        />
      )}
    </>
  );
}
