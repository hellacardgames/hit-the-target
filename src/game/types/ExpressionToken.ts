import type { Card } from "@hellacardgames/lib";

export type ExpressionToken =
  | { readonly type: "card"; readonly card: Card }
  | { readonly type: "operator"; readonly operator: Operator }
  | { readonly type: "parenthesis"; readonly parenthesis: Parenthesis };

export type Operator = (typeof OPERATORS)[number];
export const OPERATORS = ["add", "subtract", "multiply", "divide"] as const;

export type Parenthesis = (typeof PARENTHESES)[number];
export const PARENTHESES = ["left", "right"] as const;
