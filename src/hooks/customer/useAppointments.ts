import { useQuery } from '@tanstack/react-query'
import { fetchCustomerAppointments } from '@/apis/customer/appointmentApi'
import { CustomerAppointment } from '@/types/customer/appointmentTypes'

/**
 * A custom hook to fetch the appointment history for the logged-in customer.
 */
export function useCustomerAppointments() {
  return useQuery<CustomerAppointment[], Error>({
    queryKey: ['customerAppointments'],
    queryFn: fetchCustomerAppointments,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}
