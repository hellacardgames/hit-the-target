import { expect, test } from "vitest";
import { evaluateExpression } from "./evaluateExpression.js";

test("consumes tokens and returns correct value", () => {
  expect(
    evaluateExpression([
      { type: "card", card: { id: "card-id-001", rank: "2", suit: "clubs" } },
    ]),
  ).toEqual({ tokens: [], value: { numerator: 2, denominator: 1 } });

  expect(
    evaluateExpression([
      { type: "card", card: { id: "card-id-001", rank: "2", suit: "clubs" } },
      { type: "operator", operator: "add" },
      { type: "card", card: { id: "card-id-002", rank: "5", suit: "clubs" } },
    ]),
  ).toEqual({ tokens: [], value: { numerator: 7, denominator: 1 } });

  expect(
    evaluateExpression([
      { type: "card", card: { id: "card-id-001", rank: "10", suit: "clubs" } },
      { type: "operator", operator: "subtract" },
      { type: "card", card: { id: "card-id-002", rank: "5", suit: "clubs" } },
    ]),
  ).toEqual({ tokens: [], value: { numerator: 5, denominator: 1 } });

  expect(
    evaluateExpression([
      { type: "card", card: { id: "card-id-001", rank: "10", suit: "clubs" } },
      { type: "operator", operator: "add" },
      { type: "card", card: { id: "card-id-002", rank: "5", suit: "clubs" } },
      { type: "operator", operator: "subtract" },
      { type: "card", card: { id: "card-id-003", rank: "3", suit: "clubs" } },
      { type: "operator", operator: "add" },
      { type: "card", card: { id: "card-id-004", rank: "2", suit: "clubs" } },
    ]),
  ).toEqual({ tokens: [], value: { numerator: 14, denominator: 1 } });
});
