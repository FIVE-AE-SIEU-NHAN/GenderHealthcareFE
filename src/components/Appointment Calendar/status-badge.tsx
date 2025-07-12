import { cn } from "@/lib/utils";
import { AppointmentStatus, STATUS_STYLES } from "@/Application/constants/appointment";

interface StatusBadgeProps {
  status: AppointmentStatus;
  className?: string;
  isCompact?: boolean;
}

export function StatusBadge({ status, className, isCompact = false }: StatusBadgeProps) {
  const config = STATUS_STYLES[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium",
        config.className,
        className,
        isCompact ? "px-1.5 md:px-2.5" : "px-2.5",
      )}
    >
      <div className={cn("w-2 h-2 rounded-full", config.dotColor)} />
      <span
        className={cn({
          "hidden xl:inline": isCompact,
        })}
      >
      {config.label}
      </span>
    </div>
  );
}
