import api from '@/apis/axiosConfig'

import {
  ActiveCycleCheckResponse,
  BackendActiveCycleCheckResponse,
  CreateCyclePayload,
  CreateCycleResponse,
  GetCycleLogDetailResponse,
  GetPredictionsResponse,
  UpdateCycleStatusLogsPayload,
  UpdateCycleStatusLogsResponse
} from '@/types/cycle'

interface GetPredictionsParams {
  startDate: string
  endDate: string
}

/**
 * Fetches cycle predictions for a given date range.
 * @param params - An object containing the start and end dates for the query.
 * @returns A promise that resolves to the API response with predictions.
 */
export const getCyclePredictionsAPI = async ({
  startDate,
  endDate
}: GetPredictionsParams): Promise<GetPredictionsResponse> => {
  const params = {
    _start_date: startDate,
    _end_date: endDate
  }

  const response = await api.get<GetPredictionsResponse>('/cycle/predictions', { params })
  return response.data
}

/**
 * Checks if the current user has an active cycle by calling the backend.
 * @returns A promise that resolves to an object indicating if an active cycle exists.
 */
export const checkActiveCycleAPI = async (): Promise<ActiveCycleCheckResponse> => {
  const response = await api.get<BackendActiveCycleCheckResponse>('/cycle/check')
  return { hasActiveCycle: response.data.result }
}

/**
 * Sends a POST request to create a new cycle.
 * @param payload - The data required to create a new cycle.
 * @returns A promise that resolves to the API response.
 */
export const createCycleAPI = async (payload: CreateCyclePayload): Promise<CreateCycleResponse> => {
  const response = await api.post<CreateCycleResponse>('/cycle/create', payload)
  return response.data
}

/**
 * Creates or updates a cycle status log for a given day.
 * @param cycleId The ID of the parent cycle.
 * @param payload The rating data for the log.
 * @returns A promise that resolves to the API response with the created log and AI analysis.
 */
export const updateCycleStatusLogAPI = async ({
  cycleId,
  payload
}: {
  cycleId: string
  payload: UpdateCycleStatusLogsPayload
}): Promise<UpdateCycleStatusLogsResponse> => {
  const response = await api.post<UpdateCycleStatusLogsResponse>(`/cycle/${cycleId}/status-logs`, payload)
  return response.data
}

export const getCycleLogDetailAPI = async ({
  cycleId,
  logDate
}: {
  cycleId: string
  logDate: string
}): Promise<GetCycleLogDetailResponse> => {
  const response = await api.post<GetCycleLogDetailResponse>(`/cycle/${cycleId}/logs-detail`, { log_date: logDate })
  return response.data
}

export interface SimpleSuccessResponse {
  message: string
}

/**
 * Sends a PATCH request to cancel a specific cycle.
 * @param cycleId The ID of the cycle to cancel.
 * @returns A promise that resolves to the API response.
 */
export const cancelCycleAPI = async ({ cycleId }: { cycleId: string }): Promise<SimpleSuccessResponse> => {
  const response = await api.patch<SimpleSuccessResponse>(`/cycle/${cycleId}/cancel`)
  return response.data
}
