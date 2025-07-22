import { fetchConsultants } from '@/apis/manager/manageConsultantApi'
import { PaginatedConsultantsResponse, UseConsultantsOptions } from '@/types/manager/consultantTypes'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

/**
 * A custom Tanstack Query hook to fetch a paginated list of users.
 * @param options - The query options from the UI (pagination, sorting, filtering).
 */
export function useConsultants(options: UseConsultantsOptions) {
  const queryKey = ['consultants', options]

  return useQuery<PaginatedConsultantsResponse, Error>({
    queryKey,
    queryFn: () => fetchConsultants(options),

    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  })
}
