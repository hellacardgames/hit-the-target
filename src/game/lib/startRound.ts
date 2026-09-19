import { CARDS, emitEvent, shuffle, updatePlayers } from "@hellacardgames/lib";
import { dealCards } from "./dealCards.js";
import { transitionGameToStarted } from "./transitionGameToStarted.js";
import type { CreatedGame, StartedGame } from "../types/Game.js";

export function startRound(game: CreatedGame | StartedGame): StartedGame {
  if (game.status === "created") {
    const { deck, sourceCards, targetCard } = dealCards(shuffle(CARDS));
    game = transitionGameToStarted(game, deck, sourceCards, targetCard);
    game = emitEvent(game, { type: "gameStarted" });
  } else {
    if (game.players.every((p) => p.skipped)) {
      game = {
        ...game,
        deck: shuffle([...game.deck, ...game.sourceCards, game.targetCard]),
      };
    }
    const { deck, sourceCards, targetCard } = dealCards(game.deck);
    game = { ...game, deck, sourceCards, targetCard };
  }

  game = updatePlayers(game, (p) => ({
    ...p,
    status: "buildingExpression",
    skipped: false,
    expressionTokens: [],
    roundWinner: false,
  }));

  game = emitEvent(game, {
    type: "roundStarted",
    sourceCards: game.sourceCards,
    targetCard: game.targetCard,
    deckSize: game.deck.length,
  });

  return game;
}
