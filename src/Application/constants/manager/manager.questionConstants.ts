const QUESTION_DEFINITIONS = [
  { id: 0, key: 'Pending', label: 'Pending' },
  { id: 1, key: 'Answered', label: 'Answered' },
  { id: 2, key: 'Reported', label: 'Reported' }
] as const

// *================================================================*
// *                        QUESTION STATUS CONSTANTS                     *
// *================================================================*

/**
 * A namespace containing all constants related to QUESTIONS.
 */
export const QUESTION_STATUS = {
  /**
   * Question definitions.
   */
  DEFINITIONS: QUESTION_DEFINITIONS,

  /**
   * String ('Pending') to Number (0) (for API).
   * @example { 'Pending': 0, 'Answered': 1 }
   */
  API_MAP: QUESTION_DEFINITIONS.reduce(
    (acc, question) => {
      acc[question.key] = question.id
      return acc
    },
    {} as Record<string, number>
  ),

  /**
   * Number (0) to String ('Pending') (for UI).
   * @example { 0: 'Pending', 1: 'Answered' }
   */
  UI_MAP: QUESTION_DEFINITIONS.reduce(
    (acc, question) => {
      acc[question.id] = question.label
      return acc
    },
    {} as Record<number, string>
  ),

  /**
   * An array of options formatted for faceted filter components.
   * @example [{ value: 'Pending', label: 'Pending' }]
   */
  FILTER_OPTIONS: QUESTION_DEFINITIONS.map((question) => ({
    value: question.key,
    label: question.label
  }))
}

// *================================================================*
// *                      QUESTION SEARCH CONSTANTS                     *
// *================================================================*
/**
 * FE search fields to BE query params
 */
export const QUESTION_SEARCH_FIELDS = {
  all: '_all',
  question: '_question_like',
  answer: '_answer_like'
}
