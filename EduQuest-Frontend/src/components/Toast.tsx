import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  color: string;
  type: "win" | "lose";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, color, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 1200);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div
      className={`fixed left-1/2 top-12 px-7 py-4 rounded-xl shadow-2xl text-white text-2xl font-bold z-50 animate-toast-up flex items-center gap-3 ${type === "lose" ? "border-2 border-red-500" : "border-2 border-green-500"}`}
      style={{ background: color, minWidth: 90, textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
    >
      {type === "lose" ? (
        <span className="text-3xl">❌</span>
      ) : (
        <span className="text-3xl">✅</span>
      )}
      <span>{message}</span>
    </div>
  );
};

export default Toast;
