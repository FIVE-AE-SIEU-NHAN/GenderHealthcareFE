import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SendHorizonal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useDoctorMutations } from '@/hooks/manager/useDoctorMutations'
import { DoctorProfile } from '@/types/manager/doctorTypes' // Corrected import path

const formSchema = z.object({
  specialization: z.string().min(1, { message: 'Specialization is required.' })
})

type EditDoctorFormProps = {
  doctor: DoctorProfile
  onSuccess: () => void
}

export function EditDoctorForm({ doctor, onSuccess }: EditDoctorFormProps) {
  const { updateProfile } = useDoctorMutations()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialization: doctor.specialization || ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.specialization === doctor.specialization) {
      // If no changes, just call the success callback to close the form.
      onSuccess()
      return
    }

    try {
      await updateProfile.mutateAsync({
        doctorId: doctor.id,
        specialization: values.specialization
      })
      onSuccess()
    } catch (error) {
      console.error('Update failed:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Specialization Field */}
        <FormField
          control={form.control}
          name='specialization'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialization</FormLabel>
              <FormControl>
                <Input placeholder='e.g., Cardiology, General Practice' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className='flex justify-end pt-4'>
          <Button type='submit' size='lg' disabled={updateProfile.isPending}>
            {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
            {!updateProfile.isPending && <SendHorizonal className='ml-2 h-5 w-5' />}
          </Button>
        </div>
      </form>
    </Form>
  )
}
