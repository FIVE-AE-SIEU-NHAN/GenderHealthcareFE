import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, Home, BarChart3, Flower2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CycleForm from '@/components/CycleTracking/CycleForm'
import { checkActiveCycleAPI } from '@/apis/cycleApi'

export default function CreateCyclePage() {
  const navigate = useNavigate()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['activeCycle'],
    queryFn: checkActiveCycleAPI
  })

  if (isLoading) {
    return (
      <div className='flex min-h-[calc(100vh-72px)] items-center justify-center bg-slate-50'>
        <Loader2 className='h-12 w-12 animate-spin text-slate-500' />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex min-h-[calc(100vh-72px)] items-center justify-center bg-slate-50'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-red-600'>Error</h2>
          <p className='text-slate-600'>{error.message || 'Failed to check for an active cycle.'}</p>
          <Button onClick={() => navigate(0)} className='mt-4'>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (data?.hasActiveCycle) {
    return (
      <div className='flex min-h-[calc(100vh-72px)] items-center justify-center bg-gradient-to-br from-red-50 to-orange-50'>
        <div className='mx-auto max-w-2xl rounded-2xl border border-orange-200 bg-white p-8 text-center shadow-lg'>
          <h1 className='text-3xl font-bold text-slate-800'>Active Cycle Found</h1>
          <p className='mt-4 text-lg text-slate-600'>
            You already have an active cycle being tracked. You can view your cycle calendar or return to the homepage.
          </p>
          <div className='mt-8 flex justify-center gap-4'>
            <Button asChild>
              <Link to='/user/cycle-tracking'>
                <BarChart3 className='mr-2 h-5 w-5' />
                View Cycle Calendar
              </Link>
            </Button>
            <Button asChild variant='outline'>
              <Link to='/'>
                <Home className='mr-2 h-5 w-5' />
                Go to Homepage
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-[calc(100vh-72px)] bg-gradient-to-br from-violet-50 via-pink-50 to-rose-50'>
      {/* Floating decorative elements */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='absolute top-20 left-10 h-20 w-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 opacity-10' />
        <div className='absolute top-40 right-20 h-16 w-16 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 opacity-10' />
        <div className='absolute bottom-32 left-20 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 opacity-10' />
        <div className='absolute right-10 bottom-20 h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 opacity-10' />
      </div>

      <div className='relative z-10 container mx-auto px-4 py-12'>
        <div className='mx-auto max-w-5xl space-y-12'>
          {/* Hero Section */}
          <div className='space-y-6 text-center'>
            <div className='inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm'>
              <Flower2 className='h-6 w-6 text-pink-500' />
              <span className='text-lg font-semibold text-slate-700'>Welcome to</span>
            </div>

            <h1 className='text-5xl leading-tight font-extrabold text-slate-800 md:text-7xl'>
              Cycle Tracking
              <br />
              <span className='text-4xl md:text-6xl'>System</span>
            </h1>

            <p className='mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 md:text-2xl'>
              Smart system to help you track your menstrual cycle,
              <br className='hidden md:block' />
              predict ovulation and manage reproductive health
            </p>

            <div className='flex flex-wrap justify-center gap-6 text-sm text-slate-500'>
              <div className='flex items-center gap-2'>
                <div className='h-3 w-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-500' />
                <span>Accurate predictions</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-3 w-3 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500' />
                <span>Track your status</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500' />
                <span>Absolute privacy</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <CycleForm onSuccess={() => navigate('/user/cycle-tracking')} />
        </div>
      </div>
    </div>
  )
}
