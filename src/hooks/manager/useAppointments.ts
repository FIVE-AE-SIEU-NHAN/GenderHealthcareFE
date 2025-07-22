import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { PaginatedAppointments, UseAppointmentsOptions } from '@/types/consultant/appointmentTypes'
import { fetchManagerAppointments } from '@/apis/manager/appointmentApi'

/**
 * A custom Tanstack Query hook to fetch a list of appointments for a manager
 * within a specific date range.
 * @param options - The date range for the query ({ startDate, endDate }).
 */
export function useManagerAppointments(options: UseAppointmentsOptions) {
  const queryKey = ['managerAppointments', options]

  return useQuery<PaginatedAppointments, Error>({
    queryKey,
    queryFn: () => fetchManagerAppointments(options),

    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  })
}
