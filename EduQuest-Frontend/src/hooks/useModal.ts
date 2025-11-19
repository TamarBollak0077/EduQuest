import { useState } from "react";

export function useModal() {
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalTeam, setModalTeam] = useState<string>("");

  return {
    modalMessage,
    setModalMessage,
    modalTeam,
    setModalTeam,
  };
}
