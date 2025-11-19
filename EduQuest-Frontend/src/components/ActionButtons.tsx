import React from "react";

interface ActionButtonsProps {
    onShowScore: () => void;
    onClassSpin: () => void;
    onGroupSpin: () => void;
    onNewGame: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    onShowScore,
    onClassSpin,
    onGroupSpin,
    onNewGame,
}) => (
    <>
        {/* Score button */}
        <button
            onClick={onShowScore}
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
        {/* Class wheel */}
        <button
            onClick={onClassSpin}
            className="game-btn pink"
            title="בחר כיתה"
        >
            סיבוב גלגל כיתה
        </button>
        {/* Group wheel */}
        <button
            onClick={onGroupSpin}
            className="game-btn pink"
            title="בחר קבוצה"
        >
            סיבוב גלגל קבוצה
        </button>
        {/* משחק חדש */}
        <button
            onClick={onNewGame}
            className="game-btn pink"
            title="התחל משחק חדש"
        >
            משחק חדש
        </button>
    </>
);

export default ActionButtons;
