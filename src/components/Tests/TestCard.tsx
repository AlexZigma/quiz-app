"use client";

import { useAuth } from "@/providers/AuthProvider";
import { redirect } from "next/navigation";
import { MdEdit } from "react-icons/md";
import ButtonLink from "../commons/Button/ButtonLink";
import Card from "../commons/Card/Card";
import { useModal } from "../commons/Modal/ModalContext";
import { ModalConfirm } from "../commons/Modal/modals";
import styles from "./tests.module.scss";

interface TestCardProps {
  title: string;
  id: string;
}

export default function TestCard({ id, title }: TestCardProps) {
  const { user } = useAuth();
  const { openModal } = useModal();

  const handleTestClick = () =>
    openModal(
      <ModalConfirm
        title="Start test?"
        onConfirm={() => {
          redirect(`/tests/${id}`);
        }}
      />,
    );

  return (
    <Card className={styles.card}>
      <h2>{title}</h2>
      <div className={styles.cardActions}>
        <button onClick={handleTestClick} className={styles.cardStart} />
        {user?.userType === "admin" && (
          <ButtonLink
            className={styles.cardEdit}
            href={`/tests/${id}/edit`}
          >
            <MdEdit />
            Edit
          </ButtonLink>
        )}
      </div>
    </Card>
  );
}
