import { TimeSlot } from '@/Application/constants/appointment'

/**
 * Defines the possible statuses for a service appointment,
 * based on the Prisma schema.
 */
export type ServiceAppointmentStatus = 'PENDING' | 'CHECKIN' | 'ONGOING' | 'INPUT_RESULTS' | 'COMPLETED' | 'CANCELLED'

export const SERVICE_PACKAGE_NAMES: { [key: string]: string } = {
  '83cf0d76-637e-11f0-bfde-0242ac110002': 'Basic for men',
  '83cf134d-637e-11f0-bfde-0242ac110002': 'Advanced for men',
  '83cf1469-637e-11f0-bfde-0242ac110002': 'Basic for women',
  '83cf14e0-637e-11f0-bfde-0242ac110002': 'Advanced for women'
}

export const TEST_SERVICE_NAMES: { [key: string]: string } = {
  '646252d8-637e-11f0-bfde-0242ac110002': 'HIV Test',
  '646255da-637e-11f0-bfde-0242ac110002': 'Syphilis Test',
  '6462641c-637e-11f0-bfde-0242ac110002': 'Gonorrhea Test',
  '646264d0-637e-11f0-bfde-0242ac110002': 'Chlamydia Test',
  '6462653b-637e-11f0-bfde-0242ac110002': 'HPV Test',
  '64626599-637e-11f0-bfde-0242ac110002': 'Herpes Test',
  '646265f1-637e-11f0-bfde-0242ac110002': 'Hepatitis B Test',
  '64626673-637e-11f0-bfde-0242ac110002': 'Hepatitis C Test',
  '6462677f-637e-11f0-bfde-0242ac110002': 'Trichomonas Test',
  '64626839-637e-11f0-bfde-0242ac110002': 'Mycoplasma Test'
}

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
