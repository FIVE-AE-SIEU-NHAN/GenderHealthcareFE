import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { cancelCycleAPI, createCycleAPI, SimpleSuccessResponse, updateCycleStatusLogAPI } from '@/apis/cycleApi'
import {
  CreateCyclePayload,
  CreateCycleResponse,
  UpdateCycleStatusLogsPayload,
  UpdateCycleStatusLogsResponse
} from '@/types/cycle'
import { AxiosError } from 'axios'
import { ApiErrorResponse } from '@/types/errorsResponse'
import { useNavigate } from 'react-router-dom'

/**
 * Provides mutation hooks for cycle-related actions.
 * @returns An object with the createCycle mutation.
 */
export const useCycleMutations = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const createCycleMutation = useMutation<CreateCycleResponse, AxiosError<ApiErrorResponse>, CreateCyclePayload>({
    mutationFn: createCycleAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['allPredictions'] })
      queryClient.invalidateQueries({ queryKey: ['cyclePredictions'] })
      queryClient.invalidateQueries({ queryKey: ['activeCycle'] })
      toast.success(data.message || 'Cycle created successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create cycle. Please try again.')
    }
  })

  const updateStatusLogMutation = useMutation<
    UpdateCycleStatusLogsResponse,
    AxiosError<ApiErrorResponse>,
    { cycleId: string; payload: UpdateCycleStatusLogsPayload }
  >({
    mutationFn: updateCycleStatusLogAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cyclePredictions'] })
      queryClient.invalidateQueries({ queryKey: ['allPredictions'] })
      toast.success(data.message || 'Rating saved and analyzed successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to save rating. Please try again.')
    }
  })

  const cancelCycleMutation = useMutation<SimpleSuccessResponse, AxiosError<ApiErrorResponse>, { cycleId: string }>({
    mutationFn: cancelCycleAPI,
    onSuccess: (data) => {
      toast.success(data.message || 'Cycle cancelled successfully!')

      queryClient.invalidateQueries({ queryKey: ['allPredictions'] })
      queryClient.invalidateQueries({ queryKey: ['cyclePredictions'] })
      queryClient.invalidateQueries({ queryKey: ['activeCycle'] })

      navigate('/cycle-form')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to cancel cycle. Please try again.')
    }
  })

  return {
    createCycle: createCycleMutation,
    updateStatusLog: updateStatusLogMutation,
    cancelCycle: cancelCycleMutation
  }
}
