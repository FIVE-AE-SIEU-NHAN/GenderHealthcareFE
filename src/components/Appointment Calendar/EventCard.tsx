import { Appointment } from "@/types/consultant/appointmentTypes";
import { StatusBadge } from "@/components/Appointment Calendar/status-badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DEFAULT_TOPIC_STYLE, TOPIC_STYLES_MAP } from "@/Application/constants/appointment";

interface AppointmentCardProps {
  appointment: Appointment;
  className?: string;
}

export function AppointmentCard({
  appointment,
  className,
}: AppointmentCardProps) {
  const { topic, status, socket_room_id } = appointment;
  const topicStyle = TOPIC_STYLES_MAP.get(topic) || DEFAULT_TOPIC_STYLE;

  return (
    <div
      className={cn(
        "bg-white rounded-lg overflow-x-auto border border-gray-200 border-l-4 p-3 shadow-sm hover:shadow-md transition-all duration-200",
        "min-h-[50px] space-y-2",
        topicStyle.cardClasses,
        className,
      )}
    >
      {/* Header with status and time */}
      <div className="flex gap-2 justify-between">
        <StatusBadge status={status} className="text-xs" />
      </div>

      {/* Room ID */}
      <div className="flex flex-col gap-2 text-xs text-gray-700">
        <code className="bg-gray-100 min-w-22 px-1.5 py-0.5 rounded text-xs font-bold font-mono text-center">
          {socket_room_id || "N/A"}
        </code>

        {
          ["PENDING", "ONGOING"].includes(status) && (
            <div>
              <Button
                variant="outline"
                size="sm"
                className="p-2 w-full cursor-pointer"
              >
                Join
              </Button>
            </div>
          )}
      </div>
    </div>
  );
}
