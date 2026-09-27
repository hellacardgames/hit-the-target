import type { Fraction } from "./types/Fraction.js";

export function flip(value: Fraction): Fraction {
  return { numerator: value.denominator, denominator: value.numerator };
}
