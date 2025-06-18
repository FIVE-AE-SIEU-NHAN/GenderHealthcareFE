// import { register } from 'module';
import axiosInstance from './axiosConfig';
// import { get } from 'axios';


interface AuthApiResponse {
  result: {
    access_token: string;
    refresh_token: string;
  };
  errors?: {
    [key: string]: string;
  };
}

export const authApi = {
  login: async (data: { email: string; password: string })=> {
    const response = await axiosInstance.post<AuthApiResponse>('/user/login', data);
    if (response.status === 200) {
      const { access_token, refresh_token } = response.data.result;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
    }
    

    return response;
  },

  getOtp: async (data: { email: string }) => {
    const response = await axiosInstance.post('/user/get-otp', data);
    return response;
  },

  register: async (data: { 
    name: string;
    gender: string;
    date_of_birth: string;
    phone_number: string;
    email: string;
    password: string;
    confirm_password: string;
    email_verify_token: string;
  }) => {
    const response = await axiosInstance.post<AuthApiResponse>('/user/register', data);
    if ([200,201].includes(response.status)) {
      const { access_token, refresh_token } = response.data.result;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
    }
    return response;
  },

  loginWithGoogle: async (data: { id_token: string }) => {
    const response = await axiosInstance.post<AuthApiResponse>('/user/login-google', data);
    if ([200,201].includes(response.status)) {
      const { access_token, refresh_token } = response.data.result;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
    }
    
    return response;
  }

};