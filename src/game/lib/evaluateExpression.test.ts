import { expect, test } from "vitest";
import { evaluateExpression } from "./evaluateExpression.js";

test("computes the correct value", () => {
  expect(
    evaluateExpression([
      { type: "card", card: { id: "card-id-001", rank: "4", suit: "clubs" } },
      { type: "operator", operator: "add" },
      { type: "card", card: { id: "card-id-002", rank: "3", suit: "clubs" } },
      { type: "operator", operator: "multiply" },
      { type: "card", card: { id: "card-id-003", rank: "6", suit: "clubs" } },
      { type: "operator", operator: "divide" },
      { type: "card", card: { id: "card-id-004", rank: "2", suit: "clubs" } },
    ]),
  ).toEqual({ success: true, value: 13 });

  expect(
    evaluateExpression([
      { type: "parenthesis", parenthesis: "left" },
      { type: "card", card: { id: "card-id-001", rank: "4", suit: "clubs" } },
      { type: "operator", operator: "add" },
      { type: "card", card: { id: "card-id-002", rank: "3", suit: "clubs" } },
      { type: "parenthesis", parenthesis: "right" },
      { type: "operator", operator: "multiply" },
      { type: "card", card: { id: "card-id-003", rank: "6", suit: "clubs" } },
      { type: "operator", operator: "divide" },
      { type: "card", card: { id: "card-id-004", rank: "2", suit: "clubs" } },
    ]),
  ).toEqual({ success: true, value: 21 });

  expect(
    evaluateExpression([
      { type: "card", card: { id: "card-id-001", rank: "A", suit: "clubs" } },
      { type: "operator", operator: "divide" },
      { type: "card", card: { id: "card-id-002", rank: "3", suit: "clubs" } },
    ]),
  ).toEqual({ success: true, value: 1 / 3 });

  expect((1 / (7 * 7)) * (7 * 7)).toBe(0.9999999999999999);
  expect(
    evaluateExpression([
      { type: "card", card: { id: "card-id-001", rank: "A", suit: "clubs" } },
      { type: "operator", operator: "divide" },
      { type: "parenthesis", parenthesis: "left" },
      { type: "card", card: { id: "card-id-002", rank: "7", suit: "clubs" } },
      { type: "operator", operator: "multiply" },
      {
        type: "card",
        card: { id: "card-id-003", rank: "7", suit: "diamonds" },
      },
      { type: "parenthesis", parenthesis: "right" },
      { type: "operator", operator: "multiply" },
      { type: "parenthesis", parenthesis: "left" },
      { type: "card", card: { id: "card-id-004", rank: "7", suit: "hearts" } },
      { type: "operator", operator: "multiply" },
      { type: "card", card: { id: "card-id-005", rank: "7", suit: "spades" } },
      { type: "parenthesis", parenthesis: "right" },
    ]),
  ).toEqual({ success: true, value: 1 });
});

test("returns false when less than two cards in tokens", () => {
  expect(
    evaluateExpression([
      { type: "card", card: { id: "card-id-001", rank: "4", suit: "clubs" } },
    ]),
  ).toEqual({ success: false });
});

test("returns false when expression not valid", () => {
  expect(evaluateExpression([])).toEqual({ success: false });

  expect(evaluateExpression([{ type: "operator", operator: "add" }])).toEqual({
    success: false,
  });

  expect(
    evaluateExpression([
      { type: "card", card: { id: "card-id-001", rank: "5", suit: "clubs" } },
      { type: "card", card: { id: "card-id-002", rank: "5", suit: "hearts" } },
    ]),
  ).toEqual({
    success: false,
  });

  expect(
    evaluateExpression([
      { type: "card", card: { id: "card-id-001", rank: "5", suit: "clubs" } },
      { type: "operator", operator: "multiply" },
    ]),
  ).toEqual({
    success: false,
  });

  expect(
    evaluateExpression([
      { type: "parenthesis", parenthesis: "left" },
      { type: "card", card: { id: "card-id-001", rank: "5", suit: "clubs" } },
      { type: "operator", operator: "multiply" },
      { type: "card", card: { id: "card-id-002", rank: "5", suit: "hearts" } },
    ]),
  ).toEqual({
    success: false,
  });

  expect(
    evaluateExpression([
      { type: "card", card: { id: "card-id-001", rank: "5", suit: "clubs" } },
      { type: "operator", operator: "multiply" },
      { type: "card", card: { id: "card-id-002", rank: "5", suit: "hearts" } },
      { type: "parenthesis", parenthesis: "right" },
    ]),
  ).toEqual({
    success: false,
  });
});
