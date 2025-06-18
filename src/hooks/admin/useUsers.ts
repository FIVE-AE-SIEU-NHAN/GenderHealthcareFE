import { fetchUsers } from '@/apis/admin/userApi';
import { PaginatedUsersResponse, UseUsersOptions } from '@/types/admin/userTypes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';



/**
 * A custom Tanstack Query hook to fetch a paginated list of users.
 * @param options - The query options from the UI (pagination, sorting, filtering).
 */
export function useUsers(options: UseUsersOptions) {
  const queryKey = ['users', options];

  return useQuery<PaginatedUsersResponse, Error>({
    queryKey,
    queryFn: () => fetchUsers(options),
    
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
}