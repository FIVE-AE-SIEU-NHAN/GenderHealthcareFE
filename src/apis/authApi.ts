// import { register } from 'module';
import axiosInstance from './axiosConfig';
// import { get } from 'axios';


interface LoginApiResponse {
  result: {
    access_token: string;
    refresh_token: string;
  };
}

export const authApi = {
  login: async (data: { email: string; password: string })=> {
    const response = await axiosInstance.post<LoginApiResponse>('/user/login', data);
    if (response.status === 200) {
      const { access_token, refresh_token } = response.data.result;

      // Lưu access_token và refresh_token vào localStorage (hoặc memory nếu muốn an toàn hơn)
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
    fullName: string;
    gender: string;
    dob: string;
    email: string;
    password: string;
    confirmPassword: string;
    otp: string;
  }) => {
    const response = await axiosInstance.post('/user/register', data);
    return response;
  },

  loginWithGoogle: async (data: { id_token: string }) => {
    const response = await axiosInstance.post<LoginApiResponse>('/user/login-google', data);
    if ([200,201].includes(response.status)) {
      const { access_token, refresh_token } = response.data.result;

      // Lưu access_token và refresh_token vào localStorage (hoặc memory nếu muốn an toàn hơn)
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
    }
    
    return response;
  }

};