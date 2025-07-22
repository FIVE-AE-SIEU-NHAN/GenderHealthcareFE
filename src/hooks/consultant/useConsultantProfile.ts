import { profileApi } from '@/apis/consultant/profileApi'
import { ConsultantProfile } from '@/types/consultant/profileTypes'
import { useQuery } from '@tanstack/react-query'

export function useConsultantProfile() {
  const queryKey = ['consultantProfile']

  return useQuery<ConsultantProfile, Error>({
    queryKey,
    queryFn: profileApi.fetch,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}
