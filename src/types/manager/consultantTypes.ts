import type { ConsultantProfile } from '@/types/consultant/profileTypes'; 

// =================== CONSULTANTS FETCHING ===================
export interface BackendConsultantResponse {
  message: string;
  result: {
    consultants: ConsultantProfile[];
    total: number;
  };
}


// --------- Response for paginated consultants ---------
export interface PaginatedConsultantsResponse {
  data: ConsultantProfile[];
  total: number;
}

// --------- Options for the hook ---------
export interface UseConsultantsOptions {
  page: number;
  limit: number;
  filters: Record<string, ( string | number ) | ( string | number )[] >; 
  search: {
    field: string; 
    value: string;
  };
  sort: {
    field: keyof ConsultantProfile;
    direction: 'asc' | 'desc';
  };
  dateRange?: {
    field?: string; 
    from?: Date;
    to?: Date;
  };
}






// =================== CONSULTANTS STATUS =================== 
export interface EditConsultantStatusPayload {
  consultantId: string;
  status: number;
}

export interface EditConsultantStatusResponse {
  message: string;
}


// =================== UPDATE CONSULTANT ===================
export interface UpdateConsultantProfilePayload {
  consultantId: string;
  specialization_1?: string;
  specialization_2?: string;
  certifications?: string;
  experienceYears?: number;
}

export interface UpdateConsultantProfileResponse {
  message: string;
  consultantInfor: ConsultantProfile;
}