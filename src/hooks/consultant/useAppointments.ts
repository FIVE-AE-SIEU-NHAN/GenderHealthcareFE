import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchConsultantAppointments } from '@/apis/consultant/appointmentApi';
import { PaginatedAppointments, UseAppointmentsOptions } from '@/types/consultant/appointmentTypes';

/**
 * A custom Tanstack Query hook to fetch a list of appointments for a consultant
 * within a specific date range.
 * @param options - The date range for the query ({ startDate, endDate }).
 */
export function useConsultantAppointments(options: UseAppointmentsOptions) {
  const queryKey = ['consultantAppointments', options];

  return useQuery<PaginatedAppointments, Error>({
    queryKey,
    queryFn: () => fetchConsultantAppointments(options),
    
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, 
  });
}