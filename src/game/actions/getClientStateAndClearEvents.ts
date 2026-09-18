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
    },
    otherPlayer: otherPlayer ? { username: otherPlayer.username } : null,
    adminUsername: getPlayer(game, game.adminId).player.username,
    expiresAt: game.expiresAt,
    chatMessages: game.chatMessages,
  };
});
