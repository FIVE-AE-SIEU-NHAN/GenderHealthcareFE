import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { Calendar, CalendarCheck, Clock, Sparkles, Flower2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CycleFormData } from '@/types/cycle'
import ModernRating from './ModernRating'
import SleepHoursInput from './SleepHoursInput'

interface CycleFormProps {
  onSubmit: (data: CycleFormData) => void
}

const ratingNames = {
  mood: 'Mood',
  libido: 'Libido',
  stress: 'Stress Level',
  energy: 'Energy'
}

export default function CycleForm({ onSubmit }: CycleFormProps) {
  const form = useForm<CycleFormData>({
    defaultValues: {
      firstPeriodDate: format(new Date(), 'yyyy-MM-dd'),
      cycleLength: 28,
      periodDuration: 5,
      mood: 3,
      libido: 3,
      stress: 3,
      sleep: 8,
      energy: 3
    }
  })

  const handleSubmit = (data: CycleFormData) => {
    onSubmit(data)
  }

  const renderRatingField = (field: 'mood' | 'libido' | 'stress' | 'energy') => {
    const name = ratingNames[field]

    return (
      <FormField
        control={form.control}
        name={field}
        render={({ field: formField }) => (
          <FormItem>
            <FormControl>
              <ModernRating value={formField.value} onChange={formField.onChange} type={field} label={name} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  const renderSleepField = () => {
    return (
      <FormField
        control={form.control}
        name='sleep'
        rules={{
          required: 'Please enter the number of hours slept',
          min: { value: 1, message: 'The minimum sleep duration is 1 hour' },
          max: { value: 18, message: 'Sleep duration cannot exceed 18 hours' }
        }}
        render={({ field: formField, fieldState }) => (
          <FormItem>
            <FormControl>
              <SleepHoursInput
                value={formField.value}
                onChange={formField.onChange}
                label='Sleep Hours'
                error={fieldState.error?.message}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  return (
    <div className='mx-auto max-w-4xl md:max-w-2xl lg:max-w-4xl xl:min-w-6xl xl:-translate-x-10'>
      <div className='overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-200/50'>
        {/* Stunning Header */}
        <div className='bg-slate-800 p-8 text-white'>
          <div className='flex items-center gap-4'>
            <div className='rounded-xl bg-white/10 p-4'>
              <Flower2 className='h-8 w-8' />
            </div>
            <div>
              <h1 className='mb-2 text-3xl font-bold'>Set Up Cycle Tracking</h1>
              <p className='text-lg text-white/80'>Start your reproductive health tracking journey</p>
            </div>
          </div>
        </div>

        <div className='p-8'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
              {/* Basic Cycle Information */}
              <div className='space-y-6'>
                <div className='mb-6 flex items-center gap-3'>
                  <div className='rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-3 text-white'>
                    <Calendar className='h-6 w-6' />
                  </div>
                  <h3 className='text-2xl font-bold text-slate-800'>Cycle Information</h3>
                </div>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                  <FormField
                    control={form.control}
                    name='firstPeriodDate'
                    rules={{ required: 'Please select the first day of menstruation' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center gap-2 text-lg font-semibold text-slate-700'>
                          <CalendarCheck className='h-5 w-5' />
                          First day of menstruation
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='date'
                            {...field}
                            className='h-12 rounded-xl border-2 border-slate-200 text-lg focus:border-blue-500 focus:ring-blue-500/20'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='cycleLength'
                    rules={{
                      required: 'Please enter the cycle length',
                      min: { value: 21, message: 'The minimum cycle length is 21 days' },
                      max: { value: 30, message: 'The cycle length cannot exceed 30 days' }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-lg font-semibold text-slate-700'>Menstrual Cycle</FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              type='number'
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              min={21}
                              max={30}
                              className='h-12 rounded-xl border-2 border-slate-200 pr-16 text-lg focus:border-green-500 focus:ring-green-500/20'
                            />
                            <span className='absolute top-1/2 right-4 -translate-y-1/2 transform font-medium text-slate-500'>
                              ngày
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='periodDuration'
                    rules={{
                      required: 'Please enter the menstruation duration',
                      min: { value: 3, message: 'The minimum menstruation duration is 3 days' },
                      max: { value: 7, message: 'The menstruation duration cannot exceed 7 days' }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center gap-2 text-lg font-semibold text-slate-700'>
                          <Clock className='h-5 w-5' />
                          Menstruation Duration
                        </FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              type='number'
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              min={3}
                              max={7}
                              className='h-12 rounded-xl border-2 border-slate-200 pr-16 text-lg focus:border-red-500 focus:ring-red-500/20'
                            />
                            <span className='absolute top-1/2 right-4 -translate-y-1/2 transform font-medium text-slate-500'>
                              days
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Self-Rating Section */}
              <div className='space-y-6'>
                <div className='mb-6 flex items-center gap-3'>
                  <div className='rounded-xl bg-violet-500 p-3 text-white'>
                    <Sparkles className='h-6 w-6' />
                  </div>
                  <h3 className='text-2xl font-bold text-slate-800'>Rate Current Status</h3>
                </div>

                <div className='space-y-8'>
                  <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
                    {renderRatingField('mood')}
                    {renderRatingField('libido')}
                    {renderRatingField('stress')}
                    {renderRatingField('energy')}
                  </div>

                  {/* Sleep field takes full width */}
                  <div className='mx-auto max-w-2xl'>{renderSleepField()}</div>
                </div>
              </div>

              {/* Submit Button */}
              <div className='pt-6'>
                <Button
                  type='submit'
                  className='h-14 w-full rounded-xl bg-slate-800 text-xl font-bold shadow-md transition-all duration-300 hover:bg-slate-700'
                >
                  <Sparkles className='mr-3 h-6 w-6' />
                  Create Your Cycle Tracking Calendar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
