import type { Card } from "@hellacardgames/lib";
import type { CreatedGame, StartedGame } from "../types/Game.js";

export function transitionGameToStarted(
  game: CreatedGame,
  deck: readonly Card[],
  sourceCards: readonly Card[],
  targetCard: Card,
): StartedGame {
  return {
    ...game,
    status: "started",
    deck,
    sourceCards,
    targetCard,
  };
}
