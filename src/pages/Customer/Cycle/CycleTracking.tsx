import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { Loader2, Frown, PlusCircle, Bell, XCircle } from 'lucide-react'
import CycleCalendar from '@/components/CycleTracking/CycleCalendar'
import CycleSummary from '@/components/CycleTracking/CycleSummary'
import { Button } from '@/components/ui/button'
import { useActiveCycleCheck, useAllPredictions, useCycle } from '@/hooks/cycle/useCycle'
import { useCycleMutations } from '@/hooks/cycle/useCycleMutations'
import { DashboardLayoutContext } from '@/components/layouts/Dashboard/DashboardLayout'
import CancelCycleModal from '@/components/CycleTracking/CancelCycleModal'

export default function CycleTrackingPage() {
  const navigate = useNavigate()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  const [currentMonth, setCurrentMonth] = useState(new Date())

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)

  const { hasActiveCycle, isLoading: isLoadingCheck, isError: isErrorCheck, error: checkError } = useActiveCycleCheck()

  const { predictions: monthPredictions, isLoading: isLoadingPredictions } = useCycle(currentMonth)
  const { allPredictions } = useAllPredictions()

  const activePredictionForSummary = useMemo(() => allPredictions.find((p) => p.status === 'ACTIVE'), [allPredictions])

  const cancelCycleMutation = useCycleMutations().cancelCycle
  const { mutate: cancelCycle, isPending: isCancelling } = cancelCycleMutation

  useEffect(() => {
    setBreadcrumb({
      title: 'Your Cycle',
      parent: 'Dashboard',
      parentHref: '/user'
    })
  }, [setBreadcrumb])

  if (isLoadingCheck) {
    return (
      <div className='flex min-h-[calc(100vh-72px)] items-center justify-center bg-slate-50'>
        <Loader2 className='h-12 w-12 animate-spin text-pink-500' />
      </div>
    )
  }

  const handleConfirmCancel = () => {
    if (activePredictionForSummary?.cycle_id) {
      cancelCycle({ cycleId: activePredictionForSummary.cycle_id })
    }
  }

  if (isErrorCheck) {
    return (
      <div className='flex min-h-[calc(100vh-72px)] items-center justify-center bg-red-50 p-4 text-center'>
        <div>
          <Frown className='mx-auto h-12 w-12 text-red-600' />
          <h2 className='mt-4 text-2xl font-bold text-red-800'>Could not load cycle data</h2>
          <p className='mt-2 text-slate-600'>{checkError?.message}</p>
          <Button onClick={() => navigate(0)} className='mt-6'>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // --- MAIN CALENDAR VIEW ---
  return (
    <div className='max-h-[calc(84vh)] overflow-y-auto'>
      <div className='relative z-10 container mx-auto px-4 py-8'>
        <div className='space-y-8'>
          {/* Header */}
          <div className='space-y-6 text-center'>
            {/* <div className='inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm'>
              <Heart className='h-5 w-5 animate-pulse text-pink-500' />
              <span className='text-sm font-medium text-slate-600'>Your reproductive health</span>
            </div> */}
            <h1 className='text-4xl font-extrabold text-slate-800 md:text-5xl'>Your Cycle Calendar</h1>
            {hasActiveCycle && (
              <div className='flex justify-center gap-3'>
                <Button
                  onClick={() => setIsCancelModalOpen(true)} // This now opens the modal
                  variant='destructive'
                  className='group rounded-full px-6 py-3 shadow-lg'
                >
                  <XCircle className='mr-2 h-4 w-4' />
                  Cancel Current Cycle
                </Button>
                <Button
                  onClick={() => {}}
                  variant='outline'
                  className='group rounded-lg border-white/20 bg-blue-500/90 px-6 py-3 text-white shadow-lg backdrop-blur-sm transition-colors duration-300 hover:bg-blue-600 hover:text-white'
                  disabled={isCancelling}
                >
                  {isCancelling ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : (
                    <XCircle className='mr-2 h-4 w-4' />
                  )}
                  Demo Button
                </Button>
              </div>
            )}
          </div>

          {hasActiveCycle ? (
            <CycleSummary activePrediction={activePredictionForSummary} />
          ) : (
            <div className='mx-auto max-w-4xl rounded-2xl border border-blue-200 bg-gradient-to-tr from-blue-50 to-indigo-100 p-6 text-center shadow-lg'>
              <div className='flex flex-col items-center gap-4 md:flex-row md:text-left'>
                <div className='flex-shrink-0'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-md'>
                    <Bell className='h-6 w-6' />
                  </div>
                </div>
                <div className='flex-grow'>
                  <h3 className='text-xl font-bold text-slate-800'>Welcome to Your Cycle Calendar!</h3>
                  <p className='mt-1 text-slate-600'>
                    You don't have an active cycle yet. Create one to unlock personalized predictions and start tracking
                    your health.
                  </p>
                </div>
                <div className='mt-4 w-full flex-shrink-0 md:mt-0 md:w-auto'>
                  <Button size='lg' asChild className='w-full md:w-auto'>
                    <Link to='/cycle-form'>
                      <PlusCircle className='mr-2 h-5 w-5' />
                      Start New Cycle
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}

          <CycleCalendar
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            predictions={monthPredictions}
            isLoading={isLoadingPredictions}
          />

          <CancelCycleModal
            isOpen={isCancelModalOpen}
            onClose={() => setIsCancelModalOpen(false)}
            onConfirm={handleConfirmCancel}
            isPending={isCancelling}
          />
        </div>
      </div>
    </div>
  )
}
