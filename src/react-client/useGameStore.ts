import { useEffect, useMemo, useState } from "react";
import { applyEvent } from "./applyEvent.js";
import { createClient } from "../client/index.js";
import type {
  Client,
  ClientState,
  Operator,
  Parenthesis,
} from "../client/index.js";

const GET_EVENTS_INTERVAL_MS = 500;

export type GameStore = {
  readonly state: ClientState;
  readonly appendCard: (cardId: string) => ReturnType<Client["appendCard"]>;
  readonly appendOperator: (
    operator: Operator,
  ) => ReturnType<Client["appendOperator"]>;
  readonly appendParenthesis: (
    parenthesis: Parenthesis,
  ) => ReturnType<Client["appendParenthesis"]>;
  readonly clearExpression: () => ReturnType<Client["clearExpression"]>;
  readonly leaveGame: () => ReturnType<Client["leaveGame"]>;
  readonly reportReadyForNextRound: () => ReturnType<
    Client["reportReadyForNextRound"]
  >;
  readonly sendChat: (text: string) => ReturnType<Client["sendChat"]>;
  readonly skip: () => ReturnType<Client["skip"]>;
  readonly startGame: () => ReturnType<Client["startGame"]>;
  readonly submitExpression: () => ReturnType<Client["submitExpression"]>;
};

type GetClientStateAndClearEventsError = Extract<
  Awaited<ReturnType<Client["getClientStateAndClearEvents"]>>,
  { success: false }
>["error"];

type GetEventsAndClearAcknowledgedError = Extract<
  Awaited<ReturnType<Client["getEventsAndClearAcknowledged"]>>,
  { success: false }
>["error"];

export function useGameStore(
  baseUrl: string,
  gameId: string | null,
  playerId: string | null,
) {
  const client = useMemo(() => createClient(baseUrl), [baseUrl]);

  const [initialState, setInitialState] = useState<ClientState | null>(null);
  const [game, setGame] = useState<
    | GameStore
    | GetClientStateAndClearEventsError
    | GetEventsAndClearAcknowledgedError
    | null
  >(null);

  useEffect(() => {
    if (gameId === null || playerId === null) {
      return;
    }
    const doGetClientState = async () => {
      const result = await client.getClientStateAndClearEvents(
        gameId,
        playerId,
      );
      if (!result.success) {
        setGame(result.error);
        return;
      }
      setInitialState(result.state);
    };
    doGetClientState();
  }, [client, gameId, playerId]);

  useEffect(() => {
    if (!initialState) {
      return;
    }

    const { gameId, playerId } = initialState;
    let intervalId: number | null = null;

    const processedEventIds = new Set<string>();
    let lastReadEventId = "";
    let isLeaving = false;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGame({
      state: initialState,
      appendCard: (cardId: string) =>
        client.appendCard(gameId, playerId, cardId),
      appendOperator: (operator: Operator) =>
        client.appendOperator(gameId, playerId, operator),
      appendParenthesis: (parenthesis: Parenthesis) =>
        client.appendParenthesis(gameId, playerId, parenthesis),
      clearExpression: () => client.clearExpression(gameId, playerId),
      leaveGame: async () => {
        isLeaving = true;
        const result = await client.leaveGame(gameId, playerId);
        if (!result.success) {
          isLeaving = false;
        }
        return result;
      },
      reportReadyForNextRound: () =>
        client.reportReadyForNextRound(gameId, playerId),
      sendChat: (text: string) => client.sendChat(gameId, playerId, text),
      skip: () => client.skip(gameId, playerId),
      startGame: () => client.startGame(gameId, playerId),
      submitExpression: () => client.submitExpression(gameId, playerId),
    });

    intervalId = window.setInterval(async () => {
      if (isLeaving) {
        return;
      }
      const result = await client.getEventsAndClearAcknowledged(
        gameId,
        playerId,
        lastReadEventId,
      );
      if (!result.success) {
        if (intervalId !== null) {
          window.clearInterval(intervalId);
        }
        setGame(result.error);
        return;
      }
      lastReadEventId = result.events[result.events.length - 1]?.id ?? "";
      for (const event of result.events) {
        if (processedEventIds.has(event.id)) {
          console.warn("Duplicate event detected... Ignoring!", event);
          continue;
        }
        processedEventIds.add(event.id);
        console.log(event);
        setGame((prev) => {
          if (typeof prev === "string" || prev === null) {
            return prev;
          }
          return {
            ...prev,
            state: applyEvent(prev.state, event),
          };
        });
      }
    }, GET_EVENTS_INTERVAL_MS);

    return () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [client, initialState]);

  return game;
}
