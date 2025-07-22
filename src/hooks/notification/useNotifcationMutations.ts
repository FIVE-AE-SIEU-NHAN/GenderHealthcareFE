import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateNotificationsToRead } from '@/apis/notificationApi'
import type { NotificationsResponse } from '@/apis/notificationApi'

export function useNotificationMutations() {
  const queryClient = useQueryClient()

  const markAllAsReadMutation = useMutation({
    mutationFn: updateNotificationsToRead,

    onMutate: async () => {
      // Cancel any outgoing refetches so they don't overwrite the optimistic update
      await queryClient.cancelQueries({ queryKey: ['notifications'] })

      // Snapshot the previous value
      const previousNotifications = queryClient.getQueryData<NotificationsResponse>(['notifications'])

      // Optimistically update to the new value (unreadCount is now 0)
      if (previousNotifications) {
        queryClient.setQueryData<NotificationsResponse>(['notifications'], {
          ...previousNotifications,
          unreadCount: 0
        })
      }

      // Return a context object with the snapshotted value
      return { previousNotifications }
    },

    // If the mutation fails, use the context we returned from onMutate to roll back
    onError: (_err, _vars, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData<NotificationsResponse>(['notifications'], context.previousNotifications)
      }
    },

    // Always refetch after error or success to ensure server and client state are in sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    }
  })

  return { markAllAsReadMutation }
}
