import { test } from "node:test";
import assert from "node:assert/strict";
import {
  initialVersion,
  saveVersion,
  restoreVersion,
} from "../src/lib/change-guard.ts";
test("two writers reading the same version cannot overwrite the winner", () => {
  const first = saveVersion(
    initialVersion,
    { title: "The newer app", accent: "forest" },
    0,
  );
  const late = saveVersion(
    first.state,
    { title: "Obsolete app", accent: "plum" },
    0,
  );
  assert.equal(late.error, "stale");
  assert.strictEqual(late.state, first.state);
  assert.equal(late.state.source.title, "The newer app");
  assert.equal(late.state.history.length, 1);
  assert.deepEqual(initialVersion.history, []);
});
test("restore preserves the replaced version and keeps revision increasing", () => {
  const saved = saveVersion(
    initialVersion,
    { title: "A refined app", accent: "forest" },
    0,
  ).state;
  const restored = restoreVersion(saved, 0, 1);
  assert.equal(restored.error, null);
  assert.deepEqual(restored.state.source, initialVersion.source);
  assert.equal(restored.state.revision, 2);
  const undo = restoreVersion(restored.state, 1, 2);
  assert.equal(undo.state.source.title, "A refined app");
  assert.equal(undo.state.revision, 3);
});
test("history has a fixed bound and cannot restore a pruned or unknown snapshot", () => {
  let state = initialVersion;
  for (let i = 0; i < 13; i++)
    state = saveVersion(
      state,
      { title: `App revision ${i + 1}`, accent: "cobalt" },
      state.revision,
    ).state;
  assert.equal(state.history.length, 10);
  assert.deepEqual(
    state.history.map((v) => v.id),
    [12, 11, 10, 9, 8, 7, 6, 5, 4, 3],
  );
  const missing = restoreVersion(state, 0, state.revision);
  assert.equal(missing.error, "missing");
  assert.strictEqual(missing.state, state);
  assert.equal(restoreVersion(state, 12, state.revision - 1).error, "stale");
});
test("invalid source cannot create a snapshot or change the saved app", () => {
  const result = saveVersion(
    initialVersion,
    { title: " ", accent: "forest" },
    0,
  );
  assert.equal(result.error, "invalid");
  assert.strictEqual(result.state, initialVersion);
});
