import type { Blog } from '@/types'

// =================== BLOGDETAIL FETCHING ===================
export interface BackendBlogDetailResponse {
  message: string
  result: {
    blog: Blog
  }
}

export interface BackendBlogsListResponse {
  message: string
  result: {
    blogs: Blog[]
    total: number
  }
}

// --------- Response for paginated questions ---------
export interface PaginatedBlogsListResponse {
  data: Blog[]
  total: number
}

// --------- Options for the hook ---------
export interface BlogsListOptions {
  page: number
  limit: number
  search: {
    field: string
    value: string
  }
  sort: {
    field: keyof Blog
    direction: 'asc' | 'desc'
  }
  filters?: Record<string, (string | number) | (string | number)[]>
  dateRange?: {
    field?: string
    from?: Date
    to?: Date
  }
}

// =================== BLOGS STATUS ===================
export interface EditBlogStatusPayload {
  blogId: string
  status: string
}

export interface EditBlogStatusResponse {
  message: string
}

// =================== BLOG CREATION ===================
export interface CreateBlogPayload {
  summary: string
  content: string
  section_1: string
  section_2: string
  title: string
  cover_image: string
  main_image?: string
  sub_image?: string
}

// --------- Response for blog creation ---------
export interface CreateBlogResponse {
  message: string
  result: Blog
}

// =================== BLOG UPDATE ===================
export type UpdateBlogPayload = Partial<CreateBlogPayload>
export interface UpdateBlogResponse {
  message: string
}
