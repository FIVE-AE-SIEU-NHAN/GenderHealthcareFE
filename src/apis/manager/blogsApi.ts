import api from '@/apis/axiosConfig';
import { BLOG_SEARCH_FIELDS, BLOG_STATUS } from '@/Application/constants/manager/manager.blogConstants';
import { BackendBlogsListResponse, BlogsListOptions, PaginatedBlogsListResponse } from '@/types/customer/blogTypes';
import { format } from 'date-fns';

// =============== USER FETCHING ===============
export const fetchBlogs = async ({ page, limit, filters, search, sort, dateRange }: BlogsListOptions): Promise<PaginatedBlogsListResponse> => {
  const params: Record<string, string | number | number[] | string[]> = {
    _page: page,
    _limit: limit,
    _sort: sort.field,
    _order: sort.direction,
  };

  // Search 
  if (search.value && BLOG_SEARCH_FIELDS[search.field as keyof typeof BLOG_SEARCH_FIELDS]) {
    const backendKey = BLOG_SEARCH_FIELDS[search.field as keyof typeof BLOG_SEARCH_FIELDS];
    params[backendKey] = search.value;
  }

  // Filters
  for (const key in filters) {
    const value = filters[key];
    const valuesAsArray = Array.isArray(value) ? value : [value];
    if (key === 'status') {
      params._status = valuesAsArray.map(v => BLOG_STATUS.API_MAP[String(v)]);
    } 
  }


  // Date Filter 
   if (dateRange && (dateRange.from || dateRange.to)) {
    const dates: string[] = [];
    
    if (dateRange.from) {
      dates.push(format(dateRange.from, 'yyyy-MM-dd'));
    }
    if (dateRange.to) {
      dates.push(format(dateRange.to, 'yyyy-MM-dd'));
    }

    if (dates.length > 0) {
      // Use the dynamic field key from the dateRange object to create the param name
      const dateKey = `_${dateRange.field}`; 
      params[dateKey] = dates;
    }
  }
  
  const response = await api.get<BackendBlogsListResponse>('/blog/manager', { params }); 
  const result = response.data?.result; 
  return {
    data: result?.blogs ?? [],  
    total: result?.total ?? 0,  
  };
};




// // =============== USER STATUS EDITING ===============
// export const editUserStatusAPI = async ({ userId, status }: EditUserStatusPayload): Promise<EditUserStatusResponse> => {
//   const body = { status };
//   const response = await api.patch<EditUserStatusResponse>(`/user/${userId}/edit-status`, body);
//   return response.data;
// };



// // =============== USER CREATION ===============
// export const createUserAPI = async (payload: CreateUserPayload): Promise<CreateUserResponse> => {
//   const response = await api.post<CreateUserResponse>('/user/create', payload);
//   return response.data;
// };