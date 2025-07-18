import { editBlogStatusAPI } from '@/apis/manager/blogsApi';
import { EditBlogStatusPayload, EditBlogStatusResponse } from '@/types/customer/blogTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner'; 

/**
 * A hook for Manager's Update Blog Status mutations.
 */
export const useBlogsMutations = () => {
  const queryClient = useQueryClient();

  // =============== BLOGS STATUS EDITING ===============
  const editStatusMutation = useMutation<
    EditBlogStatusResponse,
    Error,
    EditBlogStatusPayload
  >({
    mutationFn: editBlogStatusAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success(data.message || 'User status updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update status.');
    },
  });


  return {
    editStatus: editStatusMutation,
  };
};

