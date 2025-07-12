import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { bookAppointmentAPI } from '@/apis/customer/appointmentApi';
import type { BookAppointmentError, BookAppointmentPayload, BookAppointmentResponse } from '@/types/customer/appointmentTypes';
import { AxiosError } from 'axios';

/**
 * A hook for customer-facing appointment mutations.
 */
export const useAppointmentMutations = () => {
  // =============== BOOK A NEW APPOINTMENT ===============
  const bookAppointmentMutation = useMutation<
    BookAppointmentResponse,
    AxiosError<BookAppointmentError>,
    BookAppointmentPayload
  >({
    mutationFn: bookAppointmentAPI,
    onError: (error) => {
      const message = error.response?.data?.message || 'Booking failed. Please try again.';
      toast.error(message);
    },
  });

  return {
    bookAppointment: bookAppointmentMutation,
  };
};