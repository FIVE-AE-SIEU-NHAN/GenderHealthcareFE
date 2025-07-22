import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ShieldX } from 'lucide-react'

interface BookingFailedDialogProps {
  onClose: () => void
  errorMessage?: string
}

export function BookingFailedDialog({ onClose, errorMessage }: BookingFailedDialogProps) {
  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className='overflow-hidden p-0 sm:max-w-md'>
        {/* Decorative Header */}
        <div className='flex flex-col items-center p-8 text-center'>
          {/* Icon */}
          <div className='mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100'>
            <ShieldX className='h-12 w-12 text-red-600' />
          </div>

          {/* Title */}
          <h2 className='text-3xl font-bold text-slate-800'>Payment Unsuccessful</h2>

          {/* Main Message */}
          <p className='mt-2 text-slate-500'>Your appointment has not been booked.</p>

          {/* Specific Error Reason from Backend */}
          {errorMessage && (
            <div className='mt-6 w-full rounded-lg border bg-slate-50 p-4 text-left'>
              <p className='text-sm font-semibold text-slate-600'>Reason:</p>
              <p className='mt-1 font-mono text-sm text-red-700'>{errorMessage}</p>
            </div>
          )}

          {/* Action Button */}
          <Button
            className='group relative mt-8 w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-[#1A3973] to-[#4F80E1] py-6 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-[#15305f] hover:to-[#3a6ad0] hover:shadow-xl'
            onClick={onClose}
          >
            <span className='absolute inset-0 h-full w-full -translate-x-full -skew-x-12 bg-white/10 transition-transform duration-700 group-hover:translate-x-full'></span>
            <div className='relative flex items-center justify-center'>Try Again</div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
