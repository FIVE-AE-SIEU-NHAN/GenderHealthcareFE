import { useForm } from 'react-hook-form'
// import { useState } from "react";
// import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { AtSign } from 'lucide-react'
import logo from '@/assets/images/logo1.png'

type FormData = {
  email: string
}

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log('Forgot password data:', data)
  }

  return (
    <div className="relative flex min-h-[calc(100dvh-63px)] flex-col items-center justify-center bg-[url('@/assets/images/bs2.webp')] bg-cover bg-center bg-no-repeat">
      <div className='overlay absolute inset-0 z-0 bg-black/20' />
      <Card className='animate-fade-in-up z-2 mt-12 w-full max-w-md shadow-2xl'>
        <CardHeader className='text-center'>
          <img src={logo} alt='logo' className='mx-auto w-24' />
          <CardTitle className='text-dark-blue text-2xl font-bold'>Forgot Password</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 text-base'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email Address</Label>
              <div className='relative'>
                <AtSign className='form-icon' />
                <Input
                  id='email'
                  type='email'
                  placeholder='care4gender@example.com'
                  {...register('email')}
                  className='pl-8'
                />
              </div>
            </div>
            <Button
              type='submit'
              // disabled={loading}
              className='bg-dark-blue h-11 w-full text-base font-semibold hover:bg-[#131045] active:scale-[0.99]'
            >
              {/* {loading ? "Sending..." : "Send Reset Link"} */}
            </Button>

            {/* {message && <p className="text-green-600 text-sm text-center">{message}</p>}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>} */}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ForgotPassword
