import type { Fraction } from "./types/Fraction.js";

export function add(left: Fraction, right: Fraction): Fraction {
  return {
    numerator:
      left.numerator * right.denominator + right.numerator * left.denominator,
    denominator: left.denominator * right.denominator,
  };
}
