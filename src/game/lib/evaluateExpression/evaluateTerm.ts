import { assertNever, removeItem, tryPeekItem } from "@hellacardgames/lib";
import { evaluateFactor } from "./evaluateFactor.js";
import { multiply } from "./multiply.js";
import { divide } from "./divide.js";
import type { ExpressionToken } from "../../types/ExpressionToken.js";
import type { Fraction } from "./types/Fraction.js";

type EvaluateTermResult = {
  readonly tokens: readonly ExpressionToken[];
  readonly value: Fraction;
};

export function evaluateTerm(
  tokens: readonly ExpressionToken[],
): EvaluateTermResult {
  let leftValue: Fraction;
  ({ tokens, value: leftValue } = evaluateFactor(tokens));
  let token = tryPeekItem(tokens, 0);
  while (
    token &&
    token.type === "operator" &&
    (token.operator === "multiply" || token.operator === "divide")
  ) {
    tokens = removeItem(tokens, token);
    let rightValue: Fraction;
    ({ tokens, value: rightValue } = evaluateFactor(tokens));
    switch (token.operator) {
      case "multiply":
        leftValue = multiply(leftValue, rightValue);
        break;
      case "divide":
        leftValue = divide(leftValue, rightValue);
        break;
      default:
        assertNever(token.operator);
    }
    token = tryPeekItem(tokens, 0);
  }
  return { tokens, value: leftValue };
}
