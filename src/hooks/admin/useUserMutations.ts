import { createUserAPI, editUserStatusAPI } from '@/apis/admin/userApi';
import { CreateUserPayload, CreateUserResponse, EditUserStatusPayload, EditUserStatusResponse } from '@/types/admin/userTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner'; 

/**
 * A hook for all user-related mutations (Create, Update, Delete).
 * It returns an object containing individual mutation hooks.
 */
export const useUserMutations = () => {
  const queryClient = useQueryClient();

  // =============== USER STATUS EDITING ===============
  const editStatusMutation = useMutation<
    EditUserStatusResponse,
    Error,
    EditUserStatusPayload
  >({
    mutationFn: editUserStatusAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(data.message || 'User status updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update status.');
    },
  });




  // =============== USER CREATION ===============
  const createUserMutation = useMutation<
    CreateUserResponse,
    Error,
    CreateUserPayload
  >({
    mutationFn: createUserAPI,
    onSuccess: (data) => {
      // invalidate the 'users' query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(data.message || 'User created successfully!');
    },
    onError: (error) => {
      // Display the error message from the backend or a generic message
      toast.error(error.message || 'Failed to create user.');
    },
  });

  // All available mutations
  return {
    editStatus: editStatusMutation,
    createUser: createUserMutation,
  };
};

