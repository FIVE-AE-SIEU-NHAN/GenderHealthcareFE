import React from 'react'
import { useForm } from 'react-hook-form'
import { format, isAfter, startOfDay } from 'date-fns'
import { Calendar, Eye, Lock } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { DailyRating } from '@/types/cycle'
import ModernRating from './ModernRating'
import SleepHoursInput from './SleepHoursInput'

interface DayRatingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (rating: DailyRating) => void
  date: Date
  dayType: 'period' | 'fertile' | 'ovulation' | 'normal'
  initialRating?: DailyRating
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

export default function DayRatingModal({
  isOpen,
  onClose,
  onSubmit,
  date,
  dayType,
  initialRating
}: DayRatingModalProps) {
  const today = startOfDay(new Date())
  const selectedDate = startOfDay(date)
  const isFutureDate = isAfter(selectedDate, today)
  const isPastDate = selectedDate < today

  const form = useForm<DailyRating>({
    defaultValues: initialRating || {
      mood: 3,
      libido: 3,
      stress: 3,
      sleep: 8,
      energy: 3
    }
  })

  const handleSubmit = (data: DailyRating) => {
    if (!isFutureDate) {
      onSubmit(data)
      form.reset()
    }
  }

  const renderRatingField = (field: 'mood' | 'libido' | 'stress' | 'energy') => {
    const name = ratingNames[field]
    const isReadOnly = !!(isPastDate && initialRating)

    return (
      <FormField
        control={form.control}
        name={field}
        render={({ field: formField }) => (
          <FormItem>
            <FormControl>
              <div className='relative'>
                <ModernRating
                  value={formField.value}
                  onChange={formField.onChange}
                  type={field}
                  disabled={isReadOnly}
                  label={name + (isReadOnly ? ' (View Only)' : '')}
                />
                {isReadOnly && (
                  <div className='absolute top-2 right-2'>
                    <Lock className='h-4 w-4 text-slate-400' />
                  </div>
                )}
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    )
  }

  const renderSleepField = () => {
    const isReadOnly = !!(isPastDate && initialRating)

    return (
      <FormField
        control={form.control}
        name='sleep'
        render={({ field: formField }) => (
          <FormItem>
            <FormControl>
              <div className='relative'>
                <SleepHoursInput
                  value={formField.value}
                  onChange={formField.onChange}
                  disabled={isReadOnly}
                  label={'Sleep Time' + (isReadOnly ? ' (View Only)' : '')}
                />
                {isReadOnly && (
                  <div className='absolute top-2 right-2'>
                    <Lock className='h-4 w-4 text-slate-400' />
                  </div>
                )}
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    )
  }

  // Don't allow future date rating
  if (isFutureDate) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='max-w-md rounded-2xl p-6'>
          <div className='space-y-4 text-center'>
            <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100'>
              <Calendar className='h-8 w-8 text-amber-600' />
            </div>
            <h3 className='text-xl font-semibold text-slate-800'>Cannot Rate</h3>
            <p className='text-slate-600'>You cannot rate a date in the future.</p>
            <Button onClick={onClose} className='bg-slate-800 hover:bg-slate-700'>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[90vh] max-w-md overflow-y-auto rounded-2xl border-none p-0 md:max-w-2xl lg:max-w-4xl'>
        {/* Simplified Header */}
        <div className={`${dayTypeColors[dayType]} rounded-t-2xl p-6 text-white`}>
          <div className='flex items-center gap-4'>
            <div className='rounded-xl bg-white/10 p-3'>
              {isPastDate && initialRating ? <Eye className='h-6 w-6' /> : <Calendar className='h-6 w-6' />}
            </div>
            <div>
              <DialogTitle className='mb-1 text-xl font-bold'>
                {isPastDate && initialRating ? 'View Rating' : 'Rate'} date {format(date, 'dd/MM/yyyy')}
              </DialogTitle>
              <DialogDescription className='text-white/80'>
                {dayTypeNames[dayType]} {isPastDate && initialRating ? '- View only information' : '- Rate your status'}
              </DialogDescription>
            </div>
          </div>
        </div>

        <div className='p-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
              <div className='space-y-8'>
                <div className='space-y-6'>
                  <div className='grid grid-cols-1 gap-8 md:gap-16 lg:grid-cols-2'>
                    {renderRatingField('mood')}
                    {renderRatingField('libido')}
                    {renderRatingField('stress')}
                    {renderRatingField('energy')}
                  </div>

                  {/* Sleep field takes full width */}
                  <div className='mx-auto max-w-2xl'>{renderSleepField()}</div>
                </div>
              </div>

              <div className='flex gap-4 pt-4'>
                <Button type='button' variant='outline' onClick={onClose} className='h-12 flex-1 rounded-xl'>
                  {isPastDate && initialRating ? 'Close' : 'Cancel'}
                </Button>
                {!(isPastDate && initialRating) && (
                  <Button type='submit' className='h-12 flex-1 rounded-xl bg-slate-800 hover:bg-slate-700'>
                    {initialRating ? 'Update' : 'Save Rating'}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
