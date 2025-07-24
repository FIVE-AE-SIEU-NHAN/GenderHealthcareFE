import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { Save, Eye, EyeOff, Thermometer, Hash, Loader2, AlertCircle, Settings, Sparkles } from 'lucide-react'

import { DashboardLayoutContext } from '@/components/layouts/Dashboard/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// Corrected hooks import
import { formatDate } from '@/utils/formatDate'
import { BsRobot } from 'react-icons/bs'
import { useUpdateChatbotConfig } from '@/hooks/admin/useChatbotMutations'
import { useChatbotConfig } from '@/hooks/admin/useChatbot'

// FIXED: Use z.coerce to ensure proper type handling for numbers from form inputs
const chatbotConfigSchema = z.object({
  gemini_key: z.string().min(10, 'API key must be at least 10 characters'),
  system_instruction: z.string().min(50, 'System instruction must be at least 50 characters'),
  temperature: z.coerce.number().min(0).max(1),
  max_output_tokens: z.coerce.number().min(100).max(8192) // Increased max based on common models
})

type ChatbotConfigForm = z.infer<typeof chatbotConfigSchema>

// This component is assumed to be in the same file or imported correctly.
// No changes were made here.
function TemperatureSlider({
  value,
  onChange,
  disabled = false
}: {
  value: number
  onChange: (v: number) => void
  disabled?: boolean
}) {
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
                className={`flex h-6 w-6 items-center justify-center rounded-full border-1 border-slate-400 shadow-md/10 transition-all duration-200 ${
                  value >= temp ? 'scale-110 bg-white' : 'bg-slate-200 hover:bg-slate-300'
                } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-110'} relative z-10`}
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

export default function ChatbotManagement() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()
  const [showApiKey, setShowApiKey] = useState(false)

  // BUG FIX: Call the hook with the specific chatbot type to ensure the payload is sent.
  const { data: configData, isLoading, isError } = useChatbotConfig('AI_ASSISTANT')
  const updateMutation = useUpdateChatbotConfig()

  const form = useForm<ChatbotConfigForm>({
    resolver: zodResolver(chatbotConfigSchema),
    defaultValues: {
      gemini_key: '',
      system_instruction: '',
      temperature: 0.3,
      max_output_tokens: 2048
    }
  })

  useEffect(() => {
    setBreadcrumb({
      title: 'AI Chatbot Management'
    })
  }, [setBreadcrumb])

  // Effect to populate the form once data is fetched
  useEffect(() => {
    // Check for the nested 'result' object from the API response
    if (configData?.result) {
      const config = configData.result
      form.reset({
        gemini_key: config.gemini_key,
        system_instruction: config.system_instruction,
        temperature: config.temperature,
        max_output_tokens: config.max_output_tokens
      })
    }
  }, [configData, form])

  const handleSave = async (data: ChatbotConfigForm) => {
    // Add the required 'chatbot_type' to the payload for the update API
    const payload = {
      ...data,
      chatbot_type: 'AI_ASSISTANT' as const // Ensure type is correctly set
    }

    toast.promise(updateMutation.mutateAsync(payload), {
      loading: 'Saving configuration...',
      success: 'Configuration saved successfully!',
      error: (err: any) => err.message || 'Failed to save configuration.'
    })
  }

  // Watch form values for interactive UI
  const temperatureValue = form.watch('temperature')
  const maxTokensValue = form.watch('max_output_tokens')

  // Cleaner access to the nested config object
  const config = configData?.result

  if (isLoading) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <div className='flex items-center space-x-3'>
          <Loader2 className='h-6 w-6 animate-spin text-slate-600' />
          <span className='text-lg text-slate-600'>Loading configuration...</span>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='mx-auto mt-8 max-w-2xl'>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load chatbot configuration. Please try again later.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    // Design is reverted to your original structure
    <div className='mx-auto max-w-4xl shadow-xl/15 md:max-w-2xl lg:max-w-4xl xl:min-w-6xl xl:-translate-x-10'>
      <div className='overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-200/50'>
        <div className='bg-slate-800 p-4 text-white'>
          <div className='flex items-center gap-4'>
            <div className='rounded-xl bg-white/10 p-4'>
              <BsRobot className='h-8 w-8' />
            </div>
            <div>
              <h1 className='mb-2 text-3xl font-bold'>AI Chatbot Configuration</h1>
            </div>
          </div>
          {config && (
            <div className='mt-4'>
              <Badge variant='outline' className='border-green-400/50 bg-green-500/50 text-white'>
                Last updated: {formatDate(config.updated_at)}
              </Badge>
            </div>
          )}
        </div>

        <div className='p-8'>
          <form onSubmit={form.handleSubmit(handleSave)} className='space-y-8'>
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
                <TemperatureSlider
                  value={temperatureValue}
                  onChange={(value) => form.setValue('temperature', value, { shouldValidate: true })}
                  disabled={updateMutation.isPending}
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
                      disabled={updateMutation.isPending}
                    />
                    <span className='absolute top-1/2 right-4 -translate-y-1/2 transform font-medium text-slate-500'>
                      tokens
                    </span>
                  </div>
                  {form.formState.errors.max_output_tokens && (
                    <p className='text-sm text-red-500'>{form.formState.errors.max_output_tokens.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-4 pt-6 sm:flex-row'>
              <Button
                type='submit'
                disabled={updateMutation.isPending || !form.formState.isDirty}
                className='h-12 flex-1 cursor-pointer rounded-xl bg-slate-800 text-lg font-semibold shadow-md transition-all duration-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50'
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className='mr-2 h-5 w-5' />
                    Save Configuration
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
