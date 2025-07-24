import { Thermometer } from 'lucide-react'

interface ChatbotTemperatureSliderProps {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export function ChatbotTemperatureSlider({ value, onChange, disabled = false }: ChatbotTemperatureSliderProps) {
  const temperatureLabels = ['Conservative', 'Balanced', 'Moderate', 'Creative', 'Very Creative']
  const currentIndex = Math.min(Math.floor(value * 5), 4)

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <Thermometer className='h-5 w-5 text-slate-700' />
        <div>
          <h4 className='bg-gradient-to-r from-orange-900 via-orange-700 to-orange-500 bg-clip-text font-extrabold text-transparent'>
            Temperature
          </h4>
          <p className='text-sm text-slate-500'>
            {temperatureLabels[currentIndex]} ({value.toFixed(1)})
          </p>
        </div>
      </div>
      <div className='space-y-3'>
        <div className='relative h-3 rounded-full bg-slate-200'>
          <div
            className='h-full rounded-full bg-gradient-to-r from-red-300 to-green-400/80 transition-all duration-500 ease-out'
            style={{ width: `${value * 100}%` }}
          />
          <div className='absolute inset-0 flex items-center justify-between px-1'>
            {[0, 0.25, 0.5, 0.75, 1].map((temp, idx) => (
              <button
                key={idx}
                type='button'
                disabled={disabled}
                onClick={() => !disabled && onChange(temp)}
                className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-1 border-slate-400 shadow-md/10 transition-all duration-200 ${
                  value >= temp ? 'scale-110 bg-white' : 'bg-slate-200 hover:bg-slate-300'
                } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-110'}`}
              >
                <div className={`h-2 w-2 rounded-full ${value >= temp ? 'bg-slate-600' : 'bg-slate-400'}`} />
              </button>
            ))}
          </div>
        </div>
        <div className='flex justify-between'>
          {temperatureLabels.map((label, idx) => {
            const colorClasses = [
              'bg-red-100 text-red-800',
              'bg-orange-100 text-orange-800',
              'bg-yellow-100 text-yellow-800',
              'bg-lime-100 text-lime-800',
              'bg-green-100 text-green-800'
            ]
            return (
              <button
                key={idx}
                type='button'
                disabled={disabled}
                onClick={() => !disabled && onChange(idx * 0.25)}
                className={`flex min-w-[60px] flex-col items-center gap-2 rounded-xl p-2 text-xs transition-all duration-200 ${
                  currentIndex === idx
                    ? `scale-105 ${colorClasses[idx]} shadow-md`
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-105'}`}
              >
                <span className='font-medium'>{label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
