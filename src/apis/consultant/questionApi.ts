import api from '@/apis/axiosConfig'
import type { AnswerQuestionPayload, QuestionMutationResponse } from '@/types/consultant/questionTypes'

import { QUESTION_STATUS, QUESTION_SEARCH_FIELDS } from '@/Application/constants/manager/manager.questionConstants'
import { BackendQuestionResponse, PaginatedQuestionsResponse, UseQuestionsOptions } from '@/types/manager/questionTypes'
import { format } from 'date-fns'

// =============== QUESTION FETCHING ===============
export const fetchQuestions = async ({
  page,
  limit,
  filters,
  search,
  sort,
  dateRange
}: UseQuestionsOptions): Promise<PaginatedQuestionsResponse> => {
  const params: Record<string, string | number | number[] | string[]> = {
    _page: page,
    _limit: limit,
    _sort: sort.field,
    _order: sort.direction
  }

  // Search
  if (search.value && QUESTION_SEARCH_FIELDS[search.field as keyof typeof QUESTION_SEARCH_FIELDS]) {
    const backendKey = QUESTION_SEARCH_FIELDS[search.field as keyof typeof QUESTION_SEARCH_FIELDS]
    params[backendKey] = search.value
  }

  // Filters
  for (const key in filters) {
    const value = filters[key]
    const valuesAsArray = Array.isArray(value) ? value : [value]
    if (key === 'status') {
      params._status = valuesAsArray.map((v) => QUESTION_STATUS.API_MAP[String(v)])
    } else if (key === 'topic') {
      params._topic = valuesAsArray as string[]
    }
  }

  // Date Filter
  if (dateRange && (dateRange.from || dateRange.to)) {
    const dates: string[] = []

    if (dateRange.from) {
      dates.push(format(dateRange.from, 'yyyy-MM-dd'))
    }
    if (dateRange.to) {
      dates.push(format(dateRange.to, 'yyyy-MM-dd'))
    }

    if (dates.length > 0) {
      const dateKey = `_${dateRange.field}`
      params[dateKey] = dates
    }
  }

  const response = await api.get<BackendQuestionResponse>('/question/consultant', { params })
  const result = response.data?.result
  return {
    data: result?.questions ?? [],
    total: result?.total ?? 0
  }
}

// =============== ANSWERING A QUESTION ===============
/**
 * API call to submit a new answer for a specific question.
 * Corresponds to: PATCH /question/:id/answer
 * @param payload - Contains the questionId and the answer string.
 * @returns A promise that resolves to the server's success message.
 */
export const answerQuestionAPI = async ({
  questionId,
  answer
}: AnswerQuestionPayload): Promise<QuestionMutationResponse> => {
  const body = { answer }
  const response = await api.patch<QuestionMutationResponse>(`/question/${questionId}/answer`, body)
  return response.data
}

// =============== EDITING AN ANSWER ===============
/**
 * API call to edit an existing answer for a specific question.
 * Corresponds to: PATCH /question/:id/consultant-edit
 * @param payload - Contains the questionId and the new answer string.
 * @returns A promise that resolves to the server's success message.
 */
export const editAnswerAPI = async ({
  questionId,
  answer
}: AnswerQuestionPayload): Promise<QuestionMutationResponse> => {
  const body = { answer }
  const response = await api.patch<QuestionMutationResponse>(`/question/${questionId}/consultant-edit`, body)
  return response.data
}

// =============== REPORT A QUESTION ===============
/**
 * API call to report a question.
 * Corresponds to: POST /question/:id/report
 * @param questionId - The ID of the question to report.
 * @returns A promise that resolves to the server's success message.
 */
export const reportQuestionAPI = async (questionId: string): Promise<QuestionMutationResponse> => {
  const response = await api.post<QuestionMutationResponse>(`/question/${questionId}/report`)
  return response.data
}
