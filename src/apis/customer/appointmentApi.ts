import api from '@/apis/axiosConfig';
import type { BookAppointmentPayload, BookAppointmentResponse } from '@/types/customer/appointmentTypes';

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