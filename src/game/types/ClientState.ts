import type { Card } from "@hellacardgames/lib";
import type { ChatMessage } from "./ChatMessage.js";
import type { PlayerStatus } from "./PlayerStatus.js";
import type { ExpressionToken } from "./ExpressionToken.js";

export type ClientState = {
  readonly status: "created" | "started" | "completed" | "forfeited";
  readonly gameId: string;
  readonly playerId: string;
  readonly player: Player;
  readonly otherPlayer: OtherPlayer | null;
  readonly adminUsername: string;
  readonly deckSize: number;
  readonly sourceCards: readonly Card[];
  readonly targetCard: Card | null;
  readonly expiresAt: number;
  readonly chatMessages: readonly ChatMessage[];
};

type Player = {
  readonly username: string;
  readonly status: PlayerStatus;
  readonly skipped: boolean;
  readonly expressionTokens: readonly ExpressionToken[];
  readonly numCardsCollected: number;
  readonly roundWinner: boolean;
};

type OtherPlayer = {
  readonly username: string;
  readonly status: PlayerStatus;
  readonly skipped: boolean;
  readonly expressionTokens: readonly ExpressionToken[] | readonly null[];
  readonly numCardsCollected: number;
  readonly roundWinner: boolean;
};
