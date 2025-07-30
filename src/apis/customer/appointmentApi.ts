import api from '@/apis/axiosConfig'
import type {
  BookAppointmentPayload,
  BookAppointmentResponse,
  BookServicesPayload,
  CustomerAppointment,
  CustomerServiceAppointment,
  TestResultItem
} from '@/types/customer/appointmentTypes'

// =============== CREATE (BOOK) A NEW APPOINTMENT ===============
/**
 * API call to submit a new appointment booking.
 * Corresponds to: POST /appointment/book
 * @param payload - Contains the topic, booking_date (as ISO string), and time_slot.
 * @returns A promise that resolves to the server's success message.
 */
export const bookAppointmentAPI = async (payload: BookAppointmentPayload): Promise<BookAppointmentResponse> => {
  const response = await api.post<BookAppointmentResponse>('/appointment/book', payload)
  return response.data
}

/**
 * API call to submit a new appointment booking.
 * Corresponds to: POST /test-service/book
 * @param payload - Contains the topic, booking_date (as ISO string), and time_slot.
 * @returns A promise that resolves to the server's success message.
 */
export const bookServicesAPI = async (payload: BookServicesPayload): Promise<BookAppointmentResponse> => {
  const response = await api.post<BookAppointmentResponse>('/test-service/book', payload)
  return response.data
}

// ============== GET CONSULTATION APPOINTMENT HISTORY ===============
/**
 * Fetches the appointment history for the currently logged-in customer.
 * Corresponds to the "Connect with a consultant" type of booking.
 * @returns A promise that resolves to an array of customer appointments.
 */
export const fetchCustomerAppointments = async (): Promise<CustomerAppointment[]> => {
  const response = await api.get('/appointment/customer')
  return (response.data.result || []).map((appt: Omit<CustomerAppointment, 'type'>) => ({
    ...appt,
    type: 'CONSULTATION'
  }))
}

// ============== GET SERVICE APPOINTMENT HISTORY ===============
/**
 * Fetches the service appointment history for the currently logged-in customer.
 * @returns A promise that resolves to an array of service appointments.
 */
export const fetchCustomerServiceAppointments = async (): Promise<CustomerServiceAppointment[]> => {
  const response = await api.get('/test-service/customer')
  return (response.data.result || []).map((appt: Omit<CustomerServiceAppointment, 'type'>) => ({
    ...appt,
    type: 'SERVICE'
  }))
}

// ============== GET TEST SERVICE RESULT ===============
/**
 * Fetches the test results for a specific service appointment.
 * Corresponds to: GET /test-service/result/:id
 * @param appointmentId - The ID of the service appointment.
 * @returns A promise that resolves to an array of test result items.
 */
export const fetchTestResult = async (appointmentId: string): Promise<TestResultItem[]> => {
  const response = await api.get(`/test-service/result/${appointmentId}`)
  return response.data.result || []
}
