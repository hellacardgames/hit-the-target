import { createClientFactory } from "@hellacardgames/lib";
import type { Manager } from "../manager/createManager.js";
import type { Server } from "../server/createServer.js";
import type { Operator, Parenthesis } from "../game/index.js";

export type Client = ReturnType<typeof createClient>;

export const createClient = createClientFactory<Server, Manager>({
  appendCard: (gameId: string, playerId: string, cardId: string) => ({
    gameId,
    playerId,
    cardId,
  }),
  appendOperator: (gameId: string, playerId: string, operator: Operator) => ({
    gameId,
    playerId,
    operator,
  }),
  appendParenthesis: (
    gameId: string,
    playerId: string,
    parenthesis: Parenthesis,
  ) => ({
    gameId,
    playerId,
    parenthesis,
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
