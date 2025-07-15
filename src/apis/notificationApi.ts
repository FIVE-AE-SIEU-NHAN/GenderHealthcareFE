import api from '@/apis/axiosConfig';

export interface Notification {
  id: string;
  type: string;
  content: string;
  is_read: boolean;
}

export interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
}

/**
 * Fetches the user's notifications and the count of unread ones.
 */
export const fetchNotifications = async (): Promise<NotificationsResponse> => {
  const response = await api.get('/notification/get');
  
  const result = response.data.result;

  return {
    notifications: result?.notifications ?? [],
    unreadCount: result?.isNotRead ?? 0,
  };
};

/**
 * Updates all unread notifications to be 'read' for the logged-in user.
 */
export const updateNotificationsToRead = async (): Promise<void> => {
  await api.patch('/notification/update');
};