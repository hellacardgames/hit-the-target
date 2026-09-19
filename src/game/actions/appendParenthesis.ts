import { tryGetPlayer } from "@hellacardgames/lib";
import { MAX_EXPRESSION_TOKENS } from "../constants.js";
import { appendExpressionToken } from "../lib/appendExpressionToken.js";
import type { Game } from "../types/Game.js";
import type { Parenthesis } from "../types/ExpressionToken.js";

export function appendParenthesis(
  game: Game,
  playerId: string,
  parenthesis: Parenthesis,
) {
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

  game = appendExpressionToken(game, player.id, {
    type: "parenthesis",
    parenthesis,
  });

  return { success: true, game } as const;
}
