import {
  Answer,
  Question,
  QuestionType,
  RawAnswer,
  RawQuestion,
  RawTest,
  Test,
} from "@/models/test/types";

export function isAnswerRight(
  type: QuestionType,
  answers: Answer[],
  userAnswer: string[],
) {
  if (type === "number") {
    return answers[0].text === userAnswer[0];
  }

  return answers.every(
    (answer) => answer.isRight === userAnswer.includes(answer.id),
  );
}

export function isDeepEqual(a: any, b: any) {
  if (a === b) return true;
  if (a == null || b == null || typeof a !== "object" || typeof b !== "object")
    return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!isDeepEqual(a[key], b[key])) return false;
  }

  return true;
}

export const mapAnswer = (raw: RawAnswer): Answer => {
  return {
    id: raw.uuid,
    text: raw.text,
    isRight: raw.is_right,
    position: raw.position,
  };
};

export const mapAnswerToRow = (answer: Answer): RawAnswer => {
  return {
    uuid: answer.id,
    text: answer.text,
    is_right: answer.isRight,
    position: answer.position,
  };
};

export const mapQuestion = (raw: RawQuestion): Question => {
  return {
    id: raw.uuid,
    questionType: raw.question_type,
    title: raw.title,
    answers: raw.answers.map(mapAnswer),
  };
};

export const mapQuestionToRaw = (question: Question): RawQuestion => {
  return {
    uuid: question.id,
    title: question.title,
    question_type: question.questionType,
    answers: question.answers.map(mapAnswerToRow),
  };
};

export const mapTest = (raw: RawTest): Test => {
  return {
    id: raw.id.toString(),
    isPublished: raw.is_published,
    owner: raw.owner,
    title: raw.title,
    questions: raw.questions.map(mapQuestion),
  };
};
