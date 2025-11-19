import React from "react";

interface ModalProps {
  message: string;
  onClose?: () => void;
  showOptions?: boolean;
  onSuccess?: () => void;
  onFail?: () => void;
  groupColor?: string;
}

const Modal: React.FC<ModalProps> = ({
  message,
  onClose = () => {},
  showOptions,
  onSuccess,
  onFail,
  groupColor = ''
}) => {
  console.log('Modal groupColor:', groupColor);
  // ממפה שם צבע לערך HEX
  const colorMap: Record<string, string> = {
    pink: '#ff00aa',
    yellow: '#facc15',
    turquoise: '#5ce1e6',
    '': '#e5e7eb'
  };
  const modalBg = colorMap[groupColor] || groupColor || '#e5e7eb';
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/60">
      {/* קלוז שאפשר ללחוץ */}
      <div
        className="relative max-w-sm w-full p-6 rounded-2xl shadow-[0_0_25px_6px_rgba(255,255,255,0.5)] border-2 border-white/70 text-center animate-fadeIn"
        style={{ background: modalBg }}
      >

      {/* איקס לסגירה */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white text-xl font-bold drop-shadow-lg hover:scale-110 transition-transform"
        aria-label="סגור"
      >
        ✕
      </button>

      {/* תוכן */}
      <p className="text-white text-lg font-semibold drop-shadow-[0_0_6px_white]">
        {message}
      </p>

      {/* כפתורי הצלחה/כישלון */}
      {showOptions && (
        <div className="flex justify-center gap-4 mt-8">

          <button
            onClick={onSuccess}
            className="
              px-5 py-2
              rounded-xl font-bold
              bg-green-400
              text-white
              shadow-[0_0_12px_2px_white]
              hover:bg-green-500 
              hover:scale-105 
              transition
            "
          >
            הושלמה
          </button>

          <button
            onClick={onFail}
            className="
              px-5 py-2
              rounded-xl font-bold
              bg-red-400
              text-white
              shadow-[0_0_12px_2px_white]
              hover:bg-red-500 
              hover:scale-105
              transition
            "
          >
            נכשלת
          </button>
        
        </div>
      )}
    </div>

    {/* אנימציה */}
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.92); }
        to   { opacity: 1; transform: scale(1); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.22s ease-out;
      }
    `}</style>

  </div>
  );
}

export default Modal;
