import {
  emitEventToOtherPlayer,
  emitEventToPlayer,
  tryGetPlayer,
  updatePlayer,
} from "@hellacardgames/lib";
import type { Game } from "../types/Game.js";

export function clearExpression(game: Game, playerId: string) {
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
    return { success: false, error: "playerSkipped" } as const;
  }

  game = updatePlayer(game, player.id, (p) => ({ ...p, expressionTokens: [] }));

  game = emitEventToPlayer(game, player.id, {
    type: "playerClearedExpression",
  });
  game = emitEventToOtherPlayer(game, player.id, {
    type: "otherPlayerClearedExpression",
  });

  return { success: true, game } as const;
}
