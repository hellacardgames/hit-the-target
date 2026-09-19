import {
  emitEvent,
  emitEventToOtherPlayer,
  emitEventToPlayer,
  tryGetPlayer,
  updatePlayer,
} from "@hellacardgames/lib";
import { startRound } from "../lib/startRound.js";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import type { Game } from "../types/Game.js";

export function reportReadyForNextRound(game: Game, playerId: string) {
  const { player } = tryGetPlayer(game, playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" } as const;
  }
  if (game.status !== "started") {
    return { success: false, error: "invalidStatus" } as const;
  }
  if (player.status !== "reviewingOutcome") {
    return { success: false, error: "invalidPlayerStatus" } as const;
  }

  game = updatePlayer(game, player.id, (p) => ({
    ...p,
    status: "readyForNextRound",
  }));

  game = emitEventToPlayer(game, player.id, {
    type: "playerReadyForNextRound",
  });
  game = emitEventToOtherPlayer(game, player.id, {
    type: "otherPlayerReadyForNextRound",
  });

  if (game.players.every((p) => p.status === "readyForNextRound")) {
    game = startRound(game);

    game = { ...game, expiresAt: Date.now() + EXPIRY_EXTENSION_MS };
    game = emitEvent(game, {
      type: "expirationUpdated",
      expiresAt: game.expiresAt,
    });
  }

  return { success: true, game } as const;
}
