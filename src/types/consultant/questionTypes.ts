// =================== QUESTION ANSWERING & EDITING ===================
/**
 * The payload required for both answering a question and editing an answer.
 * Contains the ID of the question to target and the answer content.
 */
export interface AnswerQuestionPayload {
  questionId: string;
  answer: string;
}

/**
 * The expected response from a successful question mutation (answer or edit).
 */
export interface QuestionMutationResponse {
  message: string;
}