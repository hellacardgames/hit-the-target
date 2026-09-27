import { flip } from "./flip.js";
import { multiply } from "./multiply.js";
import type { Fraction } from "./types/Fraction.js";

export function divide(left: Fraction, right: Fraction): Fraction {
  return multiply(left, flip(right));
}
