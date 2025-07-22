import { cn } from '@/lib/utils'
import { StatCard, StatCardSkeleton } from './StatCard'
import { Calendar, Clock, Activity, Users } from 'lucide-react'

export interface WeeklyStats {
  totalAppointments: number
  pending: number
  cancelled: number
  completed: number
}

interface WeeklyStatsHeaderProps {
  stats: WeeklyStats
  isLoading?: boolean
  isFetching?: boolean
}

export function WeeklyStatsHeader({ stats, isLoading, isFetching }: WeeklyStatsHeaderProps) {
  const cardData = [
    {
      title: 'Total Appointments',
      value: stats.totalAppointments,
      icon: <Calendar className='h-7 w-7 text-white' />,
      gradientClasses: 'from-blue-500/20 to-blue-600/20',
      valueColorClass: 'text-gray-900',
      gradientIcon: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: <Clock className='h-7 w-7 text-white' />,
      gradientClasses: 'from-amber-500/20 to-orange-600/20',
      valueColorClass: 'text-amber-600',
      gradientIcon: 'from-amber-500 to-amber-600'
    },
    {
      title: 'Cancelled',
      value: stats.cancelled,
      icon: <Activity className='h-7 w-7 text-white' />,
      gradientClasses: 'from-red-500/20 to-red-600/20',
      valueColorClass: 'text-red-600',
      gradientIcon: 'from-red-500 to-red-600'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: <Users className='h-7 w-7 text-white' />,
      gradientClasses: 'from-emerald-500/20 to-emerald-600/20',
      valueColorClass: 'text-emerald-600',
      gradientIcon: 'from-emerald-500 to-emerald-600'
    }
  ]

  if (isLoading) {
    return (
      <div className='mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    )
  }

  return (
    <div
      className={cn('mb-10 grid grid-cols-1 gap-6 transition-opacity md:grid-cols-2 lg:grid-cols-4', {
        'opacity-70': isFetching
      })}
    >
      {cardData.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
          gradientClasses={card.gradientClasses}
          valueColorClass={card.valueColorClass}
          gradientIcon={card.gradientIcon}
        />
      ))}
    </div>
  )
}
