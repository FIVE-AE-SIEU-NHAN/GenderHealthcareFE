import React from 'react'
import { BedDouble, Clock, Moon } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SleepHoursInputProps {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
  label: string
  error?: string
}

const getSleepQuality = (hours: number) => {
  if (hours < 4) return { text: 'Too little', color: 'text-red-700', bgColor: 'bg-red-50', icon: '😴' }
  if (hours < 6) return { text: 'Low', color: 'text-orange-700', bgColor: 'bg-orange-50', icon: '😪' }
  if (hours < 8) return { text: 'Good', color: 'text-blue-800', bgColor: 'bg-blue-50', icon: '😌' }
  if (hours <= 9) return { text: 'Very good', color: 'text-green-800', bgColor: 'bg-green-50', icon: '😊' }
  return { text: 'Too much', color: 'text-orange-700', bgColor: 'bg-orange-50', icon: '😴' }
}

export default function SleepHoursInput({ value, onChange, disabled = false, label, error }: SleepHoursInputProps) {
  const sleepQuality = getSleepQuality(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 1
    if (newValue >= 1 && newValue <= 18) {
      onChange(newValue)
    }
  }

  const presetHours = [6, 7, 8, 9]

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <div className='rounded-lg border border-indigo-200 bg-indigo-50 p-2'>
          <BedDouble className='h-5 w-5 text-indigo-700' />
        </div>
        <div>
          <h4 className='font-semibold text-slate-800'>{label}</h4>
          <p className='text-sm text-slate-500'>Enter hours of sleep (1-18 hours)</p>
        </div>
      </div>

      {/* Visual Sleep Indicator */}
      <div className={`rounded-xl border p-4 transition-all duration-300 ${sleepQuality.bgColor} border-current/20`}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='text-2xl'>{sleepQuality.icon}</div>
            <div>
              <div className={`font-semibold ${sleepQuality.color}`}>
                {value} hours - {sleepQuality.text}
              </div>
              <div className='text-sm text-slate-600'>
                {value < 6 && 'Need more sleep for good health'}
                {value >= 6 && value <= 9 && 'Ideal sleep duration'}
                {value > 9 && 'You might be sleeping too much'}
              </div>
            </div>
          </div>
          <Clock className={`h-6 w-6 ${sleepQuality.color}`} />
        </div>
      </div>

      {/* Input Section */}
      <div className='space-y-3'>
        <div className='flex items-center gap-3'>
          <div className='flex-1'>
            <Input
              type='number'
              value={value}
              onChange={handleChange}
              min={1}
              max={18}
              disabled={disabled}
              className={`h-12 text-center text-lg ${error ? 'border-red-500' : ''}`}
              placeholder='8'
            />
          </div>
          <span className='text-sm font-medium text-slate-500'>hours</span>
        </div>

        {error && (
          <div className='flex items-center gap-1 text-sm text-red-600'>
            <div className='h-1 w-1 rounded-full bg-red-600' />
            {error}
          </div>
        )}

        {/* Quick Preset Buttons */}
        <div className='flex gap-2'>
          <span className='py-2 text-sm text-slate-500'>Common:</span>
          {presetHours.map((hours) => (
            <button
              key={hours}
              type='button'
              disabled={disabled}
              onClick={() => onChange(hours)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                value === hours
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} `}
            >
              {hours}h
            </button>
          ))}
        </div>
      </div>

      {/* Sleep Visualization */}
      <div className='rounded-xl bg-slate-50 p-4'>
        <div className='mb-3 flex items-center gap-2'>
          <Moon className='h-4 w-4 text-slate-600' />
          <span className='text-sm font-medium text-slate-700'>Sleep quality</span>
        </div>
        <div className='flex gap-1'>
          {Array.from({ length: 18 }, (_, i) => {
            const hour = i + 1
            const isActive = hour <= value
            const isOptimal = hour >= 7 && hour <= 9
            return (
              <div
                key={hour}
                className={`h-2 flex-1 rounded-sm transition-all duration-300 ${
                  isActive
                    ? isOptimal
                      ? 'bg-green-400'
                      : hour < 6 || hour > 10
                        ? 'bg-orange-300'
                        : 'bg-blue-300'
                    : 'bg-slate-200'
                } `}
              />
            )
          })}
        </div>
        <div className='mt-1 flex justify-between text-xs text-slate-500'>
          <span>1h</span>
          <span>9h (optimal)</span>
          <span>18h</span>
        </div>
      </div>
    </div>
  )
}
