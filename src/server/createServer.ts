import { z } from "zod";
import { createServerFactory } from "@hellacardgames/lib";
import { createManager } from "../manager/index.js";
import { OPERATORS, PARENTHESES } from "../game/index.js";

export type Server = ReturnType<typeof createServer>;

export const createServer = createServerFactory(createManager, {
  appendCard: z
    .object({
      gameId: z.string(),
      playerId: z.string(),
      cardId: z.string(),
    })
    .transform(
      ({ gameId, playerId, cardId }) => [gameId, playerId, cardId] as const,
    ),

  appendOperator: z
    .object({
      gameId: z.string(),
      playerId: z.string(),
      operator: z.enum(OPERATORS),
    })
    .transform(
      ({ gameId, playerId, operator }) => [gameId, playerId, operator] as const,
    ),

  appendParenthesis: z
    .object({
      gameId: z.string(),
      playerId: z.string(),
      parenthesis: z.enum(PARENTHESES),
    })
    .transform(
      ({ gameId, playerId, parenthesis }) =>
        [gameId, playerId, parenthesis] as const,
    ),

  clearExpression: z
    .object({
      gameId: z.string(),
      playerId: z.string(),
    })
    .transform(({ gameId, playerId }) => [gameId, playerId] as const),

  reportReadyForNextRound: z
    .object({
      gameId: z.string(),
      playerId: z.string(),
    })
    .transform(({ gameId, playerId }) => [gameId, playerId] as const),

  skip: z
    .object({
      gameId: z.string(),
      playerId: z.string(),
    })
    .transform(({ gameId, playerId }) => [gameId, playerId] as const),

  submitExpression: z
    .object({
      gameId: z.string(),
      playerId: z.string(),
    })
    .transform(({ gameId, playerId }) => [gameId, playerId] as const),
});
