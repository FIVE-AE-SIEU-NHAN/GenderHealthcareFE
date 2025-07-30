import { useQuery } from '@tanstack/react-query'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import { checkActiveCycleAPI, getCycleLogDetailAPI, getCyclePredictionsAPI } from '@/apis/cycleApi'

export const useCycle = (currentMonth: Date) => {
  const queryKey = ['cyclePredictions', format(currentMonth, 'yyyy-MM')]

  const { data, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn: () =>
      getCyclePredictionsAPI({
        startDate: format(startOfMonth(currentMonth), 'yyyy-MM-dd'),
        endDate: format(endOfMonth(currentMonth), 'yyyy-MM-dd')
      })
  })

  return {
    predictions: data?.result.predictions || [],
    isLoading,
    isError,
    error
  }
}

/**
 * Hook to fetch ALL cycle predictions (active and completed) for the entire user history.
 * This data is fetched once and is used to find the persistent active cycle for the summary.
 */
export const useAllPredictions = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['allPredictions'],

    queryFn: () => getCyclePredictionsAPI({ startDate: '2020-01-01', endDate: '2099-12-31' }),

    staleTime: Infinity
  })

  return { allPredictions: data?.result.predictions || [], ...rest }
}

/**
 * A hook to check if the user has any active cycle.
 * This is used to determine if we should show the cycle tracking page
 * or prompt the user to create their first cycle.
 */
export const useActiveCycleCheck = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['activeCycle'],
    queryFn: checkActiveCycleAPI
  })

  return {
    hasActiveCycle: data?.hasActiveCycle,
    isLoading,
    isError,
    error
  }
}

interface UseCycleLogDetailParams {
  cycleId: string
  logDate: string
  enabled?: boolean
}
/**
A hook to fetch the detailed log for a single day.
@param params - The cycle ID, the specific date, and an optional 'enabled' flag.
@returns The query result for the cycle log detail.
*/
export const useCycleLogDetail = ({ cycleId, logDate, enabled = true }: UseCycleLogDetailParams) => {
  const {
    data: logDetailResponse,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['cycleLogDetail', cycleId, logDate],
    queryFn: () => getCycleLogDetailAPI({ cycleId, logDate }),
    enabled: enabled,
    // Don't retry on 404 (Not Found), as this is an expected outcome for unrated days.
    retry: (failureCount, error: any) => {
      return error.response?.status !== 404 && failureCount < 2
    }
  })
  return {
    logDetail: logDetailResponse?.result,
    isLoading,
    isError,
    error
  }
}
