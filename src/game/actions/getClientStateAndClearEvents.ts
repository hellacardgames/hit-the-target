import {
  getClientStateAndClearEventsFactory,
  getPlayer,
  tryGetOtherPlayer,
} from "@hellacardgames/lib";
import type { ClientState } from "../types/ClientState.js";
import type { Game } from "../types/Game.js";

export const getClientStateAndClearEvents = getClientStateAndClearEventsFactory<
  Game,
  ClientState
>((game, player) => {
  const { otherPlayer } = tryGetOtherPlayer(game, player.id);

  return {
    status: game.status,
    gameId: game.id,
    playerId: player.id,
    player: {
      username: player.username,
      status: player.status,
      skipped: player.skipped,
      expressionTokens: player.expressionTokens,
      numCardsCollected: player.numCardsCollected,
      roundWinner: player.roundWinner,
    },
    otherPlayer: otherPlayer
      ? {
          username: otherPlayer.username,
          status: otherPlayer.status,
          skipped: otherPlayer.skipped,
          expressionTokens: otherPlayer.roundWinner
            ? otherPlayer.expressionTokens
            : otherPlayer.expressionTokens.map(() => null),
          numCardsCollected: otherPlayer.numCardsCollected,
          roundWinner: otherPlayer.roundWinner,
        }
      : null,
    adminUsername: getPlayer(game, game.adminId).player.username,
    deckSize:
      game.status === "started" || game.status === "forfeited"
        ? game.deck.length
        : 0,
    sourceCards:
      game.status === "started" || game.status === "forfeited"
        ? game.sourceCards
        : [],
    targetCard:
      game.status === "started" || game.status === "forfeited"
        ? game.targetCard
        : null,
    expiresAt: game.expiresAt,
    chatMessages: game.chatMessages,
  };
});
