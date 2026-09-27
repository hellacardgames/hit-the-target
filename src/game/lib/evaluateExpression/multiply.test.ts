import { expect, test } from "vitest";
import { multiply } from "./multiply.js";

test("computes the correct product", () => {
  expect(
    multiply(
      { numerator: 5, denominator: 1 },
      { numerator: 3, denominator: 1 },
    ),
  ).toEqual({ numerator: 15, denominator: 1 });

  expect(
    multiply(
      { numerator: 5, denominator: 1 },
      { numerator: 2, denominator: 3 },
    ),
  ).toEqual({ numerator: 10, denominator: 3 });

  expect(
    multiply(
      { numerator: 2, denominator: 21 },
      { numerator: 7, denominator: 13 },
    ),
  ).toEqual({ numerator: 14, denominator: 273 });

  expect(
    multiply(
      { numerator: 64, denominator: 2 },
      { numerator: 1, denominator: 1 },
    ),
  ).toEqual({ numerator: 64, denominator: 2 });
});
