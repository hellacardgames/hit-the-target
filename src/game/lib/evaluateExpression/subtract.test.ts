import { expect, test } from "vitest";
import { subtract } from "./subtract.js";

test("computes the correct difference", () => {
  expect(
    subtract(
      { numerator: 5, denominator: 1 },
      { numerator: 3, denominator: 1 },
    ),
  ).toEqual({ numerator: 2, denominator: 1 });

  expect(
    subtract(
      { numerator: 5, denominator: 1 },
      { numerator: 2, denominator: 3 },
    ),
  ).toEqual({ numerator: 13, denominator: 3 });

  expect(
    subtract(
      { numerator: 2, denominator: 21 },
      { numerator: 7, denominator: 13 },
    ),
  ).toEqual({ numerator: -121, denominator: 273 });

  expect(
    subtract(
      { numerator: 64, denominator: 2 },
      { numerator: 1, denominator: 1 },
    ),
  ).toEqual({ numerator: 62, denominator: 2 });
});
