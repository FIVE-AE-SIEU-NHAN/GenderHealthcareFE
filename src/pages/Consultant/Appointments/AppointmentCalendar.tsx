import { useState, useMemo, useEffect } from 'react'
import { startOfWeek, endOfWeek, formatISO } from 'date-fns'
import { AlertCircle } from 'lucide-react'

import { useConsultantAppointments } from '@/hooks/consultant/useAppointments'

import { CalendarWeekView } from '@/components/Appointment Calendar/CalendarWeekView'
import { Appointment } from '@/types/consultant/appointmentTypes'
import { useOutletContext } from 'react-router-dom'
import { DashboardLayoutContext } from '@/components/layouts/Dashboard/DashboardLayout'
import { useUpdateAppointmentStatus } from '@/hooks/manager/useAppointmentsMutation'
import { AppointmentStatus } from '@/Application/constants/appointment'

export default function ConsultantAppointmentCalendar() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  const [currentWeek, setCurrentWeek] = useState(new Date())

  // ========== SET BREADCRUMB ==========
  useEffect(() => {
    setBreadcrumb({
      title: 'Appointments Management',
      parent: 'Dashboard',
      parentHref: '/consultant'
    })
  }, [setBreadcrumb])

  // ========== CALCULATE WEEK DATE RANGE ==========
  const weekDateRange = useMemo(() => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 1 })
    const end = endOfWeek(currentWeek, { weekStartsOn: 1 })
    return { start, end }
  }, [currentWeek])

  // ========== USE CONSULTANT APPOINTMENTS HOOK ==========
  const {
    data: appointmentData,
    isLoading,
    isError,
    error,
    isFetching
  } = useConsultantAppointments({
    startDate: formatISO(weekDateRange.start, { representation: 'date' }),
    endDate: formatISO(weekDateRange.end, { representation: 'date' })
  })

  const updateStatusMutation = useUpdateAppointmentStatus()

  const handleStatusChange = (appointmentId: string, status: AppointmentStatus) => {
    updateStatusMutation.mutate({ appointmentId, status })
  }

  const isUpdatingStatus = (appointmentId: string): boolean => {
    return updateStatusMutation.isPending && updateStatusMutation.variables?.appointmentId === appointmentId
  }

  // ========== EXTRACT APPOINTMENTS FROM DATA ==========
  const appointments: Appointment[] = useMemo(() => appointmentData?.data ?? [], [appointmentData])

  // ========== CALCULATE WEEKLY STATS ==========
  const weeklyStats = useMemo(() => {
    const totalAppointments = appointments.length
    const pending = appointments.filter((apt) => apt.status === 'PENDING').length
    const ongoing = appointments.filter((apt) => apt.status === 'ONGOING').length
    const completed = appointments.filter((apt) => apt.status === 'COMPLETED').length
    const cancelled = appointments.filter((apt) => apt.status === 'CANCELLED').length

    return { totalAppointments, pending, ongoing, completed, cancelled }
  }, [appointments])

  // ========== VIDEO CHAT ROOM ==========
  const handleJoinCall = (roomId: string) => {
    const callUrl = `/call/${roomId}`
    window.open(callUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className='relative'>
      {/* ========= FLOATING ELEMENTS (EFFECTS) */}
      <div className='absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl' />
      <div className='absolute top-40 right-32 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-emerald-400/20 to-blue-400/20 blur-xl delay-1000' />
      <div className='absolute bottom-32 left-32 h-28 w-28 animate-pulse rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-xl delay-2000' />

      <div className='relative max-h-[84vh] overflow-y-auto'>
        <div className='relative z-10 mx-auto w-full max-w-7xl'>
          {/* ======== ERROR HANDLING ======== */}
          {isError && (
            <div
              role='alert'
              className='mb-4 flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800'
            >
              <AlertCircle className='h-5 w-5' />
              <div>
                <p className='font-bold'>Failed to load appointments</p>
                <p className='text-sm'>{(error as Error).message}</p>
              </div>
            </div>
          )}

          {/* ======== WEEKLY CALENDAR ======== */}
          <CalendarWeekView
            appointments={appointments}
            currentWeek={currentWeek}
            onWeekChange={setCurrentWeek}
            weeklyStats={weeklyStats}
            isFetching={isFetching}
            isLoading={isLoading}
            onJoinCall={handleJoinCall}
            appointmentType='consultation'
            userRole='consultant'
            onStatusChange={handleStatusChange}
            isUpdating={isUpdatingStatus}
          />
        </div>
      </div>
    </div>
  )
}
