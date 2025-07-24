import { TimeSlot } from '@/Application/constants/appointment'

/**
 * Defines the possible statuses for a service appointment,
 * based on the Prisma schema.
 */
export type ServiceAppointmentStatus = 'PENDING' | 'CHECKIN' | 'ONGOING' | 'INPUT_RESULTS' | 'COMPLETED' | 'CANCELLED'

/**
 * Represents a single service appointment object, based on the
 * backend API response.
 */
export interface ServiceAppointment {
  id: string
  user_id: string
  staff_id: string
  package_id: string
  note: string
  booking_date: string
  time_slot: TimeSlot
  created_at: string
  status: ServiceAppointmentStatus
}

/**
 * Describes the structure of the API response for fetching
 * service appointments.
 */
export interface BackendServiceAppointmentsResponse {
  message: string
  result: {
    testServiceAppointments: ServiceAppointment[]
    total: number
  }
}

/**
 * Represents the structured data for paginated service appointments
 * used within the application.
 */
export interface PaginatedServiceAppointments {
  data: ServiceAppointment[]
  total: number
}

// Represents a single service within a package
export interface Service {
  service_id: string
  name: string
}

// Represents the detailed package structure from GET /test-service/package/:id
export interface PackageDetails {
  id: string // package_id
  name: string
  test_service_appointment_id: string
  services: Service[]
}

// Represents the body for the POST /:id/result request
export interface UpdateTestServiceResultReqBody {
  test_service_appointment_id: string
  result: string
  unit?: string
  test_date: string
  note?: string
}

export type ServiceResultFormData = {
  // An array where each object corresponds to a service's result form
  results: (UpdateTestServiceResultReqBody & { service_id: string; name: string })[]
}
