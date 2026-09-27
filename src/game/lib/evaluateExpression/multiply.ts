import type { Fraction } from "./types/Fraction.js";

export function multiply(left: Fraction, right: Fraction): Fraction {
  return {
    numerator: left.numerator * right.numerator,
    denominator: left.denominator * right.denominator,
  };
}
