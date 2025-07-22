import React from 'react'
import { Button } from '@/components/ui/button'
import { Lock, UserPlus, LogIn } from 'lucide-react'
import unAuth from '@/assets/images/unauth.png'

const Unauthorized = () => {
  return (
    <div className='text-dark-blue relative flex min-h-[calc(100vh-72px)] w-full flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100'>
      <div className='pointer-events-none absolute inset-0 z-0'>
        <Lock className='absolute top-12 left-8 h-24 w-24 rotate-6 text-blue-200 opacity-40' />
        <UserPlus className='absolute top-36 right-14 h-32 w-32 -rotate-12 text-pink-300 opacity-20' />
        <LogIn className='absolute bottom-20 left-10 h-20 w-20 rotate-3 text-blue-300 opacity-30' />
      </div>
      <section className='z-10 grid flex-grow place-items-center px-6'>
        <div className='container grid gap-12 lg:max-w-4xl lg:grid-cols-2 lg:items-center'>
          <div className='mx-auto max-w-lg space-y-6 text-center text-shadow-md/10'>
            <p className='text-light-blue text-2xl font-bold tracking-wide uppercase sm:text-3xl'>Unauthorized</p>
            <h1 className='text-4xl leading-tight font-extrabold sm:text-6xl'>Access Denied</h1>
            <p className='text-semi-dark-blue w-116 text-xl leading-relaxed font-semibold sm:text-2xl'>
              You need to be logged in to access this page. Please log in or sign up to continue.
            </p>

            <div className='mt-6 flex justify-center gap-6'>
              <Button
                onClick={() => (window.location.href = '/login')}
                className='bg-light-blue hover:bg-semi-dark-blue min-w-[126px] rounded-full px-6 py-6 text-xl font-bold text-white shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0.5 active:scale-95'
              >
                <LogIn className='mr-1 inline h-6 w-6' /> Login
              </Button>
              <Button
                onClick={() => (window.location.href = '/signup')}
                variant='outline'
                className='text-light-blue border-light-blue hover:text-light-blue rounded-full px-6 py-6 text-xl font-bold shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl active:translate-y-0.5 active:scale-95'
              >
                <UserPlus className='mr-1 inline h-6 w-6' /> Sign Up
              </Button>
            </div>
          </div>

          {/* Illustration Block */}
          <div className='flex flex-col items-center justify-center'>
            <img
              src={unAuth}
              alt='Unauthorized access illustration'
              className='animate-floating ml-7 w-64 lg:w-[360px]'
            />
            <div className='animate-shadow mt-6 h-8 w-36 rounded-full bg-blue-900/20 blur-md'></div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Unauthorized
