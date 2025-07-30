export interface ApiErrorResponse {
  message: string
  errors?: { [key: string]: string }
}
