"use client";

import Button from "@/components/commons/Button/Button";
import Card from "@/components/commons/Card";
import TextInput from "@/components/commons/Inputs/TextInput";
import Toggle from "@/components/commons/Inputs/Toggle";
import { ModalDelete } from "@/components/commons/Modal/modals";
import { useModal } from "@/providers/ModalProvider";
import { useTest } from "@/providers/TestProvider";
import { IoMdClose } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import styles from "./question.module.scss";

interface QuestionViewProps {
  questionId: string;
}

export default function QuestionView({ questionId }: QuestionViewProps) {
  const { getQuestionById, deleteQuestionById, startDraft } = useTest();
  const { openModal } = useModal();

  const question = getQuestionById(questionId);

  if (!question) return null;

  const renderAnswers = question.answers.map((answer) => {
    if (question.questionType === "number") {
      return (
        <TextInput
          key={answer.id}
          name={questionId}
          defaultValue={answer.text}
          disabled
        />
      );
    }

    return (
      <div key={answer.id} className={styles.answer}>
        <Toggle
          id={answer.id}
          name={questionId}
          value={answer.id}
          type={question.questionType === "single" ? "radio" : "checkbox"}
          checked={answer.isRight}
          disabled
        />
        <label htmlFor={answer.id} className={styles.answerLabel}>
          {answer.text}
        </label>
      </div>
    );
  });

  return (
    <Card className={styles.question}>
      <div className={styles.questionMain}>
        <h3>{question.title}</h3>
        <div className={styles.questionAnswers}>{renderAnswers}</div>
      </div>
      <div className={styles.questionActions}>
        <Button onClick={() => startDraft(question)}>
          <MdEdit />
        </Button>
        <Button
          variant="danger"
          onClick={() =>
            openModal(
              <ModalDelete
                title="Delete question?"
                onConfirm={() => deleteQuestionById(question.id)}
              />,
            )
          }
        >
          <IoMdClose />
        </Button>
      </div>
    </Card>
  );
}
