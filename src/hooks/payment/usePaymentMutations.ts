import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { CancelPaymentPayload, CancelPaymentResponse } from '@/types/payment';
import { AxiosError } from 'axios';
import { cancelPaymentAPI } from '@/apis/paymentApi';

/**
 * A hook for customer-facing payment mutations.
 */
export const usePaymentMutations = () => {
  const cancelPaymentMutation = useMutation<
    CancelPaymentResponse,
    AxiosError<{ message: string }>, 
    CancelPaymentPayload
  >({
    mutationFn: cancelPaymentAPI,
    onSuccess: (data) => {
      toast.success(data.message || 'Payment canceled successfully!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Cancellation failed. Please try again.';
      toast.error(message);
    },
  });

  return {
    cancelPayment: cancelPaymentMutation,
  };
};