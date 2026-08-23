import z, { object, string } from "zod";

export const SignInSchema = object({
  username: string().trim().min(1, "Login is required"),
  password: string().trim().min(1, "Password is required"),
});

const AnswerSchema = z.object({
  id: z.string(),
  text: z.string().trim().min(1, "Answer text is required"),
  isRight: z.boolean(),
  position: z.number().int(),
});

const BaseQuestionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Question title is required"),
  answers: z.array(AnswerSchema),
});

export const SingleQuestionSchema = BaseQuestionSchema.extend({
  questionType: z.literal("single"),
  answers: z.array(AnswerSchema).min(2, "At least 2 answers are required"),
}).refine((data) => data.answers.filter((ans) => ans.isRight).length === 1, {
  message: "One answer must be right",
  path: ["answers"],
});

export const MultipleQuestionSchema = BaseQuestionSchema.extend({
  questionType: z.literal("multiple"),
  answers: z.array(AnswerSchema).min(2, "At least 2 answers are required"),
});

export const numberQuestionSchema = BaseQuestionSchema.extend({
  questionType: z.literal("number"),
  answers: z.array(AnswerSchema).length(1, "1 answer is required"),
});

export const QuestionSchema = z.discriminatedUnion("questionType", [
  SingleQuestionSchema,
  MultipleQuestionSchema,
  numberQuestionSchema,
]);

export const TestFormSchema = z.object({
  title: z.string().trim().min(1, "Test title is required"),
  questions: z.array(QuestionSchema).min(1, "Add at least one question"),
});
