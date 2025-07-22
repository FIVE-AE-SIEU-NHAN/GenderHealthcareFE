import { fetchDoctors } from '@/apis/manager/manageDoctorApi'
import { PaginatedDoctorsResponse, UseDoctorsOptions } from '@/types/manager/doctorTypes'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

/**
 * A custom Tanstack Query hook to fetch a paginated list of doctors (staff).
 * @param options - The query options from the UI (pagination, sorting, filtering).
 */
export function useDoctors(options: UseDoctorsOptions) {
  const queryKey = ['doctors', options]

  return useQuery<PaginatedDoctorsResponse, Error>({
    queryKey,
    queryFn: () => fetchDoctors(options),

    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  })
}
