import api from '@/apis/axiosConfig'
import { DOCTOR_SEARCH_FIELDS, DOCTOR_STATUS } from '@/Application/constants/manager/manager.doctorConstants'
import {
  BackendDoctorResponse,
  EditDoctorStatusPayload,
  EditDoctorStatusResponse,
  PaginatedDoctorsResponse,
  UpdateDoctorProfilePayload,
  UpdateDoctorProfileResponse,
  UseDoctorsOptions
} from '@/types/manager/doctorTypes'
import { format } from 'date-fns'

// =============== Doctor FETCHING ===============
export const fetchDoctors = async ({
  page,
  limit,
  filters,
  search,
  sort,
  dateRange
}: UseDoctorsOptions): Promise<PaginatedDoctorsResponse> => {
  const params: Record<string, string | number | number[] | string[]> = {
    _page: page,
    _limit: limit,
    _sort: sort.field,
    _order: sort.direction
  }

  // Search - Map frontend field to backend query param
  if (search.value && DOCTOR_SEARCH_FIELDS[search.field as keyof typeof DOCTOR_SEARCH_FIELDS]) {
    const backendKey = DOCTOR_SEARCH_FIELDS[search.field as keyof typeof DOCTOR_SEARCH_FIELDS]
    params[backendKey] = search.value
  }

  // Filters - Process and map filters to backend params
  for (const key in filters) {
    const value = filters[key]
    const valuesAsArray = Array.isArray(value) ? value : [value]

    if (key === 'status') {
      // Map status string ('Active') to number (1) for the API
      params._status = valuesAsArray.map((v) => DOCTOR_STATUS.API_MAP[String(v)])
    } else if (key === 'gender') {
      params._gender = valuesAsArray as string[]
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
      // The key for date filter is dynamic (_created_at or _date_of_birth)
      const dateKey = `_${dateRange.field}`
      params[dateKey] = dates
    }
  }

  // Note the change in endpoint to /staff/get-staff
  const response = await api.get<BackendDoctorResponse>('/staff/get-staff', { params })
  const result = response.data?.result

  return {
    // Note the change in property names to 'staffs' and 'total'
    data: result?.staffs ?? [],
    total: result?.total ?? 0
  }
}

// =============== DOCTOR STATUS EDITING ===============
// This function assumes a similar API endpoint structure.
// You may need to adjust the URL based on your backend implementation.
export const editDoctorStatusAPI = async ({
  doctorId,
  status
}: EditDoctorStatusPayload): Promise<EditDoctorStatusResponse> => {
  const body = { status }
  const response = await api.patch<EditDoctorStatusResponse>(`/staff/${doctorId}/edit-status`, body)
  return response.data
}

// =============== UPDATE DOCTOR PROFILE ===============
// This function assumes a similar API endpoint structure.
// You may need to adjust the URL based on your backend implementation.
export const updateDoctorProfileAPI = async ({
  doctorId,
  ...updateData
}: UpdateDoctorProfilePayload): Promise<UpdateDoctorProfileResponse> => {
  const response = await api.patch<UpdateDoctorProfileResponse>(`/staff/${doctorId}/update-profile`, updateData)
  return response.data
}
