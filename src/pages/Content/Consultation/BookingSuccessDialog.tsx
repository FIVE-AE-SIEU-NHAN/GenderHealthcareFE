import { Button } from '@/components/ui/button'
import { Calendar, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

interface BookingSuccessDialogProps {
  bookingDetails: {
    topic: string
    date: string
    time: string
  }
  onClose: () => void
}

export function BookingSuccessDialog({ bookingDetails, onClose }: BookingSuccessDialogProps) {
  const navigate = useNavigate()

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleCloseAndNavigate = () => {
    // If a timer is running, clear it to prevent it from firing again.
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    onClose() // Close the dialog (removes it from the DOM)
    navigate('/user/appointments')
  }

  // --- Timeout when the component mounts ---
  useEffect(() => {
    // Start the timer when the dialog appears.
    timerRef.current = setTimeout(() => {
      handleCloseAndNavigate()
    }, 10000) // 10 secs

    // Run when the component unmounts (onClose is called).
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return (
    <div className='animate-fade-in-up fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
      <div className='relative m-4 w-full max-w-lg rounded-2xl bg-white p-8 text-black shadow-xl'>
        {/* Close Button */}
        <button
          className='absolute top-3 right-3 text-gray-400 transition-colors hover:text-gray-600'
          onClick={handleCloseAndNavigate}
          aria-label='Close'
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className='mb-6 text-center'>
          <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100'>
            <BsCheckCircleFill className='text-5xl text-green-500' />
          </div>
          <h3 className='text-2xl font-bold text-green-600'>Consultation Booked Successfully!</h3>
          <p className='mt-1 text-gray-500'>Thank you for trusting us.</p>
        </div>

        <div className='mb-6 rounded-xl border border-blue-100 bg-blue-50 p-5'>
          <h4 className='mb-3 flex items-center font-bold text-[#1A3973]'>
            <Calendar className='mr-2 h-4 w-4' />
            Appointment Details
          </h4>
          <div className='space-y-2 text-sm'>
            <p className='flex justify-between'>
              <span className='text-gray-600'>Service:</span>
              <span className='font-medium'>{bookingDetails.topic}</span>
            </p>
            <p className='flex justify-between'>
              <span className='text-gray-600'>Date:</span>
              <span className='font-medium'>{bookingDetails.date}</span>
            </p>
            <p className='flex justify-between'>
              <span className='text-gray-600'>Time:</span>
              <span className='font-medium'>{bookingDetails.time}</span>
            </p>
          </div>
        </div>

        <p className='mb-6 text-center text-sm text-gray-600'>
          We will contact you to confirm your appointment. Please keep your phone available.
        </p>

        <Button
          className='group relative w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-[#1A3973] to-[#4F80E1] py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-[#15305f] hover:to-[#3a6ad0] hover:shadow-xl'
          onClick={handleCloseAndNavigate}
        >
          <span className='absolute inset-0 h-full w-full -translate-x-full -skew-x-12 bg-white/10 transition-transform duration-700 group-hover:translate-x-full'></span>
          <div className='relative flex items-center justify-center'>Got it</div>
        </Button>
      </div>
    </div>
  )
}
