// =================== BOOK AN APPOINTMENT ===================

/**
 * The payload required when a customer books a new appointment.
 * Matches the backend validation for `topic`, `booking_date`, and `time_slot`.
 */
export interface BookAppointmentPayload {
  topic: string;
  booking_date: Date;
  time_slot: string;
}

/**
 * The expected response from a successful appointment booking.
 */
export interface BookAppointmentResponse {
  message: string;
}