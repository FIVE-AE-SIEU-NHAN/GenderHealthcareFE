import { Appointment } from "@/types/consultant/appointmentTypes";
import { StatusBadge } from "@/components/Appointment Calendar/status-badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { APPOINTMENT_STATUS_OPTIONS, AppointmentStatus, DEFAULT_TOPIC_STYLE, TOPIC_STYLES_MAP } from "@/Application/constants/appointment";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Loader2, Pencil } from "lucide-react";

interface AppointmentCardProps {
  appointment: Appointment;
  className?: string;
  onStatusChange: (status: AppointmentStatus) => void;
  isUpdating?: boolean;
  onJoin?: (roomId: string) => void;
}

export function AppointmentCard({
  appointment,
  className,
  onStatusChange,
  isUpdating = false,
  onJoin,
}: AppointmentCardProps) {
  const { topic, status, chat_room_id } = appointment;
  const topicStyle = TOPIC_STYLES_MAP.get(topic) || DEFAULT_TOPIC_STYLE;

  return (
    <div
      className={cn(
        "rounded-lg overflow-x-auto border border-gray-200 border-l-4 p-3 shadow-sm hover:shadow-md transition-all duration-200",
        "min-h-[50px] space-y-2",
        topicStyle.cardClasses,
        className,
      )}
    >
      {/* Badge and Edit Status button */}
      <div className="flex items-center gap-2">
        <StatusBadge status={status} className="text-xs" isCompact />

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-white border border-gray-400">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Pencil className="h-3 w-3 text-gray-500" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {APPOINTMENT_STATUS_OPTIONS.map((newStatus) => (
              <DropdownMenuItem
                key={newStatus}
                disabled={status === newStatus}
                onSelect={() => onStatusChange(newStatus)}
              >
                <StatusBadge status={newStatus} className="text-xs" />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Room ID */}
      <div className="flex flex-col gap-2 text-xs text-gray-700">
        <code className="bg-gray-100 w-full px-1.5 py-0.5 rounded text-xs font-bold font-mono text-center border border-gray-400 truncate">
          {chat_room_id || "N/A"}
        </code>

        {onJoin && ["PENDING", "ONGOING"].includes(status) && chat_room_id && (
          <div>
            <Button
              variant="outline"
              size="sm"
              className="p-2 w-full cursor-pointer border border-gray-400 truncate"
              onClick={() => onJoin(chat_room_id)}
            >
              Join
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
