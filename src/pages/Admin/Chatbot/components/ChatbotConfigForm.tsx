import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Eye, EyeOff, Hash, Loader2, Save, Settings, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ChatbotTemperatureSlider } from './ChatbotTemperatureSlider'
import { ChatbotConfigFormValues } from '@/Application/constants/admin/admin.chatbotSchema'

interface ChatbotConfigFormProps {
  form: UseFormReturn<ChatbotConfigFormValues>
  onSubmit: (data: ChatbotConfigFormValues) => void
  isPending: boolean
}

export function ChatbotConfigForm({ form, onSubmit, isPending }: ChatbotConfigFormProps) {
  const [showApiKey, setShowApiKey] = useState(false)

  const temperatureValue = form.watch('temperature')
  const maxTokensValue = form.watch('max_output_tokens')

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
      {/* API Key Section */}
      <div className='space-y-6'>
        <div>
          <Label htmlFor='gemini_key' className='text-md flex items-center gap-2 font-extrabold'>
            <Settings className='h-5 w-5 text-blue-700' />
            <span className='bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent'>
              Gemini API Key
            </span>
          </Label>
          <div className='relative mt-2'>
            <Input
              id='gemini_key'
              type={showApiKey ? 'text' : 'password'}
              placeholder='Enter your Gemini API key'
              className='h-12 rounded-xl border-2 border-slate-200 pr-12 text-lg focus:border-blue-500 focus:ring-blue-500/20'
              {...form.register('gemini_key')}
            />
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-slate-100'
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
            </Button>
          </div>
          {form.formState.errors.gemini_key && (
            <p className='mt-1 text-sm text-red-500'>{form.formState.errors.gemini_key.message}</p>
          )}
        </div>
      </div>

      {/* Instructions & Parameters */}
      <div className='space-y-6'>
        <div>
          <Label htmlFor='system_instruction' className='text-md flex items-center gap-2 font-extrabold'>
            <Sparkles className='h-5 w-5 text-purple-700' />
            <span className='bg-gradient-to-r from-purple-900 via-purple-700 to-purple-500 bg-clip-text text-transparent'>
              System Instructions
            </span>
          </Label>
          <Textarea
            id='system_instruction'
            placeholder="Define the AI's role and behavior guidelines..."
            className='mt-2 max-h-[150px] min-h-60 resize-none rounded-xl border-2 border-slate-200 text-lg focus:border-violet-500 focus:ring-violet-500/20'
            {...form.register('system_instruction')}
          />
          {form.formState.errors.system_instruction && (
            <p className='mt-1 text-sm text-red-500'>{form.formState.errors.system_instruction.message}</p>
          )}
          <div className='mt-2 flex justify-between text-sm text-slate-500'>
            <span>{form.watch('system_instruction')?.length || 0} characters</span>
            <span>Minimum 50 characters</span>
          </div>
        </div>

        <div className='grid gap-8 md:grid-cols-2'>
          <ChatbotTemperatureSlider
            value={temperatureValue}
            onChange={(value) => form.setValue('temperature', value, { shouldValidate: true, shouldDirty: true })}
            disabled={isPending}
          />
          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <Hash className='h-5 w-5 text-slate-700' />
              <div>
                <h4 className='bg-gradient-to-r from-green-900 via-green-700 to-green-500 bg-clip-text font-extrabold text-transparent'>
                  Max Output Tokens
                </h4>
                <p className='text-sm text-slate-500'>{(maxTokensValue || 0).toLocaleString()} tokens</p>
              </div>
            </div>
            <div className='relative'>
              <Input
                type='number'
                min='100'
                max='8192'
                step='64'
                className='h-12 rounded-xl border-2 border-slate-200 pr-16 text-lg focus:border-green-500 focus:ring-green-500/20'
                {...form.register('max_output_tokens')}
                disabled={isPending}
              />
              <span className='absolute top-1/2 right-4 -translate-y-1/2 transform font-medium text-slate-500'>
                tokens
              </span>
            </div>
            {form.formState.errors.max_output_tokens && (
              <p className='mt-1 text-sm text-red-500'>{form.formState.errors.max_output_tokens.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className='flex flex-col gap-4 pt-6 sm:flex-row'>
        <Button
          type='submit'
          disabled={isPending || !form.formState.isDirty}
          className='h-12 flex-1 cursor-pointer rounded-xl bg-slate-800 text-lg font-semibold shadow-md transition-all duration-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isPending ? (
            <>
              <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Saving...
            </>
          ) : (
            <>
              <Save className='mr-2 h-5 w-5' /> Save Configuration
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
