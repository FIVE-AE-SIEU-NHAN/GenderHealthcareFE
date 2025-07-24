import { fetchDoctorServiceAppointments } from '@/apis/doctor/serviceAppointmentApi'
import { UseAppointmentsOptions } from '@/types/consultant/appointmentTypes'
import { PaginatedServiceAppointments } from '@/types/doctor/serviceAppointmentTypes'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

/**
 * A custom Tanstack Query hook to fetch a list of service appointments for a doctor
 * within a specific date range.
 * @param options - The date range for the query ({ startDate, endDate }).
 */
export function useDoctorServiceAppointments(options: UseAppointmentsOptions) {
  const queryKey = ['doctorServiceAppointments', options]

  return useQuery<PaginatedServiceAppointments, Error>({
    queryKey,
    queryFn: () => fetchDoctorServiceAppointments(options),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  })
}
