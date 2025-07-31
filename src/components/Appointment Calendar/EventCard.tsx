import { ServiceAppointment, ServiceAppointmentStatus } from '@/types/doctor/serviceAppointmentTypes'
import { StatusBadge } from '@/components/Appointment Calendar/status-badge'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Loader2, Pencil } from 'lucide-react'

import {
  STATUS_STYLES as CONSULTATION_STATUS_STYLES,
  AppointmentStatus,
  CONSULTATION_STATUS_TRANSITIONS
} from '@/Application/constants/appointment'
import { TOPIC_STYLES_MAP, DEFAULT_TOPIC_STYLE } from '@/Application/constants/appointment'
import { Appointment } from '@/types/consultant/appointmentTypes'
import {
  DEFAULT_PACKAGE_STYLE,
  PACKAGE_STYLES_MAP,
  SERVICE_STATUS_STYLES,
  SERVICE_STATUS_TRANSITIONS
} from '@/Application/constants/doctor/serviceAppointmentConstants'

type AnyAppointment = Appointment | ServiceAppointment

function isConsultation(appointment: AnyAppointment): appointment is Appointment {
  return 'topic' in appointment
}

interface AppointmentCardProps<T extends AnyAppointment> {
  appointment: T
  className?: string
  userRole: 'manager' | 'doctor' | 'consultant'
  onJoin?: (roomId: string) => void
  onClick?: () => void
  onStatusChange?: (status: T extends ServiceAppointment ? ServiceAppointmentStatus : AppointmentStatus) => void
  isUpdating?: boolean
}

export function AppointmentCard<T extends AnyAppointment>({
  appointment,
  className,
  userRole,
  onJoin,
  onClick,
  onStatusChange,
  isUpdating = false
}: AppointmentCardProps<T>) {
  const isConsultationAppointment = isConsultation(appointment)
  const { status } = appointment

  // --- CALCULATE NEXT AVAILABLE STATUSES BASED ON ROLE ---
  const possibleNextStatuses = (() => {
    if (!onStatusChange) return []

    if (isConsultationAppointment) {
      const transitions = CONSULTATION_STATUS_TRANSITIONS[appointment.status] || []
      // A manager can cancel, a consultant cannot.
      if (userRole === 'manager') {
        return transitions
      }
      return transitions.filter((s) => s !== 'CANCELLED')
    } else {
      const transitions = SERVICE_STATUS_TRANSITIONS[appointment.status] || []
      if (userRole === 'manager') {
        return transitions
      }
      return transitions.filter((s) => s !== 'CANCELLED')
    }
  })()

  const styleInfo = isConsultationAppointment
    ? TOPIC_STYLES_MAP.get(appointment.topic) || DEFAULT_TOPIC_STYLE
    : PACKAGE_STYLES_MAP.get((appointment as ServiceAppointment).package_id) || DEFAULT_PACKAGE_STYLE

  const statusStyles = isConsultationAppointment ? CONSULTATION_STATUS_STYLES : SERVICE_STATUS_STYLES

  const isCardClickable = !isConsultationAppointment && status === 'INPUT_RESULTS' && !!onClick
  const canBeEdited = onStatusChange && possibleNextStatuses.length > 0

  return (
    <div
      onClick={isCardClickable ? onClick : undefined}
      role={isCardClickable ? 'button' : undefined}
      tabIndex={isCardClickable ? 0 : undefined}
      onKeyDown={isCardClickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
      className={cn(
        'overflow-x-auto rounded-lg border border-l-4 border-gray-200 p-3 shadow-sm transition-all duration-200 hover:shadow-md',
        'min-h-[50px] cursor-default space-y-2',
        styleInfo.cardClasses,
        isCardClickable && 'cursor-pointer transition-all duration-400 hover:-translate-y-px hover:shadow-lg',
        className
      )}
    >
      {isConsultationAppointment ? (
        // === CONSULTATION APPOINTMENTS ===
        <>
          <div className='flex items-center gap-2'>
            <StatusBadge status={status} styles={statusStyles} className='text-xs' isCompact />
            {canBeEdited && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className='border border-gray-400 bg-white'>
                  <Button variant='ghost' size='icon' className='h-6 w-6' disabled={isUpdating}>
                    {isUpdating ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      <Pencil className='h-3 w-3 text-gray-500' />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  {possibleNextStatuses.map((newStatus) => (
                    <DropdownMenuItem
                      key={newStatus}
                      disabled={status === newStatus}
                      onSelect={() => onStatusChange(newStatus as AppointmentStatus)}
                      className={newStatus === 'CANCELLED' ? 'focus:bg-red-50' : ''}
                    >
                      <StatusBadge status={newStatus} styles={CONSULTATION_STATUS_STYLES} className='text-xs' />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div className='flex flex-col gap-2 text-xs text-gray-700'>
            <code className='w-full truncate rounded border border-gray-400 bg-gray-100 px-1.5 py-0.5 text-center font-mono text-xs font-bold'>
              {appointment.chat_room_id || 'N/A'}
            </code>
            <p className='font-bold'>
              Consultant: <span className='font-normal'>{appointment.consultantProfile?.name}</span>
            </p>
            {onJoin && ['ONGOING'].includes(status) && appointment.chat_room_id && (
              <div>
                <Button
                  variant='outline'
                  size='sm'
                  className='w-full cursor-pointer truncate border border-gray-400 p-2'
                  onClick={() => onJoin(appointment.chat_room_id!)}
                >
                  Join
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        // === SERVICE APPOINTMENTS ===
        <>
          <div className='flex items-center gap-2'>
            <StatusBadge status={status} styles={statusStyles} className='text-xs' isCompact />
            {canBeEdited && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className='border border-gray-400 bg-white'>
                  <Button variant='ghost' size='icon' className='h-6 w-6' disabled={isUpdating}>
                    {isUpdating ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      <Pencil className='h-3 w-3 text-gray-500' />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  {possibleNextStatuses.map((newStatus) => (
                    <DropdownMenuItem
                      key={newStatus}
                      onSelect={() => onStatusChange(newStatus as any)}
                      className={newStatus === 'CANCELLED' ? 'focus:bg-red-50' : ''}
                    >
                      <StatusBadge status={newStatus} styles={statusStyles} className='text-xs' />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <p className='text-xs font-bold'>
            Doctor: <span className='font-normal'>{appointment.staffProfile?.name}</span>
          </p>
          {/* Note */}
          <div className='flex flex-col gap-2 text-xs text-gray-700'>
            <p className='text-gray-500 italic'>
              <strong>Note: </strong>
              {appointment.note || 'No note provided.'}
            </p>
          </div>
        </>
      )}
    </div>
  )
}
