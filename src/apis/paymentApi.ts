import api from '@/apis/axiosConfig'
import { CancelPaymentPayload, CancelPaymentResponse } from '@/types/payment'

/**
 * Calls the backend API to cancel a payment.
 * @param payload - The request body, containing the orderCode.
 * @returns The response from the backend.
 */
export const cancelPaymentAPI = async (orderCode: CancelPaymentPayload) => {
  const response = await api.post<CancelPaymentResponse>('/payment/cancel', orderCode)
  return response.data
}
