import { register } from 'module';
import axiosInstance from './axiosConfig';
import { get } from 'axios';

export const authApi = {
  login: async (data: { email: string; password: string }) => {
    const response = await axiosInstance.post('/user/login', data);

    const { access_token, refresh_token } = response.data;

    // Lưu access_token và refresh_token vào localStorage (hoặc memory nếu muốn an toàn hơn)
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

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

};