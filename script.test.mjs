import assert from "node:assert";
import test from "node:test";
import { setIntervalDates } from "./utils.mjs";

test("setIntervalDates returns correct dates from 2025-01-01", () => {
  const [oneWeek, oneMonth, threeMonths, sixMonths, oneYear] = setIntervalDates("2025-01-01");

  assert.strictEqual(oneWeek, "2025-01-08");
  assert.strictEqual(oneMonth, "2025-02-01");
  assert.ok(["2025-03-31", "2025-04-01"].includes(threeMonths));
  assert.ok(["2025-06-30", "2025-07-01"].includes(sixMonths));
  assert.strictEqual(oneYear, "2026-01-01");
});

test("setIntervalDates handles Jan 31 correctly", () => {
  const [oneWeek, oneMonth, threeMonths, sixMonths, oneYear] = setIntervalDates("2025-01-31");

  assert.strictEqual(oneWeek, "2025-02-07");
  assert.strictEqual(oneMonth, "2025-02-28");
  assert.strictEqual(threeMonths, "2025-04-30");
  assert.strictEqual(sixMonths, "2025-07-31");
  assert.strictEqual(oneYear, "2026-01-31");
});

test("setIntervalDates handles leap year Feb correctly", () => {
  const [, oneMonth] = setIntervalDates("2024-01-31");
  assert.strictEqual(oneMonth, "2024-02-29");
});