import type { ExpressionToken } from "./ExpressionToken.js";
import type { GameEvent } from "./GameEvent.js";
import type { PlayerStatus } from "./PlayerStatus.js";

export type Player = {
  readonly id: string;
  readonly userId: string;
  readonly username: string;
  readonly events: readonly GameEvent[];
  readonly status: PlayerStatus;
  readonly skipped: boolean;
  readonly expressionTokens: readonly ExpressionToken[];
  readonly numCardsCollected: number;
  readonly roundWinner: boolean;
};
