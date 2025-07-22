import React from 'react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { FaHeartbeat } from 'react-icons/fa'

const ServiceDetail = () => {
  return (
    <div>
      {/* Banner */}
      <div className='mb-15'>
        <section className='bg-[#1A3973] py-0 text-center'>
          <div className='relative w-full'>
            <img src='/images/banner_blog.png' alt='' className='w-full rounded' />
            <div className='absolute inset-0 flex w-full flex-col items-center justify-center bg-[#1A3973]/70'>
              <h2 className='text-6xl font-bold text-white'>Service</h2>
              <p className='mt-3 text-sm'>
                <span className='text-white'>Home</span>
                <span className='text-[#55AEFF]'>
                  {' '}
                  &gt; Service &gt; Hormone therapy service for transgender people
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className='mx-auto max-w-4xl px-4 py-8'>
        {/* Title */}
        <h1 className='mb-4 text-center text-3xl font-bold text-[#1A3973]'>
          Hormone Therapy Service for Transgender People
        </h1>

        {/* Short description */}
        <p className='mb-6 text-center text-gray-600'>
          We accompany you on your journey to express your gender identity safely and scientifically.
        </p>

        {/* Illustration */}
        <img
          src='/images/bs2.webp'
          alt='Hormone therapy illustration'
          className='mb-4 h-64 w-full rounded-2xl object-cover shadow-lg'
        />

        {/* Pricing & Book Button as Card */}
        <Card className='mb-8 rounded-2xl border border-[#1A3973]/30 shadow'>
          <CardContent className='flex flex-col items-center justify-between gap-4 p-6 sm:flex-row'>
            <div>
              <p className='text-xl font-semibold text-[#1A3973]'>Service Price</p>
              <p className='mt-1 text-2xl font-bold text-gray-800'>$49.99</p>
            </div>
            <Link to='/book-service'>
              <Button className='group relative min-w-[220px] overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A3973] to-[#4F80E1] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-[#15305f] hover:to-[#3a6ad0] hover:shadow-xl sm:px-10 sm:py-5 sm:text-xl'>
                <span className='absolute inset-0 h-full w-full -translate-x-full -skew-x-12 bg-white/10 transition-transform duration-700 group-hover:translate-x-full'></span>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <FaHeartbeat className='mr-2' />
                  <span>Book This Service</span>
                </div>
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Service details */}
        <div className='space-y-6'>
          <Card className='border border-[#1A3973]/30 shadow'>
            <CardContent className='p-6'>
              <h2 className='mb-2 text-xl font-semibold text-[#1A3973]'>Who is this for?</h2>
              <p>For transgender people (MTF or FTM) who are considering or starting hormone therapy.</p>
            </CardContent>
          </Card>

          <Card className='border border-[#1A3973]/30 shadow'>
            <CardContent className='p-6'>
              <h2 className='mb-2 text-xl font-semibold text-[#1A3973]'>Service Workflow</h2>
              <ol className='list-inside list-decimal space-y-1'>
                <li>Register for the service and provide your personal information.</li>
                <li>Receive guidance for hormone-related evaluations.</li>
                <li>Submit necessary health records or hormone test results.</li>
                <li>Receive a personalized hormone therapy plan.</li>
              </ol>
            </CardContent>
          </Card>

          <Card className='border border-[#1A3973]/30 shadow'>
            <CardContent className='p-6'>
              <h2 className='mb-2 text-xl font-semibold text-[#1A3973]'>Privacy & Support</h2>
              <p>
                All information is strictly confidential. Our team includes professionals with LGBTQ+ healthcare
                experience to ensure respectful and informed service.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className='mt-10'>
          <h2 className='mb-4 text-2xl font-bold text-[#1A3973]'>Frequently Asked Questions</h2>
          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='q1' title='Do I need to take tests beforehand?'>
              Blood tests may be necessary to determine your current hormone levels before starting.
            </AccordionItem>
            <AccordionItem value='q2' title='Is this service inclusive for transgender people?'>
              Yes, it is specifically designed to support transgender individuals with sensitivity and care.
            </AccordionItem>
          </Accordion>
        </div>

        {/* Related services */}
        <div className='mt-10'>
          <h2 className='mb-4 text-xl font-semibold text-[#1A3973]'>You may be interested in</h2>
          <ul className='list-inside list-disc text-gray-700'>
            <li>Regular gynecological exams for transgender women</li>
            <li>Gender identity psychological support</li>
            <li>Legal counseling for gender change</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail
