import type { User } from '@/types/user'

// =================== PROFILE FETCHING ===================
/**
 * The expected response when fetching the user's profile.
 */
export interface ProfileApiResponse {
  message: string
  user: User
}

// =================== CHANGE PASSWORD ===================
/**
 * The payload required when a user changes their password.
 * The keys match the backend's expected field names.
 */
export interface UpdatePasswordPayload {
  old_password: string
  password: string
  confirm_password: string
}

/**
 * The expected response from a successful password update.
 */
export interface UpdatePasswordResponse {
  message: string
  errors?: {
    old_password?: string
    password?: string
    confirm_password?: string
  }
}

// =================== UPDATE PROFILE INFO ===================
/**
 * The payload for updating the user's profile.
 * All fields are optional. Matches the backend's UpdateProfileReqBody.
 */
export interface UpdateProfilePayload {
  name?: string
  date_of_birth?: string
  gender?: 'male' | 'female' | 'other'
  phone_number?: string
}

/**
 * The expected response from a successful profile update.
 * It returns the updated user information.
 */
export interface UpdateProfileResponse {
  message: string
  userInfor: User
}
