"use client";

import { useClickOutside, useEscPress, useScrollLock } from "@/lib/hooks";
import { useRef } from "react";
import { MdClose } from "react-icons/md";
import styles from "./Modal.module.scss";
import { useModal } from "./ModalContext";

interface ModalProps {
  title?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({ title, content, footer }: ModalProps) {
  const { closeModal } = useModal();
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogInnerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    closeModal();
  };

  useClickOutside(dialogInnerRef, handleClose);
  useEscPress(handleClose);
  useScrollLock();

  return (
    <div className={styles.dialog} ref={dialogRef}>
      <div ref={dialogInnerRef} className={styles.dialogInner}>
        <div className={styles.dialogClose}>
          <button onClick={handleClose}>
            <MdClose size={20} />
          </button>
        </div>
        <div className={styles.dialogHeader}>
          <h1>{title}</h1>
        </div>
        <div>{content}</div>
        <div className={styles.dialogFooter}>{footer}</div>
      </div>
    </div>
  );
}
