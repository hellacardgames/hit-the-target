import type { Fraction } from "./types/Fraction.js";

export function negate(value: Fraction): Fraction {
  return { numerator: -value.numerator, denominator: value.denominator };
}
