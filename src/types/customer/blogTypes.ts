import type { Blog } from '@/types'; 


// =================== BLOGDETAIL FETCHING ===================
export interface BackendBlogDetailResponse {
  message: string;
  result: {
    blog: Blog;
  };
}

export interface BackendBlogsListResponse {
  message: string;
  result: {
    blogs: Blog[];
    total: number;
  };
}


// --------- Response for paginated questions ---------
export interface PaginatedBlogsListResponse {
  data: Blog[];
  total: number;
}

// --------- Options for the hook ---------
export interface BlogsListOptions {
  page: number;
  limit: number;
  search: {
    field: string; 
    value: string;
  };
  sort: {
    field: keyof Blog;
    direction: 'asc' | 'desc';
  };
  filters?: Record<string, ( string | number ) | ( string | number )[] >; 
    dateRange?: {
    field?: string; 
    from?: Date;
    to?: Date;
  };
}