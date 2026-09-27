import { add } from "./add.js";
import { negate } from "./negate.js";
import type { Fraction } from "./types/Fraction.js";

export function subtract(left: Fraction, right: Fraction): Fraction {
  return add(left, negate(right));
}
