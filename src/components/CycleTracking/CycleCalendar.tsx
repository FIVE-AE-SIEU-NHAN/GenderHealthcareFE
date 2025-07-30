import { useState, useMemo } from 'react'
import { format, addMonths, subMonths, isSameDay } from 'date-fns'
import { ChevronLeft, ChevronRight, Sparkles, Calendar, Heart, Droplet, Flower2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CalendarDay, Prediction } from '@/types/cycle'
import { generateCalendarDays } from '@/utils/cycleCalculations'
import DayRatingModal from './DayRatingModal'
import MissedDayModal from './MissedDay'

interface CycleCalendarProps {
  currentMonth: Date
  onMonthChange: (newMonth: Date) => void
  predictions: Prediction[]
  isLoading?: boolean
}

const dayTypeStyles = {
  period: 'bg-rose-200 text-rose-800 shadow-sm hover:shadow-md hover:bg-rose-300 border border-rose-300',
  fertile: 'bg-emerald-200 text-emerald-800 shadow-sm hover:shadow-md hover:bg-emerald-300 border border-emerald-300',
  ovulation: 'bg-violet-200 text-violet-800 shadow-sm hover:shadow-md hover:bg-violet-300 border border-violet-300',
  normal: 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
}

const dayTypeNames = {
  period: 'Period',
  fertile: 'Fertile window',
  ovulation: 'Ovulation',
  normal: 'Normal'
}

const dayTypeIcons = {
  period: Droplet,
  fertile: Heart,
  ovulation: Flower2,
  normal: null
}

const dayTypeLegendStyles = {
  period: 'bg-rose-300 text-rose-800',
  fertile: 'bg-emerald-300 text-emerald-800',
  ovulation: 'bg-violet-300 text-violet-800',
  normal: 'bg-slate-300 text-slate-800'
}

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const weekDaysShort = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export default function CycleCalendar({ currentMonth, onMonthChange, predictions, isLoading }: CycleCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null)
  const [showMissedDayModal, setShowMissedDayModal] = useState(false)

  const calendarDays = useMemo(() => {
    return generateCalendarDays(currentMonth, predictions)
  }, [currentMonth, predictions])

  const handlePreviousMonth = () => {
    onMonthChange(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    onMonthChange(addMonths(currentMonth, 1))
  }

  const handleDayClick = (day: CalendarDay) => {
    // Only 'RATED' days can be clicked, regardless of cycle status.
    if (day.dayStatus === 'RATED') {
      setSelectedDay(day)
      return
    }

    // The other actions are only relevant for an ACTIVE cycle.
    if (day.cycleStatus === 'ACTIVE') {
      if (day.dayStatus === 'PENDING') {
        setSelectedDay(day)
      } else if (day.dayStatus === 'MISSED') {
        setShowMissedDayModal(true)
      }
    }
  }

  // This render function is also correct from the previous step.
  const renderDay = (day: CalendarDay) => {
    const isClickable =
      day.dayStatus === 'RATED' ||
      (day.cycleStatus === 'ACTIVE' && (day.dayStatus === 'PENDING' || day.dayStatus === 'MISSED'))

    const Icon = dayTypeIcons[day.dayType]
    const isToday = isSameDay(day.date, new Date())

    const baseClasses = `
      relative min-h-[60px] md:min-h-[80px] rounded-2xl text-sm font-medium
      transition-all duration-300 flex flex-col items-center justify-center gap-1
      transform hover:scale-105 hover:-translate-y-1
      ${day.isCurrentMonth ? (isClickable ? 'cursor-pointer' : 'cursor-default') : 'opacity-30 cursor-default'}
      ${dayTypeStyles[day.dayType]}
      ${isToday ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
      ${day.cycleStatus === 'COMPLETED' ? 'opacity-45' : ''}
    `

    return (
      <div key={format(day.date, 'yyyy-MM-dd')} className={baseClasses} onClick={() => handleDayClick(day)}>
        <div className='flex h-full w-full flex-col items-center justify-center p-2'>
          <span className={`text-lg font-bold ${isToday ? 'text-blue-600' : ''}`}>{day.dayNumber}</span>
          {Icon && day.isCurrentMonth && <Icon className='mt-1 h-3 w-3 opacity-80' />}

          <div className='absolute -top-1 -right-1'>
            {day.dayStatus === 'RATED' && (
              <div className='h-3 w-3 rounded-full border-2 border-white bg-green-500 shadow-sm' />
            )}
            {day.dayStatus === 'MISSED' && (
              <div className='h-3 w-3 rounded-full border-2 border-white bg-red-400 shadow-sm' />
            )}
            {day.cycleStatus === 'ACTIVE' && (
              <>
                {day.dayStatus === 'PENDING' && <Sparkles className='h-4 w-4 text-amber-500' />}
                {day.dayStatus === 'FUTURE' && (
                  <div className='h-3 w-3 rounded-full border border-white bg-slate-400 opacity-50' />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='mx-auto max-w-6xl'>
        {/* Elegant Header */}
        <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl/20'>
          <div className='bg-slate-800 p-6 text-white'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='rounded-xl bg-white/10 p-3'>
                  <Calendar className='h-6 w-6' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold'>Reproductive Cycle Calendar</h2>
                  <p className='text-sm text-purple-100'>Track your reproductive health</p>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handlePreviousMonth}
                  className='h-10 w-10 rounded-lg p-0 text-white hover:bg-white/10'
                >
                  <ChevronLeft className='h-5 w-5' />
                </Button>

                <div className='rounded-lg bg-white/10 px-6 py-2'>
                  <span className='text-xl font-bold'>{format(currentMonth, 'MMMM yyyy')}</span>
                </div>

                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleNextMonth}
                  className='h-10 w-10 rounded-lg p-0 text-white hover:bg-white/10'
                >
                  <ChevronRight className='h-5 w-5' />
                </Button>
              </div>
            </div>
          </div>

          <div className='relative space-y-8 p-6'>
            {/* Loading Overlay */}
            {isLoading && (
              <div className='absolute inset-0 z-10 flex items-center justify-center rounded-b-2xl bg-white/70 backdrop-blur-sm'>
                <Loader2 className='h-8 w-8 animate-spin text-pink-500' />
              </div>
            )}

            {/* Beautiful Legend */}
            <div className='flex flex-wrap justify-center gap-6'>
              {Object.entries(dayTypeNames).map(([type, name]) => {
                const Icon = dayTypeIcons[type as keyof typeof dayTypeIcons]
                return (
                  <div key={type} className='flex items-center gap-2'>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-lg ${dayTypeLegendStyles[type as keyof typeof dayTypeLegendStyles]} shadow-sm`}
                    >
                      {Icon && <Icon className='h-3 w-3' />}
                    </div>
                    <span className='text-sm font-medium text-slate-700'>{name}</span>
                  </div>
                )
              })}
            </div>

            {/* Calendar Grid */}
            <div className='space-y-4'>
              {/* Week Days Header */}
              <div className='grid grid-cols-7 gap-3'>
                {weekDaysShort.map((day, index) => (
                  <div key={day} className='text-center'>
                    <div className='mb-1 text-xs font-medium text-slate-400'>{weekDays[index]}</div>
                    <div className='text-lg font-bold text-slate-600'>{day}</div>
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className='grid grid-cols-7 gap-3'>{calendarDays.map((day) => renderDay(day))}</div>
            </div>

            {/* Elegant Instructions */}
            <div className='rounded-xl border border-slate-200 bg-slate-50 p-6'>
              <div className='space-y-3 text-center'>
                <h3 className='flex items-center justify-center gap-2 text-lg font-semibold text-slate-800'>
                  <Sparkles className='h-5 w-5 text-slate-600' />
                  User Guide
                </h3>
                <p className='text-slate-600'>Click on special dates to track your health status</p>
                <div className='flex flex-wrap items-center justify-center gap-6 text-sm md:gap-8'>
                  <div className='flex items-center gap-2'>
                    <Sparkles className='h-4 w-4 text-amber-500' />
                    <span className='text-slate-600'>Rate Now</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='h-3 w-3 rounded-full bg-green-500' />
                    <span className='text-slate-600'>Rated</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='h-3 w-3 rounded-full bg-red-500' />
                    <span className='text-slate-600'>Missed</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='h-3 w-3 rounded-full bg-slate-400 opacity-50' />
                    <span className='text-slate-600'>Future</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedDay && selectedDay.cycleId && (
        <DayRatingModal
          isOpen={!!selectedDay}
          onClose={() => setSelectedDay(null)}
          date={selectedDay.date}
          dayType={selectedDay.dayType}
          cycleId={selectedDay.cycleId}
        />
      )}

      <MissedDayModal isOpen={showMissedDayModal} onClose={() => setShowMissedDayModal(false)} />
    </>
  )
}
