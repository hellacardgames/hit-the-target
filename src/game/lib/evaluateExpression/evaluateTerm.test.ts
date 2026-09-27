import { expect, test } from "vitest";
import { evaluateTerm } from "./evaluateTerm.js";

test("consumes tokens and returns correct value", () => {
  expect(
    evaluateTerm([
      { type: "card", card: { id: "card-id-001", rank: "2", suit: "clubs" } },
    ]),
  ).toEqual({ tokens: [], value: { numerator: 2, denominator: 1 } });

  expect(
    evaluateTerm([
      { type: "card", card: { id: "card-id-001", rank: "2", suit: "clubs" } },
      { type: "operator", operator: "multiply" },
      { type: "card", card: { id: "card-id-002", rank: "5", suit: "clubs" } },
    ]),
  ).toEqual({ tokens: [], value: { numerator: 10, denominator: 1 } });

  expect(
    evaluateTerm([
      { type: "card", card: { id: "card-id-001", rank: "10", suit: "clubs" } },
      { type: "operator", operator: "divide" },
      { type: "card", card: { id: "card-id-002", rank: "5", suit: "clubs" } },
    ]),
  ).toEqual({ tokens: [], value: { numerator: 10, denominator: 5 } });

  expect(
    evaluateTerm([
      { type: "card", card: { id: "card-id-001", rank: "10", suit: "clubs" } },
      { type: "operator", operator: "divide" },
      { type: "card", card: { id: "card-id-002", rank: "5", suit: "clubs" } },
      { type: "operator", operator: "multiply" },
      { type: "card", card: { id: "card-id-003", rank: "3", suit: "clubs" } },
      { type: "operator", operator: "divide" },
      { type: "card", card: { id: "card-id-004", rank: "2", suit: "clubs" } },
    ]),
  ).toEqual({ tokens: [], value: { numerator: 30, denominator: 10 } });
});
