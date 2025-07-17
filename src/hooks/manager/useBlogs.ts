import { fetchBlogs } from '@/apis/manager/blogsApi';
import { BlogsListOptions, PaginatedBlogsListResponse } from '@/types/customer/blogTypes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

/**
 * Một custom Tanstack Query hook để lấy danh sách blog được phân trang.
 * @param options - Các tùy chọn truy vấn từ UI (phân trang, sắp xếp, lọc).
 */
export function useBlogs(options: BlogsListOptions) {
  const queryKey = ['blogs', options];

  return useQuery<PaginatedBlogsListResponse, Error>({
    queryKey,
    queryFn: () => fetchBlogs(options),
    
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, 
  });
}