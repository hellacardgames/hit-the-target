import { takeLastItem, takeLastItems } from "@hellacardgames/lib";
import { NUM_SOURCE_CARDS } from "../constants.js";
import type { Card } from "@hellacardgames/lib";

type DealCardsResult = {
  readonly deck: readonly Card[];
  readonly sourceCards: readonly Card[];
  readonly targetCard: Card;
};

export function dealCards(deck: readonly Card[]): DealCardsResult {
  const { items: sourceCards, collection: deckAfterSourceCards } =
    takeLastItems(deck, NUM_SOURCE_CARDS);
  const { item: targetCard, collection: remainingDeck } =
    takeLastItem(deckAfterSourceCards);

  return {
    deck: remainingDeck,
    sourceCards,
    targetCard,
  };
}
