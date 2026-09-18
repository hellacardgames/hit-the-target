import { createClientFactory } from "@hellacardgames/lib";
import type { Manager } from "../manager/createManager.js";
import type { Server } from "../server/createServer.js";

export type Client = ReturnType<typeof createClient>;

export const createClient = createClientFactory<Server, Manager>({
  appendExpressionToken: (gameId: string, playerId: string) => ({
    gameId,
    playerId,
  }),
  clearExpression: (gameId: string, playerId: string) => ({
    gameId,
    playerId,
  }),
  reportReadyForNextRound: (gameId: string, playerId: string) => ({
    gameId,
    playerId,
  }),
  skip: (gameId: string, playerId: string) => ({
    gameId,
    playerId,
  }),
  submitExpression: (gameId: string, playerId: string) => ({
    gameId,
    playerId,
  }),
});
