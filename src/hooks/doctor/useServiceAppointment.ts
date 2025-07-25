import { fetchServiceAppointments } from '@/apis/doctor/serviceAppointmentApi'
import { UseAppointmentsOptions } from '@/types/consultant/appointmentTypes'
import { PaginatedServiceAppointments } from '@/types/doctor/serviceAppointmentTypes'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

type ServiceAppointmentRole = 'doctor' | 'manager'

/**
 * A custom Tanstack Query hook to fetch a list of service appointments for a specific role
 * within a date range.
 * @param options - The date range for the query ({ startDate, endDate }).
 * @param role - The role of the user fetching the appointments.
 */
export function useServiceAppointments(options: UseAppointmentsOptions, role: ServiceAppointmentRole) {
  const queryKey = ['serviceAppointments', role, options]

  return useQuery<PaginatedServiceAppointments, Error>({
    queryKey,
    queryFn: () => fetchServiceAppointments(options, role),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  })
}
