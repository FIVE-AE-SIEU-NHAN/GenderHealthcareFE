export interface User {
  id: string;
  name: string; 
  email: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  created_at: string; 
  updated_at: string;
  verify: number; 
  role: number;
  google_id: string | null; 
  havePassword: boolean;
}