import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editAppointmentStatusApi } from '@/apis/manager/appointmentApi'
import { toast } from 'sonner'

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editAppointmentStatusApi,
    onSuccess: async () => {
      // Invalidate both manager and consultant queries to be safe
      await queryClient.invalidateQueries({ queryKey: ['managerAppointments'] })
      await queryClient.invalidateQueries({ queryKey: ['consultantAppointments'] })

      toast.success('Appointment status has been updated.')
    },

    onError: (error) => {
      toast.error('Failed to update status: ' + error.message)
    }
  })
}
