import { updateChatbotConfigAPI } from '@/apis/admin/chatbotApi'
import { UpdateChatbotConfigPayload } from '@/types/admin/chatbotTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

/**
 * A custom Tanstack Query mutation hook to update the chatbot configuration.
 */
export function useUpdateChatbotConfig() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateChatbotConfigPayload) => updateChatbotConfigAPI(payload),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['chatbotConfig', variables.chatbot_type]
      })
    },

    onError: (error) => {
      toast.error(error.message || 'Failed to update Chatbot Configuration.')
    }
  })
}
