import { Loader2, MailCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NOTIFICATION_DETAILS,
  DEFAULT_NOTIFICATION_STYLE,
} from "@/Application/constants/notification";
import type { NotificationType } from "@/Application/constants/notification";
import type { Notification as NotificationItem } from "@/apis/notificationApi";

interface NotificationListProps {
  isLoading: boolean;
  isError: boolean;
  notifications: NotificationItem[];
}

export default function NotificationList({
  isLoading,
  isError,
  notifications,
}: NotificationListProps) {
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-24">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-sm text-center py-8 px-4">
        Failed to load notifications.
      </p>
    );
  }
  
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 px-4">
        <MailCheck className="w-16 h-16 text-gray-300" />
        <h4 className="mt-4 font-semibold text-lg text-gray-800">All caught up!</h4>
        <p className="text-sm text-muted-foreground mt-1">You have no new notifications.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {notifications.map((notification) => {
        const config = NOTIFICATION_DETAILS[notification.type as NotificationType] ?? DEFAULT_NOTIFICATION_STYLE;
        const Icon = config.icon; 

        return (
          <div
            key={notification.id}
            className={cn(
              "flex items-center gap-4 p-3 cursor-pointer border-b border-gray-100 transition-colors duration-150 last:border-b-0",
              !notification.is_read 
                ? "bg-sky-100 hover:bg-sky-100/70" 
                : "hover:bg-gray-50/80"           
            )}
          >
            {/* Icon */}
            <div className={cn(
              "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
              config.style.bgColor
            )}>
              <Icon className={cn("w-5 h-5", config.style.iconColor)} />
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-800">{config.title}</p>
              <p className="text-sm text-muted-foreground whitespace-normal leading-snug line-clamp-2">
                {notification.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}