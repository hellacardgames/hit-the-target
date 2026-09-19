import type { ExpressionToken } from "../types/ExpressionToken.js";

type EvaluateExpressionResult =
  | {
      readonly success: true;
      readonly value: number;
    }
  | {
      readonly success: false;
    };

export function evaluateExpression(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tokens: readonly ExpressionToken[],
): EvaluateExpressionResult {
  // console.log(tokens);
  return { success: true, value: 0 };
}
