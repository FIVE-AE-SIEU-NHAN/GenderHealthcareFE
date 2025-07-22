// This interface describes the flattened consultant object
export interface ConsultantProfile {
  id: string
  name: string
  date_of_birth: string
  gender: 'male' | 'female' | 'other'
  phone_number: string | null
  specialization_1: string | null
  specialization_2: string | null
  certifications: string | null
  experienceYears: number | null
  created_at?: string
  status: number
  email?: string
}

// This interface describes the full API response structure
export interface GetConsultantProfileResponse {
  message: string
  consultant: ConsultantProfile
}
