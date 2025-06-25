// This interface describes the flattened consultant object
export interface ConsultantProfile {
  id: string;
  email: string;
  name: string;
  date_of_birth: string; 
  gender: 'male' | 'female' | 'other';
  phone_number: string | null;
  google_id: string | null;
  havePassword?: boolean; 
  specialization_1: string | null;
  specialization_2: string | null;
  certifications: string | null;
  experienceYears: number | null;
  status: number;
}

// This interface describes the full API response structure
export interface GetConsultantProfileResponse {
  message: string;
  consultant: ConsultantProfile;
}