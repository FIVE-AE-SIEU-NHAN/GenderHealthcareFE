import { fetchBlogDetail, fetchBlogsList } from '@/apis/customer/blogApi';
import { Blog } from '@/types';
import { BlogsListOptions, PaginatedBlogsListResponse } from '@/types/customer/blogTypes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';


// ================== BLOG DETAIL HOOK ===================
/**
 * A custom Tanstack Query hook to fetch BlogDetail.
 */
function useBlogDetail(blogId: string | undefined) {
  return useQuery<Blog, Error>({
    // Query key phải duy nhất cho từng bài blog
    queryKey: ['blog', blogId],

    // Truyền blogId vào hàm fetchBlogDetail
    queryFn: () => fetchBlogDetail(blogId!),
    
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
}


// ================== BLOGS LIST HOOK ===================
/**
 * A custom Tanstack Query hook to fetch a paginated list of BLOG LIST.
 * @param options - The query options from the UI (pagination, sorting, filtering).
 */
function useBlogsList(options: BlogsListOptions) {
  const queryKey = ['blogs', options];

  return useQuery<PaginatedBlogsListResponse, Error>({
    queryKey,
    queryFn: () => fetchBlogsList(options),
    
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
}

export { useBlogDetail, useBlogsList };