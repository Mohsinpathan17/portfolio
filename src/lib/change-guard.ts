export type Accent = "cobalt" | "forest" | "plum";
export interface AppSnapshot {
  title: string;
  accent: Accent;
}
export interface SavedSnapshot {
  id: number;
  source: AppSnapshot;
}
export interface VersionState {
  source: AppSnapshot;
  revision: number;
  history: SavedSnapshot[];
}
export type WriteResult = {
  state: VersionState;
  error: null | "stale" | "invalid" | "missing";
};
export const initialVersion: VersionState = {
  source: { title: "Launchboard", accent: "cobalt" },
  revision: 0,
  history: [],
};
/** A local illustration of the production version predicate; no network or AI calls. */
export function saveVersion(
  state: VersionState,
  source: AppSnapshot,
  expected: number,
): WriteResult {
  if (expected !== state.revision) return { state, error: "stale" };
  const title = source.title.trim();
  if (
    title.length < 3 ||
    title.length > 60 ||
    !["cobalt", "forest", "plum"].includes(source.accent)
  )
    return { state, error: "invalid" };
  return {
    state: {
      source: { ...source, title },
      revision: state.revision + 1,
      history: [
        { id: state.revision, source: { ...state.source } },
        ...state.history,
      ].slice(0, 10),
    },
    error: null,
  };
}
export function restoreVersion(
  state: VersionState,
  id: number,
  expected: number,
): WriteResult {
  if (expected !== state.revision) return { state, error: "stale" };
  const selected = state.history.find((version) => version.id === id);
  return selected
    ? saveVersion(state, selected.source, expected)
    : { state, error: "missing" };
}
