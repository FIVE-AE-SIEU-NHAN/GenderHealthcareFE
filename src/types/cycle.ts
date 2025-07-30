// ========== Core Data Models ==========

/** Represents the status of an AI-analyzed log entry. */
export type AIAnalysisStatus = 'NORMAL' | 'NEED_ATTENTION' | 'NOT_POSITIVE'

/** The full object for a daily log, as stored in the backend. */
export interface CycleStatusLog {
  id: string
  cycle_id: string
  log_date: string // ISO 8601 format
  mood: number
  libido: number
  stress: number
  sleep_hours: number
  energy: number
  status: AIAnalysisStatus
  note: string
  created_at: string
}

/** Represents the status of a single day provided by the predictions endpoint. */
export interface DailyStatus {
  log_date: string // ISO 8601 format
  status: 'RATED' | 'PENDING'
}

/** Basic information about a cycle instance. */
export interface CycleBasics {
  start_period_date: string
  cycle_length: number
  period_length: number
  note: string
}

/** Represents a full prediction cycle from the backend, including daily statuses. */
export interface Prediction {
  id: string
  cycle_id: string
  next_period_date: string
  period_end_date: string
  ovulation_date: string
  fertile_window_start: string
  fertile_window_end: string
  status: 'ACTIVE' | 'COMPLETED' | 'SKIPPED'
  cycle: CycleBasics
  daily_statuses: DailyStatus[] // The new field from the backend
}

// ========== Component Prop & State Types ==========

/** A more descriptive status used internally by the frontend calendar logic. */
export type DayStatus = 'RATED' | 'PENDING' | 'MISSED' | 'FUTURE' | 'NONE'

/** Represents a single day cell in the CycleCalendar grid. */
export interface CalendarDay {
  date: Date
  dayNumber: number
  isCurrentMonth: boolean
  dayType: 'period' | 'fertile' | 'ovulation' | 'normal'
  dayStatus: DayStatus
  cycleStatus: 'ACTIVE' | 'COMPLETED' | 'SKIPPED' | 'NONE'
  cycleId: string | null
}

// ========== Form Data Interfaces ==========

/** Shape of the data for the "Create a Cycle" form. */
export interface CycleFormData {
  firstPeriodDate: string
  cycleLength: number
  periodDuration: number
  notes?: string
}

/** Shape of the data for the "Day Rating" form in the modal. */
export interface RatingFormData {
  mood: number
  libido: number
  stress: number
  energy: number
  sleep_hours: number
}

// ========== API Payload Interfaces ==========

/** Payload for the POST /cycle/create request. */
export interface CreateCyclePayload {
  start_period_date: string
  cycle_length: number
  period_length: number
  note?: string
}

/** Payload for the POST /cycle/:id/status-logs request. */
export interface UpdateCycleStatusLogsPayload extends RatingFormData {
  log_date: string // e.g., "2025-10-21"
}

// ========== API Response Interfaces ==========

/** Response for the GET /cycle/check request. */
export interface BackendActiveCycleCheckResponse {
  message: string
  result: boolean
}

export interface ActiveCycleCheckResponse {
  hasActiveCycle: boolean
}

/** Response for the POST /cycle/create request. */
export interface CreateCycleResponse {
  message: string
  result: Prediction
}

/** Shape of the main predictions result from the GET /cycle/predictions request. */
export interface PredictionsResult {
  predictions: Prediction[]
  total: number
}

export interface GetPredictionsResponse {
  message: string
  result: PredictionsResult
}

/** Response for POST /cycle/:id/status-logs (creating/updating a rating). */
export interface UpdateCycleStatusLogsResponse {
  message: string
  result: CycleStatusLog
}

/** Response for POST /cycle/:id/log-detail (viewing an existing rating). */
export interface GetCycleLogDetailResponse {
  message: string
  result: CycleStatusLog
}
