import api from '@/apis/axiosConfig';
import { User } from "@/types";
import { ProfileApiResponse } from '@/types/customer/profileTypes';

export const profileApi = {
  fetchProfile: async (): Promise<User> => {
    const response = await api.get<ProfileApiResponse>('/user/profile');
    return response.data.user;
  }
}