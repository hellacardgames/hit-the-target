import { tryGetPlayer } from "@hellacardgames/lib";
import type { Game } from "../types/Game.js";

export function skip(game: Game, playerId: string) {
  const { player } = tryGetPlayer(game, playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" } as const;
  }
  if (game.status !== "started") {
    return { success: false, error: "invalidStatus" } as const;
  }

  return { success: true, game } as const;
}
