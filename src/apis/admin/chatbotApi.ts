import api from '@/apis/axiosConfig'
import {
  ChatbotConfigResponse,
  FetchChatbotConfigPayload,
  UpdateChatbotConfigPayload,
  UpdateChatbotConfigResponse
} from '@/types/admin/chatbotTypes'

/**
 * =============== CHATBOT CONFIG FETCHING ===============
 * Fetches the chatbot configuration from the server.
 * Per backend requirements, this GET request sends data in the body.
 * @param payload - The payload containing the chatbot_type.
 */
export const fetchChatbotConfig = async (payload: FetchChatbotConfigPayload): Promise<ChatbotConfigResponse> => {
  const response = await api.post<ChatbotConfigResponse>('/chatbot/config', payload)
  return response.data
}

/**
 * =============== CHATBOT CONFIG UPDATING ===============
 * Updates the chatbot configuration on the server.
 * @param payload - The data for updating the config.
 */
export const updateChatbotConfigAPI = async (
  payload: UpdateChatbotConfigPayload
): Promise<UpdateChatbotConfigResponse> => {
  const response = await api.put<UpdateChatbotConfigResponse>('/chatbot/config', payload)
  return response.data
}
