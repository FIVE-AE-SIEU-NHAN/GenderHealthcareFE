import { format, differenceInDays, parseISO, isWithinInterval, isSameDay } from 'date-fns'
import { Calendar, Heart, Droplets, Flower2, Target, Activity } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Prediction } from '@/types/cycle'

interface CycleSummaryProps {
  activePrediction: Prediction | undefined
}

function getCurrentFertilityStatus(today: Date, prediction: Prediction): string {
  if (isSameDay(today, parseISO(prediction.ovulation_date))) return 'Very High'
  if (
    isWithinInterval(today, {
      start: parseISO(prediction.fertile_window_start),
      end: parseISO(prediction.fertile_window_end)
    })
  )
    return 'High'
  if (
    isWithinInterval(today, {
      start: parseISO(prediction.cycle.start_period_date),
      end: parseISO(prediction.period_end_date)
    })
  )
    return 'Low'
  return 'Low'
}

function getFertilityDescription(today: Date, prediction: Prediction): string {
  if (isSameDay(today, parseISO(prediction.ovulation_date))) return 'Ovulation day'
  if (
    isWithinInterval(today, {
      start: parseISO(prediction.fertile_window_start),
      end: parseISO(prediction.fertile_window_end)
    })
  )
    return 'Fertile period'
  if (
    isWithinInterval(today, {
      start: parseISO(prediction.cycle.start_period_date),
      end: parseISO(prediction.period_end_date)
    })
  )
    return 'Period time'
  return 'Safe period'
}

function getNextImportantDate(prediction: Prediction): { type: string; daysUntil: number } {
  const today = new Date()
  const events = [
    { type: 'Ovulation', date: parseISO(prediction.ovulation_date) },
    { type: 'Next period', date: parseISO(prediction.next_period_date) }
  ]
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  if (events.length > 0) {
    return { type: events[0].type, daysUntil: differenceInDays(events[0].date, today) }
  }
  return { type: 'Cycle End', daysUntil: 0 }
}

export default function CycleSummary({ activePrediction }: CycleSummaryProps) {
  if (!activePrediction) {
    return (
      <div className='rounded-2xl bg-white p-8 text-center shadow-lg'>
        <h3 className='text-xl font-semibold text-slate-700'>No Active Cycle Data</h3>
        <p className='text-slate-500'>Waiting for active cycle information to display summary.</p>
      </div>
    )
  }

  // --- All variables are now derived from the `activePrediction` prop ---
  const today = new Date()
  const daysSinceLastPeriod = differenceInDays(today, parseISO(activePrediction.cycle.start_period_date))
  const cycleProgress = Math.min((daysSinceLastPeriod / activePrediction.cycle.cycle_length) * 100, 100)
  const nextImportant = getNextImportantDate(activePrediction)

  const summaryCards = [
    {
      title: 'Current Cycle',
      value: `${daysSinceLastPeriod}`,
      subtitle: `days / ${activePrediction.cycle.cycle_length} days`,
      icon: Calendar,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Next Event',
      value: nextImportant.type,
      subtitle: `${nextImportant.daysUntil} days left`,
      icon: Target,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    },
    {
      title: 'Expected Ovulation',
      value: format(parseISO(activePrediction.ovulation_date), 'dd/MM'),
      subtitle: format(parseISO(activePrediction.ovulation_date), 'EEEE'),
      icon: Flower2,
      color: 'bg-violet-500',
      textColor: 'text-violet-600'
    },
    {
      title: 'Fertility Chance',
      value: getCurrentFertilityStatus(today, activePrediction),
      subtitle: getFertilityDescription(today, activePrediction),
      icon: Heart,
      color: 'bg-rose-500',
      textColor: 'text-rose-600'
    }
  ]

  return (
    <div className='space-y-8'>
      <div className='overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-200/50'>
        <div className='bg-slate-800 p-6 text-white'>
          <div className='mb-4 flex items-center gap-3'>
            <div className='rounded-xl bg-white/10 p-3'>
              <Activity className='h-6 w-6' />
            </div>
            <h3 className='text-2xl font-bold'>Cycle Progress</h3>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-lg font-medium'>
                Day {daysSinceLastPeriod} / {activePrediction.cycle.cycle_length}
              </span>
              <div className='rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm'>
                <span className='text-2xl font-bold'>{Math.round(cycleProgress)}%</span>
              </div>
            </div>
            <div className='relative'>
              <Progress value={cycleProgress} className='h-4 bg-white/20' indicatorClassName='bg-transparent' />
              <div
                className='absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400'
                style={{ width: `${cycleProgress}%` }}
              />
            </div>
            <div className='flex justify-between text-sm text-purple-100'>
              <span>Cycle Start</span>
              <span>Next Cycle</span>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className='rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg'
          >
            <div className='mb-4 flex items-center gap-3'>
              <div className={`p-3 ${card.color} rounded-xl text-white`}>
                <card.icon className='h-5 w-5' />
              </div>
              <div>
                <h4 className='text-sm font-medium text-slate-600'>{card.title}</h4>
              </div>
            </div>
            <div className='space-y-1'>
              <div className={`text-2xl font-bold ${card.textColor}`}>{card.value}</div>
              <div className='text-sm text-slate-500'>{card.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
      <div className='overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl/10'>
        <div className='bg-slate-800 p-6 text-white'>
          <div className='flex items-center gap-3'>
            <div className='rounded-xl bg-white/10 p-3'>
              <Droplets className='h-6 w-6' />
            </div>
            <h3 className='text-2xl font-bold'>Current Cycle Details</h3>
          </div>
        </div>
        <div className='p-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            <div className='rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-pink-100 p-6'>
              <div className='mb-3 flex items-center gap-2'>
                <Droplets className='h-5 w-5 text-rose-600' />
                <span className='text-sm font-semibold text-rose-800'>Menstruation</span>
              </div>
              <div className='mb-2 text-xl font-bold text-rose-900'>
                {format(parseISO(activePrediction.cycle.start_period_date), 'dd/MM')} -{' '}
                {format(parseISO(activePrediction.period_end_date), 'dd/MM')}
              </div>
              <Badge className='border-0 bg-gradient-to-r from-rose-500 to-pink-600 text-white'>
                {activePrediction.cycle.period_length} days
              </Badge>
            </div>
            <div className='rounded-2xl border border-teal-200 bg-gradient-to-br from-emerald-50 to-teal-100 p-6'>
              <div className='mb-3 flex items-center gap-2'>
                <Heart className='h-5 w-5 text-teal-600' />
                <span className='text-sm font-semibold text-teal-800'>Fertile Window</span>
              </div>
              <div className='mb-2 text-xl font-bold text-teal-900'>
                {format(parseISO(activePrediction.fertile_window_start), 'dd/MM')} -{' '}
                {format(parseISO(activePrediction.fertile_window_end), 'dd/MM')}
              </div>
              <Badge className='border-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white'>7 days</Badge>
            </div>
            <div className='rounded-2xl border border-purple-200 bg-gradient-to-br from-violet-50 to-purple-100 p-6'>
              <div className='mb-3 flex items-center gap-2'>
                <Calendar className='h-5 w-5 text-purple-600' />
                <span className='text-sm font-semibold text-purple-800'>Next Cycle</span>
              </div>
              <div className='mb-2 text-xl font-bold text-purple-900'>
                {format(parseISO(activePrediction.next_period_date), 'dd/MM/yyyy')}
              </div>
              <Badge className='border-0 bg-gradient-to-r from-violet-500 to-purple-600 text-white'>
                {format(parseISO(activePrediction.next_period_date), 'EEEE')}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
