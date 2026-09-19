import {
  emitEvent,
  emitEventToOtherPlayer,
  emitEventToPlayer,
  tryGetPlayer,
  updatePlayer,
  updatePlayers,
} from "@hellacardgames/lib";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import type { Game } from "../types/Game.js";

export function skip(game: Game, playerId: string) {
  const { player } = tryGetPlayer(game, playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" } as const;
  }
  if (game.status !== "started") {
    return { success: false, error: "invalidStatus" } as const;
  }
  if (player.status !== "buildingExpression") {
    return { success: false, error: "invalidPlayerStatus" } as const;
  }
  if (player.skipped) {
    return { success: false, error: "playerAlreadySkipped" } as const;
  }

  game = updatePlayer(game, player.id, (p) => ({ ...p, skipped: true }));

  game = emitEventToPlayer(game, player.id, { type: "playerSkipped" });
  game = emitEventToOtherPlayer(game, player.id, {
    type: "otherPlayerSkipped",
  });

  if (game.players.every((p) => p.skipped === true)) {
    game = updatePlayers(game, (p) => ({ ...p, status: "reviewingOutcome" }));

    game = emitEvent(game, { type: "roundSkipped" });

    game = { ...game, expiresAt: Date.now() + EXPIRY_EXTENSION_MS };
    game = emitEvent(game, {
      type: "expirationUpdated",
      expiresAt: game.expiresAt,
    });
  }

  return { success: true, game } as const;
}
