import api from '@/apis/axiosConfig';
import { Blog } from '@/types';
import { BackendBlogDetailResponse } from '@/types/customer/blogTypes';


// =============== BLOGDETAIL FETCHING ===============
/**
 * Hàm gọi API để lấy chi tiết một bài blog của khách hàng.
 *
 * @param blogId - ID (UUID) của bài blog cần lấy chi tiết.
 * @returns Promise chứa dữ liệu của bài blog (chỉ object `blog`).
 */
export const fetchBlogDetail = async (blogId: string): Promise<Blog> => {
  // 3. Sử dụng axiosInstance để gọi API. 
  // Bạn không cần phải lo về base URL, content-type, hay access token
  // vì tất cả đã được xử lý trong `axiosConfig.ts`.
  const response = await api.get<BackendBlogDetailResponse>(`/blog/customer/${blogId}`);

  // 4. API trả về dữ liệu blog trong `response.data.result.blog`.
  // Chúng ta trả về trực tiếp object `blog` này để hook Tanstack Query
  // có thể sử dụng dữ liệu một cách gọn gàng.
  return response.data.result.blog; 
};