"use client";

import { useTest } from "@/providers/TestProvider";
import { IoMdClose } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Button from "../Button/Button";
import Card from "../Card/Card";
import TextInput from "../Inputs/TextInput";
import Radio from "../Inputs/Toggle";
import { useModal } from "../Modal/ModalContext";
import { ModalDelete } from "../Modal/modals";
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
        <Radio
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
