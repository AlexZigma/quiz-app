"use client";

import Button from "@/components/commons/Button/Button";
import Card from "@/components/commons/Card";
import TextInput from "@/components/commons/Inputs/TextInput";
import {
  ChoiceAnswer,
  NumberAnswer,
} from "@/components/commons/Question/Answer";
import SortableItem from "@/components/commons/Sortable/SortableItem";
import { QuestionSchema } from "@/lib/zod";
import { useTest } from "@/providers/TestProvider";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider, DragEndEvent } from "@dnd-kit/react";
import { SubmitEventHandler, useState } from "react";
import z from "zod";
import styles from "./question.module.scss";

export default function QuestionForm() {
  const {
    updateQuestion,
    draft,
    updateDraft,
    resetDraft,
    addDraftAnswer,
    updateDraftAnswerText,
    updateDraftRightSingle,
    updateDraftRightMultiple,
    deleteDraftAnswer,
  } = useTest();

  const [error, setError] = useState<{
    answers?: string[];
    title?: string[];
  } | null>(null);

  if (!draft) return null;

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const parsedData = QuestionSchema.safeParse(draft);

    if (!parsedData.success) {
      setError(z.flattenError(parsedData.error).fieldErrors);
      return;
    }

    updateQuestion(parsedData.data);
    resetDraft();
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const moved = move(draft.answers, event);
    const newAnswers = moved.map((answer, index) => ({
      ...answer,
      position: index,
    }));
    updateDraft({ answers: newAnswers });
  };

  const renderAnswers = () => {
    switch (draft.questionType) {
      case "number":
        const answer = draft.answers[0];
        return (
          <NumberAnswer
            value={answer.text}
            onChange={(event) =>
              updateDraftAnswerText(answer.id, event.target.value)
            }
          />
        );
      case "multiple":
      case "single":
        const isSingle = draft.questionType === "single";
        return (
          <DragDropProvider onDragEnd={handleDragEnd}>
            {draft.answers.map((answer) => (
              <SortableItem
                key={answer.id}
                id={answer.id}
                index={answer.position}
              >
                <ChoiceAnswer
                  type={isSingle ? "single" : "multiple"}
                  value={answer.text}
                  onTextChange={(event) =>
                    updateDraftAnswerText(answer.id, event.target.value)
                  }
                  isChecked={answer.isRight}
                  onToggleChange={(event) =>
                    isSingle
                      ? updateDraftRightSingle(answer.id)
                      : updateDraftRightMultiple(
                          answer.id,
                          event.target.checked,
                        )
                  }
                  onDelete={deleteDraftAnswer.bind(null, answer.id)}
                />
              </SortableItem>
            ))}
          </DragDropProvider>
        );
    }
  };

  const isAdding =
    draft.questionType === "single" || draft.questionType === "multiple";

  return (
    <form onSubmit={handleSubmit}>
      <Card className={styles.question}>
        <div className={styles.questionMain}>
          <label className={styles.label}>
            <h3>Вопрос</h3>
            <TextInput
              className={styles.questionTitle}
              name="title"
              id={draft.id}
              placeholder="Текст вопроса"
              value={draft?.title}
              onChange={(event) => updateDraft({ title: event.target.value })}
            />
          </label>
          {error?.title && <p className="error">{error.title[0]}</p>}

          {renderAnswers()}
          {error?.answers && <p className="error">{error.answers[0]}</p>}

          {isAdding && (
            <button
              type="button"
              onClick={() => addDraftAnswer()}
              className={styles.answerAdd}
            >
              Add Answer
            </button>
          )}
        </div>
        <div className={styles.questionActions}>
          <Button type="submit">Save</Button>
          <Button onClick={() => resetDraft()}>Cancel</Button>
        </div>
      </Card>
    </form>
  );
}
