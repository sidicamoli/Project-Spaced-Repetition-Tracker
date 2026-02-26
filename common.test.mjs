import { getUserIds } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("getUserIds returns no duplicate IDs", () => {
  const ids = getUserIds();
  const unique = new Set(ids);
  assert.strictEqual(unique.size, ids.length);
});