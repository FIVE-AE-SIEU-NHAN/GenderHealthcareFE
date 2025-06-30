import { fetchBlogDetail } from '@/apis/customer/blogApi';
import { Blog } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';



/**
 * A custom Tanstack Query hook to fetch BlogDetail.
 */
export function useBlogDetail(blogId: string | undefined) {
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