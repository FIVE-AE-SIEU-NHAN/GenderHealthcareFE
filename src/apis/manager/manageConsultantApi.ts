import api from '@/apis/axiosConfig'
import {
  CONSULTANT_SEARCH_FIELDS,
  CONSULTANT_STATUS
} from '@/Application/constants/manager/manager.consultantConstants'
import {
  BackendConsultantResponse,
  EditConsultantStatusPayload,
  EditConsultantStatusResponse,
  PaginatedConsultantsResponse,
  UpdateConsultantProfilePayload,
  UpdateConsultantProfileResponse,
  UseConsultantsOptions
} from '@/types/manager/consultantTypes'
import { format } from 'date-fns'

// =============== Consultant FETCHING ===============
export const fetchConsultants = async ({
  page,
  limit,
  filters,
  search,
  sort,
  dateRange
}: UseConsultantsOptions): Promise<PaginatedConsultantsResponse> => {
  const params: Record<string, string | number | number[] | string[]> = {
    _page: page,
    _limit: limit,
    _sort: sort.field,
    _order: sort.direction
  }

  // Search
  if (search.value && CONSULTANT_SEARCH_FIELDS[search.field as keyof typeof CONSULTANT_SEARCH_FIELDS]) {
    const backendKey = CONSULTANT_SEARCH_FIELDS[search.field as keyof typeof CONSULTANT_SEARCH_FIELDS]
    params[backendKey] = search.value
  }

  // Filters
  for (const key in filters) {
    const value = filters[key]
    const valuesAsArray = Array.isArray(value) ? value : [value]
    if (key === 'status') {
      params._status = valuesAsArray.map((v) => CONSULTANT_STATUS.API_MAP[String(v)])
    } else if (key === 'gender') {
      params._gender = valuesAsArray as string[]
    } else if (key === 'specialization') {
      params._specialization = valuesAsArray.map((v) => String(v))
    }
  }

  // Date Filter
  if (dateRange && (dateRange.from || dateRange.to)) {
    const dates: string[] = []

    if (dateRange.from) {
      dates.push(format(dateRange.from, 'yyyy-MM-dd'))
    }
    if (dateRange.to) {
      dates.push(format(dateRange.to, 'yyyy-MM-dd'))
    }

    if (dates.length > 0) {
      // Use the dynamic field key from the dateRange object to create the param name
      const dateKey = `_${dateRange.field}`
      params[dateKey] = dates
    }
  }

  const response = await api.get<BackendConsultantResponse>('/consultant/get-consultant', { params })
  const result = response.data?.result
  return {
    data: result?.consultants ?? [],
    total: result?.total ?? 0
  }
}

// =============== CONSULTANT STATUS EDITING ===============
export const editConsultantStatusAPI = async ({
  consultantId,
  status
}: EditConsultantStatusPayload): Promise<EditConsultantStatusResponse> => {
  const body = { status }
  const response = await api.patch<EditConsultantStatusResponse>(`/consultant/${consultantId}/edit-status`, body)
  return response.data
}

// =============== UPDATE CONSULTANT PROFILE ===============
/**
 * Updates a consultant's profile information.
 * @param payload - Contains the consultantId and the fields to update.
 */
export const updateConsultantProfileAPI = async ({
  consultantId,
  ...updateData
}: UpdateConsultantProfilePayload): Promise<UpdateConsultantProfileResponse> => {
  const response = await api.patch<UpdateConsultantProfileResponse>(
    `/consultant/${consultantId}/update-profile`,
    updateData
  )
  return response.data
}
