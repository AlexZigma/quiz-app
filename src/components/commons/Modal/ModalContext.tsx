"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface modalContextType {
  openModal: (modal: ReactNode) => void;
  closeModal: () => void;
}

export type ModalConfig = {
  title?: string;
  content?: ReactNode;
  footer?: ReactNode;
};

const modalContext = createContext<modalContextType | undefined>(undefined);

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ReactNode | null>(null);

  const openModal = (modal: ReactNode) => {
    setModal(modal);
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <modalContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}
      {modal}
    </modalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(modalContext);
  if (!context) throw new Error("Modal context error");

  return context;
};
