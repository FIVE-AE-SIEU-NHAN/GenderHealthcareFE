// =================================================================
// ==                     DOCTOR PROFILE & API                    ==
// =================================================================

/**
 * Defines the shape of a single Doctor's profile object, based on the fields
 * returned by the `getStaffsForAdmin` service.
 */
export interface DoctorProfile {
  id: string
  name: string
  gender: 'male' | 'female' | 'other'
  date_of_birth: string
  specialization: string
  created_at: string
  status: number // 0 for Inactive, 1 for Active
  email: string
  phone_number: string
}

export interface GetDoctorProfileResponse {
  message: string
  staff: DoctorProfile
}
/**
 * Represents the raw response structure from the `/staff/get-staff` API endpoint.
 */
export interface BackendDoctorResponse {
  message: string
  result: {
    staffs: DoctorProfile[]
    total: number
  }
}

/**
 * Represents the structured, paginated data format consumed by the `useDoctors` hook.
 */
export interface PaginatedDoctorsResponse {
  data: DoctorProfile[]
  total: number
}

// =================================================================
// ==                DATA FETCHING & FILTERING OPTIONS            ==
// =================================================================

/**
 * Defines the options for fetching, filtering, sorting, and paginating doctors.
 * These options are passed to the `useDoctors` hook and `fetchDoctors` API call.
 */
export interface UseDoctorsOptions {
  page: number
  limit: number
  filters: Record<string, string | string[]>
  search: {
    field: string
    value: string
  }
  sort: {
    field: keyof DoctorProfile
    direction: 'asc' | 'desc'
  }
  dateRange?: {
    field: string
    from?: Date
    to?: Date
  }
}

// =================================================================
// ==                      DOCTOR MUTATIONS                       ==
// =================================================================

// =============== EDIT DOCTOR STATUS ===============
/**
 * Payload for the `editDoctorStatusAPI` mutation.
 */
export interface EditDoctorStatusPayload {
  doctorId: string
  status: number // 0 for Inactive, 1 for Active
}

/**
 * Expected response from the `editDoctorStatusAPI` mutation.
 */
export interface EditDoctorStatusResponse {
  message: string
}

// =============== UPDATE DOCTOR PROFILE ===============
/**
 * Payload for the `updateDoctorProfileAPI` mutation.
 * It requires the doctor's ID and a partial object of their profile fields.
 */
export interface UpdateDoctorProfilePayload {
  doctorId: string
  specialization: string
}

/**
 * Expected response from the `updateDoctorProfileAPI` mutation,
 * which includes the updated doctor data.
 */
export interface UpdateDoctorProfileResponse {
  message: string
  doctorInfor: DoctorProfile
}
