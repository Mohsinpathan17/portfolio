import { useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight, MousePointer2 } from "lucide-react";

const projects = [
  { name: "NEXYRAL", code: "N", kind: "AI PRODUCT", stack: "React / TypeScript / AI", title: "Build what you imagine.", description: "An AI-assisted app builder with previews, revisions, version recovery and source export.", url: "https://nexyral.online", action: "Launch NEXYRAL" },
  { name: "KRISHISETU", code: "K", kind: "APPLIED MACHINE LEARNING", stack: "Python / XGBoost / Flask", title: "Predict what matters.", description: "Researching crop pest prediction using environmental features and machine-learning models.", url: "https://github.com/Mohsinpathan17/Krishisetu", action: "Explore KrishiSetu" },
  { name: "WEBSITES WITH PUNCH", code: "P", kind: "WEB EXPERIENCE", stack: "React / Vite / Tailwind", title: "Make an impression.", description: "A contemporary web studio site presenting business websites, maintenance and customer contact options.", url: "https://websiteswithpunch.com", action: "Explore the website" }
];

export default function ProjectDeck() {
  const [selected, setSelected] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const project = projects[selected];
  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    stage.current?.style.setProperty("--turn-y", String(x * 28) + "deg");
    stage.current?.style.setProperty("--turn-x", String(-y * 23) + "deg");
  }
  function reset() {
    stage.current?.style.setProperty("--turn-y", "0deg");
    stage.current?.style.setProperty("--turn-x", "0deg");
  }
  return (
    <section className="dimension-section" aria-label="Interactive 3D project explorer">
      <div className="container dimension-grid">
        <div className="dimension-copy">
          <span className="dimension-eyebrow"><i /> INTERACTIVE INDEX / VOL. 01</span>
          <span className="eyebrow">THE ART OF ENGINEERING</span>
          <h2>Beyond the <em>ordinary.</em></h2>
          <p>A portfolio should be something you experience, not just scroll through. Explore the worlds behind my work.</p>
          <div className="dimension-switches" role="group" aria-label="Choose a project">
            {projects.map((item, index) => (
              <button type="button" key={item.name} aria-pressed={selected === index} onClick={() => setSelected(index)}>
                <span>0{index + 1}</span> {item.name} <ArrowUpRight size={16} />
              </button>
            ))}
          </div>
        </div>
        <div className="dimension-right">
          <div className="dimension-stage" onPointerMove={onMove} onPointerLeave={reset} ref={stage}>
            <div className="dimension-ring ring-a" aria-hidden="true" />
            <div className="dimension-ring ring-b" aria-hidden="true" />
            <div className="dimension-ring ring-c" aria-hidden="true" />
            <div className="dimension-planet" aria-hidden="true"><span>{project.code}</span></div>
            <div className="dimension-satellite s1" aria-hidden="true" />
            <div className="dimension-satellite s2" aria-hidden="true" />
            <span className="dimension-stage-top">ROTATE / EXPLORE / DISCOVER</span>
            <span className="dimension-stage-bottom"><MousePointer2 size={13} /> MOVE YOUR CURSOR TO INTERACT</span>
          </div>
          <div className="dimension-details" aria-live="polite">
            <span className="dimension-meta">{project.kind} / {project.stack}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.url} target="_blank" rel="noopener noreferrer">{project.action} <ArrowUpRight size={17} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
