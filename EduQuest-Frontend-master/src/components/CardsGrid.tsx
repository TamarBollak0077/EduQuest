import React from "react";
import CardButton from "./CardButton";
import { Card } from "../App";

interface CardsGridProps {
  cards: Card[];
  bonusCardId: number | null;
  bonusActive: boolean;
  handleCardClick: (card: Card) => void;
  Pink: string;
  Yellow: string;
  Turquoise: string;
  Grey: string;
}

const CardsGrid: React.FC<CardsGridProps> = ({ cards, bonusCardId, bonusActive, handleCardClick, Pink, Yellow, Turquoise, Grey }) => (
  <div className="grid grid-cols-6 gap-0 overflow-visible w-5/6 h-3/5 mx-auto">
    {cards.map((card, idx) => {
      const isBonusCard = bonusCardId === card.id;
      const isBonusSecondClick = bonusActive && card.revealed && card.color !== "";
      const gameFinished = cards.every(c => c.revealed || c.type === "lose");
      const finishDelay = gameFinished ? `${(Math.random() * 0.5).toFixed(2)}s` : undefined;
      let smearImg = Grey;
      if (card.revealed && card.type === "lose" && !card.isBonusSecondClick) {
        smearImg = "";
      } else if (card.revealed && card.color === "pink") smearImg = Pink;
      else if (card.revealed && card.color === "yellow") smearImg = Yellow;
      else if (card.revealed && card.color === "turquoise") smearImg = Turquoise;
      const row = Math.floor(idx / 6);
      const overlapStyle = row > 0 ? { marginTop: '-4rem' } : {};
      const rotation = ((idx * 37) % 30) - 15;
      const tx = ((idx * 53) % 40) - 20;
      const ty = ((idx * 97) % 40) - 20;
      const transformStyle = `rotate(${rotation}deg) translate(${tx}px, ${ty}px)`;
      // קבלת מחלקת האנימציה מהפונקציה המקורית
      // יש לייבא getCardAnimation מ-App אם צריך, או להעתיק את הלוגיקה כאן
      // כאן נניח שמועבר כ-prop או נעתיק את הלוגיקה
      // לצורך הדגמה, נניח שמועבר כ-prop בשם animationClass
      // בפועל, יש להוסיף את המחלקה ל-className של CardButton
      // לדוגמה:
      // animationClass={getCardAnimation(card, isBonusCard, isBonusSecondClick, gameFinished)}
      // ואז ב-CardButton להוסיף ל-className
      // כאן נעתיק את הלוגיקה:
      let animationClass = "";
      if (gameFinished) {
        animationClass = "animate-bounce-finish";
      } else if (isBonusCard) {
        animationClass = "animate-bonus";
      } else if (isBonusSecondClick) {
        animationClass = "animate-color-pulse";
      } else if (card.type === "task" && card.revealed) {
        animationClass = "animate-task";
      } else if (card.type === "lose" && card.revealed) {
        animationClass = "animate-lose";
      } else if (card.color !== "") {
        animationClass = "animate-color-pulse";
      }
      return (
        <CardButton
          key={card.id}
          smearImg={smearImg}
          transformStyle={transformStyle}
          finishDelay={finishDelay}
          onClick={() => handleCardClick(card)}
          overlapStyle={overlapStyle}
          animationClass={animationClass}
        />
      );
    })}
  </div>
);

export default CardsGrid;
