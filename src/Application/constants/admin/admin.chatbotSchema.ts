import { z } from 'zod'

export const chatbotConfigSchema = z.object({
  gemini_key: z.string().min(10, 'API key must be at least 10 characters'),
  system_instruction: z.string().min(50, 'System instruction must be at least 50 characters'),
  temperature: z.coerce.number().min(0).max(1),
  max_output_tokens: z.coerce.number().min(100).max(8192)
})

export type ChatbotConfigFormValues = z.infer<typeof chatbotConfigSchema>
