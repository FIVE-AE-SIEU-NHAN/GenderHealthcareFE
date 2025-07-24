import { AppointmentStatus } from '@/Application/constants/appointment'
import { cn } from '@/lib/utils'
import { ServiceAppointmentStatus } from '@/types/doctor/serviceAppointmentTypes'

type AnyStatus = AppointmentStatus | ServiceAppointmentStatus | string

interface StatusStyle {
  label: string
  className: string
  dotColor: string
}

interface StatusBadgeProps {
  status: AnyStatus
  styles: Record<string, StatusStyle>
  className?: string
  isCompact?: boolean
}

export function StatusBadge({ status, styles, className, isCompact = false }: StatusBadgeProps) {
  const config = styles[status]

  if (!config) return null

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium',
        config.className,
        className,
        isCompact ? 'px-1.5 md:px-2.5' : 'px-2.5'
      )}
    >
      <div className={cn('h-2 w-2 rounded-full', config.dotColor)} />
      <span
        className={cn({
          'hidden xl:inline': isCompact
        })}
      >
        {config.label}
      </span>
    </div>
  )
}
