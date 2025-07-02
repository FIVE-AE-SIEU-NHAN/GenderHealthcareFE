import api from '@/apis/axiosConfig';

import { BackendBlogDetailResponse, BackendBlogListResponse, BlogListOptions, PaginatedBloglistResponse,  } from '@/types/customer/blogTypes';
import { Blog } from '@/types';

// =============== BLOGDETAIL FETCHING ===============
export const fetchBlogDetail = async (blogId: string): Promise<Blog> => {
  
    // Sử dụng api đã được cấu hình sẵn (tự động đính kèm token)
    const response = await api.get<BackendBlogDetailResponse>(`/blog/detail/${blogId}`);

    // API trả về { message, result: { blog: { ... } } }
    // Chúng ta chỉ cần trả về phần dữ liệu `blog` cho Tanstack Query
    return response.data.result.blog;
  
};


  // =============== BLOGLIST FETCHING ===============
export const fetchBlogsList = async ({ page, limit, search, sort }: BlogListOptions): Promise<PaginatedBloglistResponse> => {
  const params: Record<string, string | number | number[] | string[]> = {
    _page: page,
    _limit: limit,
    _sort: sort.field,
    _order: sort.direction,
  };

  // Search 
  // if (search.value) {
  //   params._title_like = search.value;
  // }
  
  const response = await api.get<BackendBlogListResponse>('/blog/customer', { params }); 
  const result = response.data?.result; 
  return {
    data: result?.blogs ?? [],  
    total: result?.total ?? 0,  
  };
};






















