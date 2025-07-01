// src/hooks/queries/useBlogDetail.ts

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Blog } from '@/types';
import { fetchBlogDetail, fetchBlogsList } from '@/apis/customer/blogApi'; // Import hàm API và Type
import { BlogListOptions, PaginatedBloglistResponse } from '@/types/customer/blogTypes';

/**
 * Custom hook để lấy dữ liệu chi tiết của một bài blog.
 * @param blogId - ID của bài blog. Query sẽ không chạy nếu ID không hợp lệ.
 */
export function useBlogDetail(blogId: string | undefined) {
  // Query key phải là duy nhất cho mỗi query.
  // Đưa blogId vào key để Tanstack Query biết rằng đây là dữ liệu cho một blog cụ thể.
  // Khi blogId thay đổi, nó sẽ tự động fetch lại.
  const queryKey = ['blogDetail', blogId];

  return useQuery<Blog, Error>({
    queryKey: queryKey,

    // queryFn sẽ gọi hàm fetch dữ liệu của bạn
    // Tanstack Query tự động cung cấp queryKey, nhưng ở đây ta chỉ cần blogId
    // nên ta dùng một hàm ẩn danh để gọi fetchBlogDetail với đúng tham số.
    queryFn: () => fetchBlogDetail(blogId!), // Dấu ! để báo cho TS rằng blogId sẽ không undefined ở đây (nhờ `enabled`)

    // `enabled` là một option rất quan trọng.
    // Query sẽ chỉ được thực thi khi `blogId` có giá trị (không phải undefined, null, chuỗi rỗng).
    enabled: !!blogId,

    // Các options khác bạn đã có:
    refetchOnWindowFocus: false, // Không fetch lại khi focus vào cửa sổ
    staleTime: 5 * 60 * 1000, // 5 phút, dữ liệu được coi là "cũ" sau 5 phút


  });
}

/**
 * Custom hook để fetch danh sách blog có phân trang, sắp xếp và tìm kiếm.
 * @param options - Các tùy chọn như page, limit, sort, search.
 */
 export function useBlogList(options: BlogListOptions) {
    // Destructuring các options để đưa vào queryKey
    const { page, limit, sort, search } = options;

    // Query key phải bao gồm tất cả các tham số ảnh hưởng đến kết quả
    // để Tanstack Query có thể cache chính xác và tự động fetch lại khi chúng thay đổi.
    const queryKey = ['blogsList', { page, limit, sort, search }];

    return useQuery<PaginatedBloglistResponse, Error>({
      queryKey: queryKey,

      // queryFn sẽ gọi hàm fetchBlogsList với các options đã được truyền vào.
      queryFn: () => fetchBlogsList({ page, limit, sort, search }),

      // `placeholderData: keepPreviousData` là một tính năng rất hữu ích cho phân trang.
      // Nó sẽ giữ lại dữ liệu của trang trước đó trong khi đang fetch dữ liệu của trang mới,
      // giúp UI không bị giật về trạng thái loading.
      placeholderData: keepPreviousData,

      // Thời gian dữ liệu được coi là "tươi" (fresh).
      // Đối với một danh sách, có thể để thời gian ngắn hơn chi tiết.
      staleTime: 5 * 60 * 1000, 

      refetchOnWindowFocus: false,
    });
  }