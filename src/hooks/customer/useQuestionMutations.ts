import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { askQuestionAPI } from '@/apis/customer/questionApi';
import type { AskQuestionPayload, AskQuestionResponse } from '@/types/customer/questionTypes';

/**
 * A hook for customer-facing question mutations.
 */
export const useQuestionMutations = () => {
  // =============== ASK A NEW QUESTION ===============
  const askQuestionMutation = useMutation<
    AskQuestionResponse,
    Error,
    AskQuestionPayload
  >({
    mutationFn: askQuestionAPI,
    onError: (error) => {
      toast.error(error.message || 'Failed to submit your question. Please try again.');
    },
  });

  return {
    askQuestion: askQuestionMutation,
  };
};