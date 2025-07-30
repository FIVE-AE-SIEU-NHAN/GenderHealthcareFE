import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useTestResult } from '@/hooks/customer/useAppointments' // Adjust path if needed
import { Activity, AlertCircle, FileText, Loader2 } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import { TestResultItem } from '@/types/customer/appointmentTypes'
import { TEST_SERVICE_NAMES } from '@/types/doctor/serviceAppointmentTypes'

interface TestResultModalProps {
  isOpen: boolean
  onClose: () => void
  appointmentId: string | null
}

/**
 * A flexible, card-based component to display a single test result item.
 * This is more robust against long text than a table cell.
 */
const ResultItemCard: React.FC<{ item: TestResultItem }> = ({ item }) => {
  const testName = TEST_SERVICE_NAMES[item.test_service_id] || `Unknown Test (${item.test_service_id})`

  return (
    <div className='rounded-lg border bg-gray-50/50 p-4 shadow-sm'>
      {/* Card Header: Test Name */}
      <h3 className='text-lg font-bold text-gray-800'>{testName}</h3>

      {/* Card Body: Grid for key-value pairs */}
      <div className='mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 md:grid-cols-3'>
        <div>
          <p className='text-sm font-medium text-gray-500'>Result</p>
          <p className='font-semibold text-gray-900'>{item.result}</p>
        </div>
        <div>
          <p className='text-sm font-medium text-gray-500'>Unit</p>
          <p className='font-semibold text-gray-900'>{item.unit || 'N/A'}</p>
        </div>
        <div>
          <p className='text-sm font-medium text-gray-500'>Test Date</p>
          <p className='font-semibold text-gray-900'>{formatDate(item.test_date, 'MMM d, yyyy')}</p>
        </div>
      </div>

      {/* Card Footer: Doctor's Note (only if it exists) */}
      {item.note && (
        <div className='mt-4'>
          <p className='text-sm font-medium text-gray-500'>Doctor's Note</p>
          {/* Using a blockquote for notes is semantically appropriate and easy to style */}
          <blockquote className='mt-1 border-l-4 border-gray-300 bg-gray-100 p-3 text-gray-700 italic'>
            {/* The 'break-words' class is key to preventing overflow */}
            <p className='break-words'>{item.note}</p>
          </blockquote>
        </div>
      )}
    </div>
  )
}

export function TestResultModal({ isOpen, onClose, appointmentId }: TestResultModalProps) {
  const { data: results, isLoading, isError, error } = useTestResult(appointmentId)

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='flex h-40 items-center justify-center gap-2'>
          <Loader2 className='h-6 w-6 animate-spin text-blue-500' />
          <p className='text-gray-600'>Loading results...</p>
        </div>
      )
    }

    if (isError) {
      return (
        <div className='flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-600'>
          <AlertCircle className='h-5 w-5' />
          <p>Cannot load results right now: {(error as Error).message}</p>
        </div>
      )
    }

    if (!results || results.length === 0) {
      return (
        <div className='flex h-40 flex-col items-center justify-center gap-3 text-center text-gray-500'>
          <FileText className='h-10 w-10 text-gray-400' />
          <p>No test results are available for this appointment.</p>
        </div>
      )
    }

    // Render a list of cards, with space between them
    return (
      <div className='max-h-[60vh] space-y-4 overflow-y-auto p-1'>
        {results.map((item) => (
          <ResultItemCard key={item.id} item={item} />
        ))}
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:min-w-sm md:min-w-2xl lg:min-w-4xl xl:min-w-6xl'>
        <DialogHeader className='rounded-t-lg border-b bg-gradient-to-br from-slate-50 to-slate-100 p-6 pb-4'>
          <div className='flex items-center gap-4'>
            <div className='from-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br to-blue-700'>
              <Activity className='h-8 w-8 text-white' />
            </div>
            <div className='flex flex-col'>
              <DialogTitle className='text-foreground text-3xl font-bold tracking-tight'>Test Results</DialogTitle>
              <DialogDescription className='text-muted-foreground mt-1 text-base'>
                Here are the detailed results for your service appointment. Please consult a professional for
                interpretation.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className='mt-4'>{renderContent()}</div>
      </DialogContent>
    </Dialog>
  )
}
