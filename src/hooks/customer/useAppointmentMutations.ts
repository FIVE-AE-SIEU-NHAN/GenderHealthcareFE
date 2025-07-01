import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { bookAppointmentAPI } from '@/apis/customer/appointmentApi';
import type { BookAppointmentPayload, BookAppointmentResponse } from '@/types/customer/appointmentTypes';

/**
 * A hook for customer-facing appointment mutations.
 */
export const useAppointmentMutations = () => {
  // =============== BOOK A NEW APPOINTMENT ===============
  const bookAppointmentMutation = useMutation<
    BookAppointmentResponse,
    Error,
    BookAppointmentPayload
  >({
    mutationFn: bookAppointmentAPI,
    onError: (error) => {
      toast.error(error.message || 'Đặt lịch hẹn không thành công. Vui lòng thử lại.');
    },
  });

  return {
    bookAppointment: bookAppointmentMutation,
  };
};