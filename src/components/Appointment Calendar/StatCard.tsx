import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  gradientClasses: string;
  valueColorClass?: string;
  gradientIcon?: string;
}

export function StatCard({ title, value, icon, gradientClasses, valueColorClass, gradientIcon }: StatCardProps) {
  return (
    <div className="group relative">
      <div className={cn("absolute inset-0 bg-gradient-to-br rounded-2xl", gradientClasses)} />
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl transition-all duration-300" />
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</p>
            <p className={cn("text-3xl font-bold mt-2", valueColorClass || "text-gray-900")}>
              {value}
            </p>
          </div>
          <div className={cn(
            "p-4 bg-gradient-to-br",
            gradientIcon,
            "rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300",
          )}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="relative p-6 bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-4 w-28 bg-gray-400" />
          <Skeleton className="h-9 w-12 mt-2 bg-gray-300" />
        </div>
        <Skeleton className="h-16 w-16 rounded-xl bg-gray-300" />
      </div>
    </div>
  );
}