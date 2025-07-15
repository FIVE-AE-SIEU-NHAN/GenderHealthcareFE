// src/hooks/useNotifications.ts

import { useQuery } from '@tanstack/react-query';
import { fetchNotifications } from '@/apis/notificationApi';
import type { NotificationsResponse } from '@/apis/notificationApi';

/**
 * A custom Tanstack Query hook to fetch notifications for the current user.
 */
export function useNotifications() {
  return useQuery<NotificationsResponse, Error>({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,

    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, 
  });
}