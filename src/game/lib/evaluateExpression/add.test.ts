import { expect, test } from "vitest";
import { add } from "./add.js";

test("computes the correct sum", () => {
  expect(
    add({ numerator: 5, denominator: 1 }, { numerator: 3, denominator: 1 }),
  ).toEqual({ numerator: 8, denominator: 1 });

  expect(
    add({ numerator: 5, denominator: 1 }, { numerator: 2, denominator: 3 }),
  ).toEqual({ numerator: 17, denominator: 3 });

  expect(
    add({ numerator: 2, denominator: 21 }, { numerator: 7, denominator: 13 }),
  ).toEqual({ numerator: 173, denominator: 273 });

  expect(
    add({ numerator: 64, denominator: 2 }, { numerator: 1, denominator: 1 }),
  ).toEqual({ numerator: 66, denominator: 2 });
});
