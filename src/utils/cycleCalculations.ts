import { addDays, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, format } from 'date-fns'
import { CalendarDay, CycleData, DailyRating } from '@/types/cycle'

export interface CycleCalculations {
  periodStart: Date
  periodEnd: Date
  ovulationDay: Date
  fertileWindowStart: Date
  fertileWindowEnd: Date
  nextPeriodStart: Date
}

export function calculateCycleDates(firstPeriodDate: Date, cycleLength: number, periodDuration: number): CycleCalculations {
  const periodStart = firstPeriodDate
  const periodEnd = addDays(periodStart, periodDuration - 1)
  
  // Ovulation typically occurs 14 days before the next period
  const ovulationDay = addDays(periodStart, cycleLength - 14)
  
  // Fertile window is typically 5 days before ovulation and 1 day after
  const fertileWindowStart = addDays(ovulationDay, -5)
  const fertileWindowEnd = addDays(ovulationDay, 1)
  
  const nextPeriodStart = addDays(periodStart, cycleLength)
  
  return {
    periodStart,
    periodEnd,
    ovulationDay,
    fertileWindowStart,
    fertileWindowEnd,
    nextPeriodStart
  }
}

export function getDayType(date: Date, calculations: CycleCalculations): 'period' | 'fertile' | 'ovulation' | 'normal' {
  const { periodStart, periodEnd, ovulationDay, fertileWindowStart, fertileWindowEnd } = calculations
  
  // Check if it's a period day
  if (date >= periodStart && date <= periodEnd) {
    return 'period'
  }
  
  // Check if it's ovulation day
  if (isSameDay(date, ovulationDay)) {
    return 'ovulation'
  }
  
  // Check if it's in fertile window
  if (date >= fertileWindowStart && date <= fertileWindowEnd) {
    return 'fertile'
  }
  
  return 'normal'
}

export function generateCalendarDays(
  targetMonth: Date,
  cycleData: CycleData,
  ratings: Map<string, DailyRating> = new Map()
): CalendarDay[] {
  const calculations = calculateCycleDates(
    cycleData.firstPeriodDate,
    cycleData.cycleLength,
    cycleData.periodDuration
  )
  
  const monthStart = startOfMonth(targetMonth)
  const monthEnd = endOfMonth(targetMonth)
  const calendarStart = addDays(monthStart, -monthStart.getDay()) // Start from Sunday
  const calendarEnd = addDays(monthEnd, 6 - monthEnd.getDay()) // End on Saturday
  
  const allDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  
  return allDays.map(date => {
    const dayKey = format(date, 'yyyy-MM-dd')
    const isCurrentMonth = date >= monthStart && date <= monthEnd
    const dayType = isCurrentMonth ? getDayType(date, calculations) : 'normal'
    const rating = ratings.get(dayKey)
    
    return {
      date,
      isCurrentMonth,
      dayType,
      rating,
      hasRating: !!rating,
      dayNumber: date.getDate()
    }
  })
}

export function getPredictedCycles(
  cycleData: CycleData,
  numberOfCycles: number = 3
): CycleCalculations[] {
  const cycles: CycleCalculations[] = []
  
  for (let i = 0; i < numberOfCycles; i++) {
    const cycleStart = addDays(cycleData.firstPeriodDate, i * cycleData.cycleLength)
    const calculations = calculateCycleDates(cycleStart, cycleData.cycleLength, cycleData.periodDuration)
    cycles.push(calculations)
  }
  
  return cycles
}

export function getDayTypeForMultipleCycles(
  date: Date,
  cycleData: CycleData,
  numberOfCycles: number = 3
): 'period' | 'fertile' | 'ovulation' | 'normal' {
  const cycles = getPredictedCycles(cycleData, numberOfCycles)
  
  for (const cycle of cycles) {
    const dayType = getDayType(date, cycle)
    if (dayType !== 'normal') {
      return dayType
    }
  }
  
  return 'normal'
}

export function getNextImportantDate(cycleData: CycleData): { type: string; date: Date; daysUntil: number } {
  const today = new Date()
  const calculations = calculateCycleDates(
    cycleData.firstPeriodDate,
    cycleData.cycleLength,
    cycleData.periodDuration
  )
  
  const importantDates = [
    { type: 'Next period', date: calculations.nextPeriodStart },
    { type: 'Ovulation', date: calculations.ovulationDay },
    { type: 'Fertile window', date: calculations.fertileWindowStart }
  ]
  
  // Find the next upcoming date
  const upcomingDates = importantDates
    .filter(item => item.date > today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
  
  if (upcomingDates.length > 0) {
    const nextDate = upcomingDates[0]
    return {
      ...nextDate,
      daysUntil: differenceInDays(nextDate.date, today)
    }
  }
  
  // If no upcoming dates in current cycle, check next cycle
  const nextCycleStart = addDays(cycleData.firstPeriodDate, cycleData.cycleLength)
  const nextCycleCalculations = calculateCycleDates(nextCycleStart, cycleData.cycleLength, cycleData.periodDuration)
  
  return {
    type: 'Next period',
    date: nextCycleCalculations.periodStart,
    daysUntil: differenceInDays(nextCycleCalculations.periodStart, today)
  }
}
