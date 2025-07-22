export interface Question {
  id: string
  user_id: string
  consultant_id: string
  topic: string
  question: string
  answer: string
  is_public: boolean
  status: number
  created_at: string
  answered_at: string
}
