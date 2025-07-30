import React from 'react'
import { CalendarDays, Clock, Package, PencilLine, Stethoscope } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/Appointment Calendar/status-badge'
import { STATUS_STYLES } from '@/Application/constants/appointment'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/utils/formatDate'
import { CustomerServiceAppointment } from '@/types/customer/appointmentTypes'
import { SERVICE_PACKAGE_NAMES } from '@/types/doctor/serviceAppointmentTypes'
import { Button } from '@/components/ui/button'

const formatTimeSlot = (slot: string) => {
  if (!slot) return 'N/A'
  const times = slot.replace('SLOT_', '').split('_')
  return `${times[0]}:00 - ${times[1]}:00`
}

interface ServiceBookingCardProps {
  booking: CustomerServiceAppointment
  className?: string
  isHighlighted?: boolean
  onViewResults: (appointmentId: string) => void
}

export function ServiceBookingHistoryCard({
  booking,
  className,
  isHighlighted = false,
  onViewResults
}: ServiceBookingCardProps) {
  const formattedDate = formatDate(booking.booking_date, 'MMMM d, yyyy')
  const formattedTime = formatTimeSlot(booking.time_slot)

  const packageName = SERVICE_PACKAGE_NAMES[booking.package_id] || `Package ID: ${booking.package_id}`

  return (
    <Card
      className={cn(
        'relative w-full border-blue-100 bg-white p-3 shadow-sm md:w-93',
        isHighlighted ? 'border-2 border-blue-400' : '',
        className
      )}
    >
      {/* The dot on the timeline */}
      <div
        className={cn(
          'absolute top-4 -left-3 h-4.5 w-4.5 rounded-full border-3 border-white',
          STATUS_STYLES[booking.status]?.dotColor || 'bg-gray-400'
        )}
      />

      <CardHeader>
        <CardTitle className='-mb-3 flex items-center gap-2 text-lg text-blue-800'>
          <Stethoscope className='h-5 w-5' />
          Service Appointment
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-2 text-sm text-gray-700'>
        <p className='flex items-center gap-2'>
          <Package className='h-4 w-4 text-blue-500' />
          <span>
            Service: <strong>{packageName}</strong>
          </span>
        </p>
        <p className='flex items-center gap-2'>
          <CalendarDays className='h-4 w-4 text-blue-500' />
          <span>
            Date: <strong>{formattedDate}</strong>
          </span>
        </p>
        <p className='flex items-center gap-2'>
          <Clock className='h-4 w-4 text-blue-500' />
          <span>
            Time: <strong>{formattedTime}</strong>
          </span>
        </p>
        <p className='flex gap-2'>
          <PencilLine className='max-w-4 min-w-4 text-blue-500' />
          <span>
            Note:{' '}
            <span className='font-semibold italic'>
              {booking.note || <span className='text-red-800'>Not provided</span>}
            </span>
          </span>
        </p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <StatusBadge status={booking.status} styles={STATUS_STYLES} />
          </div>
          {booking.status === 'COMPLETED' && (
            <Button
              variant='outline'
              size='sm'
              onClick={() => onViewResults(booking.id)} // Pass the appointment ID
            >
              View Results
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

ServiceBookingHistoryCard.Skeleton = function ServiceBookingHistoryCardSkeleton() {
  return (
    <Card className='relative w-full border-gray-100 bg-white p-3 shadow-sm md:w-90'>
      <div className='absolute top-4 -left-3.5 h-5 w-5 rounded-full border-4 border-white bg-gray-300' />
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Skeleton className='h-6 w-6 rounded-full' />
          <Skeleton className='h-6 w-48' />
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3 text-sm'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-full' />
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-5/6' />
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-4/6' />
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-20' />
        </div>
      </CardContent>
    </Card>
  )
}
