import type { ClientState, GameEvent } from "../client/index.js";

export function applyEvent(
  previousState: ClientState,
  event: GameEvent,
): ClientState {
  switch (event.type) {
    case "adminChanged":
      return {
        ...previousState,
        adminUsername: event.username,
      };
    case "chat":
      return {
        ...previousState,
        chatMessages: [...previousState.chatMessages, event.message],
      };
    case "expirationUpdated":
      return { ...previousState, expiresAt: event.expiresAt };
    case "gameCompleted":
      return { ...previousState, status: "completed" };
    case "gameForfeited":
      return { ...previousState, status: "forfeited" };
    case "gameStarted":
      return { ...previousState, status: "started" };
    case "otherPlayerAppendedExpressionToken":
      return {
        ...previousState,
        otherPlayer: previousState.otherPlayer
          ? {
              ...previousState.otherPlayer,
              expressionTokens: event.expressionTokens,
            }
          : null,
      };
    case "otherPlayerClearedExpression":
      return {
        ...previousState,
        otherPlayer: previousState.otherPlayer
          ? {
              ...previousState.otherPlayer,
              expressionTokens: [],
            }
          : null,
      };
    case "otherPlayerJoined":
      return {
        ...previousState,
        otherPlayer: {
          username: event.username,
          status: "waitingForGameToStart",
          skipped: false,
          expressionTokens: [],
          numCardsCollected: 0,
          roundWinner: false,
        },
      };
    case "otherPlayerLeft":
      return {
        ...previousState,
        otherPlayer: null,
      };
    case "otherPlayerReadyForNextRound":
      return {
        ...previousState,
        otherPlayer: previousState.otherPlayer
          ? {
              ...previousState.otherPlayer,
              status: "readyForNextRound",
            }
          : null,
      };
    case "otherPlayerSkipped":
      return {
        ...previousState,
        otherPlayer: previousState.otherPlayer
          ? {
              ...previousState.otherPlayer,
              skipped: true,
            }
          : null,
      };
    case "otherPlayerWonRound":
      return {
        ...previousState,
        player: {
          ...previousState.player,
          status: "reviewingOutcome",
        },
        otherPlayer: previousState.otherPlayer
          ? {
              ...previousState.otherPlayer,
              status: "reviewingOutcome",
              numCardsCollected: event.numCardsCollected,
              expressionTokens: event.expressionTokens,
              roundWinner: true,
            }
          : null,
      };
    case "playerAppendedExpressionToken":
      return {
        ...previousState,
        player: {
          ...previousState.player,
          expressionTokens: [
            ...previousState.player.expressionTokens,
            event.token,
          ],
        },
      };
    case "playerClearedExpression":
      return {
        ...previousState,
        player: {
          ...previousState.player,
          expressionTokens: [],
        },
      };
    case "playerReadyForNextRound":
      return {
        ...previousState,
        player: {
          ...previousState.player,
          status: "readyForNextRound",
        },
      };
    case "playerSkipped":
      return {
        ...previousState,
        player: {
          ...previousState.player,
          skipped: true,
        },
      };
    case "playerWonRound":
      return {
        ...previousState,
        player: {
          ...previousState.player,
          status: "reviewingOutcome",
          numCardsCollected: event.numCardsCollected,
          roundWinner: true,
        },
        otherPlayer: previousState.otherPlayer
          ? {
              ...previousState.otherPlayer,
              status: "reviewingOutcome",
            }
          : null,
      };
    case "roundSkipped":
      return {
        ...previousState,
        player: {
          ...previousState.player,
          status: "reviewingOutcome",
        },
        otherPlayer: previousState.otherPlayer
          ? {
              ...previousState.otherPlayer,
              status: "reviewingOutcome",
            }
          : null,
      };
    case "roundStarted":
      return {
        ...previousState,
        deckSize: event.deckSize,
        sourceCards: event.sourceCards,
        targetCard: event.targetCard,
        player: {
          ...previousState.player,
          status: "buildingExpression",
          skipped: false,
          expressionTokens: [],
          roundWinner: false,
        },
        otherPlayer: previousState.otherPlayer
          ? {
              ...previousState.otherPlayer,
              status: "buildingExpression",
              skipped: false,
              expressionTokens: [],
              roundWinner: false,
            }
          : null,
      };
  }
}
