import { tryGetPlayer } from "@hellacardgames/lib";
import { MAX_EXPRESSION_TOKENS } from "../constants.js";
import { appendExpressionToken } from "../lib/appendExpressionToken.js";
import type { Game } from "../types/Game.js";

export function appendCard(game: Game, playerId: string, cardId: string) {
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
  if (player.expressionTokens.length === MAX_EXPRESSION_TOKENS) {
    return { success: false, error: "maxTokensReached" } as const;
  }
  const card = game.sourceCards.find((c) => c.id === cardId);
  if (!card) {
    return { success: false, error: "cardNotFound" } as const;
  }
  if (
    player.expressionTokens.find(
      (t) => t.type === "card" && t.card.id === card.id,
    )
  ) {
    return { success: false, error: "cardAlreadyUsed" } as const;
  }

  game = appendExpressionToken(game, player.id, { type: "card", card });

  return { success: true, game } as const;
}
