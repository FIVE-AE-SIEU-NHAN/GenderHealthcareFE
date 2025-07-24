import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import { format } from 'date-fns'
import { ArrowLeft, ArrowRight, Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'

import { ServiceAppointment, ServiceResultFormData } from '@/types/doctor/serviceAppointmentTypes'
import { useSubmitAllTestResults } from '@/hooks/doctor/useServiceAppointmentsMutations'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchPackageDetails } from '@/apis/doctor/serviceAppointmentApi'

interface ServiceResultModalProps {
  appointment: ServiceAppointment
  isOpen: boolean
  onClose: () => void
}

export function ServiceResultModal({ appointment, isOpen, onClose }: ServiceResultModalProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const {
    data: packageDetails,
    isLoading: isLoadingPackage,
    isError
  } = useQuery({
    queryKey: ['packageDetails', appointment.id],
    queryFn: () => fetchPackageDetails(appointment.id),
    enabled: isOpen,
    staleTime: Infinity
  })

  const services = useMemo(() => packageDetails?.services ?? [], [packageDetails])

  const isOverviewStep = currentStep === services.length

  const { register, handleSubmit, control, trigger, reset } = useForm<ServiceResultFormData>({
    defaultValues: { results: [] }
  })

  useEffect(() => {
    if (services.length > 0) {
      reset({
        results: services.map((service) => ({
          service_id: service.service_id,
          name: service.name,
          test_service_appointment_id: appointment.id,
          test_date: format(new Date(), 'yyyy-MM-dd'),
          result: '',
          note: '',
          unit: ''
        }))
      })
    }
  }, [services, reset, appointment.id])

  const allFormData = useWatch({ control, name: 'results' })

  const handleNext = async () => {
    const isStepValid = await trigger(`results.${currentStep}`)
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1)
    } else {
      toast.warning('Please fill in all required fields for this service.')
    }
  }

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const submitResultsMutation = useSubmitAllTestResults()
  const onSubmit = (data: ServiceResultFormData) => {
    submitResultsMutation.mutate(data, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  if (isLoadingPackage) return <div className='p-4'>Loading services...</div>
  if (isError) return <div className='p-4 text-red-500'>Failed to load services for this package.</div>

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>{isOverviewStep ? 'Review Results' : `Result for: ${services[currentStep]?.name}`}</DialogTitle>
          <DialogDescription>
            {isOverviewStep
              ? 'Please review all results before final submission.'
              : `Step ${currentStep + 1} of ${services.length}`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='max-h-[60vh] space-y-4 overflow-y-auto p-4'>
          {!isOverviewStep && services.length > 0 && services[currentStep] ? (
            // FORM VIEW
            <div className='space-y-4'>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor={`result-${currentStep}`}>
                  Result <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id={`result-${currentStep}`}
                  {...register(`results.${currentStep}.result`, { required: true })}
                />
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor={`unit-${currentStep}`}>Unit</Label>
                <Input id={`unit-${currentStep}`} {...register(`results.${currentStep}.unit`)} />
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor={`date-${currentStep}`}>Test Date</Label>
                <Input id={`date-${currentStep}`} type='date' {...register(`results.${currentStep}.test_date`)} />
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor={`note-${currentStep}`}>Notes</Label>
                <Textarea id={`note-${currentStep}`} {...register(`results.${currentStep}.note`)} />
              </div>
            </div>
          ) : (
            // OVERVIEW VIEW
            <div className='space-y-3'>
              {allFormData?.map((data, index) => (
                <Card key={index} className='pt-2 pb-2'>
                  <CardHeader className='-mb-5'>
                    <CardTitle className='text-base'>{data.name}</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-1 text-sm'>
                    <p>
                      <strong>Result:</strong> {data.result || 'N/A'}
                    </p>
                    <p>
                      {data.unit ? (
                        <>
                          <strong> Unit: </strong> ${data.unit}
                        </>
                      ) : (
                        ''
                      )}
                    </p>
                    <p>
                      <strong>Date:</strong> {data.test_date}
                    </p>
                    <p>
                      <strong>Note:</strong> {data.note || 'None'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </form>

        <DialogFooter>
          <div className='flex w-full justify-between'>
            <Button
              type='button'
              variant='outline'
              onClick={handlePrev}
              disabled={currentStep === 0 || submitResultsMutation.isPending}
            >
              <ArrowLeft className='mr-2 h-4 w-4' /> Previous
            </Button>

            {isOverviewStep ? (
              <Button
                type='submit'
                onClick={handleSubmit(onSubmit)}
                disabled={submitResultsMutation.isPending || services.length === 0}
              >
                {submitResultsMutation.isPending ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  <Send className='mr-2 h-4 w-4' />
                )}
                Send All Results
              </Button>
            ) : (
              <Button type='button' onClick={handleNext} disabled={services.length === 0}>
                Next <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
