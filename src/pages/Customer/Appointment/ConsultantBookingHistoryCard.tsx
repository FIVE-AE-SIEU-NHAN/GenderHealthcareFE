import React from 'react'
import { CalendarClock, CalendarDays, Clock, PencilLine, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/Appointment Calendar/status-badge'
import { STATUS_STYLES, TOPIC_STYLES_MAP } from '@/Application/constants/appointment'
import { cn } from '@/lib/utils'
import { CustomerAppointment } from '@/types/customer/appointmentTypes'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/utils/formatDate'
import { Button } from '@/components/ui/button'

// Helper function to format the time slot, co-located with the component that uses it.
const formatTimeSlot = (slot: string) => {
  if (!slot) return 'N/A'
  const times = slot.replace('SLOT_', '').split('_')
  return `${times[0]}:00 - ${times[1]}:00`
}

interface ConsultantBookingCardProps {
  booking: CustomerAppointment
  className?: string
  isHighlighted?: boolean
  onJoin: (roomId: string) => void
}

export function ConsultantBookingCard({
  booking,
  className,
  isHighlighted = false,
  onJoin
}: ConsultantBookingCardProps) {
  const topicLabel = TOPIC_STYLES_MAP.get(booking.topic)?.label || booking.topic.replace(/_/g, ' ')
  const formattedDate = formatDate(booking.booking_date, 'MMMM d, yyyy')
  const formattedTime = formatTimeSlot(booking.time_slot)

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
          STATUS_STYLES[booking.status].dotColor
        )}
      />

      <CardHeader>
        <CardTitle className='-mb-3 flex items-center gap-2 text-lg text-blue-800'>
          <CalendarClock className='h-5 w-5' />
          Connect with Consultant
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-2 text-sm text-gray-700'>
        <p className='flex items-center gap-2'>
          <Phone className='h-4 w-4 text-blue-500' />
          <span>
            Topic: <strong>{topicLabel}</strong>
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
        <div className='flex items-center gap-2'>
          <StatusBadge status={booking.status} />
        </div>

        <p className='flex items-center gap-2'>
          <span className='font-semibold'>Room:</span>
          <code className='rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs font-bold'>
            {booking.chat_room_id || 'N/A'}
          </code>
          {['PENDING', 'ONGOING'].includes(booking.status) && booking.chat_room_id && (
            <span>
              <Button
                variant='default'
                size='sm'
                className='w-full cursor-pointer p-2'
                onClick={() => onJoin(booking.chat_room_id)}
              >
                Join
              </Button>
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  )
}

// Skeleton component for loading state
ConsultantBookingCard.Skeleton = function ConsultantBookingCardSkeleton() {
  return (
    <Card className='relative w-full border-blue-100 bg-white p-3 shadow-sm md:w-90'>
      {/* Skeleton for the blue dot on the timeline */}
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
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-12' />
          <Skeleton className='h-5 w-24' />
        </div>
      </CardContent>
    </Card>
  )
}
