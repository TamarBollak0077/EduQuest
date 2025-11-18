import React from "react";

interface ModalProps {
  message: string;
  onClose?: () => void;
  showOptions?: boolean;   // אפשרות להראות כפתורי הצלחה/כישלון (לא בשימוש כרגע)
  onSuccess?: () => void;
  onFail?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  message,
  onClose = () => {},
  showOptions,
  onSuccess,
  onFail
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
      <p className="mb-4">{message}</p>

      {showOptions ? (
        <div className="flex justify-around">
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
        </div>
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
);

export default Modal;
