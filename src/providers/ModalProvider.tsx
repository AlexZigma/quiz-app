"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface ModalContextType {
  openModal: (modal: ReactNode) => void;
  closeModal: () => void;
}

export type ModalConfig = {
  title?: string;
  content?: ReactNode;
  footer?: ReactNode;
};

const modalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ReactNode | null>(null);

  const openModal = useCallback((modal: ReactNode) => {
    setModal(modal);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [openModal, closeModal],
  );

  return (
    <modalContext.Provider value={value}>
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
