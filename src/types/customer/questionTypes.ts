// =================== ASK A QUESTION ===================

/**
 * The payload required when a customer asks a new question.
 * Matches the backend validation for `topic` and `question`.
 */
export interface AskQuestionPayload {
  topic: string
  question: string
}

/**
 * The expected response from a successful "ask question" submission.
 */
export interface AskQuestionResponse {
  message: string
}
