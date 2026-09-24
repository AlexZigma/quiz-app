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

function isAnswerEqual(a: Answer, b: Answer) {
  return (
    a.id === b.id &&
    a.text === b.text &&
    a.isRight === b.isRight &&
    a.position === b.position
  );
}

function isQuestionsEqual(a: Question, b: Question) {
  const isAnswersEqual = a.answers.every((answerA) => {
    const answerB = b.answers.find((answer) => answer.id === answerA.id);
    return answerB ? isAnswerEqual(answerA, answerB) : false;
  });

  return (
    a.id === b.id &&
    a.title === b.title &&
    a.questionType === b.questionType &&
    isAnswersEqual
  );
}

export function isQuestionChanged(a: Question[], b: Question[]) {
  if (a.length !== b.length) return true;

  return a.some((questionA) => {
    const questionB = b.find((question) => question.id === questionA.id);
    return questionB ? !isQuestionsEqual(questionA, questionB) : true;
  });
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
