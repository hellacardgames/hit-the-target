import { expect, test } from "vitest";
import { divide } from "./divide.js";

test("computes the correct quotient", () => {
  expect(
    divide({ numerator: 5, denominator: 1 }, { numerator: 3, denominator: 1 }),
  ).toEqual({ numerator: 5, denominator: 3 });

  expect(
    divide({ numerator: 5, denominator: 1 }, { numerator: 2, denominator: 3 }),
  ).toEqual({ numerator: 15, denominator: 2 });

  expect(
    divide(
      { numerator: 2, denominator: 21 },
      { numerator: 7, denominator: 13 },
    ),
  ).toEqual({ numerator: 26, denominator: 147 });

  expect(
    divide({ numerator: 64, denominator: 2 }, { numerator: 1, denominator: 1 }),
  ).toEqual({ numerator: 64, denominator: 2 });
});
