import { useState, type FormEvent } from "react";
import {
  Check,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import {
  initialVersion,
  saveVersion,
  restoreVersion,
  type Accent,
} from "../../lib/change-guard";
const colors: Record<Accent, string> = {
  cobalt: "#345be1",
  forest: "#477756",
  plum: "#806099",
};
export default function RecoveryWorkshop() {
  const [state, setState] = useState(initialVersion),
    [title, setTitle] = useState(initialVersion.source.title),
    [accent, setAccent] = useState<Accent>("forest"),
    [notice, setNotice] = useState(
      "Make one change, then save your first version.",
    ),
    [status, setStatus] = useState<"idle" | "saved" | "protected">("idle");
  const [tasks, setTasks] = useState([
      { id: "seed-1", text: "Describe the problem", done: true },
      { id: "seed-2", text: "Build a useful first version", done: false },
      { id: "seed-3", text: "Review the details", done: false },
    ]),
    [task, setTask] = useState("");
  function save(event: FormEvent) {
    event.preventDefault();
    const result = saveVersion(state, { title, accent }, state.revision);
    if (result.error) {
      setNotice("Use a title between 3 and 60 characters.");
      return;
    }
    setState(result.state);
    setStatus("saved");
    setNotice(
      `Version ${result.state.revision} saved. Your previous version is ready to restore.`,
    );
  }
  function stale() {
    const result = saveVersion(
      state,
      { title: "An older request would overwrite this", accent: "plum" },
      state.revision - 1,
    );
    setState(result.state);
    setStatus("protected");
    setNotice(
      `Older request rejected. Version ${state.revision} is still your saved app.`,
    );
  }
  function failure() {
    setStatus("protected");
    setNotice(
      `Example failure: the change could not complete. Version ${state.revision} and its history are unchanged.`,
    );
  }
  function restore(id: number) {
    const result = restoreVersion(state, id, state.revision);
    if (result.error) return;
    setState(result.state);
    setTitle(result.state.source.title);
    setAccent(result.state.source.accent);
    setStatus("saved");
    setNotice(
      `Restored version ${id}. The version you replaced is also saved, so you can go back again.`,
    );
  }
  function reset() {
    setState(initialVersion);
    setTitle(initialVersion.source.title);
    setAccent("forest");
    setNotice("Make one change, then save your first version.");
    setStatus("idle");
    setTasks([
      { id: "seed-1", text: "Describe the problem", done: true },
      { id: "seed-2", text: "Build a useful first version", done: false },
      { id: "seed-3", text: "Review the details", done: false },
    ]);
    setTask("");
  }
  function add(event: FormEvent) {
    event.preventDefault();
    if (!task.trim()) return;
    setTasks((list) => [
      ...list,
      { id: crypto.randomUUID(), text: task.trim(), done: false },
    ]);
    setTask("");
  }
  return (
    <div className="recovery-workshop">
      <div className="workshop-bar">
        <span>
          <i />
          INTERACTIVE ENGINEERING EXAMPLE
        </span>
        <button onClick={reset}>
          <RotateCcw size={14} />
          Reset
        </button>
      </div>
      <div className="workshop-grid">
        <div
          className="workshop-preview"
          style={
            {
              "--demo-accent": colors[state.source.accent],
            } as React.CSSProperties
          }
        >
          <div className="workshop-preview-top">
            <span>YOUR SAVED APP</span>
            <span>v{state.revision}</span>
          </div>
          <h3>{state.source.title}</h3>
          <p>A small plan. Something worth finishing.</p>
          <div className="workshop-progress">
            <span>
              {tasks.filter((t) => t.done).length} of {tasks.length} complete
            </span>
            <div>
              <i
                style={{
                  width: `${(tasks.filter((t) => t.done).length / tasks.length) * 100}%`,
                }}
              />
            </div>
          </div>
          <ul className="workshop-tasks">
            {tasks.map((item) => (
              <li key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() =>
                      setTasks((list) =>
                        list.map((t) =>
                          t.id === item.id ? { ...t, done: !t.done } : t,
                        ),
                      )
                    }
                  />
                  <span>{item.text}</span>
                </label>
              </li>
            ))}
          </ul>
          <form className="workshop-add" onSubmit={add}>
            <label className="visually-hidden" htmlFor="workshop-task">
              Add an example task
            </label>
            <input
              id="workshop-task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              maxLength={120}
              placeholder="Add a small next step…"
            />
            <button aria-label="Add example task" disabled={!task.trim()}>
              <ArrowRight size={17} />
            </button>
          </form>
        </div>
        <div className="workshop-controls">
          <span className="eyebrow">01 / MAKE A CHANGE</span>
          <form onSubmit={save}>
            <label htmlFor="workshop-title">App title</label>
            <input
              id="workshop-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minLength={3}
              maxLength={60}
              required
            />
            <label htmlFor="workshop-accent">Accent color</label>
            <select
              id="workshop-accent"
              value={accent}
              onChange={(e) => setAccent(e.target.value as Accent)}
            >
              <option value="cobalt">Cobalt</option>
              <option value="forest">Forest</option>
              <option value="plum">Plum</option>
            </select>
            <button className="button dark" type="submit">
              Save a version
              <Check size={16} />
            </button>
          </form>
          <div className="workshop-faults">
            <span className="eyebrow">02 / TRY THE EDGE CASES</span>
            <div>
              <button onClick={failure}>Simulate failure</button>
              <button onClick={stale} disabled={!state.history.length}>
                Try a stale save
              </button>
            </div>
          </div>
          <div className={`workshop-notice ${status}`} role="status">
            <ShieldCheck size={17} />
            <p>{notice}</p>
          </div>
        </div>
      </div>
      <div className="workshop-history">
        <div>
          <span className="eyebrow">03 / RESTORE A SAVED VERSION</span>
          <span>{state.history.length} / 10 snapshots</span>
        </div>
        {state.history.length ? (
          <div className="snapshot-list">
            {state.history.map((item) => (
              <button
                key={item.id}
                onClick={() => restore(item.id)}
                aria-label={`Restore version ${item.id}`}
              >
                <span>v{item.id}</span>
                <strong>{item.source.title}</strong>
                <RotateCcw size={14} />
              </button>
            ))}
          </div>
        ) : (
          <p>Your first save will put the previous version here.</p>
        )}
      </div>
      <p className="workshop-caption">
        A local example of the recovery pattern. To try the actual product,{" "}
        <a
          href="https://nexyral.online/playground"
          target="_blank"
          rel="noopener noreferrer"
        >
          open NEXYRAL <ArrowUpRight size={12} />
        </a>
        .
      </p>
    </div>
  );
}
