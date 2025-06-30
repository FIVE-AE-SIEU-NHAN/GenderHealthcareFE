import type { Blog } from '@/types'; 


// =================== BLOGDETAIL FETCHING ===================
export interface BackendBlogDetailResponse {
  message: string;
  result: {
    blog: Blog;
  };
}


// // --------- Response for paginated questions ---------
// export interface PaginatedQuestionsResponse {
//   data: Blog[];
//   total: number;
// }

// // --------- Options for the hook ---------
// export interface BlogDetailOptions {
//   page: number;
//   limit: number;
//   filters: Record<string, ( string | number ) | ( string | number )[] >; 
//   search: {
//     field: string; 
//     value: string;
//   };
//   sort: {
//     field: keyof Question;
//     direction: 'asc' | 'desc';
//   };
//   dateRange?: {
//     field?: string; 
//     from?: Date;
//     to?: Date;
//   };
// }


// // =================== QUESTIONS STATUS =================== 
// export interface EditQuestionStatusPayload {
//   questionId: string;
//   is_public: boolean;
// }

// export interface EditQuestionStatusResponse {
//   message: string;
// }