export { createClient } from "./createClient.js";
import type { Client } from "./createClient.js";

export type { Client };

export type AppendCardResult = Awaited<ReturnType<Client["appendCard"]>>;
export type AppendOperatorResult = Awaited<
  ReturnType<Client["appendOperator"]>
>;
export type AppendParenthesisResult = Awaited<
  ReturnType<Client["appendParenthesis"]>
>;
export type ClearExpressionResult = Awaited<
  ReturnType<Client["clearExpression"]>
>;
export type CreateGameResult = Awaited<ReturnType<Client["createGame"]>>;
export type GetClientStateAndClearEventsResult = Awaited<
  ReturnType<Client["getClientStateAndClearEvents"]>
>;
export type GetEventsAndClearAcknowledgedResult = Awaited<
  ReturnType<Client["getEventsAndClearAcknowledged"]>
>;
export type GetJoinableGamesResult = Awaited<
  ReturnType<Client["getJoinableGames"]>
>;
export type JoinGameResult = Awaited<ReturnType<Client["joinGame"]>>;
export type LeaveGameResult = Awaited<ReturnType<Client["leaveGame"]>>;
export type ReportReadyForNextRoundResult = Awaited<
  ReturnType<Client["reportReadyForNextRound"]>
>;
export type SendChatResult = Awaited<ReturnType<Client["sendChat"]>>;
export type SkipResult = Awaited<ReturnType<Client["skip"]>>;
export type StartGameResult = Awaited<ReturnType<Client["startGame"]>>;
export type SubmitExpressionResult = Awaited<
  ReturnType<Client["submitExpression"]>
>;

export type {
  Card,
  ChatMessage,
  ClientState,
  GameEvent,
  Operator,
  Parenthesis,
} from "../game/index.js";
