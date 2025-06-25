import { profileApi } from '@/apis/customer/profileApi'; 
import { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

export function useProfile() {
  const queryKey = ['userProfile'];

  return useQuery<User, Error>({
    queryKey,
    queryFn: profileApi.fetch, 
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}