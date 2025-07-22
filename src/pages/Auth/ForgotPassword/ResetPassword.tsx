import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Lock, Eye, EyeOff, KeyRound } from 'lucide-react'
import logo from '@/assets/images/logo1.png'
import axios from 'axios'

type FormData = {
  password: string
  confirmPassword: string
}

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const token = new URLSearchParams(location.search).get('forgot_password_token')

  useEffect(() => {
    if (!token) {
      navigate('/404')
    }
  }, [token, navigate])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>()

  const password = watch('password')

  // const onSubmit = (data: FormData) => {
  //   console.log("Reset password:", data);
  //   // API
  // };
  const onSubmit = async (data: FormData) => {
    const password = data.password
    const confirmPassword = data.confirmPassword

    try {
      await axios.post('/user/reset-password', {
        token,
        password,
        confirmPassword
      })

      // Navigate tới trang thành công
      navigate('/login')
    } catch (error) {
      console.error('Reset failed', error)
      alert('Reset failed. Please try again.')
    }
  }

  return (
    <div className="relative flex min-h-[calc(100dvh-63px)] flex-col items-center justify-center bg-[url('@/assets/images/bs2.webp')] bg-cover bg-center bg-no-repeat">
      <div className='overlay absolute inset-0 z-0 bg-black/20' />
      <Card className='animate-fade-in-up z-2 mt-12 w-full max-w-md shadow-2xl'>
        <CardHeader className='text-center'>
          <img src={logo} alt='logo' className='mx-auto w-24' />
          <CardTitle className='text-dark-blue text-2xl font-bold'>Reset Your Password</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 text-base'>
            {/* New Password */}
            <div className='space-y-2'>
              <Label htmlFor='password'>New Password</Label>
              <div className='relative'>
                <Lock className='form-icon' />
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Min 6 characters' }
                  })}
                  className='pr-10 pl-8'
                />
                <button
                  type='button'
                  className='absolute top-3 right-2 text-gray-600'
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className='space-y-2'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <div className='relative'>
                <KeyRound className='form-icon' />
                <Input
                  id='confirmPassword'
                  type={showConfirm ? 'text' : 'password'}
                  placeholder='••••••••'
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (val) => val === password || 'Passwords do not match'
                  })}
                  className='pr-10 pl-8'
                />
                <button
                  type='button'
                  className='absolute top-3 right-2 text-gray-600'
                  onClick={() => setShowConfirm((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className='text-sm text-red-500'>{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              className='bg-dark-blue h-11 w-full text-base font-semibold hover:bg-[#131045] active:scale-[0.99]'
            >
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPassword
