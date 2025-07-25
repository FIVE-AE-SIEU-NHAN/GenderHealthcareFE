import { useState, useMemo, useEffect } from 'react'
import { startOfWeek, endOfWeek, formatISO } from 'date-fns'
import { AlertCircle } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'

import { DashboardLayoutContext } from '@/components/layouts/Dashboard/DashboardLayout'
import { CalendarWeekView } from '@/components/Appointment Calendar/CalendarWeekView'
import { WeeklyStats } from '@/components/Appointment Calendar/StatsHeader'

import { ServiceAppointment } from '@/types/doctor/serviceAppointmentTypes'
import { useDoctorServiceAppointments } from '@/hooks/doctor/useServiceAppointment'

export default function DoctorServiceAppointmentCalendar() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()
  const [currentWeek, setCurrentWeek] = useState(new Date())

  // ========== SET BREADCRUMB (for Doctor) ==========
  useEffect(() => {
    setBreadcrumb({
      title: 'My Service Appointments',
      parent: 'Dashboard',
      parentHref: '/doctor'
    })
  }, [setBreadcrumb])

  // ========== CALCULATE WEEK DATE RANGE (this logic is reusable) ==========
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
  } = useDoctorServiceAppointments({
    startDate: formatISO(weekDateRange.start, { representation: 'date' }),
    endDate: formatISO(weekDateRange.end, { representation: 'date' })
  })

  // ========== EXTRACT APPOINTMENTS FROM DATA (using the new type) ==========
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

  return (
    <div className='relative'>
      {/* Decorative floating elements can be reused */}
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
                <p className='font-bold'>Failed to load service appointments</p>
                <p className='text-sm'>{(error as Error).message}</p>
              </div>
            </div>
          )}

          {/* ======== WEEKLY CALENDAR ======== */}
          <CalendarWeekView
            appointments={appointments}
            currentWeek={currentWeek}
            onWeekChange={setCurrentWeek}
            isFetching={isFetching}
            weeklyStats={weeklyStats}
            isLoading={isLoading}
            appointmentType='service'
            userRole='manager'
          />
        </div>
      </div>
    </div>
  )
}
