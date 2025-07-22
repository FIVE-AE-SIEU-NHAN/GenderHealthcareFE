import api from '@/apis/axiosConfig'
import { DoctorProfile, GetDoctorProfileResponse } from '@/types/manager/doctorTypes'

export const profileApi = {
  fetch: async (): Promise<DoctorProfile> => {
    const response = await api.get<GetDoctorProfileResponse>('/staff/profile')
    return response.data.staff
  }
}
