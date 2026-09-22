import {
  appendItem,
  emitEventToOtherPlayer,
  emitEventToPlayer,
  getPlayer,
  updatePlayer,
} from "@hellacardgames/lib";
import type { ExpressionToken } from "../types/ExpressionToken.js";
import type { StartedGame } from "../types/Game.js";

export function appendExpressionToken(
  game: StartedGame,
  playerId: string,
  token: ExpressionToken,
): StartedGame {
  const { player } = getPlayer(game, playerId);

  const expressionTokens = appendItem(player.expressionTokens, token);
  game = updatePlayer(game, player.id, (p) => ({ ...p, expressionTokens }));

  game = emitEventToPlayer(game, player.id, {
    type: "playerAppendedExpressionToken",
    token,
  });
  game = emitEventToOtherPlayer(game, player.id, {
    type: "otherPlayerAppendedExpressionToken",
    expressionTokens: expressionTokens.map(() => null),
  });

  return game;
}
