import { useState, useEffect } from "react";
import { Card, CardType, TeamColor } from "../App";

export const teams: TeamColor[] = ["pink", "yellow", "turquoise"];

export function useGameLogic() {
  // create new cards
  const generateCards = (): Card[] => {
    const totalCards = 30;
    const maxLose = Math.floor(totalCards * 0.25);
    let loseCount = 0;
    const cards: Card[] = [];
    for (let i = 0; i < totalCards; i++) {
      let type: CardType;
      const rand = Math.random();
      if (rand < 0.25 && loseCount < maxLose) {
        type = "lose";
        loseCount++;
      } else {
        type = rand < 0.625 ? "task" : "extra";
      }
      cards.push({ id: i, type, color: "", revealed: false });
    }
    // Shuffle cards
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  // Load game state from localStorage if exists
  const loadGameState = () => {
    try {
      const saved = localStorage.getItem('eduquest-game-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.cards)) return parsed.cards;
      }
    } catch { }
    return generateCards();
  };

  const [cards, setCards] = useState<Card[]>(loadGameState());
  useEffect(() => {
    localStorage.setItem('eduquest-game-state', JSON.stringify({ cards }));
  }, [cards]);

  // Dynamic scoring with deduction for lose card
  const getTeamScore = (team: TeamColor) => {
    let score = 0;
    cards.forEach(card => {
      if (card.color === team) {
        if (card.isBonusSecondClick) {
          score += 1;
        } else {
          if (card.type === "task" || card.type === "extra") {
            score += 2;
          } else if (card.type === "lose") {
            score -= 2;
          }
        }
      }
    });
    return score;
  };

  const getWinner = () => {
    const counts = teams.map(t => ({ team: t, score: getTeamScore(t) }));
    counts.sort((a, b) => b.score - a.score);
    const maxScore = counts[0].score;
    const winners = counts.filter(c => c.score === maxScore && maxScore > 0).map(c => c.team);
    if (winners.length > 1) {
      return `תיקו בין הקבוצות: ${winners.map(w => w.toUpperCase()).join(", ")}`;
    }
    return winners.length === 1 ? winners[0].toUpperCase() : "";
  };

  // Function to paint a card
  const paintCard = (card: Card, currentTeam: TeamColor, isBonusSecondClick: boolean = false) => {
    setCards(cards.map(c => {
      if (c.id !== card.id) return c;
      if (card.type === "lose" && !isBonusSecondClick) {
        return { ...c, color: currentTeam, revealed: true };
      } else {
        return { ...c, color: currentTeam, revealed: true, isBonusSecondClick };
      }
    }));
  };

  // Function to start a new game
  const startNewGame = () => {
    setCards(generateCards());
    localStorage.removeItem('eduquest-game-state');
  };

  return {
    cards,
    setCards,
    generateCards,
    getTeamScore,
    getWinner,
    paintCard,
    startNewGame,
  };
}
