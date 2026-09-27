import { assertNever, removeItem, tryPeekItem } from "@hellacardgames/lib";
import { evaluateTerm } from "./evaluateTerm.js";
import { add } from "./add.js";
import { subtract } from "./subtract.js";
import type { ExpressionToken } from "../../types/ExpressionToken.js";
import type { Fraction } from "./types/Fraction.js";

type EvaluateExpressionResult = {
  readonly tokens: readonly ExpressionToken[];
  readonly value: Fraction;
};

export function evaluateExpression(
  tokens: readonly ExpressionToken[],
): EvaluateExpressionResult {
  let leftValue: Fraction;
  ({ tokens, value: leftValue } = evaluateTerm(tokens));
  let token = tryPeekItem(tokens, 0);
  while (
    token &&
    token.type === "operator" &&
    (token.operator === "add" || token.operator === "subtract")
  ) {
    tokens = removeItem(tokens, token);
    let rightValue: Fraction;
    ({ tokens, value: rightValue } = evaluateTerm(tokens));
    switch (token.operator) {
      case "add":
        leftValue = add(leftValue, rightValue);
        break;
      case "subtract":
        leftValue = subtract(leftValue, rightValue);
        break;
      default:
        assertNever(token.operator);
    }
    token = tryPeekItem(tokens, 0);
  }
  return { tokens, value: leftValue };
}
