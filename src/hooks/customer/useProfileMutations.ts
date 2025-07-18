import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '@/apis/customer/profileApi';

import { toast } from "sonner";
import { AxiosError } from 'axios';
import { UpdatePasswordPayload, UpdatePasswordResponse, UpdateProfilePayload, UpdateProfileResponse } from '@/types/customer/profileTypes';


interface ApiErrorResponse {
  message: string;
  errors?: { [key: string]: string };
}

/**
 * A custom hook that centralizes all mutations related to the user profile.
 */
export function useProfileMutations() {
  const queryClient = useQueryClient();

  /**
   * Mutation for updating the user's password.
   */
  const updatePasswordMutation = useMutation<
    UpdatePasswordResponse,       
    AxiosError<ApiErrorResponse>, 
    UpdatePasswordPayload    
  >({
    mutationFn: profileApi.updatePassword,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['consultantProfile'] });
      queryClient.invalidateQueries({ queryKey: ['doctorProfile'] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "An unknown error occurred.");
    }
  });


   // =============== UPDATE PROFILE ===============
  const updateProfileMutation = useMutation<
    UpdateProfileResponse,
    AxiosError<ApiErrorResponse>,
    UpdateProfilePayload
  >({
    mutationFn: profileApi.updateProfileAPI,
    onSuccess: (data) => {
      
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['consultantProfile'] });
      queryClient.invalidateQueries({ queryKey: ['doctorProfile'] });

      toast.success(data.message || 'Profile updated successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    },
  });

  return {
    updatePasswordMutation,
    updateProfileMutation, 
  };
}