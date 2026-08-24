"use client";

import {
  createQuestions,
  createTestRequest,
  deleteTestRequest,
  updateQuestions,
  updateTestRequest,
} from "@/app/api/utils";
import { TestFormSchema } from "@/lib/zod";
import { QuestionType } from "@/models/test/types";
import { useTest } from "@/providers/TestProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import z from "zod";
import Button from "../Button/Button";
import Dropdown from "../Inputs/Dropdown";
import TextInput from "../Inputs/TextInput";
import { useModal } from "../Modal/ModalContext";
import { ModalConfirm, ModalDelete } from "../Modal/modals";
import QuestionForm from "../Question/QuestionForm";
import QuestionView from "../Question/QuestionView";
import styles from "./tests.module.scss";

interface TestFormProps {
  mode: "new" | "edit";
}

export default function TestForm({ mode }: TestFormProps) {
  const { openModal } = useModal();
  const { test, updateTest, editState, loadTest, startNewDraft } = useTest();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    title?: string[];
    questions?: string[];
  }>();

  useEffect(() => {
    if (mode === "new") return;
  }, [mode]);

  const saveTest = async () => {
    const { id, title, questions } = test;
    setIsLoading(true);

    try {
      if (mode === "new") {
        console.log(questions);
        const data = await createTestRequest({ title });
        await createQuestions(data.id, questions);
      } else {
        await updateTestRequest(id, { title });
        await updateQuestions(id, questions);
      }
      router.push("/tests");
    } catch {
      alert("Cannot save test");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTest = async () => {
    setIsLoading(true);

    try {
      await deleteTestRequest(test.id);
      router.push("/tests");
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTest = () => {
    openModal(<ModalDelete title="Delete test?" onConfirm={deleteTest} />);
  };

  const handleSaveTest = () => {
    const testParsed = TestFormSchema.safeParse(test);

    if (!testParsed.success) {
      setError(z.flattenError(testParsed.error).fieldErrors);
      return;
    }

    openModal(<ModalConfirm title="Save test?" onConfirm={saveTest} />);
  };

  const renderQuestionsList = (
    <div className={styles.questions}>
      {test.questions.map((question) =>
        editState.mode === "edit" && question.id === editState.questionId ? (
          <QuestionForm key={question.id} />
        ) : (
          <QuestionView key={question.id} questionId={question.id} />
        ),
      )}
    </div>
  );

  return (
    <div className={styles.form}>
      <div className={styles.formActions}>
        {mode === "edit" && (
          <Button
            variant="danger"
            disabled={isLoading}
            onClick={handleDeleteTest}
          >
            <MdDelete />
            Delete
          </Button>
        )}
        <Button variant="primary" disabled={isLoading} onClick={handleSaveTest}>
          Save
        </Button>
      </div>
      <div className={styles.formHeader}>
        <label>
          <h3>Название теста</h3>
          <TextInput
            placeholder="Test 1"
            value={test.title}
            onChange={(event) => {
              updateTest({
                title: event.target.value,
              });
            }}
          />
          {error?.title && <p className="error">{error.title}</p>}
        </label>
      </div>
      {renderQuestionsList}

      {editState.mode === "add" && <QuestionForm />}

      <div className={styles.formFooter}>
        <Dropdown
          label="Add question"
          options={["single", "multiple", "number"]}
          onChange={(option) => {
            startNewDraft(option as QuestionType);
          }}
        />
      </div>
      {error?.questions && <p className="error">{error.questions}</p>}
    </div>
  );
}
