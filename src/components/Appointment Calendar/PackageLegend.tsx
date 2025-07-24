import { PACKAGE_STYLES_MAP } from '@/Application/constants/doctor/serviceAppointmentConstants'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function PackageLegend() {
  return (
    <Card className='mb-6 border border-white/30 bg-white/70 shadow-xl backdrop-blur-sm'>
      <CardContent>
        <div className='grid grid-cols-1 gap-x-6 gap-y-3 pt-4 pb-4 md:grid-cols-2'>
          {Array.from(PACKAGE_STYLES_MAP.values()).map((packageStyle) => (
            <div key={packageStyle.label} className='flex items-center gap-3'>
              <div className={cn('h-3 w-3 flex-shrink-0 rounded-full', packageStyle.dotClass)} />
              <span className='text-sm text-gray-800'>{packageStyle.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
