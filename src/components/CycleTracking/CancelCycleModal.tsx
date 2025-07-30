import React from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface CancelCycleModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isPending: boolean
}

export default function CancelCycleModal({ isOpen, onClose, onConfirm, isPending }: CancelCycleModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md rounded-2xl p-8'>
        <DialogHeader className='text-center'>
          <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100'>
            <AlertTriangle className='h-8 w-8 text-red-600' />
          </div>
          <DialogTitle className='mx-auto mt-4 text-2xl font-bold text-slate-800'>Cancel Current Cycle?</DialogTitle>
          <DialogDescription className='mt-2 text-lg text-slate-600'>
            This action cannot be undone. Cancelling will end tracking for this cycle.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mt-6 grid grid-cols-2 gap-4'>
          <Button variant='outline' onClick={onClose} disabled={isPending}>
            Back
          </Button>
          <Button variant='destructive' onClick={onConfirm} disabled={isPending}>
            {isPending ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
            Yes, Cancel Cycle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
