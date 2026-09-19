import {
  emitEvent,
  emitEventToOtherPlayer,
  emitEventToPlayer,
  getAceLowRankValue,
  getPlayer,
  tryGetPlayer,
  updatePlayer,
  updatePlayers,
} from "@hellacardgames/lib";
import {
  EXPIRY_EXTENSION_MS,
  NUM_SOURCE_CARDS_PLUS_TARGET,
} from "../constants.js";
import { evaluateExpression } from "../lib/evaluateExpression.js";
import { transitionGameToCompleted } from "../lib/transitionGameToCompleted.js";
import type { Game } from "../types/Game.js";

export function submitExpression(game: Game, playerId: string) {
  let { player } = tryGetPlayer(game, playerId);
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
  const result = evaluateExpression(player.expressionTokens);
  if (!result.success) {
    return { success: false, error: "invalidExpression" } as const;
  }
  if (result.value !== getAceLowRankValue(game.targetCard.rank)) {
    return { success: false, error: "notEqualToTarget" } as const;
  }

  game = updatePlayer(game, player.id, (p) => ({
    ...p,
    numCardsCollected: p.numCardsCollected + NUM_SOURCE_CARDS_PLUS_TARGET,
    roundWinner: true,
  }));

  game = updatePlayers(game, (p) => ({ ...p, status: "reviewingOutcome" }));

  ({ player } = getPlayer(game, player.id));

  game = emitEventToPlayer(game, player.id, {
    type: "playerWonRound",
    numCardsCollected: player.numCardsCollected,
  });
  game = emitEventToOtherPlayer(game, player.id, {
    type: "otherPlayerWonRound",
    numCardsCollected: player.numCardsCollected,
    expressionTokens: player.expressionTokens,
  });

  if (game.deck.length < NUM_SOURCE_CARDS_PLUS_TARGET) {
    game = transitionGameToCompleted(game);
    game = emitEvent(game, { type: "gameCompleted" });
  }

  game = { ...game, expiresAt: Date.now() + EXPIRY_EXTENSION_MS };
  game = emitEvent(game, {
    type: "expirationUpdated",
    expiresAt: game.expiresAt,
  });

  return { success: true, game } as const;
}
