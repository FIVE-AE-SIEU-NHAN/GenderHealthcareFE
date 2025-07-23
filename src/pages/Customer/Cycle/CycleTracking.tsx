import React, { useState } from 'react'
import { format } from 'date-fns'
import { RotateCcw, Heart, Flower2 } from 'lucide-react'
import { CycleData, DailyRating, CycleFormData } from '@/types/cycle'
import CycleForm from '@/components/CycleTracking/CycleForm'
import CycleCalendar from '@/components/CycleTracking/CycleCalendar'
import CycleSummary from '@/components/CycleTracking/CycleSummary'
import { Button } from '@/components/ui/button'

export default function CycleTrackingPage() {
  const [cycleData, setCycleData] = useState<CycleData | null>(null)
  const [ratings, setRatings] = useState<Map<string, DailyRating>>(new Map())

  const handleFormSubmit = (formData: CycleFormData) => {
    const newCycleData: CycleData = {
      firstPeriodDate: new Date(formData.firstPeriodDate),
      cycleLength: formData.cycleLength,
      periodDuration: formData.periodDuration,
      initialRating: {
        mood: formData.mood,
        libido: formData.libido,
        stress: formData.stress,
        sleep: formData.sleep,
        energy: formData.energy
      }
    }

    setCycleData(newCycleData)

    // Set initial rating for the first period date
    const firstDateKey = format(newCycleData.firstPeriodDate, 'yyyy-MM-dd')
    setRatings(new Map([[firstDateKey, newCycleData.initialRating]]))
  }

  const handleUpdateRating = (dateKey: string, rating: DailyRating) => {
    setRatings((prev) => new Map(prev.set(dateKey, rating)))
  }

  const handleReset = () => {
    setCycleData(null)
    setRatings(new Map())
  }

  if (!cycleData) {
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
            <CycleForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-[calc(100vh-72px)] bg-slate-100'>
      <div className='relative z-10 container mx-auto px-4 py-8'>
        <div className='space-y-8'>
          {/* Stunning Header */}
          <div className='space-y-6 text-center'>
            <div className='inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm'>
              <Heart className='h-5 w-5 animate-pulse text-pink-500' />
              <span className='text-sm font-medium text-slate-600'>Your reproductive health</span>
            </div>

            <h1 className='text-4xl font-extrabold text-slate-800 md:text-5xl'>Your Cycle Calendar</h1>

            <div className='flex justify-center'>
              <Button
                onClick={handleReset}
                variant='outline'
                className='group rounded-full border-white/20 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm hover:bg-white/90'
              >
                <RotateCcw className='mr-2 h-4 w-4 transition-transform duration-500 group-hover:rotate-180' />
                Reset cycle setup
              </Button>
            </div>
          </div>

          {/* Cycle Summary */}
          <CycleSummary cycleData={cycleData} />

          {/* Calendar */}
          <CycleCalendar cycleData={cycleData} ratings={ratings} onUpdateRating={handleUpdateRating} />
        </div>
      </div>
    </div>
  )
}
