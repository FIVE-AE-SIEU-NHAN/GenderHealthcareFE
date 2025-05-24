import apiClient from '@/utils/axios';

// Định nghĩa các kiểu dữ liệu
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
  phone_number?: string;
  gender?: string;
  date_of_birth?: string;
  email_verify_token?: string;
}

interface ApiResponse<T> {
  message?: string;
  result?: T;
  errors?: {
    [key: string]: string;
  };
}

// API xác thực
export const authApi = {
  login: (data: LoginRequest) => 
    apiClient.post<ApiResponse<{ access_token: string; refresh_token: string }>>('/user/login', data),
  
  getOTP: (data: { email: string }) =>
    apiClient.post<ApiResponse<{ message: string }>>('/otp/get-token', data),

  register: (data: RegisterRequest) => 
    apiClient.post<ApiResponse<{ access_token: string; refresh_token: string }>>('/auth/register', data),
};
