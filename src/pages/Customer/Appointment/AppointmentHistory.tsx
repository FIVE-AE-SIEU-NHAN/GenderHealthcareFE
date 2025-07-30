import React, { useEffect, useState } from 'react'
import { CalendarClock, Clock, History, AlertCircle } from 'lucide-react'
import AppointmentIllustration1 from '@/assets/images/appointment1.svg'
import AppointmentIllustration2 from '@/assets/images/appointment2.svg'
import { useOutletContext } from 'react-router-dom'
import { DashboardLayoutContext } from '@/components/layouts/Dashboard/DashboardLayout'
import { ConsultantBookingCard } from './ConsultantBookingHistoryCard'
import { useCombinedCustomerAppointments } from '@/hooks/customer/useAppointments'
import { ServiceBookingHistoryCard } from './ServiceBookingHistoryCard'
import { CombinedAppointment } from '@/types/customer/appointmentTypes'
import { TestResultModal } from './TestResultModal'

export default function AppointmentHistory() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  const [viewingResultsFor, setViewingResultsFor] = useState<string | null>(null)

  useEffect(() => {
    setBreadcrumb({
      title: 'Appointments History',
      parent: 'Dashboard',
      parentHref: '/user'
    })
  }, [setBreadcrumb])

  // ================ USE APPOINTMENTS HISTORY HOOK ===============
  const { data: bookingHistory, isLoading, isError } = useCombinedCustomerAppointments()

  const handleViewResults = (appointmentId: string) => {
    setViewingResultsFor(appointmentId)
  }

  const handleCloseModal = () => {
    setViewingResultsFor(null)
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='relative max-h-[80vh] space-y-6 overflow-y-auto border-l-2 border-transparent pl-6'>
          <ConsultantBookingCard.Skeleton />
          <ServiceBookingHistoryCard.Skeleton />
          <ConsultantBookingCard.Skeleton />
        </div>
      )
    }

    if (isError) {
      return (
        <div className='flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-600'>
          <AlertCircle className='h-5 w-5' />
          <p>Cannot check your Booking History right now</p>
        </div>
      )
    }

    if (!bookingHistory || bookingHistory.length === 0) {
      return <p className='mt-8 text-center text-gray-500'>No booking history available.</p>
    }

    return (
      <div className='relative max-h-[80vh] space-y-6 overflow-y-auto border-l-2 border-blue-200 pb-6 pl-6'>
        {bookingHistory.map((booking: CombinedAppointment, index) => {
          if (booking.type === 'CONSULTATION') {
            return <ConsultantBookingCard key={`consult-${index}`} booking={booking} isHighlighted={index === 0} />
          } else if (booking.type === 'SERVICE') {
            return (
              <ServiceBookingHistoryCard
                key={`service-${index}`}
                booking={booking}
                isHighlighted={index === 0}
                onViewResults={handleViewResults}
              />
            )
          }
          return null
        })}
      </div>
    )
  }

  return (
    <>
      <div className='relative flex max-h-[calc(84vh)] flex-col gap-6 overflow-hidden lg:flex-row'>
        {/* --- Blurred Blobs --- */}
        <div className='absolute top-26 left-86 -z-1 h-72 w-72 rounded-full bg-blue-100 opacity-60 blur-3xl' />
        <div className='absolute bottom-20 left-86 -z-1 h-80 w-80 rounded-full bg-purple-200 opacity-50 blur-3xl' />
        <div className='absolute top-1/2 right-10 z-0 h-56 w-56 rounded-full bg-pink-200 opacity-40 blur-2xl' />

        {/* LEFT: Rules */}
        <div className='z-10 mt-7 hidden max-h-[80vh] max-w-lg flex-col overflow-y-auto rounded-lg bg-white p-6 shadow-md lg:flex'>
          <h2 className='mb-4 border-b border-blue-200 pb-2 text-center text-2xl font-semibold text-blue-900'>Rules</h2>

          <div className='text-md space-y-4 leading-relaxed font-bold text-gray-700'>
            <p>
              1.<span className='font-normal'> Please arrive on time to ensure your schedule is not affected.</span>
            </p>
            <p>
              2.
              <span className='font-normal'>
                {' '}
                If you need to cancel or reschedule, please notify us at least 24 hours in advance.
              </span>
            </p>
            <p>
              3.
              <span className='font-normal'>
                {' '}
                Bring necessary identification documents when coming for an appointment.
              </span>
            </p>
            <p>
              4.
              <span className='font-normal'>
                {' '}
                Maintain cleanliness and follow clinic regulations to ensure everyone's safety.
              </span>
            </p>
            <p>
              5.
              <span className='font-normal'>
                {' '}
                Do not bring dangerous items or prohibited substances into the clinic.
              </span>
            </p>
            <p>
              6.
              <span className='font-normal'>
                {' '}
                If you have symptoms of a contagious disease, please inform us beforehand for proper arrangements.
              </span>
            </p>
            <p>
              7.<span className='font-normal'> For any questions or complaints, please contact customer service.</span>
            </p>
            <p>
              8.
              <span className='font-normal'>
                {' '}
                The clinic reserves the right to refuse service if the rules are not followed.
              </span>
            </p>
            <p>
              9.
              <span className='font-normal'>
                {' '}
                Personal information will be kept confidential according to clinic policy.
              </span>
            </p>
            <p>
              10.<span className='font-normal'> Thank you for trusting and using our services.</span>
            </p>
          </div>
          <Clock className='bottom-7 left-10 z-0 h-12 w-12 -rotate-6 text-indigo-300 opacity-40' />
        </div>

        {/* MIDDLE: Timeline */}
        <div className='z-10 mr-0 ml-9 max-w-110 flex-1'>
          <h1 className='mb-6 flex items-center gap-2 text-3xl font-bold text-blue-900'>
            <History className='h-7 w-7 text-blue-600' />
            Booking History
          </h1>
          {renderContent()}
        </div>

        {/* RIGHT: Illustration */}
        <div className='z-10 hidden flex-1 flex-col items-center justify-center gap-20 lg:flex'>
          <img
            src={AppointmentIllustration1}
            alt='booking illustration 1'
            className='h-auto w-full max-w-md object-contain opacity-90'
          />
          <img
            src={AppointmentIllustration2}
            alt='booking illustration 2'
            className='h-auto w-full max-w-md object-contain opacity-90'
          />
          <CalendarClock className='absolute top-10 right-32 -z-1 h-16 w-16 rotate-12 text-blue-300 opacity-20' />
        </div>
      </div>

      <TestResultModal isOpen={!!viewingResultsFor} onClose={handleCloseModal} appointmentId={viewingResultsFor} />
    </>
  )
}
