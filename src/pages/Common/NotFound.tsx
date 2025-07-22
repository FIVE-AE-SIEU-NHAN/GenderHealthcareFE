import React from 'react'
import { Button } from '@/components/ui/button' // shadcn button
import MedicalIllustration from '@/assets/images/notfound1.png'
import { Stethoscope, HeartPulse, Hospital, Syringe } from 'lucide-react'

const NotFound = () => {
  return (
    <div className='text-dark-blue relative flex min-h-[calc(100vh-72px)] w-full flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100'>
      <div className='pointer-events-none absolute inset-0 z-0'>
        <Stethoscope className='absolute top-10 left-10 h-24 w-24 rotate-12 text-blue-200 opacity-50' />
        <HeartPulse className='absolute top-40 right-12 h-32 w-32 -rotate-12 text-pink-300 opacity-20' />
        <Hospital className='absolute bottom-20 left-8 h-20 w-20 rotate-6 text-blue-300 opacity-25' />
        <Syringe className='absolute right-10 bottom-10 h-16 w-16 rotate-45 text-blue-200 opacity-50' />
      </div>
      <section className='z-10 grid flex-grow place-items-center px-6'>
        <div className='container grid gap-12 lg:max-w-5xl lg:grid-cols-2 lg:items-center'>
          <div className='mx-auto max-w-lg space-y-6 text-center'>
            <p className='text-light-blue text-2xl font-bold tracking-wide uppercase sm:text-3xl'>Error 404</p>
            <h1 className='text-4xl leading-tight font-extrabold whitespace-nowrap md:-ml-10 md:text-6xl lg:ml-0 lg:text-5xl xl:-ml-10 xl:text-6xl'>
              Oops! Page Not Found
            </h1>
            <p className='text-semi-dark-blue w-86 text-xl leading-relaxed font-semibold sm:w-full sm:text-2xl md:text-3xl'>
              Sorry, we can’t find the page you’re looking for. It might have been moved or doesn’t exist anymore.
            </p>

            <Button
              onClick={() => (window.location.href = '/')}
              className='bg-light-blue hover:bg-semi-dark-blue rounded-full px-4 py-7 text-2xl font-bold text-white shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0.5 active:scale-95'
            >
              Go Back Home
            </Button>
          </div>

          {/* Image block */}
          <div className='flex flex-col items-center justify-center'>
            <img
              src={MedicalIllustration}
              alt='Medical staff illustration'
              className='animate-floating w-64 lg:w-[360px]'
            />
            <div className='animate-shadow mt-6 h-8 w-36 rounded-full bg-blue-900/20 blur-md'></div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NotFound
