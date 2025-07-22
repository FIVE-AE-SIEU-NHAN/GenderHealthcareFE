import { fetchQuestions } from '@/apis/customer/questionApi'
import { PaginatedQuestionsResponse, UseQuestionsOptions } from '@/types/manager/questionTypes'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

/**
 * A custom Tanstack Query hook to fetch a paginated list of questions.
 * @param options - The query options from the UI (pagination, sorting, filtering).
 */
export function useQuestions(options: UseQuestionsOptions) {
  const queryKey = ['questions', options]

  return useQuery<PaginatedQuestionsResponse, Error>({
    queryKey,
    queryFn: () => fetchQuestions(options),

    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  })
}
