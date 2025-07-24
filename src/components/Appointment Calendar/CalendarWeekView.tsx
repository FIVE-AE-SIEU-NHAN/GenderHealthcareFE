import { Appointment } from '@/types/consultant/appointmentTypes'
import { AppointmentCard } from './EventCard'
import { format, startOfWeek, addDays, isSameDay, parseISO, isSameWeek } from 'date-fns'
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppointmentStatus, TimeSlot } from '@/Application/constants/appointment'
import { TopicLegend } from './TopicLegend'
import { WeeklyStats, WeeklyStatsHeader } from './StatsHeader'
import { cn } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'
import { ServiceAppointment, ServiceAppointmentStatus } from '@/types/doctor/serviceAppointmentTypes'
import { PackageLegend } from './PackageLegend'

type AnyAppointment = Appointment | ServiceAppointment
interface CalendarWeekViewProps {
  appointments: AnyAppointment[]
  currentWeek: Date
  onWeekChange: (date: Date) => void
  weeklyStats: WeeklyStats
  appointmentType: 'consultation' | 'service'
  isLoading?: boolean
  isFetching?: boolean
  onJoinCall?: (roomId: string) => void
  onStatusChange?: (appointmentId: string, status: AppointmentStatus | ServiceAppointmentStatus) => void
  isUpdating?: (appointmentId: string) => boolean
  onCardClick?: (appointment: AnyAppointment) => void
}

// Time slots mapping
const timeSlots: { slot: TimeSlot; displayTime: string; period: string }[] = [
  { slot: 'SLOT_07_08', displayTime: '7:00 AM', period: 'Morning' },
  { slot: 'SLOT_08_09', displayTime: '8:00 AM', period: 'Morning' },
  { slot: 'SLOT_09_10', displayTime: '9:00 AM', period: 'Morning' },
  { slot: 'SLOT_10_11', displayTime: '10:00 AM', period: 'Morning' },
  // Lunch break: slots 11-13
  { slot: 'SLOT_13_14', displayTime: '1:00 PM', period: 'Afternoon' },
  { slot: 'SLOT_14_15', displayTime: '2:00 PM', period: 'Afternoon' },
  { slot: 'SLOT_15_16', displayTime: '3:00 PM', period: 'Afternoon' },
  { slot: 'SLOT_16_17', displayTime: '4:00 PM', period: 'Afternoon' }
]

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const ROW_HEIGHT_PIXELS = 100 // Must match `min-h-[100px]` class
const CALENDAR_START_HOUR = 7 // Must match first time slot "SLOT_07_08"

export function CalendarWeekView({
  appointments,
  currentWeek,
  onWeekChange,
  weeklyStats,
  appointmentType,
  isLoading,
  isFetching,
  onJoinCall,
  onStatusChange,
  isUpdating,
  onCardClick
}: CalendarWeekViewProps) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    // Update the 'now' state every minute to move the timeline
    const intervalId = setInterval(() => {
      setNow(new Date())
    }, 60000)

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const timelinePosition = useMemo(() => {
    // Calculate total minutes passed since the calendar's start time (7 AM)
    const minutesSinceStart = (now.getHours() - CALENDAR_START_HOUR) * 60 + now.getMinutes()

    // Calculate the top offset in pixels
    // (minutesSinceStart / 60) gives us hours passed as a decimal
    // We multiply by the row height to get the pixel offset
    const top = (minutesSinceStart / 60) * ROW_HEIGHT_PIXELS

    return top
  }, [now])

  // --- 5. Determine if the timeline should be visible ---
  // Only show the timeline if the user is viewing the current week
  const showTimeline = isSameWeek(now, currentWeek, { weekStartsOn: 1 })

  const getAppointmentsForSlot = (date: Date, timeSlot: TimeSlot) => {
    return appointments.filter((apt) => {
      const aptDate = parseISO(apt.booking_date.substring(0, 10))
      return isSameDay(aptDate, date) && apt.time_slot === timeSlot
    })
  }

  const previousWeek = () => {
    onWeekChange(addDays(currentWeek, -7))
  }

  const nextWeek = () => {
    onWeekChange(addDays(currentWeek, 7))
  }

  return (
    <>
      {/* CARD HEADER */}
      <WeeklyStatsHeader stats={weeklyStats} isLoading={isLoading} isFetching={isFetching} />

      {/* Topic Legend  */}
      {appointmentType === 'consultation' ? <TopicLegend /> : <PackageLegend />}

      {/* ========= CALENDAR ========= */}
      <div className='w-full'>
        {/* Week Navigation Header */}
        <div className='mb-2 flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm'>
          <div className='flex items-center gap-4'>
            <div className='rounded-lg bg-blue-100 p-2'>
              <Calendar className='h-5 w-5 text-blue-600' />
            </div>
            <div>
              <h2 className='text-xl font-semibold text-gray-900'>Week of {format(weekStart, 'MMM d, yyyy')}</h2>
              <p className='text-sm text-gray-600'>
                {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' onClick={previousWeek} className='p-2' disabled={isFetching}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='sm' onClick={nextWeek} className='p-2' disabled={isFetching}>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div
          className={cn('overflow-hidden rounded-lg border bg-white shadow-sm transition-opacity duration-300', {
            'pointer-events-none opacity-60': isFetching && !isLoading
          })}
        >
          {/* Days Header */}
          <div className='grid grid-cols-8 bg-blue-50'>
            <div className='flex items-center gap-2 truncate border-r border-b-2 border-gray-200 p-4 text-sm font-medium text-gray-900'>
              <Clock className='h-4 w-4' />
              Time
            </div>
            {weekDays.map((day, index) => (
              <div key={index} className='border-r border-b-2 border-gray-200 p-4 text-center last:border-r-0'>
                <div className='truncate text-sm font-medium text-gray-900'>{daysOfWeek[index]}</div>
                <div className='mt-1 text-lg font-semibold text-gray-700'>{format(day, 'd')}</div>
                <div className='text-xs text-gray-500'>{format(day, 'MMM')}</div>
              </div>
            ))}
          </div>

          {/* Time Slots Grid */}
          <div className='relative max-h-[600px] overflow-y-auto'>
            {showTimeline && (
              <div className='absolute z-10 grid w-full grid-cols-8' style={{ top: `${timelinePosition}px` }}>
                {/* The dot and the time label in the first column */}
                <div className='relative flex items-center justify-end pr-2'>
                  <span className='bg-white px-1 text-xs font-semibold text-blue-600'>{format(now, 'HH:mm')}</span>
                  <div className='absolute right-[-4px] h-2 w-2 rounded-full bg-blue-800' />
                </div>
                {/* The line spanning the next 7 columns */}
                <div className='col-span-7 h-0.5 self-center bg-blue-500/50' />
              </div>
            )}

            {timeSlots.map((timeSlot) => (
              <div
                key={timeSlot.slot}
                className='grid min-h-[100px] grid-cols-8 border-b border-slate-300 last:border-b-0'
              >
                {/* Time Column */}
                <div className='flex flex-col justify-center border-r border-slate-300 bg-gray-50 p-3'>
                  <div className='text-sm font-medium text-gray-700'>{timeSlot.displayTime}</div>
                  <div className='text-xs text-gray-500'>{timeSlot.period}</div>
                </div>

                {/* Day Columns */}
                {weekDays.map((day, dayIndex) => {
                  const dayAppointments = getAppointmentsForSlot(day, timeSlot.slot)

                  return (
                    <div
                      key={dayIndex}
                      className='min-h-[100px] border-r border-slate-300 bg-gray-50/30 p-2 last:border-r-0'
                    >
                      <div className='space-y-2'>
                        {dayAppointments.map((appointment) => (
                          <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                            className='relative z-20 w-full'
                            onJoin={onJoinCall}
                            onClick={onCardClick ? () => onCardClick(appointment) : undefined}
                            onStatusChange={
                              onStatusChange ? (newStatus) => onStatusChange(appointment.id, newStatus) : undefined
                            }
                            isUpdating={isUpdating ? isUpdating(appointment.id) : false}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
