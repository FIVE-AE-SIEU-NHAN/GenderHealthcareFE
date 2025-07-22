import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface StatCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  gradientClasses: string
  valueColorClass?: string
  gradientIcon?: string
}

export function StatCard({ title, value, icon, gradientClasses, valueColorClass, gradientIcon }: StatCardProps) {
  return (
    <div className='group relative'>
      <div className={cn('absolute inset-0 rounded-2xl bg-gradient-to-br', gradientClasses)} />
      <div className='absolute inset-0 rounded-2xl border border-white/30 bg-white/70 shadow-xl backdrop-blur-sm transition-all duration-300' />
      <div className='relative z-10 p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold tracking-wide text-gray-600 uppercase'>{title}</p>
            <p className={cn('mt-2 text-3xl font-bold', valueColorClass || 'text-gray-900')}>{value}</p>
          </div>
          <div
            className={cn(
              'bg-gradient-to-br p-4',
              gradientIcon,
              'rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110'
            )}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className='relative rounded-2xl border border-white/30 bg-white/70 p-6 shadow-xl backdrop-blur-sm'>
      <div className='flex items-center justify-between'>
        <div>
          <Skeleton className='h-4 w-28 bg-gray-400' />
          <Skeleton className='mt-2 h-9 w-12 bg-gray-300' />
        </div>
        <Skeleton className='h-16 w-16 rounded-xl bg-gray-300' />
      </div>
    </div>
  )
}
