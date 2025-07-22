'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  value?: Date
  onChange: (date?: Date) => void
  placeholder?: string
  className?: string
  disabled?: (date: Date) => boolean
  isPickerDisabled?: boolean
}

export function Calendar22({
  value,
  onChange,
  placeholder = 'Select a date',
  className,
  disabled,
  isPickerDisabled = false
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (date?: Date) => {
    onChange(date)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={isPickerDisabled}>
        <Button
          variant='outline'
          disabled={isPickerDisabled}
          className={cn('w-[200px] justify-start text-left font-normal', !value && 'text-muted-foreground', className)}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {value ? format(value, 'dd/MM/yyyy') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={value}
          onSelect={handleSelect}
          captionLayout='dropdown'
          disabled={disabled}
          autoFocus={true}
        />
      </PopoverContent>
    </Popover>
  )
}
