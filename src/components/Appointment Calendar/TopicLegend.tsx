import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TOPIC_STYLES_MAP } from '@/Application/constants/appointment';

export function TopicLegend() {
  return (
    <Card className="mb-6 bg-white/70 backdrop-blur-sm border border-white/30 shadow-xl">
      <CardContent>
        <div className="pt-4 pb-4 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
          {Array.from(TOPIC_STYLES_MAP.values()).map((topicStyle) => (
            <div key={topicStyle.label} className="flex items-center gap-2">
              <div
                className={cn(
                  "h-3 w-3 flex-shrink-0 rounded-full",
                  topicStyle.dotClass
                )}
              />
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {topicStyle.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}