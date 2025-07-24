import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2, AlertCircle } from 'lucide-react'

import { DashboardLayoutContext } from '@/components/layouts/Dashboard/DashboardLayout'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { formatDate } from '@/utils/formatDate'
import { useChatbotConfig } from '@/hooks/admin/useChatbot'
import { useUpdateChatbotConfig } from '@/hooks/admin/useChatbotMutations'
import { ChatbotConfigFormValues, chatbotConfigSchema } from '@/Application/constants/admin/admin.chatbotSchema'
import { ChatbotConfigForm } from './components/ChatbotConfigForm'
import { RiRobot3Line } from 'react-icons/ri'

export default function MenstrualPredictorConfigPage() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  const { data: configData, isLoading, isError } = useChatbotConfig('MENSTRUAL_PREDICTOR')
  const updateMutation = useUpdateChatbotConfig()

  const form = useForm<ChatbotConfigFormValues>({
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
      title: 'Menstrual Predictor AI',
      parent: 'Admin',
      parentHref: '/admin/dashboard'
    })
  }, [setBreadcrumb])

  useEffect(() => {
    if (configData?.result) {
      const config = configData.result
      form.reset(
        {
          gemini_key: config.gemini_key,
          system_instruction: config.system_instruction,
          temperature: config.temperature,
          max_output_tokens: config.max_output_tokens
        },
        { keepDirty: false }
      )
    }
  }, [configData, form])

  const handleSave = (data: ChatbotConfigFormValues) => {
    const payload = {
      ...data,
      chatbot_type: 'MENSTRUAL_PREDICTOR' as const
    }

    toast.promise(updateMutation.mutateAsync(payload), {
      loading: 'Saving configuration...',
      success: 'Configuration saved successfully!',
      error: (err) => err.message || 'Failed to save configuration.'
    })
  }

  if (isLoading) {
    return (
      <div className='flex h-[400px] items-center justify-center'>
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
    <div className='h-[calc(85dvh)] overflow-auto'>
      <div className='mx-auto max-w-4xl rounded-3xl shadow-lg/15 md:max-w-2xl lg:max-w-4xl xl:min-w-6xl'>
        <div className='overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-200/50'>
          {/* Header */}
          <div className='relative bg-slate-800 p-4 text-white'>
            {configData?.result && (
              <div className='absolute top-4 right-4'>
                <Badge variant='outline' className='border-green-400/50 bg-green-500/50 text-white'>
                  Last updated: {formatDate(configData.result.updated_at)}
                </Badge>
              </div>
            )}
            <div className='flex items-center gap-4'>
              <div className='rounded-xl bg-white/10 p-4'>
                <RiRobot3Line className='h-8 w-8' />
              </div>
              <div>
                <h1 className='text-3xl font-bold'>Menstrual Predictor Configuration</h1>
              </div>
            </div>
          </div>

          <div className='p-8'>
            <ChatbotConfigForm form={form} onSubmit={handleSave} isPending={updateMutation.isPending} />
          </div>
        </div>
      </div>
    </div>
  )
}
