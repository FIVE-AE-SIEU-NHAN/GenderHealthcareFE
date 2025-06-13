// src/hooks/useUsers.ts
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { User } from '@/types/user';

export interface PaginatedUsersResponse {
  data: User[];
  total: number;
}

export interface UseUsersOptions {
  page: number;
  limit: number;
  filters: Record<string, any>; 
  search: {
    field: string; 
    value: string;
  };
  sort: {
    field: keyof User;
    direction: 'asc' | 'desc';
  };
}

const fetchUsers = async ({ page, limit, filters, search, sort }: UseUsersOptions): Promise<PaginatedUsersResponse> => {
  const params: Record<string, any> = {
    _page: page,
    _limit: limit,
    _sort: sort.field,
    _order: sort.direction,
    ...filters,
  };

  // If search all fields, use 'q' as the query parameter.
  // If search specific field, use 'field_like' as the query parameter.
  if (search.value) {
    params[search.field === 'all' ? 'q' : `${search.field}_like`] = search.value;
  }

  const response = await api.get<PaginatedUsersResponse>('/users', { params });
  return response.data;
};


/**
 * A custom Tanstack Query hook to fetch a paginated list of users.
 * @param options - The query options (pagination, sorting, filtering).
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