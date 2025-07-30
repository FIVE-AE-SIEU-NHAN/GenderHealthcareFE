import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { useQueryClient } from '@tanstack/react-query'
import { Calendar, Eye, Lock, Loader2 } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { RatingFormData, CycleStatusLog } from '@/types/cycle'

import ModernRating from './ModernRating'
import SleepHoursInput from './SleepHoursInput'
import AINotesSection from './AINotesSection'
import { useCycleMutations } from '@/hooks/cycle/useCycleMutations'
import { useCycleLogDetail } from '@/hooks/cycle/useCycle'

interface DayRatingModalProps {
  isOpen: boolean
  onClose: () => void
  date: Date
  dayType: 'period' | 'fertile' | 'ovulation' | 'normal'
  cycleId: string
}

const ratingNames = {
  mood: 'Mood',
  libido: 'Libido',
  stress: 'Stress Level',
  energy: 'Energy'
}
const dayTypeNames = {
  period: 'Period',
  fertile: 'Fertile window',
  ovulation: 'Ovulation',
  normal: 'Normal'
}
const dayTypeColors = {
  period: 'bg-rose-600/65',
  fertile: 'bg-emerald-600/65',
  ovulation: 'bg-violet-600/65',
  normal: 'bg-slate-600/65'
}

export default function DayRatingModal({ isOpen, onClose, date, dayType, cycleId }: DayRatingModalProps) {
  const queryClient = useQueryClient()
  const formattedDate = format(date, 'yyyy-MM-dd')

  const contentRef = useRef<HTMLDivElement>(null)

  const [displayData, setDisplayData] = useState<CycleStatusLog | null>(null)

  const form = useForm<RatingFormData>({
    defaultValues: { mood: 3, libido: 3, stress: 3, energy: 3, sleep_hours: 8 }
  })

  const { logDetail, isLoading: isLoadingDetails } = useCycleLogDetail({
    cycleId,
    logDate: formattedDate,
    enabled: isOpen
  })

  const { updateStatusLog } = useCycleMutations()
  const { mutate: submitRating, isPending: isSubmitting } = updateStatusLog

  useEffect(() => {
    if (logDetail) {
      setDisplayData(logDetail)
      form.reset({
        mood: logDetail.mood,
        libido: logDetail.libido,
        stress: logDetail.stress,
        energy: logDetail.energy,
        sleep_hours: logDetail.sleep_hours
      })
    }
  }, [logDetail, form])

  useEffect(() => {
    if (!isOpen) {
      setDisplayData(null)
      form.reset({ mood: 3, libido: 3, stress: 3, energy: 3, sleep_hours: 8 })
    }
  }, [isOpen, form])

  const handleSubmit = (formData: RatingFormData) => {
    const payload = { ...formData, log_date: formattedDate }
    submitRating(
      { cycleId, payload },
      {
        onSuccess: (response) => {
          // First, update the state to show the AI notes
          setDisplayData(response.result)
          queryClient.setQueryData(['cycleLogDetail', cycleId, formattedDate], response)

          // Then, scroll the content area to the top smoothly
          if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }
      }
    )
  }

  const viewOnlyMode = !!displayData
  const isLoading = isLoadingDetails || isSubmitting

  const renderRatingField = (field: keyof typeof ratingNames) => (
    <FormField
      control={form.control}
      name={field}
      render={({ field: formField }) => (
        <FormItem>
          <FormControl>
            <div className='relative'>
              <ModernRating
                value={formField.value as number}
                onChange={formField.onChange}
                type={field}
                disabled={viewOnlyMode || isLoading}
                label={ratingNames[field]}
              />
              {viewOnlyMode && <Lock className='absolute top-2 right-2 h-4 w-4 text-slate-400' />}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  )

  const renderSleepField = () => (
    <FormField
      control={form.control}
      name='sleep_hours'
      render={({ field: formField }) => (
        <FormItem>
          <FormControl>
            <div className='relative'>
              <SleepHoursInput
                value={formField.value}
                onChange={formField.onChange}
                disabled={viewOnlyMode || isLoading}
                label='Sleep Time'
              />
              {viewOnlyMode && <Lock className='absolute top-2 right-2 h-4 w-4 text-slate-400' />}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[95vh] max-w-md overflow-y-hidden rounded-2xl border-none p-0 md:max-w-3xl lg:max-w-4xl'>
        {/* Header */}
        <div className={`${dayTypeColors[dayType]} rounded-t-2xl p-6 text-white`}>
          <div className='flex items-center gap-4'>
            <div className='rounded-xl bg-white/10 p-3 shadow-xl/7'>
              {viewOnlyMode ? <Eye className='h-6 w-6' /> : <Calendar className='h-6 w-6' />}
            </div>
            <div>
              <DialogTitle className='mb-1 text-xl font-bold text-shadow-lg/15'>
                {viewOnlyMode ? 'View Rating' : 'Rate Your Day'} for {format(date, 'MMMM do, yyyy')}
              </DialogTitle>
              <DialogDescription className='text-white/80 text-shadow-lg/13'>
                {dayTypeNames[dayType]} Day
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className='relative max-h-200 overflow-y-auto p-6'>
          {isLoading && (
            <div className='absolute inset-0 z-20 flex items-center justify-center rounded-b-2xl bg-white/70 backdrop-blur-sm'>
              <Loader2 className='h-8 w-8 animate-spin text-pink-500' />
            </div>
          )}

          {/* We pass the entire `displayData` object, which matches the expected `CycleStatusLog` type. */}
          {viewOnlyMode && displayData && (
            <div className='-mt-4 mb-6'>
              <AINotesSection analysis={displayData} isVisible={true} />
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
              <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                {renderRatingField('mood')}
                {renderRatingField('libido')}
                {renderRatingField('stress')}
                {renderRatingField('energy')}
              </div>
              <div className='mx-auto max-w-2xl'>{renderSleepField()}</div>

              <div className='flex gap-4 pt-4'>
                {viewOnlyMode ? (
                  <Button
                    type='button'
                    onClick={onClose}
                    className='h-12 flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-colors duration-400 hover:from-blue-700 hover:to-blue-900'
                  >
                    Got it, thanks!
                  </Button>
                ) : (
                  <>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={onClose}
                      disabled={isLoading}
                      className='h-12 flex-1 rounded-xl'
                    >
                      Cancel
                    </Button>
                    <Button
                      type='submit'
                      disabled={isLoading}
                      className='h-12 flex-1 rounded-xl bg-slate-800 hover:bg-slate-700'
                    >
                      {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                      Save Rating
                    </Button>
                  </>
                )}
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
