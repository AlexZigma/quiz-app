export type QuestionType = "single" | "multiple" | "number";

export type RawAnswer = {
  uuid: string;
  text: string;
  position: number;
  is_right: boolean;
};

export type Answer = {
  id: string;
  text: string;
  position: number;
  isRight: boolean;
};

export type RawQuestion = {
  uuid: string;
  title: string;
  question_type: QuestionType;
  answers: RawAnswer[];
};

export type Question = {
  id: string;
  title: string;
  questionType: QuestionType;
  answers: Answer[];
};

export type RawTest = {
  id: number;
  title: string;
  owner: number;
  is_published: boolean;
  questions: RawQuestion[];
};

export type Test = {
  id: string;
  title: string;
  owner: number;
  isPublished: boolean;
  questions: Question[];
};

export type TestBase = {
  id: number;
  title: string;
  owner: number;
  isPublished: boolean;
};
