import { editDoctorStatusAPI, updateDoctorProfileAPI } from '@/apis/manager/manageDoctorApi'
import {
  EditDoctorStatusPayload,
  EditDoctorStatusResponse,
  UpdateDoctorProfilePayload,
  UpdateDoctorProfileResponse
} from '@/types/manager/doctorTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

/**
 * A hook for all doctor-related mutations (e.g., updating status, profile).
 * It returns an object containing individual mutation hooks.
 */
export const useDoctorMutations = () => {
  const queryClient = useQueryClient()

  // =============== DOCTOR STATUS EDITING ===============
  const editStatusMutation = useMutation<EditDoctorStatusResponse, Error, EditDoctorStatusPayload>({
    mutationFn: editDoctorStatusAPI,
    onSuccess: (data) => {
      // When a status is updated, invalidate all queries starting with 'doctors'
      // to refetch the list with the latest data.
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
      toast.success(data.message || 'Doctor status updated successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update doctor status.')
    }
  })

  // =============== UPDATE DOCTOR PROFILE ===============
  const updateProfileMutation = useMutation<UpdateDoctorProfileResponse, Error, UpdateDoctorProfilePayload>({
    mutationFn: updateDoctorProfileAPI,

    onSuccess: (data) => {
      // Invalidate the 'doctors' query to refresh the list with updated profile info.
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
      toast.success(data.message || 'Doctor profile updated successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update doctor profile.')
    }
  })

  // Expose all available mutations to the component.
  return {
    editStatus: editStatusMutation,
    updateProfile: updateProfileMutation
  }
}
