import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, Calendar, User, Loader2 } from 'lucide-react'
import { FaHeartbeat } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useQuestionMutations } from '@/hooks/customer/useQuestionMutations'
import { TOPIC_OPTIONS } from '@/Application/constants/appointment'
import { cn } from '@/lib/utils'

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is Gender Healthcare?',
    answer:
      'Gender healthcare is an approach that recognizes and addresses the specific health needs and challenges faced by individuals based on their gender identity and biological sex.'
  },
  {
    question: 'Why is gender-specific healthcare important?',
    answer:
      'Because males and females often have different symptoms, risk factors, and treatment responses for the same conditions. Gender-specific care ensures more accurate diagnoses and effective treatments.'
  },
  {
    question: 'What services are offered in gender-focused healthcare?',
    answer:
      'Services can include hormone therapy, reproductive health support, gender-affirming counseling, and screenings tailored to biological sex or gender identity.'
  },
  {
    question: 'Is gender healthcare only for transgender individuals?',
    answer:
      'No. Gender healthcare applies to everyone, including cisgender individuals, by acknowledging how gender impacts health risks, access to care, and wellness strategies.'
  },
  {
    question: 'How can I access gender-sensitive care?',
    answer:
      'Start by finding clinics or professionals that advertise inclusive services, use gender-neutral language, and demonstrate understanding of gender-diverse needs.'
  },
  {
    question: 'Are consultations confidential?',
    answer:
      'Yes. All consultations are private and confidential, ensuring safe and respectful communication about sensitive gender-related health topics.'
  }
]

const formSchema = z.object({
  topic: z.string({ required_error: 'Please select a topic.' }).min(1, { message: 'Please select a topic.' }),
  question: z.string().min(20, { message: 'Your question must be at least 20 characters long.' })
})

export default function AskQuestion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [faqContainerStyle, setFaqContainerStyle] = useState<React.CSSProperties>({})
  const formRef = useRef<HTMLDivElement>(null)

  const { askQuestion } = useQuestionMutations()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      question: ''
    },
    mode: 'onChange'
  })

  const questionValue = form.watch('question') || ''

  useEffect(() => {
    const updateHeight = () => {
      if (formRef.current) {
        const formHeight = formRef.current.clientHeight
        setFaqContainerStyle({
          minHeight: `${formHeight}px`,
          height: 'auto',
          alignSelf: 'flex-start'
        })
      }
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [formSubmitted])

  function onSubmit(values: z.infer<typeof formSchema>) {
    askQuestion.mutate(values, {
      onSuccess: () => {
        setFormSubmitted(true)
        setTimeout(() => {
          form.reset()
          setFormSubmitted(false)
        }, 5000)
      }
    })
  }

  return (
    <div className="relative bg-[url('https://benhviengreen.com/wp-content/uploads/2016/05/doctor-health-wellness-1200x480.jpg')] bg-cover bg-center bg-no-repeat p-6 bg-blend-overlay max-[1125px]:min-h-[90vh] min-[1125px]:min-h-[94vh] md:p-10 lg:p-16">
      <div className='absolute inset-0 z-0 bg-white/40 backdrop-blur-sm'></div>
      <div className='relative'>
        <div className='mb-12 text-center'>
          <h1 className='mb-3 text-4xl font-bold text-[#1A3973] md:text-5xl'>Frequently Asked Questions</h1>
          <div className='mx-auto h-1 w-60 bg-gradient-to-r from-[#1A3973] to-[#4F80E1]'></div>
        </div>

        <div className='mx-auto grid max-w-7xl items-start gap-10 md:grid-cols-2'>
          {/* FAQs */}
          <div
            className='rounded-2xl border border-[#1A3973] bg-[#1A3973] p-8 text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_0_30px_-15px_rgba(26,57,115,0.2)] transition-all duration-300 hover:shadow-[0_25px_65px_-15px_rgba(0,0,0,0.2),0_0_40px_-15px_rgba(26,57,115,0.3)] md:p-10'
            style={faqContainerStyle}
          >
            <div className='mb-8 flex flex-col items-center'>
              <div className='mb-4 rounded-full bg-white/20 p-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]'>
                <Calendar className='h-8 w-8 text-3xl' />
              </div>
              <h2 className='mb-2 text-center text-3xl font-bold'>Common Questions</h2>
              <div className='mx-auto h-1 w-16 bg-white'></div>
            </div>
            <div className='space-y-3'>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className='overflow-hidden rounded-xl border-b border-white/20 shadow-md transition-all duration-300 hover:shadow-lg'
                >
                  <button
                    className={`flex w-full items-center justify-between px-5 py-4 text-left font-medium ${openIndex === index ? 'bg-white/15' : 'bg-white/5'} rounded-t-xl transition duration-300 hover:bg-white/10`}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    aria-expanded={openIndex === index}
                  >
                    <span className='text-lg'>{faq.question}</span>
                    <div className='rounded-full bg-white/20 p-1.5 shadow-inner'>
                      {openIndex === index ? (
                        <ChevronUp className='h-4 w-4 text-white' />
                      ) : (
                        <ChevronDown className='h-4 w-4 text-white' />
                      )}
                    </div>
                  </button>
                  {openIndex === index && (
                    <div className='rounded-b-xl border-t border-white/10 bg-white/5 px-5 py-4 text-sm text-white/90'>
                      {faq.answer || 'Content coming soon...'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            ref={formRef}
            className='rounded-2xl border border-white bg-white p-8 text-black shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_0_30px_-15px_rgba(26,57,115,0.2)] transition-all duration-300 hover:shadow-[0_25px_65px_-15px_rgba(0,0,0,0.2),0_0_40px_-15px_rgba(26,57,115,0.3)] md:p-10'
          >
            <div className='relative mb-5'>
              <div className='mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#1A3973] p-3 shadow-sm'>
                <User className='text-3xl text-white' />
              </div>
              <h2 className='mb-4 text-center text-3xl font-bold text-[#1A3973]'>How can I help you?</h2>
              <p className='mt-2 mb-4 text-center text-sm text-gray-600'>
                Please take a few moments to let me know about yourself and your health goals before we start working
                together
              </p>
              <div className='mx-auto h-1 w-20 bg-[#1A3973]'></div>
            </div>

            {formSubmitted ? (
              <div className='animate-fade-in rounded-xl border border-green-200 bg-green-50 p-6 text-center'>
                <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
                  <svg
                    className='h-8 w-8 text-green-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
                  </svg>
                </div>
                <h3 className='mb-2 text-xl font-bold text-green-700'>Message Sent Successfully!</h3>
                <p className='text-green-600'>
                  Thank you for submitting your question. A consultant will get back to you shortly.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form className='mt-8 space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name='topic'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='mb-1 block text-sm font-medium text-gray-700'>
                          Topic of Interest
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className='w-full rounded-lg'>
                              <SelectValue placeholder='Select a topic' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TOPIC_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='question'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='mb-1 block text-sm font-medium text-gray-700'>Your Question</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Please describe your health goals or questions in detail...'
                            rows={4}
                            className='min-h-[120px] w-full resize-none rounded-lg border-gray-300'
                            maxLength={1000}
                            {...field}
                          />
                        </FormControl>
                        <div className='mt-2 flex h-5 items-start justify-between'>
                          <div className='flex-grow'>
                            <FormMessage />
                            {!form.formState.errors.question && questionValue.length === 1000 && (
                              <p className='text-sm text-blue-600'>You have reached the character limit.</p>
                            )}
                          </div>
                          <p
                            className={cn(
                              'ml-auto flex-shrink-0 text-sm',
                              (questionValue?.length || 0) >= 1000 ? 'font-bold text-red-500' : 'text-gray-500'
                            )}
                          >
                            {`${questionValue?.length || 0} / 1000`}
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type='submit'
                    disabled={askQuestion.isPending}
                    className='flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#1A3973] to-[#4F80E1] py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-[#15305f] hover:to-[#3a6ad0] hover:shadow-xl'
                  >
                    {askQuestion.isPending ? (
                      <>
                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <>
                        <FaHeartbeat className='mr-2' />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
