import { Bell, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/notification/useNotifications";
import { useNotificationMutations } from "@/hooks/notification/useNotifcationMutations";
import { Button } from "@/components/ui/button";
import NotificationList from "./NotificationList";

export default function Notification() {
  const { data, isLoading, isError } = useNotifications();
  const { markAllAsReadMutation } = useNotificationMutations();

  const notifications = data?.notifications ?? [];
  const unreadCount = data?.unreadCount ?? 0;

  const handleMarkAllAsRead = () => {
    // Only call the mutation if there are unread messages and it's not already running
    if (unreadCount > 0 && !markAllAsReadMutation.isPending) {
      markAllAsReadMutation.mutate();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative p-2 cursor-pointer">
        <Bell />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute top-0 right-1 h-5 w-5 flex items-center justify-center rounded-full text-xs p-0"
          >
            <p className="translate-y-[2px]">{unreadCount}</p>
          </Badge>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 md:w-[26rem] p-0" align="end">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-gray-200">
          <h3 className="font-semibold text-base text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              disabled={markAllAsReadMutation.isPending}
              variant="ghost"
              className="h-auto p-0 text-primary cursor-pointer hover:bg-none hover:text-blue-700 transition-colors duration-300"
              onClick={handleMarkAllAsRead}
            >
              {markAllAsReadMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Mark all as read
            </Button>
          )}
        </div>

        {/* Body */}
        <div className="max-h-[20vh] overflow-y-auto">
          <NotificationList
            isLoading={isLoading}
            isError={isError}
            notifications={notifications}
          />
        </div>

        {/* Footer */}
        {notifications.length > 5 && (
          <div className="text-center p-2 border-t border-gray-200 bg-gray-50">
            <p className="w-full text-primary font-semibold cursor-pointer hover:text-blue-700 transition-colors duration-300">
              View All Notifications
            </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}