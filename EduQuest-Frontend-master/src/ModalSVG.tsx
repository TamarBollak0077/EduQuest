import React from "react";

interface ModalSVGProps {
  svgPath: string;
  onClose: () => void;
  onSuccess?: () => void;
  onFail?: () => void;
  showOptions?: boolean;
}

const ModalSVG: React.FC<ModalSVGProps> = ({
  svgPath,
  onClose,
  onSuccess,
  onFail,
  showOptions = false,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative max-w-md w-full">
        {/* SVG Modal */}
        <img src={svgPath} alt="modal template" className="w-full h-auto rounded-lg shadow-lg" />

        {/* לחצנים פעילים מעל ה-SVG */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-around">
          {showOptions ? (
            <>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={onSuccess}
              >
                הושלמה
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={onFail}
              >
                נכשלת
              </button>
            </>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={onClose}
            >
              סגור
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalSVG;
