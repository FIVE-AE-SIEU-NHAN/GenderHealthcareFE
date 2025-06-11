// src/hooks/useUsers.ts
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { User } from '@/types/user';

export interface PaginatedUsersResponse {
  data: User[];
  total: number;
}

// Define all possible parameters for fetching users
export interface UseUsersOptions {
  page: number;
  limit: number;
  filters: Record<string, any>; // e.g., { status: 'Active', role: 'Admin' }
  search: {
    field: string; // e.g., 'fullName', 'email', or 'all'
    value: string;
  };
  sort: {
    field: keyof User | 'id';
    direction: 'asc' | 'desc';
  };
}

export function useUsers({ page, limit, filters, search, sort }: UseUsersOptions) {
  // The query key now includes EVERY parameter that can affect the query result.
  // This is critical for Tanstack Query to cache correctly.
  const queryKey = ['users', { page, limit, filters, search, sort }];

  return useQuery<PaginatedUsersResponse, Error>({
    queryKey,
    queryFn: async () => {
      // Build the query parameters object for Axios
      const params: Record<string, any> = {
        _page: page,
        _limit: limit,
        _sort: sort.field,
        _order: sort.direction,
        ...filters, // Spread the filters directly
      };

      // Only add the 'q' parameter if a search term exists
      if (search.value) {
        if (search.field === 'all') {
          // If 'all', use the global 'q' parameter.
          params.q = search.value;
        } else {
          // If a specific field, use the '_like' parameter for a "contains" search.
          params[`${search.field}_like`] = search.value;
        }
      }


      const response = await api.get<PaginatedUsersResponse>('/users', { params });
      return response.data;
    },
    // Keep previous data visible while fetching new data for a smoother UX
    placeholderData: keepPreviousData,
  });
}