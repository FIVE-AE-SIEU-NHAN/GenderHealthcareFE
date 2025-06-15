import type { User } from '@/types/user'; 


// =================== USERS FETCHING ===================
export interface BackendUserResponse {
  message: string;
  result: {
    users: User[];
    total: number;
  };
}


// --------- Response for paginated users ---------
export interface PaginatedUsersResponse {
  data: User[];
  total: number;
}

// --------- Options for the hook ---------
export interface UseUsersOptions {
  page: number;
  limit: number;
  filters: Record<string, string | number>; 
  search: {
    field: string; 
    value: string;
  };
  sort: {
    field: keyof User;
    direction: 'asc' | 'desc';
  };
}






// =================== USERS STATUS =================== 
export interface EditUserStatusPayload {
  userId: string;
  status: number;
}

export interface EditUserStatusResponse {
  message: string;
}




// =================== USER CREATION ===================
export interface CreateUserPayload {
  name: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  phone_number: string;
  password: string;
  date_of_birth: string; 
  role: number;

  // "Consultant" role
  specialization_1?: string;
  specialization_2?: string;
  certifications?: string;
  experienceYears?: number;
}

// --------- Response for user creation ---------
export interface CreateUserResponse {
  message: string;
  result: User; 
}