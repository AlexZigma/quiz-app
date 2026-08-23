"use client";

import Button from "../Button/Button";
import ButtonLink from "../Button/ButtonLink";
import Modal from "./Modal";
import { ModalConfig, useModal } from "./ModalContext";

interface ModalConfirmProps {
  title: string;
  onConfirm: () => void;
}

export function ModalConfirm({ title, onConfirm }: ModalConfirmProps) {
  const { closeModal } = useModal();

  const modalConfig: ModalConfig = {
    title: title,
    footer: (
      <>
        <Button
          variant="primary"
          onClick={() => {
            closeModal();
            onConfirm();
          }}
        >
          Yes
        </Button>
        <Button onClick={closeModal}>
          Cancel
        </Button>
      </>
    ),
  };

  return <Modal {...modalConfig} />;
}

export function ModalDelete({ title, onConfirm }: ModalConfirmProps) {
  const { closeModal } = useModal();

  const modalConfig: ModalConfig = {
    title: title,
    footer: (
      <>
        <Button
          variant="danger"
          onClick={() => {
            closeModal();
            onConfirm();
          }}
        >
          Yes
        </Button>
        <Button onClick={closeModal}>
          Cancel
        </Button>
      </>
    ),
  };

  return <Modal {...modalConfig} />;
}

interface ModalAlertProps {
  title: string;
  href: string;
}

export function ModalAlert({ title, href }: ModalAlertProps) {
  const { closeModal } = useModal();

  const modalConfig: ModalConfig = {
    title: title,
    footer: (
      <>
        <ButtonLink
          href={href}
          onClick={() => {
            closeModal();
          }}
        >
          Ok
        </ButtonLink>
      </>
    ),
  };

  return <Modal {...modalConfig} />;
}
