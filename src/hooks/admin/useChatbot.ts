import { fetchChatbotConfig } from '@/apis/admin/chatbotApi'
import { ChatbotConfigResponse, ChatbotType } from '@/types/admin/chatbotTypes'
import { useQuery } from '@tanstack/react-query'

/**
 * A custom Tanstack Query hook to fetch the chatbot configuration.
 * @param chatbot_type - The type of chatbot config to fetch ('AI_ASSISTANT' or 'MENSTRUAL_PREDICTOR').
 */
export function useChatbotConfig(chatbot_type: ChatbotType) {
  return useQuery<ChatbotConfigResponse, Error>({
    queryKey: ['chatbotConfig', chatbot_type],

    queryFn: () => fetchChatbotConfig({ chatbot_type }),

    enabled: !!chatbot_type,

    staleTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}
