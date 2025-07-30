import api from '@/apis/axiosConfig'
import { Blog } from '@/types'
import {
  BackendBlogDetailResponse,
  BackendBlogsListResponse,
  BlogsListOptions,
  PaginatedBlogsListResponse
} from '@/types/customer/blogTypes'

// =============== BLOGDETAIL FETCHING ===============
/**
 * Hàm gọi API để lấy chi tiết một bài blog.
 *
 * @param blogId - ID (UUID) của bài blog cần lấy chi tiết.
 * @returns Promise chứa dữ liệu của bài blog (chỉ object `blog`).
 */
export const fetchBlogDetail = async (blogId: string): Promise<Blog> => {
  const response = await api.get<BackendBlogDetailResponse>(`/blog/detail/${blogId}`)

  return response.data.result.blog
}

/**
 * Hàm gọi API để lấy danh sách blog.
 *
 * @param options - Options gồm những chức năng như phân trang, sort, search.
 * @returns Promise chứa danh sách blog.
 */
export const fetchBlogsList = async ({
  page,
  limit,
  search,
  sort
}: BlogsListOptions): Promise<PaginatedBlogsListResponse> => {
  const params: Record<string, string | number | number[] | string[]> = {
    _page: page,
    _limit: limit,
    _sort: sort.field,
    _order: sort.direction
  }

  // search
  if (search.field === 'title') {
    params._title_like = search.value
  }

  const response = await api.get<BackendBlogsListResponse>(`/blog/customer`, { params })
  const result = response.data?.result
  return {
    data: result?.blogs ?? [],
    total: result?.total ?? 0
  }
}
