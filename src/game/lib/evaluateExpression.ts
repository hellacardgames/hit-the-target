import { evaluateExpression as doEvaluateExpression } from "./evaluateExpression/evaluateExpression.js";
import type { ExpressionToken } from "../types/ExpressionToken.js";
import type { Fraction } from "./evaluateExpression/types/Fraction.js";

type EvaluateExpressionResult =
  | {
      readonly success: true;
      readonly value: number;
    }
  | {
      readonly success: false;
    };

export function evaluateExpression(
  tokens: readonly ExpressionToken[],
): EvaluateExpressionResult {
  const numCardTokens = tokens
    .map((t) => (t.type === "card" ? (1 as number) : 0))
    .reduce((prev, curr) => prev + curr, 0);

  if (numCardTokens < 2) {
    return { success: false };
  }

  let value: Fraction;
  try {
    ({ tokens, value } = doEvaluateExpression(tokens));
  } catch {
    return { success: false };
  }

  if (tokens.length > 0) {
    return { success: false };
  }

  return { success: true, value: value.numerator / value.denominator };
}
