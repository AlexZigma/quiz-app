"use client";

import Card from "@/components/commons/Card";
import TextInput from "@/components/commons/Inputs/TextInput";
import Toggle from "@/components/commons/Inputs/Toggle";

import styles from "./question.module.scss";

interface QuestionCardProps {
  index: number;
  questionId: string;
  title: string;
  questionType: "single" | "multiple" | "number";
  answers: Array<{
    id: string;
    text: string;
    position: number;
  }>;
}

export default function QuestionCard({
  index,
  questionId,
  title,
  questionType,
  answers,
}: QuestionCardProps) {
  const renderQuestionTitle = `${index + 1}. ${title}`;

  const renderAnswers = answers.map((answer) => {
    if (questionType === "number") {
      return <TextInput key={answer.id} type="number" name={questionId} />;
    }

    return (
      <div key={answer.id} className={styles.answer}>
        <Toggle
          id={answer.id}
          name={questionId}
          value={answer.id}
          type={questionType === "single" ? "radio" : "checkbox"}
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
        <h3>{renderQuestionTitle}</h3>
        <div className={styles.questionAnswers}>{renderAnswers}</div>
      </div>
    </Card>
  );
}
