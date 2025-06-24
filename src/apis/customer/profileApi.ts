import api from '@/apis/axiosConfig';
import type { User } from '@/types/user';
import type { ProfileApiResponse, UpdatePasswordPayload, UpdatePasswordResponse, UpdateProfilePayload, UpdateProfileResponse } from '@/types/customer/profileTypes';


export const profileApi = {
  fetch: async (): Promise<User> => {
    const response = await api.get<ProfileApiResponse>('/user/profile');
    return response.data.user;
  },

  /**
   * API call to change the user's password.
   */
  updatePassword: async (payload: UpdatePasswordPayload): Promise<UpdatePasswordResponse> => {
    const response = await api.put<UpdatePasswordResponse>('/user/change-password', payload);
    return response.data;
  },

  /**
   * API call to update the current authenticated user's profile.
   * Corresponds to: PATCH /user/profile
   * @param payload - The profile data to update.
   */
  updateProfileAPI: async (payload: UpdateProfilePayload): Promise<UpdateProfileResponse> => {
    const response = await api.patch<UpdateProfileResponse>('/user/profile', payload);
    return response.data;
  }
};