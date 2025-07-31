import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'

import { timeSlotOptions } from '@/Application/constants/appointment'
import PaymentResultPage from '@/pages/Customer/Appointment/Payment/PaymentResultPage'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { PayOSResponse } from '@/types/payment'
import { DialogTitle } from '@radix-ui/react-dialog'
import { toast } from 'sonner'
import { useSocket } from '@/contexts/SocketContext'
import { BookingSuccessDialog } from '@/pages/Content/Consultation/BookingSuccessDialog'
import { BookingFailedDialog } from '@/pages/Content/Consultation/BookingFailedDialog'
import { useAppointmentMutations } from '@/hooks/customer/useAppointmentMutations'
import { formSchema, ServicesBookingForm, STIS_TESTING_PACKAGES } from './ServiceBookingForm'
import { BookAppointmentResponse } from '@/types/customer/appointmentTypes'

const PAYMENT_DATA_KEY = 'payment_session_data'
const PAYMENT_DEADLINE_KEY = 'payment_session_deadline'

const ServiceBookingPage = () => {
  const { bookService } = useAppointmentMutations()
  const socket = useSocket()

  const [bookingDetails, setBookingDetails] = useState({ topic: '', date: '', time: '' })
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false)

  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false)
  const [isFailedDialogOpen, setFailedDialogOpen] = useState(false)
  const [failureReason, setFailureReason] = useState('')

  const [paymentData, setPaymentData] = useState<PayOSResponse | null>(null)
  const [paymentDeadline, setPaymentDeadline] = useState<number>(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      booking_date: undefined,
      time_slot: '',
      note: '',
      agreed: false
    }
  })

  useEffect(() => {
    const storedData = sessionStorage.getItem(PAYMENT_DATA_KEY)
    const storedDeadline = sessionStorage.getItem(PAYMENT_DEADLINE_KEY)

    if (storedData && storedDeadline) {
      const deadline = parseInt(storedDeadline, 10)
      if (Date.now() < deadline) {
        setPaymentData(JSON.parse(storedData))
        setPaymentDeadline(deadline)
        setPaymentDialogOpen(true)
      } else {
        sessionStorage.removeItem(PAYMENT_DATA_KEY)
        sessionStorage.removeItem(PAYMENT_DEADLINE_KEY)
      }
    }
  }, [])

  const clearPaymentSession = () => {
    sessionStorage.removeItem(PAYMENT_DATA_KEY)
    sessionStorage.removeItem(PAYMENT_DEADLINE_KEY)
    setPaymentData(null)
  }

  useEffect(() => {
    const handlePaymentStatus = (paymentUpdate: { status: string; content: string }) => {
      if (paymentUpdate.status === 'SUCCESS') {
        toast.success(paymentUpdate.content || 'Payment confirmed successfully!')
        clearPaymentSession()
        setPaymentDialogOpen(false)
        setSuccessDialogOpen(true)
      } else if (paymentUpdate.status === 'FAILED') {
        if (isPaymentDialogOpen) {
          clearPaymentSession()
          setPaymentDialogOpen(false)
          setFailureReason(paymentUpdate.content || 'Payment failed or was canceled.')
          setFailedDialogOpen(true)
        }
      }
    }
    socket.on('payment:status', handlePaymentStatus)
    return () => {
      socket.off('payment:status', handlePaymentStatus)
    }
  }, [socket, isPaymentDialogOpen])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedPackage = STIS_TESTING_PACKAGES.find((p) => p.value === values.topic)

    if (!selectedPackage) {
      toast.error('Invalid package selected. Please try again.')
      return
    }

    const formattedDate = format(values.booking_date, 'yyyy-MM-dd')

    // Construct the new payload for the backend
    const payload = {
      booking_date: formattedDate,
      time_slot: values.time_slot,
      target_gender: selectedPackage.gender,
      level: selectedPackage.level,
      note: values.note
    }

    bookService.mutate(payload, {
      onSuccess: (data: BookAppointmentResponse) => {
        const newDeadline = Date.now() + 1 * 60 * 1000
        sessionStorage.setItem(PAYMENT_DATA_KEY, JSON.stringify(data.result))
        sessionStorage.setItem(PAYMENT_DEADLINE_KEY, newDeadline.toString())

        const timeLabel = timeSlotOptions.find((t) => t.value === values.time_slot)?.label || ''
        const displayDate = format(values.booking_date, 'dd/MM/yyyy')

        setBookingDetails({
          topic: selectedPackage.label,
          date: displayDate,
          time: timeLabel
        })

        setPaymentData(data.result)
        setPaymentDeadline(newDeadline)
        setPaymentDialogOpen(true)
        form.reset()
      }
    })
  }

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      clearPaymentSession()
    }
    setPaymentDialogOpen(isOpen)
  }

  const handleTimerEnd = () => {
    clearPaymentSession()
    setPaymentDialogOpen(false)
    setFailureReason('Your payment session has expired. Please try booking again.')
    setFailedDialogOpen(true)
  }

  return (
    <div className='relative flex items-center justify-center overflow-hidden bg-gray-300 max-[1125px]:min-h-[90vh] min-[1125px]:min-h-[94vh]'>
      {/* Background Blobs */}
      <div className='absolute top-0 left-0 z-0 h-full w-full'>
        <div className='animate-blob absolute top-14 left-3/4 h-96 w-96 rounded-full bg-blue-200 opacity-40 blur-3xl filter'></div>
        <div className='animate-blob animation-delay-2000 absolute h-96 w-96 rounded-full bg-purple-200 opacity-40 blur-3xl filter'></div>
        <div className='animate-blob animation-delay-4000 absolute bottom-1/4 left-1/3 h-96 w-96 rounded-full bg-pink-200 opacity-40 blur-3xl filter'></div>
      </div>
      <div className='absolute inset-0 z-0 bg-white/40 backdrop-blur-sm'></div>
      <ServicesBookingForm onSubmit={onSubmit} isPending={bookService.isPending} form={form} />

      <Dialog open={isPaymentDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent
          className='md h-[calc(95vh)] overflow-y-auto border-none bg-transparent p-0 shadow-none md:h-auto md:min-w-4xl [&>button:first-of-type]:hidden'
          onInteractOutside={(e) => {
            e.preventDefault()
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault()
          }}
        >
          <DialogTitle className='sr-only'>Payment Result</DialogTitle>
          {paymentData && (
            <PaymentResultPage
              paymentData={paymentData}
              deadline={paymentDeadline}
              onCancelSuccess={clearPaymentSession}
              onTimerEnd={handleTimerEnd}
            />
          )}
        </DialogContent>
      </Dialog>

      {isSuccessDialogOpen && (
        <BookingSuccessDialog bookingDetails={bookingDetails} onClose={() => setSuccessDialogOpen(false)} />
      )}

      {isFailedDialogOpen && (
        <BookingFailedDialog errorMessage={failureReason} onClose={() => setFailedDialogOpen(false)} />
      )}
    </div>
  )
}

export default ServiceBookingPage
