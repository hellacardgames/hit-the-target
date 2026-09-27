import { expect, test } from "vitest";
import { flip } from "./flip.js";

test("flips the numerator and denominator", () => {
  expect(flip({ numerator: 1, denominator: 2 })).toEqual({
    numerator: 2,
    denominator: 1,
  });

  expect(flip({ numerator: 13, denominator: 7 })).toEqual({
    numerator: 7,
    denominator: 13,
  });
});
