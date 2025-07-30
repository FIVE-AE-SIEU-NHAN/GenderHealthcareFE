import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { Calendar, CalendarCheck, Clock, Sparkles, Flower2, FileText, Heart, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CreateCyclePayload, CycleFormData } from '@/types/cycle'
import { useCycleMutations } from '@/hooks/cycle/useCycleMutations'

interface CycleFormProps {
  onSuccess: () => void
}

export default function CycleForm({ onSuccess }: CycleFormProps) {
  const { createCycle } = useCycleMutations()

  const form = useForm<CycleFormData>({
    defaultValues: {
      firstPeriodDate: format(new Date(), 'yyyy-MM-dd'),
      cycleLength: 28,
      periodDuration: 5,
      notes: ''
    }
  })

  const handleSubmit = async (data: CycleFormData) => {
    const payload: CreateCyclePayload = {
      start_period_date: data.firstPeriodDate,
      cycle_length: data.cycleLength,
      period_length: data.periodDuration,
      note: data.notes
    }

    try {
      await createCycle.mutateAsync(payload)
      onSuccess()
    } catch (error) {
      console.error('Failed to create cycle:', error)
    }
  }

  return (
    <div className='mx-auto max-w-6xl px-4 py-8'>
      <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl'>
        {/* Header */}
        <div className='bg-slate-800 p-8 text-white'>
          <div className='flex items-center gap-6'>
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
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-10'>
              {/* Basic Cycle Information section */}
              <div className='space-y-8'>
                <div className='mb-8 flex items-center gap-4'>
                  <div className='rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 p-4 text-white shadow-lg'>
                    <Calendar className='h-7 w-7' />
                  </div>
                  <div>
                    <h3 className='text-3xl font-bold text-slate-800'>Cycle Information</h3>
                    <p className='text-slate-600'>Set up your basic cycle details</p>
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
                  {/* Form fields */}
                  <FormField
                    control={form.control}
                    name='firstPeriodDate'
                    rules={{ required: 'Please select the first day of menstruation' }}
                    render={({ field }) => (
                      <FormItem className='space-y-3'>
                        <FormLabel className='flex items-center gap-3 text-lg font-semibold text-slate-700'>
                          <div className='rounded-lg bg-blue-100 p-2'>
                            <CalendarCheck className='h-5 w-5 text-blue-600' />
                          </div>
                          First day of menstruation
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='date'
                            {...field}
                            className='h-14 rounded-xl border-2 border-slate-200 text-lg transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
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
                      min: { value: 20, message: 'The minimum cycle length is 20 days' },
                      max: { value: 31, message: 'The cycle length cannot exceed 31 days' }
                    }}
                    render={({ field }) => (
                      <FormItem className='space-y-3'>
                        <FormLabel className='flex items-center gap-3 text-lg font-semibold text-slate-700'>
                          <div className='rounded-lg bg-green-100 p-2'>
                            <Heart className='h-5 w-5 text-green-600' />
                          </div>
                          Menstrual Cycle Length
                        </FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              type='number'
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                              min={20}
                              max={31}
                              className='h-14 rounded-xl border-2 border-slate-200 pr-16 text-lg transition-all focus:border-green-500 focus:ring-4 focus:ring-green-500/20'
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

                  <FormField
                    control={form.control}
                    name='periodDuration'
                    rules={{
                      required: 'Please enter the menstruation duration',
                      min: { value: 1, message: 'The minimum menstruation duration is 1 day' },
                      max: { value: 10, message: 'The menstruation duration cannot exceed 10 days' }
                    }}
                    render={({ field }) => (
                      <FormItem className='space-y-3'>
                        <FormLabel className='flex items-center gap-3 text-lg font-semibold text-slate-700'>
                          <div className='rounded-lg bg-red-100 p-2'>
                            <Clock className='h-5 w-5 text-red-600' />
                          </div>
                          Menstruation Duration
                        </FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              type='number'
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                              min={1}
                              max={10}
                              className='h-14 rounded-xl border-2 border-slate-200 pr-16 text-lg transition-all focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
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

              {/* Notes Section */}
              <div className='space-y-6'>
                <div className='mb-6 flex items-center gap-4'>
                  <div className='rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 p-4 text-white shadow-lg'>
                    <FileText className='h-7 w-7' />
                  </div>
                  <div>
                    <h3 className='text-3xl font-bold text-slate-800'>Additional Notes</h3>
                    <p className='text-slate-600'>Add any important details about your cycle</p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name='notes'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormLabel className='flex items-center gap-3 text-lg font-semibold text-slate-700'>
                        <div className='rounded-lg bg-amber-100 p-2'>
                          <FileText className='h-5 w-5 text-amber-600' />
                        </div>
                        Personal Notes (Optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder='Add any notes about your cycle, symptoms, or other observations...'
                          className='min-h-[120px] rounded-xl border-2 border-slate-200 text-lg transition-all focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className='pt-8'>
                <Button
                  type='submit'
                  disabled={createCycle.isPending}
                  className='h-14 w-full rounded-xl bg-slate-800 text-xl font-bold shadow-md transition-all duration-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  {createCycle.isPending ? (
                    <Loader2 className='mr-3 h-6 w-6 animate-spin' />
                  ) : (
                    <Sparkles className='mr-3 h-6 w-6' />
                  )}
                  {createCycle.isPending ? 'Creating Calendar...' : 'Create Your Cycle Tracking Calendar'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
