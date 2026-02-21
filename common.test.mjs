import { getUserIds } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("getUserIds returns exactly 5 users", () => {
  assert.equal(getUserIds().length, 5);
});

test("getUserIds returns strings", () => {
  getUserIds().forEach((id) => {
    assert.strictEqual(typeof id, "string");
  });
});

test("getUserIds contains expected IDs", () => {
  assert.deepStrictEqual(getUserIds(), ["1", "2", "3", "4", "5"]);
});