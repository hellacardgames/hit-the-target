import { expect, test } from "vitest";
import { negate } from "./negate.js";

test("negates the numerator", () => {
  expect(negate({ numerator: 4, denominator: 7 })).toEqual({
    numerator: -4,
    denominator: 7,
  });

  expect(negate({ numerator: -2, denominator: 3 })).toEqual({
    numerator: 2,
    denominator: 3,
  });
});
