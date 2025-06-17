import api from '@/apis/axiosConfig';
import { USER_ROLE, USER_SEARCH_FIELDS, USER_STATUS } from '@/Application/constants/admin/admin.userConstants';
import { BackendUserResponse, CreateUserPayload, CreateUserResponse, EditUserStatusPayload, EditUserStatusResponse, PaginatedUsersResponse, UseUsersOptions } from '@/types/admin/userTypes';
import { format } from 'date-fns';

// =============== USER FETCHING ===============
export const fetchUsers = async ({ page, limit, filters, search, sort, dateRange }: UseUsersOptions): Promise<PaginatedUsersResponse> => {
  const params: Record<string, string | number | number[] | string[]> = {
    _page: page,
    _limit: limit,
    _sort: sort.field,
    _order: sort.direction,
  };

  // Search 
if (search.value && USER_SEARCH_FIELDS[search.field as keyof typeof USER_SEARCH_FIELDS]) {
    const backendKey = USER_SEARCH_FIELDS[search.field as keyof typeof USER_SEARCH_FIELDS];
    params[backendKey] = search.value;
  }

  // Filters
  for (const key in filters) {
    const value = filters[key];
    const valuesAsArray = Array.isArray(value) ? value : [value];
    if (key === 'status') {
      params._verify = valuesAsArray.map(v => USER_STATUS.API_MAP[String(v)]);
    } else if (key === 'role') {
      params._role = valuesAsArray.map(v => USER_ROLE.API_MAP[String(v)]);
    } else if (key === 'gender') {
      params._gender = valuesAsArray as string[];
    }
  }

if (dateRange) {
    const dates: string[] = [];

    // If a "from" date exists, format it and add it to our dates array
    if (dateRange.from) {
      dates.push(format(dateRange.from, 'yyyy-MM-dd'));
    }

    // If a "to" date exists, format it and add it to our dates array
    if (dateRange.to) {
      dates.push(format(dateRange.to, 'yyyy-MM-dd'));
    }

    // If the dates array has any items, assign it to the `_created_at` parameter.
    // Axios will serialize this into `&_created_at=2025-06-14&_created_at=2025-06-20`
    if (dates.length > 0) {
      params._created_at = dates;
    }
  }
  
  const response = await api.get<BackendUserResponse>('/user/get-users', { params }); 
  const result = response.data?.result; 
  return {
    data: result?.users ?? [],  
    total: result?.total ?? 0,  
  };
};




// =============== USER STATUS EDITING ===============
export const editUserStatusAPI = async ({ userId, status }: EditUserStatusPayload): Promise<EditUserStatusResponse> => {
  const body = { status };
  const response = await api.patch<EditUserStatusResponse>(`/user/${userId}/edit-status`, body);
  return response.data;
};



// =============== USER CREATION ===============
export const createUserAPI = async (payload: CreateUserPayload): Promise<CreateUserResponse> => {
  const response = await api.post<CreateUserResponse>('/user/create', payload);
  return response.data;
};