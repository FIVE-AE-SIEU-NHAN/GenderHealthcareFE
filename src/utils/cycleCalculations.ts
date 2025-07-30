import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isWithinInterval,
  isSameDay,
  parseISO,
  format,
  startOfDay,
  isBefore,
  isAfter
} from 'date-fns'
import { CalendarDay, DayStatus, Prediction } from '@/types/cycle'

export function generateCalendarDays(month: Date, predictions: Prediction[]): CalendarDay[] {
  const monthStart = startOfMonth(month)
  const monthEnd = endOfMonth(month)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)
  const daysInGrid = eachDayOfInterval({ start: startDate, end: endDate })

  const startOfToday = startOfDay(new Date())

  const statusMap = new Map<string, 'RATED' | 'PENDING'>()
  predictions.forEach((p) => {
    if (p.daily_statuses) {
      p.daily_statuses.forEach((ds) => {
        const dateKey = format(parseISO(ds.log_date), 'yyyy-MM-dd')
        statusMap.set(dateKey, ds.status)
      })
    }
  })

  return daysInGrid.map((day) => {
    const dayToCompare = startOfDay(day)

    const parentPrediction = predictions.find((p) => {
      const periodStart = startOfDay(parseISO(p.cycle.start_period_date))
      const cycleEnd = startOfDay(parseISO(p.fertile_window_end))
      return isWithinInterval(dayToCompare, { start: periodStart, end: cycleEnd })
    })

    let dayType: CalendarDay['dayType'] = 'normal'
    let dayStatus: DayStatus = 'NONE'
    const cycleStatus = parentPrediction ? parentPrediction.status : 'NONE'
    const cycleId = parentPrediction ? parentPrediction.cycle_id : null

    if (parentPrediction) {
      const periodInterval = {
        start: startOfDay(parseISO(parentPrediction.cycle.start_period_date)),
        end: startOfDay(parseISO(parentPrediction.period_end_date))
      }
      const fertileInterval = {
        start: startOfDay(parseISO(parentPrediction.fertile_window_start)),
        end: startOfDay(parseISO(parentPrediction.fertile_window_end))
      }
      const ovulationDate = startOfDay(parseISO(parentPrediction.ovulation_date))

      if (isWithinInterval(dayToCompare, fertileInterval)) dayType = 'fertile'
      if (isWithinInterval(dayToCompare, periodInterval)) dayType = 'period'
      if (isSameDay(dayToCompare, ovulationDate)) dayType = 'ovulation'
    }

    if (dayType !== 'normal') {
      const isFutureDay = isAfter(dayToCompare, startOfToday)

      if (isFutureDay && cycleStatus === 'ACTIVE') {
        dayStatus = 'FUTURE'
      } else {
        const dateKey = format(day, 'yyyy-MM-dd')
        const backendStatus = statusMap.get(dateKey)

        if (backendStatus === 'RATED') {
          dayStatus = 'RATED'
        } else if (backendStatus === 'PENDING') {
          if (isBefore(dayToCompare, startOfToday)) {
            dayStatus = 'MISSED'
          } else {
            dayStatus = 'PENDING'
          }
        }
      }
    }

    return {
      date: day,
      dayNumber: day.getDate(),
      isCurrentMonth: isSameMonth(day, month),
      dayType,
      dayStatus,
      cycleStatus,
      cycleId
    }
  })
}
