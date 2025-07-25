import { UseAppointmentsOptions } from '@/types/consultant/appointmentTypes'
import {
  BackendServiceAppointmentsResponse,
  PackageDetails,
  PaginatedServiceAppointments,
  ServiceAppointmentStatus,
  UpdateTestServiceResultReqBody
} from '@/types/doctor/serviceAppointmentTypes'
import api from '@/apis/axiosConfig'

// Define the roles that can access this feature
type ServiceAppointmentRole = 'doctor' | 'manager'

/**
 * Fetches service appointments for a specific role (doctor or manager) within a date range.
 * @param options - The date range for the query ({ startDate, endDate }).
 * @param role - The role of the user fetching the appointments ('doctor' or 'manager').
 * @returns The API response containing the list of service appointments.
 */
export const fetchServiceAppointments = async (
  options: UseAppointmentsOptions,
  role: ServiceAppointmentRole
): Promise<PaginatedServiceAppointments> => {
  const params = {
    _start_date: options.startDate,
    _end_date: options.endDate
  }

  const endpoint = role === 'manager' ? '/test-service/manager' : '/test-service/staff'

  const response = await api.get<BackendServiceAppointmentsResponse>(endpoint, { params })
  const result = response.data?.result
  return {
    data: result?.testServiceAppointments ?? [],
    total: result?.total ?? 0
  }
}

/**
 * Fetches the detailed list of services for a given test service appointment.
 * @param appointmentId - The ID of the test service appointment.
 * @returns The detailed package information including all services.
 */
export const fetchPackageDetails = async (appointmentId: string): Promise<PackageDetails> => {
  const response = await api.get<{ result: PackageDetails }>(`/test-service/package/${appointmentId}`)
  return response.data.result
}

interface SubmitResultsPayload {
  serviceId: string
  data: UpdateTestServiceResultReqBody
}

/**
 * Submits the result for a single service test.
 * @param payload - Contains the serviceId for the URL and the data for the body.
 * @returns The API response for the submission.
 */
export const submitSingleTestResult = async ({ serviceId, data }: SubmitResultsPayload) => {
  const response = await api.post(`/test-service/${serviceId}/result`, data)
  return response.data
}

interface EditStatusPayload {
  appointmentId: string
  status: ServiceAppointmentStatus
}

/**
 * Updates the status for a specific service appointment.
 * @param payload - Contains the appointmentId and the new status.
 * @returns The API response message.
 */
export const editServiceAppointmentStatus = async ({ appointmentId, status }: EditStatusPayload) => {
  const response = await api.patch(`/test-service/${appointmentId}/edit-status`, { status })
  return response.data
}
