import type { Card } from "@hellacardgames/lib";
import type { ChatMessage } from "./ChatMessage.js";
import type { ExpressionToken } from "./ExpressionToken.js";

export type GameEvent =
  | {
      readonly type: "adminChanged";
      readonly id: string;
      readonly username: string;
    }
  | {
      readonly type: "chat";
      readonly id: string;
      readonly message: ChatMessage;
    }
  | {
      readonly type: "expirationUpdated";
      readonly id: string;
      readonly expiresAt: number;
    }
  | {
      readonly type: "gameCompleted";
      readonly id: string;
    }
  | {
      readonly type: "gameForfeited";
      readonly id: string;
    }
  | {
      readonly type: "gameStarted";
      readonly id: string;
    }
  | {
      readonly type: "otherPlayerAppendedExpressionToken";
      readonly id: string;
      readonly expressionTokens: readonly null[];
    }
  | {
      readonly type: "otherPlayerClearedExpression";
      readonly id: string;
    }
  | {
      readonly type: "otherPlayerJoined";
      readonly id: string;
      readonly username: string;
    }
  | {
      readonly type: "otherPlayerLeft";
      readonly id: string;
    }
  | {
      readonly type: "otherPlayerReadyForNextRound";
      readonly id: string;
    }
  | {
      readonly type: "otherPlayerSkipped";
      readonly id: string;
    }
  | {
      readonly type: "otherPlayerWonRound";
      readonly id: string;
      readonly numCardsCollected: number;
      readonly expressionTokens: readonly ExpressionToken[];
    }
  | {
      readonly type: "playerAppendedExpressionToken";
      readonly id: string;
      readonly token: ExpressionToken;
    }
  | {
      readonly type: "playerClearedExpression";
      readonly id: string;
    }
  | {
      readonly type: "playerReadyForNextRound";
      readonly id: string;
    }
  | {
      readonly type: "playerSkipped";
      readonly id: string;
    }
  | {
      readonly type: "playerWonRound";
      readonly id: string;
      readonly numCardsCollected: number;
    }
  | {
      readonly type: "roundSkipped";
      readonly id: string;
    }
  | {
      readonly type: "roundStarted";
      readonly id: string;
      readonly sourceCards: readonly Card[];
      readonly targetCard: Card;
      readonly deckSize: number;
    };
