import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { format } from 'date-fns'
import { Calendar, Loader2 } from 'lucide-react'
import { FaHeartbeat } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { timeSlotOptions } from '@/Application/constants/appointment'
import { CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

// Updated STIS Testing Packages with gender and level
export const STIS_TESTING_PACKAGES = [
  { value: 'basic-men', label: 'Basic package for men', price: 500000, gender: 'male', level: 'basic' },
  { value: 'advanced-men', label: 'Advanced package for men', price: 950000, gender: 'male', level: 'advanced' },
  { value: 'basic-women', label: 'Basic package for women', price: 500000, gender: 'female', level: 'basic' },
  { value: 'advanced-women', label: 'Advanced package for women', price: 1100000, gender: 'female', level: 'advanced' }
]

// Form validation schema (no changes needed here)
export const formSchema = z.object({
  topic: z.string({ required_error: 'Please select a testing package.' }).min(1, 'Please select a testing package.'),
  booking_date: z.date({ required_error: 'Please select a date.' }),
  time_slot: z.string({ required_error: 'Please select a time slot.' }).min(1, 'Please select a time slot.'),
  note: z
    .string()
    .trim()
    .refine(
      (value) => {
        if (!value) return true
        const wordCount = value.split(/\s+/).filter((word) => word.length > 0).length
        return wordCount >= 8 && wordCount <= 50
      },
      {
        message: 'The note must be between 8 and 50 words.'
      }
    ),
  agreed: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms of use.'
  })
})

interface ServicesBookingFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void
  isPending: boolean
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>
}

export const ServicesBookingForm: React.FC<ServicesBookingFormProps> = ({ onSubmit, isPending, form }) => {
  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 2)
  minDate.setHours(0, 0, 0, 0)

  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 2)

  const selectedTopicValue = form.watch('topic')
  const selectedDateValue = form.watch('booking_date')
  const selectedTimeSlotValue = form.watch('time_slot')

  const getSelectedPackage = () => STIS_TESTING_PACKAGES.find((p) => p.value === selectedTopicValue)
  const getSelectedTimeSlotLabel = () => timeSlotOptions.find((t) => t.value === selectedTimeSlotValue)?.label

  return (
    <div className='relative z-10 flex w-full justify-center'>
      <div className='w-full max-w-3xl px-4 md:px-0'>
        <div className='mb-12 text-center'>
          <CardTitle className='mb-3 text-4xl font-bold text-[#1A3973] md:text-5xl'>Services Booking</CardTitle>
          <div className='mx-auto h-1 w-60 bg-gradient-to-r from-[#1A3973] to-[#4F80E1]'></div>
        </div>
        <div className='rounded-2xl border border-gray-200 bg-white p-8 text-black shadow-xl transition-all duration-300'>
          <div className='mb-6 text-center'>
            <div className='mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#1A3973] p-3 shadow-sm'>
              <FaHeartbeat className='text-3xl text-white' />
            </div>
            <CardTitle className='mb-2 text-3xl font-bold text-[#1A3973] text-shadow-lg'>
              Book an STIS Testing Package
            </CardTitle>
          </div>
          <p className='mb-6 text-center text-sm text-gray-700'>
            Complete this form to schedule your STIS testing with us!
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-1 gap-4'>
              <FormField
                control={form.control}
                name='topic'
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select testing package' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STIS_TESTING_PACKAGES.map((pkg) => (
                          <SelectItem key={pkg.value} value={pkg.value}>
                            {pkg.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-2 gap-2'>
                <FormField
                  control={form.control}
                  name='booking_date'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              type='button'
                              variant='outline'
                              disabled={isPending}
                              className='w-full justify-start text-left font-normal'
                            >
                              <Calendar className='mr-2 h-4 w-4 text-[#1A3973]' />
                              {field.value ? format(field.value, 'dd/MM/yyyy') : 'Select date'}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                          <CalendarComponent
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < minDate || date > maxDate || date.getDay() === 0}
                            autoFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='time_slot'
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} value={field.value} disabled={!form.watch('booking_date')}>
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select time' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlotOptions.map((slot) => (
                            <SelectItem key={slot.value} value={slot.value}>
                              {slot.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='note'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note for the Specialist (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Please describe any relevant information... (8-50 words)'
                        className='h-30 resize-none'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {getSelectedPackage() && (
                <div className='mt-4 rounded-md bg-blue-50 p-4'>
                  <p className='font-medium'>
                    Testing Package: <span className='font-bold text-[#1A3973]'>{getSelectedPackage()?.label}</span>
                  </p>
                  {selectedDateValue && (
                    <p className='mt-2 font-medium'>
                      Date: <span className='font-bold text-[#1A3973]'>{format(selectedDateValue, 'dd/MM/yyyy')}</span>
                    </p>
                  )}
                  {selectedTimeSlotValue && (
                    <p className='mt-2 font-medium'>
                      Time: <span className='font-bold text-[#1A3973]'>{getSelectedTimeSlotLabel()}</span>
                    </p>
                  )}
                  <p>
                    Price:{' '}
                    <span className='font-bold text-[#1A3973]'>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        getSelectedPackage()?.price || 0
                      )}
                    </span>
                  </p>
                </div>
              )}

              <FormField
                control={form.control}
                name='agreed'
                render={({ field }) => (
                  <FormItem className='mt-4 flex flex-row items-center space-y-0 space-x-2'>
                    <FormControl>
                      <Checkbox
                        id='agreed'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <label htmlFor='agreed' className='cursor-pointer text-sm'>
                        I agree to the{' '}
                        <a
                          href='/terms-and-privacy'
                          className='text-[#1A3973] hover:underline'
                          onClick={(e) => e.stopPropagation()}
                        >
                          Terms of Use and Privacy Policy
                        </a>
                      </label>
                    </div>
                  </FormItem>
                )}
              />

              <div className='mt-6'>
                <Button
                  type='submit'
                  disabled={isPending}
                  className='group relative w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-[#1A3973] to-[#4F80E1] py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-[#15305f] hover:to-[#3a6ad0] hover:shadow-xl'
                >
                  <span className='absolute inset-0 h-full w-full -translate-x-full -skew-x-12 bg-white/10 transition-transform duration-700 group-hover:translate-x-full'></span>
                  <div className='relative flex items-center justify-center'>
                    {isPending ? (
                      <>
                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                        <span>Booking...</span>
                      </>
                    ) : (
                      <>
                        <FaHeartbeat className='mr-2' />
                        <span>Book Service</span>
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
