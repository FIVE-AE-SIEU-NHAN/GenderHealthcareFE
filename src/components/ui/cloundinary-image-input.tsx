import React from 'react'
import { Upload, AlertTriangle, File as FileIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Label } from './label'
import { Input } from './input'

interface CloudinaryImageInputProps {
  id: string
  label: string
  // The value can be a string (filename or existing URL)
  value?: string | File
  errorMessage?: string
  isFormDisabled: boolean
  // This now just passes the selected File object up
  onFileSelect: (file: File) => void
}

export const CloudinaryImageInput: React.FC<CloudinaryImageInputProps> = ({
  id,
  label,
  value,
  errorMessage,
  isFormDisabled,
  onFileSelect
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
    // Clear value to allow re-selecting the same file
    event.target.value = ''
  }

  const hasFile = !!value
  const hasError = !!errorMessage
  const displayValue = value instanceof File ? value.name : value

  return (
    <div className='space-y-2'>
      <Label htmlFor={id} className='text-base'>
        {label}
      </Label>
      <div className='flex items-center gap-4'>
        <Input
          id={id}
          type='file'
          accept='image/*'
          className='sr-only'
          disabled={isFormDisabled}
          onChange={handleFileChange}
        />
        <Label
          htmlFor={id}
          className={cn(
            'flex-1 cursor-pointer rounded-md border-2 border-dashed bg-slate-50 p-4 text-center text-sm font-medium text-slate-500 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:hover:border-blue-400 dark:hover:bg-slate-700',
            isFormDisabled && 'cursor-not-allowed bg-slate-100 dark:bg-slate-800',
            hasFile &&
              !hasError &&
              'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            hasError && 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          )}
        >
          <div className='flex items-center justify-center gap-2 truncate'>
            {hasError ? (
              <>
                <AlertTriangle className='h-4 w-4 flex-shrink-0' />
                <span className='truncate'>{errorMessage}</span>
              </>
            ) : hasFile ? (
              <>
                <FileIcon className='h-4 w-4 flex-shrink-0' />
                <span className='truncate'>{displayValue}</span>
              </>
            ) : (
              <>
                <Upload className='h-4 w-4 flex-shrink-0' />
                <span>Choose Image</span>
              </>
            )}
          </div>
        </Label>
      </div>
    </div>
  )
}
