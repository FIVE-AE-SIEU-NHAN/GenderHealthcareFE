import { Bell, Loader2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { useNotifications } from '@/hooks/notification/useNotifications'
import { useNotificationMutations } from '@/hooks/notification/useNotifcationMutations'
import { Button } from '@/components/ui/button'
import NotificationList from './NotificationList'

export default function Notification() {
  const { data, isLoading, isError } = useNotifications()
  const { markAllAsReadMutation } = useNotificationMutations()

  const notifications = data?.notifications ?? []
  const unreadCount = data?.unreadCount ?? 0

  const handleMarkAllAsRead = () => {
    // Only call the mutation if there are unread messages and it's not already running
    if (unreadCount > 0 && !markAllAsReadMutation.isPending) {
      markAllAsReadMutation.mutate()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='relative cursor-pointer p-2'>
        <Bell />
        {unreadCount > 0 && (
          <Badge
            variant='destructive'
            className='absolute top-0 right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs'
          >
            <p className='translate-y-[2px]'>{unreadCount}</p>
          </Badge>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-80 p-0 md:w-[26rem]' align='end'>
        {/* Header */}
        <div className='flex items-center justify-between border-b border-gray-200 p-3'>
          <h3 className='text-base font-semibold text-gray-900'>Notifications</h3>
          {unreadCount > 0 && (
            <Button
              disabled={markAllAsReadMutation.isPending}
              variant='ghost'
              className='text-primary h-auto cursor-pointer p-0 transition-colors duration-300 hover:bg-none hover:text-blue-700'
              onClick={handleMarkAllAsRead}
            >
              {markAllAsReadMutation.isPending ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
              Mark all as read
            </Button>
          )}
        </div>

        {/* Body */}
        <div className='max-h-[20vh] overflow-y-auto'>
          <NotificationList isLoading={isLoading} isError={isError} notifications={notifications} />
        </div>

        {/* Footer */}
        {notifications.length > 5 && (
          <div className='border-t border-gray-200 bg-gray-50 p-2 text-center'>
            <p className='text-primary w-full cursor-pointer font-semibold transition-colors duration-300 hover:text-blue-700'>
              View All Notifications
            </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
