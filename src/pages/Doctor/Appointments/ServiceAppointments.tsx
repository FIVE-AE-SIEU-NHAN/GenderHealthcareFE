import { useState, useMemo, useEffect } from 'react'
import { startOfWeek, endOfWeek, formatISO } from 'date-fns'
import { AlertCircle } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'sonner'

import { DashboardLayoutContext } from '@/components/layouts/Dashboard/DashboardLayout'
import { CalendarWeekView } from '@/components/Appointment Calendar/CalendarWeekView'
import { WeeklyStats } from '@/components/Appointment Calendar/StatsHeader'
import { ServiceResultModal } from '@/components/Appointment Calendar/ServiceResultModal'

import { useUpdateServiceAppointmentStatus } from '@/hooks/doctor/useServiceAppointmentsMutations'
import { ServiceAppointment, ServiceAppointmentStatus } from '@/types/doctor/serviceAppointmentTypes'
import { useServiceAppointments } from '@/hooks/doctor/useServiceAppointment'

export default function DoctorServiceAppointmentCalendar() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<ServiceAppointment | null>(null)

  useEffect(() => {
    setBreadcrumb({
      title: 'My Service Appointments',
      parent: 'Dashboard',
      parentHref: '/doctor'
    })
  }, [setBreadcrumb])

  const weekDateRange = useMemo(() => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 1 })
    const end = endOfWeek(currentWeek, { weekStartsOn: 1 })
    return { start, end }
  }, [currentWeek])

  const {
    data: appointmentData,
    isLoading,
    isError,
    error,
    isFetching
  } = useServiceAppointments(
    {
      startDate: formatISO(weekDateRange.start, { representation: 'date' }),
      endDate: formatISO(weekDateRange.end, { representation: 'date' })
    },
    'doctor'
  )

  const updateStatusMutation = useUpdateServiceAppointmentStatus()

  const appointments: ServiceAppointment[] = useMemo(() => appointmentData?.data ?? [], [appointmentData])

  const weeklyStats: WeeklyStats = useMemo(() => {
    const totalAppointments = appointments.length
    const pending = appointments.filter((apt) => apt.status === 'PENDING').length
    const checkin = appointments.filter((apt) => apt.status === 'CHECKIN').length
    const ongoing = appointments.filter((apt) => apt.status === 'ONGOING').length
    const inputResults = appointments.filter((apt) => apt.status === 'INPUT_RESULTS').length
    const completed = appointments.filter((apt) => apt.status === 'COMPLETED').length
    const cancelled = appointments.filter((apt) => apt.status === 'CANCELLED').length
    return { totalAppointments, pending, checkin, ongoing, inputResults, completed, cancelled }
  }, [appointments])

  const handleStatusChange = (appointmentId: string, status: ServiceAppointmentStatus) => {
    updateStatusMutation.mutate({ appointmentId, status })
  }

  const isUpdatingStatus = (appointmentId: string): boolean => {
    return updateStatusMutation.isPending && updateStatusMutation.variables?.appointmentId === appointmentId
  }

  const handleOpenResultModal = (appointment: ServiceAppointment) => {
    if (appointment.status === 'INPUT_RESULTS') {
      setSelectedAppointment(appointment)
    } else {
      toast.info(`Results can only be added when the status is "Preparing Results".`)
    }
  }

  const handleCloseResultModal = () => {
    setSelectedAppointment(null)
  }

  return (
    <div className='relative'>
      <div className='absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl' />
      <div className='absolute top-40 right-32 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-emerald-400/20 to-blue-400/20 blur-xl delay-1000' />
      <div className='absolute bottom-32 left-32 h-28 w-28 animate-pulse rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-xl delay-2000' />

      <div className='relative max-h-[84vh] overflow-y-auto'>
        <div className='relative z-10 mx-auto w-full max-w-7xl'>
          {isError && (
            <div
              role='alert'
              className='mb-4 flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800'
            >
              <AlertCircle className='h-5 w-5' />
              <div>
                <p className='font-bold'>Failed to load service appointments</p>
                <p className='text-sm'>{(error as Error).message}</p>
              </div>
            </div>
          )}

          <CalendarWeekView
            appointments={appointments}
            currentWeek={currentWeek}
            onWeekChange={setCurrentWeek}
            weeklyStats={weeklyStats}
            isFetching={isFetching}
            isLoading={isLoading}
            appointmentType='service'
            onCardClick={(appointment) => handleOpenResultModal(appointment as ServiceAppointment)}
            onStatusChange={handleStatusChange}
            isUpdating={isUpdatingStatus}
            userRole='doctor'
          />
        </div>
      </div>

      {selectedAppointment && (
        <ServiceResultModal
          appointment={selectedAppointment}
          isOpen={!!selectedAppointment}
          onClose={handleCloseResultModal}
        />
      )}
    </div>
  )
}
