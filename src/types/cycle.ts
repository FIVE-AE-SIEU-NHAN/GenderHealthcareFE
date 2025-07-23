export interface DailyRating {
  mood: number
  libido: number
  stress: number
  sleep: number
  energy: number
}

export interface CycleData {
  firstPeriodDate: Date
  cycleLength: number
  periodDuration: number
  initialRating: DailyRating
}

export interface DayData {
  date: Date
  dayType: 'period' | 'fertile' | 'ovulation' | 'normal'
  rating?: DailyRating
  hasRating: boolean
}

export interface CycleFormData {
  firstPeriodDate: string
  cycleLength: number
  periodDuration: number
  mood: number
  libido: number
  stress: number
  sleep: number
  energy: number
}

export type RatingCategory = 'mood' | 'libido' | 'stress' | 'sleep' | 'energy'

export interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  dayType: 'period' | 'fertile' | 'ovulation' | 'normal'
  rating?: DailyRating
  hasRating: boolean
  dayNumber: number
}

export type FertilityCalculations = {
  periodStart: Date
  periodEnd: Date
  fertileWindowStart: Date
  fertileWindowEnd: Date
  ovulationDay: Date
}
