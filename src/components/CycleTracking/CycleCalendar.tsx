import React, { useState, useMemo } from 'react'
import { format, addMonths, subMonths, isAfter, startOfDay } from 'date-fns'
import { ChevronLeft, ChevronRight, Sparkles, Calendar, Heart, Droplet, Flower2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CycleData, DailyRating, CalendarDay } from '@/types/cycle'
import { generateCalendarDays } from '@/utils/cycleCalculations'
import DayRatingModal from './DayRatingModal'
import axios from 'axios'
interface CycleCalendarProps {
  cycleData: CycleData
  ratings: Map<string, DailyRating>
  onUpdateRating: (date: string, rating: DailyRating) => void
  cycleId: string
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

export default function CycleCalendar({ cycleData, ratings, onUpdateRating, cycleId }: CycleCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null)
  const [showRatingModal, setShowRatingModal] = useState(false)
  
  const calendarDays = useMemo(() => {
    return generateCalendarDays(currentMonth, cycleData, ratings)
  }, [currentMonth, cycleData, ratings])

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1))
  }

  const handleDayClick = (day: CalendarDay) => {
    if (!day.isCurrentMonth) return

    // Only allow rating for special days (period, fertile, ovulation)
    if (day.dayType !== 'normal') {
      setSelectedDay(day)
      setShowRatingModal(true)
    }
  }


  const handleRatingSubmit = async (rating: DailyRating) => {
    if (selectedDay) {
      const dateKey = format(selectedDay.date, 'yyyy-MM-dd')
      onUpdateRating(dateKey, rating)

      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
        await axios.post(
          `/cycles/${cycleId}/logs`, 
          {
            log_date: dateKey,
            ...rating
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
      } catch (err) {
        // ...xử lý error nếu muốn
      }
      setShowRatingModal(false)
      setSelectedDay(null)
    }
  }

  const renderDay = (day: CalendarDay) => {
    const isClickable = day.isCurrentMonth && day.dayType !== 'normal'
    const Icon = dayTypeIcons[day.dayType]
    const today = new Date()
    const isToday =
      day.isCurrentMonth &&
      day.date.getDate() === today.getDate() &&
      day.date.getMonth() === today.getMonth() &&
      day.date.getFullYear() === today.getFullYear()

    const baseClasses = `
      relative min-h-[60px] md:min-h-[80px] rounded-2xl text-sm font-medium
      transition-all duration-300 flex flex-col items-center justify-center gap-1
      transform hover:scale-105 hover:-translate-y-1
      ${day.isCurrentMonth ? (isClickable ? 'cursor-pointer' : 'cursor-default') : 'opacity-30 cursor-default'}
      ${dayTypeStyles[day.dayType]}
      ${isToday ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
    `

    return (
      <div key={format(day.date, 'yyyy-MM-dd')} className={baseClasses} onClick={() => handleDayClick(day)}>
        <div className='flex h-full w-full flex-col items-center justify-center p-2'>
          <span className={`text-lg font-bold ${isToday ? 'text-blue-600' : ''}`}>{day.dayNumber}</span>

          {Icon && day.isCurrentMonth && <Icon className='mt-1 h-3 w-3 opacity-80' />}

          {/* Show indicators based on date and rating status */}
          {(() => {
            const today = startOfDay(new Date())
            const dayDate = startOfDay(day.date)
            const isFutureDate = isAfter(dayDate, today)

            if (isClickable && !day.hasRating && !isFutureDate) {
              // Show sparkle for current and past special days without rating
              return (
                <div className='absolute -top-1 -right-1'>
                  <Sparkles className='h-4 w-4 text-amber-500' />
                </div>
              )
            } else if (day.hasRating) {
              // Show dot for days with rating
              return (
                <div className='absolute -top-1 -right-1'>
                  <div className='h-3 w-3 rounded-full border-2 border-white bg-green-500 shadow-sm' />
                </div>
              )
            } else if (isClickable && isFutureDate) {
              // Show lock icon for future special dates
              return (
                <div className='absolute -top-1 -right-1'>
                  <div className='h-3 w-3 rounded-full border border-white bg-slate-400 opacity-50' />
                </div>
              )
            }
            return null
          })()}
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

          <div className='space-y-8 p-6'>
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
                <p className='text-slate-600'>Click on special dates to rate your health status</p>

                <div className='flex items-center justify-center gap-8 text-sm'>
                  <div className='flex items-center gap-2'>
                    <Sparkles className='h-4 w-4 text-amber-500' />
                    <span className='text-slate-600'>Can be rated</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='h-3 w-3 rounded-full bg-green-500' />
                    <span className='text-slate-600'>Rated</span>
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

      {/* Rating Modal */}
      {selectedDay && (
        <DayRatingModal
          isOpen={showRatingModal}
          onClose={() => {
            setShowRatingModal(false)
            setSelectedDay(null)
          }}
          onSubmit={handleRatingSubmit}
          date={selectedDay.date}
          dayType={selectedDay.dayType}
          initialRating={selectedDay.rating}
        />
      )}
    </>
  )
}
