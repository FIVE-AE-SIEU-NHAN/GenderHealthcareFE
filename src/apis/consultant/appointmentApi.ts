import api from '@/apis/axiosConfig'
import {
  BackendAppointmentsResponse,
  PaginatedAppointments,
  UseAppointmentsOptions
} from '@/types/consultant/appointmentTypes'

/**
 * Fetches appointments for the currently logged-in consultant within a specific date range.
 * @param startDate - The start of the date range in ISO 8601 format.
 * @param endDate - The end of the date range in ISO 8601 format.
 * @returns The API response containing the list of appointments.
 */
export const fetchConsultantAppointments = async ({
  startDate,
  endDate
}: UseAppointmentsOptions): Promise<PaginatedAppointments> => {
  const params = {
    _start_date: startDate,
    _end_date: endDate
  }

  const response = await api.get<BackendAppointmentsResponse>('/appointment/consultant', { params })
  const result = response.data?.result
  return {
    data: result?.appointments ?? [],
    total: result?.total ?? 0
  }
}
