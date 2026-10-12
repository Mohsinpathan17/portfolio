import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Layers3, Pause, Play } from "lucide-react";
const AssemblyScene = lazy(() => import("./AssemblyScene"));
const layers = [
  {
    name: "Interface",
    copy: "Clear layouts. Thoughtful interactions. The part people feel.",
  },
  {
    name: "Logic",
    copy: "Data, behavior and useful intelligence. The part that makes it work.",
  },
  {
    name: "Systems",
    copy: "Storage, deployment and recovery. The part that keeps it dependable.",
  },
];
function Fallback() {
  return (
    <div className="assembly-fallback" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}
export default function Assembly() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false),
    [activated, setActivated] = useState(false),
    [reduced, setReduced] = useState(true),
    [mobile, setMobile] = useState(false),
    [paused, setPaused] = useState(false),
    [expanded, setExpanded] = useState(false),
    [active, setActive] = useState(0),
    [ready, setReady] = useState(false),
    [foreground, setForeground] = useState(true);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)"),
      phone = matchMedia("(max-width: 700px)");
    function update() {
      setReduced(query.matches);
      setMobile(phone.matches);
    }
    update();
    query.addEventListener("change", update);
    phone.addEventListener("change", update);
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible(entries[0].isIntersecting);
        if (entries[0].isIntersecting) setActivated(true);
      },
      { rootMargin: "100px" },
    );
    if (ref.current) observer.observe(ref.current);
    function visibility() {
      setForeground(!document.hidden);
    }
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", update);
      phone.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const moving = visible && foreground && !reduced && !paused;
  return (
    <div className="assembly" ref={ref}>
      <div className="assembly-caption">
        <span>THE BUILDING BLOCKS</span>
        <span>01 — 03</span>
      </div>
      <div className="assembly-canvas" data-ready={ready}>
        <SceneBoundary>
          <Suspense fallback={<Fallback />}>
            {activated && (
              <AssemblyScene
                expanded={expanded}
                moving={moving}
                active={active}
                mobile={mobile}
                onReady={() => setReady(true)}
              />
            )}
          </Suspense>
        </SceneBoundary>
      </div>
      <div className="assembly-actions">
        <button onClick={() => setExpanded((v) => !v)} aria-pressed={expanded}>
          <Layers3 size={15} />
          {expanded ? "Bring it together" : "Explore the layers"}
        </button>
        <button
          aria-label={paused ? "Resume 3D animation" : "Pause 3D animation"}
          onClick={() => setPaused((v) => !v)}
          disabled={reduced}
        >
          {paused || reduced ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
      <div className="layer-tabs" role="group" aria-label="Engineering layers">
        {layers.map((layer, i) => (
          <button
            key={layer.name}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
          >
            <span>0{i + 1}</span>
            {layer.name}
          </button>
        ))}
      </div>
      <p className="assembly-description" aria-live="polite">
        {layers[active].copy}
      </p>
    </div>
  );
}
