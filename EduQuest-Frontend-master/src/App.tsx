import React, { useState, useEffect } from "react";
// ...existing imports...
import Modal from "./Modal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Wheel } from "react-custom-roulette";
import Logo from './assets/Logo.png';
import Pink from './assets/Pink.png';
import Grey from './assets/Grey.png';
import Turquoise from './assets/Turquoise.png';
import Yellow from './assets/Yellow.png';
import CardsGrid from './components/CardsGrid';
import GroupWheel from './components/GroupWheel';
import ClassWheel from './components/ClassWheel';
import Toast from './components/Toast';
import ScoreModal from './components/ScoreModal';

// הגדרות גלובליות ל-TypeScript עבור window.__spinAudio ו-window.__victoryAudio
declare global {
  interface Window {
    __victoryAudio?: HTMLAudioElement;
    __spinAudio?: HTMLAudioElement | null;
  }
}
export { };

// הגדרות גלובליות ל-TypeScript עבור window.__spinAudio ו-window.__victoryAudio
declare global {
  interface Window {
    __victoryAudio?: HTMLAudioElement;
    __spinAudio?: HTMLAudioElement | null;
  }
}
export { };


export type CardType = "task" | "extra" | "lose";
export type TeamColor = "pink" | "yellow" | "turquoise" | "";

export interface Card {
  id: number;
  type: CardType;
  color: TeamColor;
  revealed: boolean;
  isBonusSecondClick?: boolean;
}

// const colorClasses: Record<TeamColor, string> = {
//   pink: "bg-[#ff00aaff]",
//   yellow: "bg-yellow-400",
//   turquoise: "bg-cyan-400",
//   "": "bg-gray-300"
// };

const teams: TeamColor[] = ["pink", "yellow", "turquoise"];
const generateCards = (): Card[] => {
  const totalCards = 30;
  const maxLose = Math.floor(totalCards * 0.25); // עד 25%
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

  // ערבוב קלפים
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
  }

  return cards;
};



function App() {
  // טעינת מצב המשחק מה-localStorage אם קיים
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
  // שמירת מצב המשחק בכל שינוי
  useEffect(() => {
    localStorage.setItem('eduquest-game-state', JSON.stringify({ cards }));
  }, [cards]);
  const [currentTeam, setCurrentTeam] = useState<TeamColor>("");
  // סטייט לשליטה על סיבוב הגלגל
  const [mustStartSpinning, setMustStartSpinning] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalTeam, setModalTeam] = useState<string>("");
  const [bonusActive, setBonusActive] = useState<boolean>(false);
  const [bonusCardId, setBonusCardId] = useState<number | null>(null);
  const [turnQueue, setTurnQueue] = useState<TeamColor[]>([]);
  const [toast, setToast] = useState<{ message: string; color: string; type: "win" | "lose" } | null>(null);
  const [pendingToast, setPendingToast] = useState<{ message: string; color: string; type: "win" | "lose" } | null>(null);
  // סטייט להצגת פופאפ ניקוד
  const [showScore, setShowScore] = useState(false);
  // צבעים לטוסט
  const toastColors: Record<TeamColor, string> = {
    pink: '#ff00aa',
    yellow: '#facc15',
    turquoise: '#5ce1e6',
    '': '#aaa'
  };

  // צבעים למודל לפי קבוצה
  const modalColors: Record<TeamColor, string> = { ...toastColors };

  const currentGroupColor = modalColors[currentTeam];
  // גלגל כיתות
  const classNumbers = [1, 2, 3, 4, 5, 6, 7];
  const [mustStartClassSpinning, setMustStartClassSpinning] = useState(false);
  const [classPrizeNumber, setClassPrizeNumber] = useState<number>(0);

  const playSound = (type: "spin" | "lose" | "bonus" | "task" | "finishGame" | "click" | "ding") => {
    // שמור רפרנס ל-audio עבור צליל ניצחון
    if (type === "finishGame") {
      if (window.__victoryAudio && typeof window.__victoryAudio.pause === "function") {
        window.__victoryAudio.pause();
        window.__victoryAudio.currentTime = 0;
      }
      window.__victoryAudio = new Audio(`/sounds/${type}.mp3`);
      window.__victoryAudio.play();
    } else if (type === "spin") {
      if (window.__spinAudio && typeof window.__spinAudio.pause === "function") {
        window.__spinAudio.pause();
        window.__spinAudio.currentTime = 0;
      }
      window.__spinAudio = new Audio(`/sounds/${type}.mp3`);
      window.__spinAudio.loop = true;
      window.__spinAudio.play();
    } else {
      const audio = new Audio(`/sounds/${type}.mp3`);
      audio.play();
    }
  };

  // פונקציה לסיבוב הגלגל
  const handleSpinClick = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * teams.length);
    } while (newIndex === prizeNumber && teams.length > 1);
    setPrizeNumber(newIndex);
    setMustStartSpinning(true);
    playSound("spin");
  };

  const handleClassSpinClick = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * classNumbers.length);
    } while (newIndex === classPrizeNumber && classNumbers.length > 1);
    setClassPrizeNumber(newIndex);
    setMustStartClassSpinning(true);
    // Play spin sound in loop
    if (window.__spinAudio && typeof window.__spinAudio.pause === "function") {
      window.__spinAudio.pause();
      window.__spinAudio.currentTime = 0;
    }
    window.__spinAudio = new Audio(`/sounds/spin.mp3`);
    window.__spinAudio.loop = true;
    window.__spinAudio.play();
  };

  const paintCard = (card: Card, isBonusSecondClick: boolean = false) => {
    setCards(cards.map(c => {
      if (c.id !== card.id) return c;
      if (card.type === "lose" && !isBonusSecondClick) {
        // קלף הפסד שנבחר ראשון: שומר צבע קבוצה לניקוד, אבל ייראה שקוף ברנדר
        return { ...c, color: currentTeam, revealed: true };
      } else {
        // כל שאר המקרים (כולל קלף הפסד שנבחר כקלף שני של בונוס): צובע
        return { ...c, color: currentTeam, revealed: true, isBonusSecondClick };
      }
    }));
  };

  const handleCardClick = (card: Card) => {
    // אפשר ללחוץ קלף שני של בונוס גם אם אין currentTeam
    if ((currentTeam && !card.revealed) || (bonusActive && !card.revealed && card.id !== bonusCardId)) {
      const isBonusSecondClick = bonusActive && card.id !== bonusCardId;
      let toastMsg = "";
      // צבע הטוסט והקלף השני של בונוס יהיה לפי הקבוצה של קלף הבונוס
      let bonusTeam = currentTeam;
      if (isBonusSecondClick && bonusCardId !== null) {
        const bonusCard = cards.find(c => c.id === bonusCardId);
        if (bonusCard && bonusCard.color) {
          bonusTeam = bonusCard.color;
        }
      }
      let toastColor = toastColors[bonusTeam];
      let toastType: "win" | "lose" = "win";

      if (isBonusSecondClick) {
        playSound("click");
        // צובע את הקלף השני של בונוס בצבע הקבוצה של קלף הבונוס
        setCards(cards.map(c => {
          if (c.id !== card.id) return c;
          // קלף שני של בונוס: תמיד צובע, גם אם זה קלף הפסד
          return { ...c, color: bonusTeam, revealed: true, isBonusSecondClick: true };
        }));
        toastMsg = `+1`;
        toastType = "win";
        setPendingToast({ message: toastMsg, color: toastColor, type: toastType });
        setBonusActive(false);
        setBonusCardId(null);
        setCurrentTeam("");
        return;
      }

      // קלף ראשון
      if (card.type === "task" || card.type === "extra") {
        playSound(card.type === "task" ? "task" : "bonus");
        paintCard(card);
        toastMsg = `+2`;
        toastType = "win";
        setPendingToast({ message: toastMsg, color: toastColor, type: toastType });
  setModalMessage(card.type === "task" ? "...כל הכבוד! והמשימה היא" : " !זכיתן בתור נוסף");
  setModalTeam(currentTeam);
        if (card.type === "extra") {
          setBonusActive(true);
          setBonusCardId(card.id);
        }
        setCurrentTeam("");
      } else if (card.type === "lose") {
        playSound("lose");
        paintCard(card); // revealed, כן צבע
        toastMsg = `-2`;
        toastType = "lose";
        setPendingToast({ message: toastMsg, color: toastColor, type: toastType });
  setModalMessage("אופססס! שטח שקוף");
  setModalTeam(currentTeam);
        setCurrentTeam("");
      }
    }
  };
  // Show toast only after modal closes
  useEffect(() => {
    if (!modalMessage && pendingToast) {
      setToast(pendingToast);
      setPendingToast(null);
    }
  }, [modalMessage, pendingToast]);
  // ניקוד דינמי עם הורדה לקלף הפסד
  const getTeamScore = (team: TeamColor) => {
    let score = 0;
    cards.forEach(card => {
      if (card.color === team) {
        if (card.isBonusSecondClick) {
          // קלף שני שנבחר אחרי קלף בונוס
          score += 1;
        } else {
          // קלף ראשון
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

  useEffect(() => {
    const allClicked = cards.every(c => c.revealed);
    if (allClicked && cards.length > 0) {
      playSound("finishGame");
      const counts = teams.map(t => ({ team: t, score: getTeamScore(t) }));
      counts.sort((a, b) => b.score - a.score);
      const maxScore = counts[0].score;
      const winners = counts.filter(c => c.score === maxScore && maxScore > 0).map(c => c.team);
      let modalColor = '';
      if (winners.length === 1) {
        // קבוצה אחת מנצחת
        modalColor = modalColors[winners[0]];
      } else if (winners.length > 1) {
        // תיקו בין קבוצות
        const colors = winners.map(w => {
          // הפוך לגרדיאנט צבעים
          if (w === 'pink') return '#ff00aa';
          if (w === 'yellow') return '#facc15';
          if (w === 'turquoise') return '#5ce1e6';
          return '#aaa';
        });
        modalColor = `linear-gradient(90deg, ${colors.join(', ')})`;
      } else {
        modalColor = modalColors[''];
      }
  const teamNames: Record<TeamColor, string> = { pink: 'ורוד', yellow: 'צהוב', turquoise: 'טורקיז', '': '' };
  setModalMessage(`המשחק הסתיים! ${winners.length === 1 ? `הקבוצה המנצחת: ${teamNames[winners[0]]}` : 'תיקו בין הקבוצות: ' + winners.map(w => teamNames[w]).join(", ")}`);
      setModalTeam(modalColor);
      setCurrentTeam("");
      setBonusActive(false);
      setBonusCardId(null);
    }
  }, [cards]);

  // פונקציה לקביעת אנימציות לכל קלף לפי סוגו ומצבו
  const getCardAnimation = (
    card: Card,
    isBonusCard: boolean,
    isBonusSecondClick: boolean,
    gameFinished: boolean
  ) => {
    if (gameFinished) {
      const delay = (Math.random() * 0.5).toFixed(2); // delay אקראי 0–0.5s
      return `animate-bounce-finish` + ` style={{ animationDelay: '${delay}s' }}`;
      // ב-React נשים את זה ישירות כ-style
    }

    if (isBonusCard) return "animate-bonus";
    if (isBonusSecondClick) return "animate-color-pulse";
    if (card.type === "task" && card.revealed) return "animate-task";
    if (card.type === "lose" && card.revealed) return "animate-lose";

    // קלפים צבועים בלבד
    if (card.color !== "") return "animate-color-pulse";

    return "";
  };

  const startNewGame = () => {
    // עצור צליל ניצחון אם מתנגן
    if (window.__victoryAudio && typeof window.__victoryAudio.pause === "function") {
      window.__victoryAudio.pause();
      window.__victoryAudio.currentTime = 0;
    }
    setCards(generateCards());
    setCurrentTeam("");
    setModalMessage("");
    setBonusActive(false);
    setBonusCardId(null);
    setTurnQueue([]);
    setToast(null);
    setPendingToast(null);
    localStorage.removeItem('eduquest-game-state');
  };



  return (
    <div
      className="relative p-6 min-h-screen overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/background3.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* לוגו בפינה השמאלית עליונה */}
      <div className="fixed top-4 left-4 z-50">
        <img src={Logo} alt="לוגו" style={{ width: 120, height: 120, filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 32px #fff)' }} />
      </div>
      <div className="flex justify-center items-center" style={{ height: 180, width: 180, margin: '0 auto' }}>
      </div>
      {/* כפתורים קבועים בפינה הימנית עליונה */}
      <div className="fixed top-7 right-4 z-50 flex gap-3 items-start">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px', marginRight: '10px' }}>
          {/* גלגל כיתות */}
          <div style={{ width: 90, maxWidth: '18vw', transform: 'scale(0.18)', marginTop: -200 }}>
            <ClassWheel
              mustStartClassSpinning={mustStartClassSpinning}
              classPrizeNumber={classPrizeNumber}
              classNumbers={classNumbers}
              onStopSpinning={() => {
                setMustStartClassSpinning(false);
                if (window.__spinAudio && typeof window.__spinAudio.pause === "function") {
                  window.__spinAudio.pause();
                  window.__spinAudio.currentTime = 0;
                  window.__spinAudio = null;
                }
                playSound('ding');
              }}
            />
          </div>
          {/* גלגל קבוצות */}
          <div style={{ width: 90, maxWidth: '18vw', transform: 'scale(0.18)', marginTop: -200 }}>
            <GroupWheel
              mustStartSpinning={mustStartSpinning}
              prizeNumber={prizeNumber}
              teams={teams}
              toastColors={toastColors}
              onStopSpinning={() => {
                setMustStartSpinning(false);
                setCurrentTeam(teams[prizeNumber]);
                if (window.__spinAudio && typeof window.__spinAudio.pause === "function") {
                  window.__spinAudio.pause();
                  window.__spinAudio.currentTime = 0;
                  window.__spinAudio = null;
                }
                playSound('ding');
              }}
            />
          </div>
          {/* כפתורים */}
          {/* כפתור ניקוד */}
          <button
            onClick={() => setShowScore(true)}
            className="game-btn pink icon-btn"
            style={{ marginLeft: 30 }}
            title="הצג ניקוד"
          >
            <img
              src="/assets/high-score.png"
              alt="ניקוד"
              style={{ width: 26, height: 26 }}
            />
          </button>

          {/* גלגל כיתות */}
          <button
            onClick={handleClassSpinClick}
            className="game-btn pink"
            title="בחר כיתה"
          >
            סיבוב גלגל כיתות
          </button>

          {/* גלגל קבוצות */}
          <button
            onClick={handleSpinClick}
            className="game-btn pink"
            title="בחר קבוצה"
          >
            סיבוב גלגל קבוצות
          </button>

          {/* משחק חדש */}
          <button
            onClick={startNewGame}
            className="game-btn pink"
            title="התחל משחק חדש"
          >
            משחק חדש
          </button>

        </div>
      </div>

      {/* גריד קלפים */}
      <div className="flex justify-center items-center w-full">
        <CardsGrid
          cards={cards}
          bonusCardId={bonusCardId}
          bonusActive={bonusActive}
          handleCardClick={handleCardClick}
          Pink={Pink}
          Yellow={Yellow}
          Turquoise={Turquoise}
          Grey={Grey}
        />
      </div>

      {/* פופאפ ניקוד */}
  <ScoreModal showScore={showScore} setShowScore={setShowScore} getTeamScore={getTeamScore} />
      {/* Toast */}
      {toast && (
        <Toast message={toast.message} color={toast.color} type={toast.type} onClose={() => setToast(null)} />
      )}


      {/* Modal */}
  {modalMessage && <Modal message={modalMessage} onClose={() => setModalMessage("")} groupColor={modalTeam} />}
    </div >
  );
}

export default App;
