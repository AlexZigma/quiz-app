"use client";

import Button from "@/components/commons/Button/Button";
import { ModalAlert } from "@/components/commons/Modal/modals";
import QuestionCard from "@/components/commons/Question/QuestionCard";
import { isAnswerRight } from "@/lib/utils";
import { Test } from "@/models/test/types";
import { useModal } from "@/providers/ModalProvider";
import { SubmitEventHandler } from "react";
import styles from "./page.module.scss";

interface QuizListProps {
  test: Test;
}

export default function Quiz({ test }: QuizListProps) {
  const { openModal } = useModal();

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let score = 0;

    test.questions.forEach((question) => {
      const userAnswer = formData.getAll(question.id) as string[];
      if (isAnswerRight(question.questionType, question.answers, userAnswer)) {
        score++;
      }
    });

    const questionsCount = test.questions.length;

    openModal(
      <ModalAlert
        title={`Results: ${score} / ${questionsCount}`}
        href="/tests"
      />,
    );
  };

  const renderQuestions = test.questions.map((question, index) => (
    <QuestionCard
      index={index}
      questionId={question.id}
      questionType={question.questionType}
      answers={question.answers}
      title={question.title}
      key={question.id}
    />
  ));

  return (
    <main className={styles.main}>
      <h1>{test.title}</h1>
      <p>{test.questions.length} questions</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.list}>{renderQuestions}</div>
        <div className={styles.formFooter}>
          <Button type="submit">Finish Test</Button>
        </div>
      </form>
    </main>
  );
}
