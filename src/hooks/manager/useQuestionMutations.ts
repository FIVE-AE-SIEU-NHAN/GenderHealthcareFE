import { deleteQuestionAPI, editQuestionStatusAPI, rejectReportAPI } from '@/apis/manager/questionApi'
import {
  EditQuestionStatusPayload,
  EditQuestionStatusResponse,
  RejectReportPayload,
  RejectReportResponse
} from '@/types/manager/questionTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

/**
 * A hook for question-related mutations.
 * It returns an object containing individual mutation hooks.
 */
export const useQuestionMutations = () => {
  const queryClient = useQueryClient()

  // =============== QUESTION VISIBILITY EDITING ===============
  const editStatusMutation = useMutation<EditQuestionStatusResponse, Error, EditQuestionStatusPayload>({
    mutationFn: editQuestionStatusAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['questions'] })
      toast.success(data.message || 'Question visibility updated successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update status.')
    }
  })

  // =============== DELETE A QUESTION ===============
  const deleteQuestionMutation = useMutation<
    { message: string },
    Error,
    string // The input is the questionId (a string)
  >({
    mutationFn: deleteQuestionAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['questions'] })
      toast.success(data.message || 'Question deleted successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete question.')
    }
  })

  // =============== REJECT A REPORTED QUESTION ===============
  const rejectReportMutation = useMutation<RejectReportResponse, Error, RejectReportPayload>({
    mutationFn: rejectReportAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['questions'] })
      toast.success(data.message || 'Report rejected successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to reject report.')
    }
  })

  return {
    editStatus: editStatusMutation,
    deleteQuestion: deleteQuestionMutation,
    rejectReport: rejectReportMutation
  }
}
