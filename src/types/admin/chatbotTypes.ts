export type ChatbotType = 'AI_ASSISTANT' | 'MENSTRUAL_PREDICTOR'

// =================== CHATBOT CONFIG BASE ===================
export interface ChatbotConfig {
  id: ChatbotType
  gemini_key: string
  system_instruction: string
  temperature: number
  max_output_tokens: number
  updated_at: string
}

// =================== CHATBOT CONFIG FETCHING ===================
export interface FetchChatbotConfigPayload {
  chatbot_type: ChatbotType
}

export interface ChatbotConfigResponse {
  message: string
  result: ChatbotConfig
}

// =================== CHATBOT CONFIG UPDATING ===================
export interface UpdateChatbotConfigPayload {
  chatbot_type: ChatbotType
  gemini_key?: string
  system_instruction?: string
  temperature?: number
  max_output_tokens?: number
}

export interface UpdateChatbotConfigResponse {
  message: string
  result: ChatbotConfig
}
