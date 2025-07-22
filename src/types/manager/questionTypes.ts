import type { Question } from '@/types'

// =================== QUESTIONS FETCHING ===================
export interface BackendQuestionResponse {
  message: string
  result: {
    questions: Question[]
    total: number
  }
}

// --------- Response for paginated questions ---------
export interface PaginatedQuestionsResponse {
  data: Question[]
  total: number
}

// --------- Options for the hook ---------
export interface UseQuestionsOptions {
  page: number
  limit: number
  filters: Record<string, (string | number) | (string | number)[]>
  search: {
    field: string
    value: string
  }
  sort: {
    field: keyof Question
    direction: 'asc' | 'desc'
  }
  dateRange?: {
    field?: string
    from?: Date
    to?: Date
  }
}

// =================== QUESTIONS STATUS ===================
export interface EditQuestionStatusPayload {
  questionId: string
  is_public: boolean
}

export interface EditQuestionStatusResponse {
  message: string
}
