import { ServiceAppointment, ServiceAppointmentStatus } from '@/types/doctor/serviceAppointmentTypes'
import { StatusBadge } from '@/components/Appointment Calendar/status-badge'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Loader2, Pencil } from 'lucide-react'

import {
  STATUS_STYLES as CONSULTATION_STATUS_STYLES,
  APPOINTMENT_STATUS_OPTIONS,
  AppointmentStatus
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

interface AppointmentCardProps {
  appointment: AnyAppointment
  className?: string
  onJoin?: (roomId: string) => void
  onClick?: () => void
  onStatusChange?: (status: AppointmentStatus | ServiceAppointmentStatus) => void
  isUpdating?: boolean
}

export function AppointmentCard({
  appointment,
  className,
  onJoin,
  onClick,
  onStatusChange,
  isUpdating = false
}: AppointmentCardProps) {
  const isConsultationAppointment = isConsultation(appointment)
  const { status } = appointment

  const styleInfo = isConsultationAppointment
    ? TOPIC_STYLES_MAP.get(appointment.topic) || DEFAULT_TOPIC_STYLE
    : PACKAGE_STYLES_MAP.get(appointment.package_id) || DEFAULT_PACKAGE_STYLE

  const statusStyles = isConsultationAppointment ? CONSULTATION_STATUS_STYLES : SERVICE_STATUS_STYLES

  const isCardClickable = !isConsultationAppointment && status === 'INPUT_RESULTS' && !!onClick

  const nextStatus = !isConsultationAppointment ? SERVICE_STATUS_TRANSITIONS[status] : null

  const canBeEdited = onStatusChange && nextStatus

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
            {onStatusChange && status !== 'COMPLETED' && status !== 'CANCELLED' && (
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
                  {APPOINTMENT_STATUS_OPTIONS.map(
                    (newStatus) =>
                      newStatus !== 'COMPLETED' && (
                        <DropdownMenuItem
                          key={newStatus}
                          disabled={status === newStatus}
                          onSelect={() => onStatusChange(newStatus)}
                        >
                          <StatusBadge status={newStatus} styles={CONSULTATION_STATUS_STYLES} className='text-xs' />
                        </DropdownMenuItem>
                      )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div className='flex flex-col gap-2 text-xs text-gray-700'>
            <code className='w-full truncate rounded border border-gray-400 bg-gray-100 px-1.5 py-0.5 text-center font-mono text-xs font-bold'>
              {appointment.chat_room_id || 'N/A'}
            </code>
            {onJoin && ['PENDING', 'ONGOING'].includes(status) && appointment.chat_room_id && (
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
          {/* Badge and Package Name */}
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
                  <DropdownMenuItem onSelect={() => onStatusChange(nextStatus!)}>
                    <StatusBadge status={nextStatus!} styles={statusStyles} className='text-xs' />
                  </DropdownMenuItem>
                  <DropdownMenuItem className='focus:bg-red-50' onSelect={() => onStatusChange('CANCELLED')}>
                    <StatusBadge status='CANCELLED' styles={statusStyles} className='text-xs' />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

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
