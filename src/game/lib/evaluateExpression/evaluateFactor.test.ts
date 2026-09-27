import { expect, test } from "vitest";
import { evaluateFactor } from "./evaluateFactor.js";

test("consumes card token and returns correct value", () => {
  expect(
    evaluateFactor([
      { type: "card", card: { id: "card-id-001", rank: "2", suit: "clubs" } },
    ]),
  ).toEqual({ tokens: [], value: { numerator: 2, denominator: 1 } });
});

test("Consumes tokens and returns correct value when given a sub-expression", () => {
  expect(
    evaluateFactor([
      { type: "parenthesis", parenthesis: "left" },
      { type: "card", card: { id: "card-id-001", rank: "2", suit: "clubs" } },
      { type: "operator", operator: "add" },
      { type: "card", card: { id: "card-id-001", rank: "5", suit: "clubs" } },
      { type: "parenthesis", parenthesis: "right" },
    ]),
  ).toEqual({ tokens: [], value: { numerator: 7, denominator: 1 } });
});

test("throws proper errors", () => {
  expect(() => evaluateFactor([])).toThrow(
    "Expected card or left parenthesis but received nothing.",
  );
  expect(() => evaluateFactor([{ type: "operator", operator: "add" }])).toThrow(
    "Expected card or left parenthesis but received a different token.",
  );
  expect(() =>
    evaluateFactor([{ type: "operator", operator: "subtract" }]),
  ).toThrow(
    "Expected card or left parenthesis but received a different token.",
  );
  expect(() =>
    evaluateFactor([{ type: "operator", operator: "multiply" }]),
  ).toThrow(
    "Expected card or left parenthesis but received a different token.",
  );
  expect(() =>
    evaluateFactor([{ type: "operator", operator: "divide" }]),
  ).toThrow(
    "Expected card or left parenthesis but received a different token.",
  );
  expect(() =>
    evaluateFactor([{ type: "parenthesis", parenthesis: "right" }]),
  ).toThrow(
    "Expected card or left parenthesis but received a different token.",
  );
  expect(() =>
    evaluateFactor([
      { type: "parenthesis", parenthesis: "left" },
      { type: "card", card: { id: "card-id-001", rank: "2", suit: "clubs" } },
    ]),
  ).toThrow("Expected right parenthesis but received nothing.");
  expect(() =>
    evaluateFactor([
      { type: "parenthesis", parenthesis: "left" },
      { type: "card", card: { id: "card-id-001", rank: "2", suit: "clubs" } },
      { type: "parenthesis", parenthesis: "left" },
    ]),
  ).toThrow("Expected right parenthesis but received a different token.");
  expect(() =>
    evaluateFactor([
      { type: "parenthesis", parenthesis: "left" },
      { type: "card", card: { id: "card-id-001", rank: "2", suit: "clubs" } },
      { type: "card", card: { id: "card-id-001", rank: "2", suit: "clubs" } },
    ]),
  ).toThrow("Expected right parenthesis but received a different token.");
});
