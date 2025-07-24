import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ServiceResultFormData } from '@/types/doctor/serviceAppointmentTypes'
import { editServiceAppointmentStatus, submitSingleTestResult } from '@/apis/doctor/serviceAppointmentApi'

/**
 * A custom mutation hook to submit all test results for a service appointment package.
 */
export function useSubmitAllTestResults() {
  const queryClient = useQueryClient()
  const updateStatusMutation = useUpdateServiceAppointmentStatus()

  return useMutation({
    mutationFn: async (formData: ServiceResultFormData) => {
      const submissionPromises = formData.results.map((resultData) => {
        const { service_id, ...data } = resultData
        return submitSingleTestResult({ serviceId: service_id, data })
      })
      return Promise.all(submissionPromises)
    },
    onSuccess: (data, variables) => {
      toast.success('All test results have been submitted successfully!')

      // Automatically trigger the status update to 'COMPLETED'
      const appointmentId = variables.results[0]?.test_service_appointment_id
      if (appointmentId) {
        updateStatusMutation.mutate({
          appointmentId: appointmentId,
          status: 'COMPLETED'
        })
      } else {
        // Fallback: just invalidate if we can't find the ID for some reason
        queryClient.invalidateQueries({ queryKey: ['doctorServiceAppointments'] })
      }
    },
    onError: (error) => {
      toast.error('Failed to submit results: ' + (error.message || 'An unknown error occurred.'))
    }
  })
}

/**
 * A custom mutation hook for a doctor to update the status of a service appointment.
 */
export function useUpdateServiceAppointmentStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editServiceAppointmentStatus,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['doctorServiceAppointments'] })
      toast.success(`Appointment status updated to "${variables.status}".`)
    },
    onError: (error) => {
      toast.error('Failed to update status: ' + (error.message || 'An unknown error occurred.'))
    }
  })
}
