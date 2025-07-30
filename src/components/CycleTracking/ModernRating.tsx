import React from 'react'
import { Star, Heart, Cloud, Sun } from 'lucide-react'

interface ModernRatingProps {
  value: number
  onChange: (value: number) => void
  type: 'mood' | 'libido' | 'stress' | 'energy'
  disabled?: boolean
  label: string
}

const ratingConfig = {
  mood: {
    icon: Star,
    colors: [
      'bg-blue-50 text-blue-700',
      'bg-blue-100 text-blue-800',
      'bg-blue-200 text-blue-900',
      'bg-blue-300 text-blue-900',
      'bg-blue-400 text-white'
    ],
    labels: ['Very sad', 'Sad', 'Neutral', 'Happy', 'Very happy'],
    gradient: 'from-blue-200 to-blue-400'
  },
  libido: {
    icon: Heart,
    colors: [
      'bg-rose-50 text-rose-700',
      'bg-rose-100 text-rose-800',
      'bg-rose-200 text-rose-900',
      'bg-rose-300 text-rose-900',
      'bg-rose-400 text-white'
    ],
    labels: ['Very low', 'Low', 'Normal', 'High', 'Very high'],
    gradient: 'from-rose-200 to-rose-400'
  },
  stress: {
    icon: Cloud,
    colors: [
      'bg-emerald-50 text-emerald-700',
      'bg-emerald-100 text-emerald-800',
      'bg-amber-100 text-amber-800',
      'bg-orange-200 text-orange-900',
      'bg-red-300 text-red-900'
    ],
    labels: ['Very relaxed', 'Relaxed', 'Normal', 'Stressed', 'Very stressed'],
    gradient: 'from-emerald-300 to-red-300'
  },
  energy: {
    icon: Sun,
    colors: [
      'bg-slate-100 text-slate-700',
      'bg-amber-50 text-amber-700',
      'bg-amber-100 text-amber-800',
      'bg-amber-200 text-amber-900',
      'bg-amber-300 text-amber-900'
    ],
    labels: ['Very tired', 'Tired', 'Normal', 'Energetic', 'Very energetic'],
    gradient: 'from-slate-300 to-amber-400'
  }
}

export default function ModernRating({ value, onChange, type, disabled = false, label }: ModernRatingProps) {
  const config = ratingConfig[type]
  const Icon = config.icon

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <div className='rounded-lg border border-slate-200 bg-slate-50 p-2'>
          <Icon className='h-5 w-5 text-slate-700' />
        </div>
        <div>
          <h4 className='font-semibold text-slate-800'>{label}</h4>
          <p className='text-sm text-slate-500'>{config.labels[value - 1]}</p>
        </div>
      </div>

      {/* Modern Progress Bar Style Rating */}
      <div className='space-y-3'>
        <div className='relative h-3 rounded-full bg-slate-200'>
          <div
            className={`h-full bg-gradient-to-r ${config.gradient} rounded-full transition-all duration-500 ease-out ${disabled && 'opacity-40'}`}
            style={{ width: `${(value / 5) * 100}%` }}
          />
          <div className='absolute inset-0 flex items-center justify-between px-1'>
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type='button'
                disabled={disabled}
                onClick={() => !disabled && onChange(rating)}
                className={`flex h-6 w-6 items-center justify-center rounded-full border-1 border-slate-400 shadow-md/10 transition-all duration-200 ${
                  value >= rating ? 'scale-110 bg-white' : 'bg-slate-200 hover:bg-slate-300'
                } ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:scale-110'} relative z-10`}
              >
                <div className={`h-2 w-2 rounded-full ${value >= rating ? 'bg-slate-600' : 'bg-slate-400'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Bubbles */}
        <div className='flex justify-between'>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type='button'
              disabled={disabled}
              onClick={() => !disabled && onChange(rating)}
              className={`flex min-w-[54px] flex-col items-center gap-2 rounded-xl p-3 transition-all duration-200 ${value === rating ? config.colors[rating - 1] + ' scale-105 shadow-md' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'} ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-105'} `}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 ${value === rating ? 'bg-white/30' : 'bg-slate-200'} `}
              >
                <span className='text-sm font-bold'>{rating}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Value Display */}
        <div className='text-center'>
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ${config.colors[value - 1]} ${disabled && 'opacity-70'}`}
          >
            <Icon className='h-4 w-4' />
            <span className='font-medium'>
              {value}/5 - {config.labels[value - 1]}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
