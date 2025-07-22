import { useState, forwardRef } from 'react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { useProfileMutations } from '@/hooks/customer/useProfileMutations'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Eye, EyeOff, Loader2, ShieldPlus, ArrowRight } from 'lucide-react'

// PasswordInput component with visibility toggle
const PasswordInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const toggleVisibility = () => setShowPassword(!showPassword)

  return (
    <div className='relative'>
      <Input type={showPassword ? 'text' : 'password'} ref={ref} {...props} className='pr-10' />
      <Button
        type='button'
        variant='ghost'
        size='sm'
        className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
        onClick={toggleVisibility}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? (
          <EyeOff className='h-4 w-4 text-gray-500' aria-hidden='true' />
        ) : (
          <Eye className='h-4 w-4 text-gray-500' aria-hidden='true' />
        )}
      </Button>
    </div>
  )
})
PasswordInput.displayName = 'PasswordInput'

// ZOD Validation Schema
const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Current password is required.' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter.' })
      .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter.' })
      .regex(/\d/, { message: 'Must contain at least one number.' })
      .regex(/[^a-zA-Z\d]/, { message: 'Must contain at least one special character.' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  })

type PasswordFormValues = z.infer<typeof passwordFormSchema>

interface ChangePasswordFormProps {
  onCancel: () => void
  onSuccess: () => void
}

function ChangePasswordForm({ onCancel, onSuccess }: ChangePasswordFormProps) {
  // Custom hook to handle profile mutations
  const { updatePasswordMutation } = useProfileMutations()

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    mode: 'onTouched'
  })

  async function onSubmit(values: PasswordFormValues) {
    const payload = {
      old_password: values.currentPassword,
      password: values.newPassword,
      confirm_password: values.confirmPassword
    }

    await updatePasswordMutation.mutateAsync(payload)

    form.reset()
    onSuccess()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 rounded-xl border border-slate-200 bg-slate-100 p-6 dark:border-slate-700 dark:bg-slate-800/60'
      >
        <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>Change Your Password</h3>

        <FormField
          control={form.control}
          name='currentPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='Enter your current password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='Enter your new password' {...field} />
              </FormControl>
              <FormDescription>
                Must be 8+ characters and include an uppercase, lowercase, number, and special character.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='Confirm your new password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end gap-3 pt-4'>
          <Button type='button' variant='ghost' onClick={onCancel} disabled={updatePasswordMutation.isPending}>
            Cancel
          </Button>
          <Button type='submit' disabled={updatePasswordMutation.isPending}>
            {updatePasswordMutation.isPending ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

const GoogleAuthNotice = () => {
  const navigate = useNavigate()

  return (
    <div className='relative overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-tr from-blue-100/80 via-white to-blue-50 p-6 shadow-md transition-all duration-300 hover:shadow-md/20'>
      <div className='relative z-10 flex flex-col items-center text-center md:flex-row md:gap-6 md:text-left'>
        <div className='mb-4 flex-shrink-0 md:mb-0'>
          <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-md'>
            <ShieldPlus className='h-8 w-8' />
          </div>
        </div>
        <div className='flex-grow'>
          <h4 className='text-lg font-bold text-blue-900 dark:text-blue-200'>Create a Password for Extra Security</h4>
          <p className='mt-1 text-sm text-blue-800/80 dark:text-blue-300/80'>
            Your account is currently secured by Google. Set up a local password to enable direct login.
          </p>
        </div>
        <div className='mt-4 flex-shrink-0 md:mt-0'>
          <Button
            onClick={() => navigate('/create-password')}
            className='group bg-blue-600 text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600'
          >
            Set Password
            <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export { ChangePasswordForm, GoogleAuthNotice }
