import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'

import { useAppointmentMutations } from '@/hooks/customer/useAppointmentMutations'
import { timeSlotOptions, TOPIC_OPTIONS } from '@/Application/constants/appointment'
import PaymentResultPage from '@/pages/Customer/Appointment/Payment/PaymentResultPage'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { PayOSResponse } from '@/types/payment'
import { BookAppointmentResponse } from '@/types/customer/appointmentTypes'
import { DialogTitle } from '@radix-ui/react-dialog'
import { toast } from 'sonner'
import { useSocket } from '@/contexts/SocketContext'
import { BookingSuccessDialog } from '@/pages/Content/Consultation/BookingSuccessDialog'
import { AppointmentForm, formSchema } from './ConsultationBookingForm'
import { BookingFailedDialog } from './BookingFailedDialog'

const PAYMENT_DATA_KEY = 'payment_session_data'
const PAYMENT_DEADLINE_KEY = 'payment_session_deadline'

const ConsultantAppointmentPage = () => {
  const { bookAppointment } = useAppointmentMutations()
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
      // Check if the deadline has not expired
      if (Date.now() < deadline) {
        setPaymentData(JSON.parse(storedData))
        setPaymentDeadline(deadline)
        setPaymentDialogOpen(true)
      } else {
        // Clear expired data
        sessionStorage.removeItem(PAYMENT_DATA_KEY)
        sessionStorage.removeItem(PAYMENT_DEADLINE_KEY)
      }
    }
  }, [])

  // --- HELPER FUNCTION TO CLEAR THE SESSION ---
  const clearPaymentSession = () => {
    sessionStorage.removeItem(PAYMENT_DATA_KEY)
    sessionStorage.removeItem(PAYMENT_DEADLINE_KEY)
    setPaymentData(null)
  }

  // --- SOCKET ---
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
    const formattedDate = format(values.booking_date, 'yyyy-MM-dd')
    const payload = {
      topic: values.topic,
      booking_date: formattedDate,
      time_slot: values.time_slot,
      note: values.note
    }

    bookAppointment.mutate(payload, {
      onSuccess: (data: BookAppointmentResponse) => {
        const newDeadline = Date.now() + 30 * 1000
        sessionStorage.setItem(PAYMENT_DATA_KEY, JSON.stringify(data.result))
        sessionStorage.setItem(PAYMENT_DEADLINE_KEY, newDeadline.toString())

        const topicLabel = TOPIC_OPTIONS.find((t) => t.value === values.topic)?.label || ''
        const timeLabel = timeSlotOptions.find((t) => t.value === values.time_slot)?.label || ''
        const displayDate = format(values.booking_date, 'dd/MM/yyyy')

        setBookingDetails({
          topic: topicLabel,
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
    <div className="relative flex items-center justify-center bg-[url('https://benhviengreen.com/wp-content/uploads/2016/05/doctor-health-wellness-1200x480.jpg')] bg-cover bg-center bg-no-repeat bg-blend-overlay max-[1125px]:min-h-[90vh] min-[1125px]:min-h-[94vh]">
      <div className='absolute inset-0 z-0 bg-white/40 backdrop-blur-sm'></div>
      {/* Form */}
      <AppointmentForm onSubmit={onSubmit} isPending={bookAppointment.isPending} form={form} />

      {/* Success notification + Form info */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent
          className='md h-[calc(95vh)] overflow-y-auto border-none bg-transparent p-0 shadow-none md:h-auto md:min-w-4xl [&>button:first-of-type]:hidden'
          onInteractOutside={(e) => {
            // Prevent closing on outside click
            e.preventDefault()
          }}
          onEscapeKeyDown={(e) => {
            // prevent closing on ESC key
            e.preventDefault()
          }}
        >
          <DialogTitle className='sr-only'>Payment Result</DialogTitle>
          {/* Render the payment page only when data is available */}
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

      {/* Renders the Success Dialog */}
      {isSuccessDialogOpen && (
        <BookingSuccessDialog bookingDetails={bookingDetails} onClose={() => setSuccessDialogOpen(false)} />
      )}

      {isFailedDialogOpen && (
        <BookingFailedDialog errorMessage={failureReason} onClose={() => setFailedDialogOpen(false)} />
      )}
    </div>
  )
}

export default ConsultantAppointmentPage
