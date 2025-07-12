import api from '@/apis/axiosConfig';
import type { BookAppointmentPayload, BookAppointmentResponse, CustomerAppointment } from '@/types/customer/appointmentTypes';

// =============== CREATE (BOOK) A NEW APPOINTMENT ===============
/**
 * API call to submit a new appointment booking.
 * Corresponds to: POST /appointment/book
 * @param payload - Contains the topic, booking_date (as ISO string), and time_slot.
 * @returns A promise that resolves to the server's success message.
 */
export const bookAppointmentAPI = async (payload: BookAppointmentPayload): Promise<BookAppointmentResponse> => {
  const response = await api.post<BookAppointmentResponse>('/appointment/book', payload);
  return response.data;
};


// ============== GET APPOINTMENT HISTORY ===============
/**
 * Fetches the appointment history for the currently logged-in customer.
 * Corresponds to the "Connect with a consultant" type of booking.
 * @returns A promise that resolves to an array of customer appointments.
 */
export const fetchCustomerAppointments = async (): Promise<CustomerAppointment[]> => {
  const response = await api.get('/appointment/customer');
  
  return response.data.result || [];
};