import { Loader2, MailCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NOTIFICATION_DETAILS, DEFAULT_NOTIFICATION_STYLE } from '@/Application/constants/notification'
import type { NotificationType } from '@/Application/constants/notification'
import type { Notification as NotificationItem } from '@/apis/notificationApi'

interface NotificationListProps {
  isLoading: boolean
  isError: boolean
  notifications: NotificationItem[]
}

export default function NotificationList({ isLoading, isError, notifications }: NotificationListProps) {
  if (isLoading) {
    return (
      <div className='flex h-24 items-center justify-center'>
        <Loader2 className='text-primary h-6 w-6 animate-spin' />
      </div>
    )
  }

  if (isError) {
    return <p className='px-4 py-8 text-center text-sm text-red-500'>Failed to load notifications.</p>
  }

  if (notifications.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center px-4 py-10 text-center'>
        <MailCheck className='h-16 w-16 text-gray-300' />
        <h4 className='mt-4 text-lg font-semibold text-gray-800'>All caught up!</h4>
        <p className='text-muted-foreground mt-1 text-sm'>You have no new notifications.</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      {notifications.map((notification) => {
        const config = NOTIFICATION_DETAILS[notification.type as NotificationType] ?? DEFAULT_NOTIFICATION_STYLE
        const Icon = config.icon

        return (
          <div
            key={notification.id}
            className={cn(
              'flex cursor-pointer items-center gap-4 border-b border-gray-100 p-3 transition-colors duration-150 last:border-b-0',
              !notification.is_read ? 'bg-sky-100 hover:bg-sky-100/70' : 'hover:bg-gray-50/80'
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
                config.style.bgColor
              )}
            >
              <Icon className={cn('h-5 w-5', config.style.iconColor)} />
            </div>

            {/* Content */}
            <div className='flex-1'>
              <p className='text-sm font-semibold text-gray-800'>{config.title}</p>
              <p className='text-muted-foreground line-clamp-2 text-sm leading-snug whitespace-normal'>
                {notification.content}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
