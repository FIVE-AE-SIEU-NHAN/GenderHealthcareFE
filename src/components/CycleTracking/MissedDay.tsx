import React from 'react'
import { CalendarX } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface MissedDayModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MissedDayModal({ isOpen, onClose }: MissedDayModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md rounded-2xl p-8 text-center'>
        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
          <CalendarX className='h-8 w-8 text-red-600' />
        </div>
        <DialogHeader className='mt-4'>
          <DialogTitle className='mx-auto text-2xl font-bold text-slate-800'>Rating Missed</DialogTitle>
          <DialogDescription className='mt-2 text-lg text-slate-600'>
            This day was not rated in time and is now locked. Consistent tracking helps improve the accuracy of your
            cycle predictions.
          </DialogDescription>
        </DialogHeader>
        <div className='mt-6'>
          <Button onClick={onClose} className='w-full bg-slate-800 hover:bg-slate-700'>
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
