import { getAceLowRankValue, tryTakeItem } from "@hellacardgames/lib";
import { evaluateExpression } from "./evaluateExpression.js";
import type { ExpressionToken } from "../../types/ExpressionToken.js";
import type { Fraction } from "./types/Fraction.js";

type EvaluateFactorResult = {
  readonly tokens: readonly ExpressionToken[];
  readonly value: Fraction;
};

export function evaluateFactor(
  tokens: readonly ExpressionToken[],
): EvaluateFactorResult {
  let token: ExpressionToken | undefined;
  ({ collection: tokens, item: token } = tryTakeItem(tokens, 0));
  if (!token) {
    throw new Error("Expected card or left parenthesis but received nothing.");
  }
  if (token.type === "card") {
    return {
      tokens,
      value: { numerator: getAceLowRankValue(token.card.rank), denominator: 1 },
    };
  }
  if (token.type === "parenthesis" && token.parenthesis === "left") {
    let value: Fraction;
    ({ tokens, value } = evaluateExpression(tokens));
    ({ collection: tokens, item: token } = tryTakeItem(tokens, 0));
    if (!token) {
      throw new Error("Expected right parenthesis but received nothing.");
    }
    if (!(token.type === "parenthesis" && token.parenthesis === "right")) {
      throw new Error(
        "Expected right parenthesis but received a different token.",
      );
    }
    return { tokens, value };
  }
  throw new Error(
    "Expected card or left parenthesis but received a different token.",
  );
}
