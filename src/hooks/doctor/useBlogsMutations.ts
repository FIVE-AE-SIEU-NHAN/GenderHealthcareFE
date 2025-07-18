import { createBlogAPI } from '@/apis/doctor/blogsApi';
import { CreateBlogPayload, CreateBlogResponse } from '@/types/customer/blogTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner'; 

/**
 * A hook for blog creation.
 */
export const useBlogMutations = () => {
  const queryClient = useQueryClient();
  // =============== BLOG CREATION ===============
  const createBlogMutation = useMutation<
    CreateBlogResponse,
    Error,
    CreateBlogPayload
  >({
    mutationFn: createBlogAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success(data.message || 'Blog created successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create blog.');
    },
  });

  return {
    createBlog: createBlogMutation,
  };
};

