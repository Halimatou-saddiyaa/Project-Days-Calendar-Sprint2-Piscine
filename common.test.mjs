import assert from "node:assert";
import test from "node:test";
import {
  generateCalendarMatrix,
  getDaysInMonth,
  jsDayToIso,
} from "./common.mjs";

// jsDayToIso tests
test("jsDayToIso() correctly converts JS weekday to ISO weekday", () => {
  assert.equal(jsDayToIso(0), 7);
  assert.equal(jsDayToIso(1), 1);
  assert.equal(jsDayToIso(6), 6);
});

// getDaysInMonth tests
test("getDaysInMonth() returns correct number of days per month", () => {
  assert.equal(getDaysInMonth(2024, 2), 29);
  assert.equal(getDaysInMonth(2025, 2), 28);
  assert.equal(getDaysInMonth(2025, 4), 30);
  assert.equal(getDaysInMonth(2025, 12), 31);
});

// generateCalendarMatrix tests
test("generateCalendarMatrix() creates correct structure for October 2024", () => {
  const matrix = generateCalendarMatrix(2024, 10);
  const days = matrix
    .flat()
    .filter((d) => d.monthOffset === 0)
    .map((d) => d.day);
  assert.equal(days.length, 31);
});

test("generateCalendarMatrix() handles February 2025 correctly", () => {
  const matrix = generateCalendarMatrix(2025, 2);
  const days = matrix
    .flat()
    .filter((d) => d.monthOffset === 0)
    .map((d) => d.day);
  assert.equal(days.length, 28);
});
