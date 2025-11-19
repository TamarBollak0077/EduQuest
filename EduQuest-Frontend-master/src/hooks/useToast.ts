import { useState, useCallback } from "react";

export interface ToastState {
  message: string;
  color: string;
  type: "win" | "lose";
}

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [pendingToast, setPendingToast] = useState<ToastState | null>(null);

  // Show toast after modal closes
  const showToastAfterModal = useCallback((modalOpen: boolean) => {
    if (!modalOpen && pendingToast) {
      setToast(pendingToast);
      setPendingToast(null);
    }
  }, [pendingToast]);

  return {
    toast,
    setToast,
    pendingToast,
    setPendingToast,
    showToastAfterModal,
  };
}
