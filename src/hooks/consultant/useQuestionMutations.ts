import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { answerQuestionAPI, editAnswerAPI, reportQuestionAPI } from '@/apis/consultant/questionApi';
import type { AnswerQuestionPayload, QuestionMutationResponse } from '@/types/consultant/questionTypes';

/**
 * A hook for consultant-specific question mutations (Answering, Editing Answer).
 * It returns an object containing individual mutation hooks.
 */
export const useQuestionMutations = () => {
  const queryClient = useQueryClient();

  // A generic success handler to invalidate cache and show a toast
  const onMutationSuccess = (data: QuestionMutationResponse, defaultMessage: string) => {
    // Invalidate the 'questions' query to automatically refetch the list
    queryClient.invalidateQueries({ queryKey: ['questions'] });
    toast.success(data.message || defaultMessage);
  };
  
  // A generic error handler
  const onMutationError = (error: Error, defaultMessage: string) => {
    toast.error(error.message || defaultMessage);
  };

  // =============== ANSWERING A QUESTION ===============
  const answerQuestionMutation = useMutation<
    QuestionMutationResponse,
    Error,
    AnswerQuestionPayload
  >({
    mutationFn: answerQuestionAPI,
    onSuccess: (data) => onMutationSuccess(data, 'Question answered successfully!'),
    onError: (error) => onMutationError(error, 'Failed to answer question.'),
  });

  // =============== EDITING AN ANSWER ===============
  const editAnswerMutation = useMutation<
    QuestionMutationResponse,
    Error,
    AnswerQuestionPayload
  >({
    mutationFn: editAnswerAPI,
    onSuccess: (data) => onMutationSuccess(data, 'Answer updated successfully!'),
    onError: (error) => onMutationError(error, 'Failed to update answer.'),
  });

  // =============== REPORTING A QUESTION (NEW) ===============
  const reportQuestionMutation = useMutation<
    QuestionMutationResponse,
    Error,
    string // The input variable is just the questionId string
  >({
    mutationFn: reportQuestionAPI,
    onSuccess: (data) => onMutationSuccess(data, 'Question reported successfully!'),
    onError: (error) => onMutationError(error, 'Failed to report question.'),
  });


  // Expose all available mutations
  return {
    answerQuestion: answerQuestionMutation,
    editAnswer: editAnswerMutation,
    reportQuestion: reportQuestionMutation,
  };
};