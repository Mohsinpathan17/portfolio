import { ExternalLink, SectionLabel } from "../ui";
import RecoveryWorkshop from "./RecoveryWorkshop";
const source =
  "https://github.com/Mohsinpathan17/nexus-ai-platform/blob/5b426f0d1f6a21c6921a0fcbe36ceae8608cd054/apps/nexyral/";
export default function EngineeringEvidence() {
  return (
    <>
      <section id="workshop" className="engineering-workshop-section container">
        <SectionLabel number="03">THE DECISION, MADE TANGIBLE</SectionLabel>
        <div className="evidence-heading">
          <h2>
            Change the app.
            <br />
            <span>Keep a way back.</span>
          </h2>
          <p>
            One of the most important details in NEXYRAL is recovery. Try the
            pattern here: save a change, test a failure, reject an older
            request, and restore a version.
          </p>
        </div>
        <RecoveryWorkshop />
      </section>
      <section id="tradeoffs" className="tradeoff-section">
        <div className="container tradeoff-layout">
          <div>
            <SectionLabel number="04">THE HARD PART</SectionLabel>
            <h2>
              Two requests.
              <br />
              One saved app.
              <br />
              <span>Which change wins?</span>
            </h2>
            <p>
              A newer request can finish before an older one. If both write
              freely, the older result can silently replace newer work.
            </p>
          </div>
          <div className="tradeoff-rows">
            <article>
              <span>THE SIMPLE OPTION</span>
              <h3>Accept the last response.</h3>
              <p>
                Easy to implement, but completion order becomes the source of
                truth. A slow response can overwrite the change the user just
                kept.
              </p>
            </article>
            <article className="chosen-tradeoff">
              <span>THE CHOSEN APPROACH</span>
              <h3>Check the version before writing.</h3>
              <p>
                Store the snapshot and new source atomically, using the same
                owner and version predicate. An obsolete request is rejected
                instead of overwriting a newer app.
              </p>
              <ExternalLink href={source + "cloudflare/project-revisions.ts"}>
                Inspect the version-aware write
              </ExternalLink>
            </article>
            <article>
              <span>THE COST OF THE CHOICE</span>
              <h3>Recovery needs boundaries.</h3>
              <p>
                A stale request requires reopening the latest version. Keeping
                ten snapshots bounds storage, while restoring also saves the
                version being replaced.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section id="implementation" className="implementation-section container">
        <SectionLabel number="05">OPEN THE IMPLEMENTATION</SectionLabel>
        <div className="evidence-heading">
          <h2>
            Follow the decisions
            <br />
            <span>into the code.</span>
          </h2>
          <p>
            These links point to a recorded source revision. They let you
            inspect the implementation behind the case study instead of relying
            on the presentation.
          </p>
        </div>
        <div className="source-evidence-list">
          {[
            [
              "01",
              "Version recovery",
              "Atomic snapshots, optimistic version checks, owned restore operations.",
              "cloudflare/project-revisions.ts",
            ],
            [
              "02",
              "Failure and concurrency checks",
              "Tests for failed revisions, obsolete completion, history bounds and ownership.",
              "cloudflare/cloud.test.ts",
            ],
            [
              "03",
              "Browser preview boundaries",
              "Restricted frame setup, compilation and preview communication.",
              "src/lib/react-preview.ts",
            ],
            [
              "04",
              "Release evidence",
              "Commands, validation results, actual-public checks and remaining limitations.",
              "docs/NEXYRAL_GUIDE_REPORT.md",
            ],
          ].map(([number, title, copy, path]) => (
            <article key={path}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <ExternalLink href={source + path}>View evidence</ExternalLink>
            </article>
          ))}
        </div>
        <div className="contribution-note">
          <div>
            <span className="eyebrow">MY FOCUS</span>
            <h3>Product direction, experience and delivery.</h3>
          </div>
          <p>
            The project uses an AI-assisted implementation workflow. I focus on
            the product requirements, interface behavior, recovery flows and
            release checks. The source and reports make the decisions, checks and current scope
            inspectable.
          </p>
        </div>
      </section>
    </>
  );
}
