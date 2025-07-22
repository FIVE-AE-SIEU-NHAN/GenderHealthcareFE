import { AppointmentStatus, TimeSlot, Topic } from '@/Application/constants/appointment'

/**
 * Appointment interface matching server API
 */
export interface Appointment {
  id: string
  user_id?: string
  consultant_id?: string
  topic: Topic
  booking_date: string
  time_slot: TimeSlot
  created_at?: string
  status: AppointmentStatus
  chat_room_id: string
}

// This type matches the API's `result` object for a list of appointments
export interface PaginatedAppointments {
  data: Appointment[]
  total: number
}

// This type matches the full API response from the server
export interface AppointmentsApiResponse {
  message: string
  result: PaginatedAppointments
}

/**
 * Backend response for appointments, including pagination
 */
export interface BackendAppointmentsResponse {
  message: string
  result: {
    appointments: Appointment[]
    total: number
  }
}

/**
 * Weekly appointments response
 */
export interface WeeklyAppointmentsResponse {
  appointments: Appointment[]
  weekStart: string
  weekEnd: string
}

export interface UseAppointmentsOptions {
  startDate: string
  endDate: string
}

// =================== APPOINTMENTS STATUS ===================
export interface EditAppointmentStatusPayload {
  appointmentId: string
  status: AppointmentStatus
}
export interface EditAppointmentStatusResponse {
  message: string
}
