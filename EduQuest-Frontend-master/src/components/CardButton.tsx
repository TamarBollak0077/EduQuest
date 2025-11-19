import React from "react";

interface CardButtonProps {
  smearImg: string;
  transformStyle: string;
  finishDelay?: string;
  onClick: () => void;
  overlapStyle?: React.CSSProperties;
  animationClass?: string;
}

const CardButton: React.FC<CardButtonProps> = ({ smearImg, transformStyle, finishDelay, onClick, overlapStyle, animationClass }) => (
  <button
    className={`relative max-w-xs -mx-6 bg-transparent border-none outline-none hover:scale-105 transition-transform overflow-visible ${animationClass || ''}`}
    style={{
      ...(finishDelay ? { animationDelay: finishDelay } : {}),
      ...overlapStyle,
      filter: 'drop-shadow(0 0 16px #fc90d8ff) drop-shadow(0 0 32px #ff368aff)'
    }}
    tabIndex={0}
    onClick={onClick}
  >
    {smearImg !== "" ? (
      <img
        src={smearImg}
        alt=""
        className="w-full h-full select-none object-contain"
        draggable={false}
        style={{ transform: transformStyle }}
      />
    ) : (
      <div style={{ width: '100%', height: '100%', opacity: 0 }} />
    )}
  </button>
);

export default CardButton;
