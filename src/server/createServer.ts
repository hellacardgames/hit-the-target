import { z } from "zod";
import { createServerFactory } from "@hellacardgames/lib";
import { createManager } from "../manager/index.js";

export type Server = ReturnType<typeof createServer>;

export const createServer = createServerFactory(createManager, {
  appendExpressionToken: z
    .object({
      gameId: z.string(),
      playerId: z.string(),
    })
    .transform(({ gameId, playerId }) => [gameId, playerId] as const),

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
