"use client";

import { Question, QuestionType, Test } from "@/models/test/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface TestContextType {
  test: Test;
  loadTest: (initialTest: Test) => void;
  updateTest: (test: Partial<Test>) => void;
  updateQuestion: (question: Question) => void;
  deleteQuestionById: (id: string) => void;
  getQuestionById: (id: string) => Question | undefined;

  draft: Question | null;
  editState: EditStateType;
  startDraft: (question: Question) => void;
  startNewDraft: (questionType: QuestionType) => void;
  updateDraft: (question: Partial<Question>) => void;
  addDraftAnswer: () => void;
  updateDraftAnswerText: (id: string, text: string) => void;
  updateDraftRightSingle: (answerId: string) => void;
  updateDraftRightMultiple: (answerId: string, isRight: boolean) => void;
  deleteDraftAnswer: (id: string) => void;
  resetDraft: () => void;
}

type EditStateType =
  | { mode: "view" }
  | { mode: "edit"; questionId: string }
  | { mode: "add" };

const initialTest: Test = {
  id: crypto.randomUUID(),
  isPublished: true,
  questions: [],
  title: "",
  owner: 0,
};

const TestContext = createContext<TestContextType | null>(null);

export default function TestProvider({ children }: { children: ReactNode }) {
  const [test, setTest] = useState(initialTest);
  const [draft, setDraft] = useState<Question | null>(null);
  const [editState, setEditState] = useState<EditStateType>({ mode: "view" });

  const loadTest = useCallback((initialTest: Test) => {
    setTest(initialTest);
  }, []);

  const updateTest = useCallback((test: Partial<Test>) => {
    setTest((prev) => ({ ...prev, ...test }));
  }, []);

  const updateQuestion = useCallback(
    (question: Question) => {
      if (test.questions.find((q) => q.id === question.id)) {
        setTest((prev) => ({
          ...prev,
          questions: prev.questions.map((q) =>
            q.id === question.id ? question : q,
          ),
        }));
      } else {
        setTest((prev) => ({
          ...prev,
          questions: [...prev.questions, question],
        }));
      }
    },
    [test.questions],
  );

  const deleteQuestionById = useCallback((id: string) => {
    setTest((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }));
  }, []);

  const getQuestionById = useCallback(
    (id: string) => {
      return test.questions.find((q) => q.id === id);
    },
    [test.questions],
  );

  const startDraft = useCallback((question: Question) => {
    setDraft(question);
    setEditState({ mode: "edit", questionId: question.id });
  }, []);

  const startNewDraft = useCallback((questionType: QuestionType) => {
    const isRight = questionType === "number";

    setDraft({
      id: crypto.randomUUID(),
      title: "",
      questionType: questionType,
      answers: [{ id: crypto.randomUUID(), isRight, position: 0, text: "" }],
    });

    setEditState({ mode: "add" });
  }, []);

  const updateDraft = useCallback((question: Partial<Question>) => {
    setDraft((prev) => (prev ? { ...prev, ...question } : null));
  }, []);

  const addDraftAnswer = useCallback(() => {
    setDraft((prev) => {
      if (!prev) return null;

      const newAnswer = {
        id: crypto.randomUUID(),
        text: "",
        position: prev.answers.length,
        isRight: false,
      };

      return { ...prev, answers: [...prev.answers, newAnswer] };
    });
  }, []);

  const updateDraftAnswerText = useCallback((id: string, text: string) => {
    setDraft((prev) => {
      if (!prev) return null;

      const updatedAnswers = prev.answers.map((answer) =>
        answer.id === id ? { ...answer, text } : answer,
      );

      return { ...prev, answers: updatedAnswers };
    });
  }, []);

  const updateDraftRightSingle = useCallback((answerId: string) => {
    setDraft((prev) => {
      if (!prev) return null;

      const updatedAnswers = prev.answers.map((answer) => ({
        ...answer,
        isRight: answer.id === answerId,
      }));

      return { ...prev, answers: updatedAnswers };
    });
  }, []);

  const updateDraftRightMultiple = useCallback(
    (answerId: string, isRight: boolean) => {
      setDraft((prev) => {
        if (!prev) return null;

        const updatedAnswers = prev.answers.map((answer) =>
          answer.id === answerId
            ? { ...answer, isRight }
            : {
                ...answer,
              },
        );

        return { ...prev, answers: updatedAnswers };
      });
    },
    [],
  );

  const deleteDraftAnswer = useCallback((id: string) => {
    setDraft((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        answers: prev?.answers.filter((answer) => answer.id !== id),
      };
    });
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(null);
    setEditState({ mode: "view" });
  }, []);

  return (
    <TestContext
      value={{
        test,
        loadTest,
        updateTest,
        updateQuestion,
        deleteQuestionById,
        getQuestionById,

        draft,
        startDraft,
        startNewDraft,
        updateDraft,

        addDraftAnswer,
        updateDraftAnswerText,
        updateDraftRightSingle,
        updateDraftRightMultiple,
        deleteDraftAnswer,

        resetDraft,
        editState,
      }}
    >
      {children}
    </TestContext>
  );
}

export const useTest = () => {
  const context = useContext(TestContext);
  if (!context) throw new Error("context error");

  return context;
};
