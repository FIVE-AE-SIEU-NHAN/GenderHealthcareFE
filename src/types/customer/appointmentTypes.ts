// =================== BOOK AN APPOINTMENT ===================

import { AppointmentStatus, TimeSlot, Topic } from "@/Application/constants/appointment";
import { PayOSResponse } from "../payment";

/**
 * The payload required when a customer books a new appointment.
 * Matches the backend validation for `topic`, `booking_date`, and `time_slot`.
 */
export interface BookAppointmentPayload {
  topic: string;
  booking_date: string;
  time_slot: string;
  note: string;
}

/**
 * The payload required when a customer books a new appointment.
 */
export interface BookServicesPayload {
  level: string;
  target_gender: string;
  booking_date: string;
  time_slot: string;
  note: string;
}

/**
 * The expected response from a successful appointment booking.
 */
export interface BookAppointmentResponse {
  message: string;
  result: PayOSResponse; 
}

/**
 * The error structure returned by the backend when booking an appointment fails.
 */
export interface BookAppointmentError {
  message: string;
}

// =================== APPOINTMENT HISTORY ===================
// Type for a single appointment item returned by the API
export interface CustomerAppointment {
  topic: Topic;
  booking_date: string; 
  time_slot: TimeSlot;
  note: string;
  status: AppointmentStatus;
  chat_room_id: string;
}

// Type for the full API response structure
export interface BackendCustomerAppointmentsResponse {
  message: string;
  result: CustomerAppointment[];
}