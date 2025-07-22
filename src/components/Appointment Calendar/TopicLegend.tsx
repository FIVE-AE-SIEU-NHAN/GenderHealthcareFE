import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TOPIC_STYLES_MAP } from '@/Application/constants/appointment'

export function TopicLegend() {
  return (
    <Card className='mb-6 border border-white/30 bg-white/70 shadow-xl backdrop-blur-sm'>
      <CardContent>
        <div className='grid grid-cols-2 gap-x-6 gap-y-3 pt-4 pb-4 md:grid-cols-3'>
          {Array.from(TOPIC_STYLES_MAP.values()).map((topicStyle) => (
            <div key={topicStyle.label} className='flex items-center gap-2'>
              <div className={cn('h-3 w-3 flex-shrink-0 rounded-full', topicStyle.dotClass)} />
              <span className='text-sm text-gray-800 dark:text-gray-200'>{topicStyle.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
