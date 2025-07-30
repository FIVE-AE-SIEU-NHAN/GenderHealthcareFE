import { createUserAPI, editUserStatusAPI } from '@/apis/admin/userApi'
import {
  CreateUserPayload,
  CreateUserResponse,
  EditUserStatusPayload,
  EditUserStatusResponse
} from '@/types/admin/userTypes'
import { ApiErrorResponse } from '@/types/errorsResponse'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

/**
 * A hook for all user-related mutations (Create, Update, Delete).
 * It returns an object containing individual mutation hooks.
 */
export const useUserMutations = () => {
  const queryClient = useQueryClient()

  // =============== USER STATUS EDITING ===============
  const editStatusMutation = useMutation<EditUserStatusResponse, AxiosError<ApiErrorResponse>, EditUserStatusPayload>({
    mutationFn: editUserStatusAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(data.message || 'User status updated successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update status.')
    }
  })

  // =============== USER CREATION ===============
  const createUserMutation = useMutation<CreateUserResponse, AxiosError<ApiErrorResponse>, CreateUserPayload>({
    mutationFn: createUserAPI,
    onSuccess: (data) => {
      // invalidate the 'users' query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(data.message || 'User created successfully!')
    },
    onError: (error) => {
      // Display the error message from the backend or a generic message
      toast.error(error.response?.data?.message || 'Failed to create user.')
    }
  })

  // All available mutations
  return {
    editStatus: editStatusMutation,
    createUser: createUserMutation
  }
}
