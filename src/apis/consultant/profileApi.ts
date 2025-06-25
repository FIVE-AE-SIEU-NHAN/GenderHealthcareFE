import api from '@/apis/axiosConfig';
import type { ConsultantProfile, GetConsultantProfileResponse } from '@/types/consultant/profileTypes';


export const profileApi = {
  fetch: async (): Promise<ConsultantProfile> => {
    const response = await api.get<GetConsultantProfileResponse>('/consultant/profile');
    return response.data.consultant;
  },
};