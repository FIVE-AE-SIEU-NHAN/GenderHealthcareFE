import { useQueries } from '@tanstack/react-query'
import { useMemo } from 'react'
import { fetchCustomerAppointments, fetchCustomerServiceAppointments } from '@/apis/customer/appointmentApi'
import { CombinedAppointment } from '@/types/customer/appointmentTypes'

/**
 * A custom hook to fetch ALL appointments (consultations and services) for the logged-in customer.
 * It fetches both types in parallel, combines them, and sorts them by booking date.
 */
export function useCombinedCustomerAppointments() {
  const results = useQueries({
    queries: [
      {
        queryKey: ['customerAppointments', 'consultations'],
        queryFn: fetchCustomerAppointments,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
      },
      {
        queryKey: ['customerAppointments', 'services'],
        queryFn: fetchCustomerServiceAppointments,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
      }
    ]
  })

  const { data, isLoading, isError } = useMemo(() => {
    const consultationQuery = results[0]
    const serviceQuery = results[1]

    const isLoading = consultationQuery.isLoading || serviceQuery.isLoading
    const isError = consultationQuery.isError || serviceQuery.isError

    if (isLoading || isError || !consultationQuery.data || !serviceQuery.data) {
      return { isLoading, isError, data: [] }
    }

    // Combine and sort the data
    const combinedData: CombinedAppointment[] = [...consultationQuery.data, ...serviceQuery.data]

    combinedData.sort((a, b) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime())

    return { data: combinedData, isLoading: false, isError: false }
  }, [results])

  return { data, isLoading, isError }
}
