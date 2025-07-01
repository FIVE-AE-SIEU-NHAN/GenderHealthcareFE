import type { Blog } from '@/types'; 


// =================== BLOGDETAIL FETCHING ===================
export interface BackendBlogDetailResponse {
  message: string;
  result: {
    blog: Blog;
  };
}

export interface BackendBlogListResponse {
  message: string;
  result: {
    blogs: Blog[];
    total: number;
  };
}

// --------- Response for paginated bloglist ---------
export interface PaginatedBloglistResponse {
  data: Blog[];
  total: number;
}

// --------- Bloglist for the hook ---------
export interface BlogListOptions {
  page: number;
  limit: number;
  search?: {
    field: string; 
    value: string;
  };
  sort: {
    field: 'created_at';
    direction: 'asc' | 'desc';
  };

}
