import { editConsultantStatusAPI, updateConsultantProfileAPI } from '@/apis/manager/manageConsultantApi'
import {
  EditConsultantStatusPayload,
  EditConsultantStatusResponse,
  UpdateConsultantProfilePayload,
  UpdateConsultantProfileResponse
} from '@/types/manager/consultantTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

/**
 * A hook for all consultant-related mutations (Create, Update, Delete).
 * It returns an object containing individual mutation hooks.
 */
export const useConsultantMutations = () => {
  const queryClient = useQueryClient()

  // =============== CONSULTANT STATUS EDITING ===============
  const editStatusMutation = useMutation<EditConsultantStatusResponse, Error, EditConsultantStatusPayload>({
    mutationFn: editConsultantStatusAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['consultants'] })
      toast.success(data.message || 'Consultant status updated successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update status.')
    }
  })

  // =============== UPDATE CONSULTANT PROFILE ===============
  const updateProfileMutation = useMutation<UpdateConsultantProfileResponse, Error, UpdateConsultantProfilePayload>({
    mutationFn: updateConsultantProfileAPI,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['consultants'] })
      toast.success(data.message || 'Profile updated successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update profile.')
    }
  })

  return {
    editStatus: editStatusMutation,
    updateProfile: updateProfileMutation
  }
}
