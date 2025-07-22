import { profileApi } from '@/apis/doctor/profileApi'
import { DoctorProfile } from '@/types/manager/doctorTypes'
import { useQuery } from '@tanstack/react-query'

export function useDoctorProfile() {
  const queryKey = ['doctorProfile']

  return useQuery<DoctorProfile, Error>({
    queryKey,
    queryFn: profileApi.fetch,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}
