import React from 'react'
import { Sparkles, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { AIAnalysisStatus, CycleStatusLog } from '@/types/cycle'
import { Badge } from '@/components/ui/badge'
import { RiRobot3Line } from 'react-icons/ri'

interface AINotesSectionProps {
  analysis: CycleStatusLog
  isVisible: boolean
}

const statusConfig: Record<
  AIAnalysisStatus,
  {
    icon: React.ElementType
    label: string
    badgeClass: string
    containerClass: string
    iconClass: string
    gradientClass: string
  }
> = {
  NORMAL: {
    icon: CheckCircle,
    label: 'Normal',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    containerClass: 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-100',
    iconClass: 'text-emerald-600',
    gradientClass: 'from-emerald-400 to-green-500'
  },
  NEED_ATTENTION: {
    icon: AlertTriangle,
    label: 'Needs Attention',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    containerClass: 'border-amber-200 bg-gradient-to-br from-amber-50 to-orange-100',
    iconClass: 'text-amber-600',
    gradientClass: 'from-amber-400 to-orange-500'
  },
  NOT_POSITIVE: {
    icon: XCircle,
    label: 'Concerning',
    badgeClass: 'bg-red-100 text-red-800 border-red-200',
    containerClass: 'border-red-200 bg-gradient-to-br from-red-50 to-rose-100',
    iconClass: 'text-red-600',
    gradientClass: 'from-red-400 to-rose-500'
  }
}

export default function AINotesSection({ analysis, isVisible }: AINotesSectionProps) {
  const config = statusConfig[analysis.status]

  if (!isVisible) return null

  return (
    <div className='relative overflow-hidden'>
      {/* Animated entrance */}
      <div
        className={`transform transition-all duration-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {/* Magical header with sparkles */}
        <div className='relative mb-6'>
          <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-blue-600 to-cyan-500 opacity-10 blur-xl'></div>
          <div className='relative flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white shadow-xl'>
            <div className='relative'>
              <RiRobot3Line className='h-8 w-8' />
              <div className='absolute -top-1 -right-1'>
                <Sparkles className='h-4 w-4 animate-pulse text-yellow-300' />
              </div>
            </div>
            <div className='text-center'>
              <h3 className='text-xl font-bold'>AI Health Analysis</h3>
              <p className='text-sm text-purple-100'>Personalized insights for your cycle</p>
            </div>
          </div>
        </div>

        {/* Status and content */}
        <div
          className={`mb-7 rounded-2xl border-2 p-6 py-6 shadow-lg transition-all duration-300 hover:shadow-xl ${config.containerClass}`}
        >
          {/* Status badge */}
          <div className='mb-6 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div>
                <Badge className={`text-md font-semibold ${config.badgeClass}`}>{config.label}</Badge>
              </div>
            </div>

            {/* Pulse indicator */}
            <div className='flex items-center gap-2'>
              <div className={`h-3 w-3 animate-pulse rounded-full bg-gradient-to-r ${config.gradientClass}`}></div>
              <span className='text-xs font-medium text-slate-500'>Live Analysis</span>
            </div>
          </div>

          {/* AI Note content */}
          <div className='space-y-4'>
            <div className='flex items-start gap-3'>
              <div className='mt-1 rounded-lg bg-white/70 p-2 shadow-sm'>
                <RiRobot3Line className={`h-5 w-5 ${config.iconClass}`} />
              </div>
              <div className='flex-1'>
                <h5 className='mb-2 font-semibold text-slate-800'>AI Recommendation</h5>
                <div className='rounded-xl bg-white/70 p-4 text-slate-700 shadow-sm backdrop-blur-sm'>
                  <p className='text-base leading-relaxed'>{analysis.note}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className='pointer-events-none absolute inset-0 overflow-hidden'>
          <div
            className='absolute top-4 left-4 h-2 w-2 animate-[bounce_3s_ease-in-out_infinite] rounded-full bg-purple-400 opacity-40'
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className='absolute top-8 right-6 h-1 w-1 animate-[bounce_3s_ease-in-out_infinite] rounded-full bg-blue-400 opacity-60'
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>
      </div>
    </div>
  )
}
