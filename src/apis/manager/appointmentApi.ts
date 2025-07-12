import api from "@/apis/axiosConfig"
import { BackendAppointmentsResponse, EditAppointmentStatusPayload, EditAppointmentStatusResponse, PaginatedAppointments, UseAppointmentsOptions } from '@/types/consultant/appointmentTypes';


/**
 * Fetches appointments for the currently logged-in manager within a specific date range.
 * @param startDate - The start of the date range in ISO 8601 format.
 * @param endDate - The end of the date range in ISO 8601 format.
 * @returns The API response containing the list of appointments.
 */
export const fetchManagerAppointments = async (
  {startDate,
  endDate }: UseAppointmentsOptions
): Promise<PaginatedAppointments> => {
  const params = {
    _start_date: startDate,
    _end_date: endDate,
  };

  const response = await api.get<BackendAppointmentsResponse>('/appointment/manager', { params });
  const result = response.data?.result; 
  return {
    data: result?.appointments ?? [],  
    total: result?.total ?? 0,  
  };
};

/**
 * Updates the status of a specific appointment.
 * @param id - The ID of the appointment to update.
 * @param status - The new status to set for the appointment.
 * @returns The updated appointment data.
 */
export const editAppointmentStatusApi = async ({ appointmentId, status }: EditAppointmentStatusPayload): Promise<EditAppointmentStatusResponse> => {
  const response = await api.patch<EditAppointmentStatusResponse>(`/appointment/${appointmentId}/edit-status`, { status });
  return response.data;
};