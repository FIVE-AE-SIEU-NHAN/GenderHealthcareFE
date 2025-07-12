import { cn } from "@/lib/utils";
import { AppointmentStatus } from "@/Application/constants/appointment";

interface StatusBadgeProps {
  status: AppointmentStatus;
  className?: string;
  isCompact?: boolean;
}

const statusConfig = {
  PENDING: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-300",
    dotColor: "bg-amber-400",
  },
  ONGOING: {
    label: "Ongoing",
    className: "bg-blue-50 text-blue-700 border-blue-300",
    dotColor: "bg-blue-400",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700 border-emerald-300",
    dotColor: "bg-emerald-400",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-300",
    dotColor: "bg-red-400",
  },
};

export function StatusBadge({ status, className, isCompact = false }: StatusBadgeProps) {
  const config = statusConfig[status];

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
