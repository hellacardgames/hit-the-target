import { createManagerFactory } from "@hellacardgames/lib";
import {
  appendCard,
  appendOperator,
  appendParenthesis,
  clearExpression,
  createGame,
  getClientStateAndClearEvents,
  getEventsAndClearAcknowledged,
  joinGame,
  leaveGame,
  MAX_PLAYERS,
  reportReadyForNextRound,
  sendChat,
  skip,
  startGame,
  submitExpression,
} from "../game/index.js";

export type Manager = ReturnType<typeof createManager>;

export const createManager = createManagerFactory({
  maxPlayers: MAX_PLAYERS,
  createGame,
  getClientStateAndClearEvents,
  getEventsAndClearAcknowledged,
  joinGame,
  leaveGame,
  sendChat,
  startGame,
  gameplayActions: {
    appendCard,
    appendOperator,
    appendParenthesis,
    clearExpression,
    reportReadyForNextRound,
    skip,
    submitExpression,
  },
});
