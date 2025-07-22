import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { MessageSquare, Info } from 'lucide-react'

import type { Question } from '@/types'
import { formatDate } from '@/utils/formatDate'
import { cn } from '@/lib/utils' // +++ IMPORT cn UTILITY

interface ViewAnswerDialogProps {
  question: Question | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewAnswerDialog({ question, open, onOpenChange }: ViewAnswerDialogProps) {
  if (!question) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex flex-col p-0 sm:max-w-2xl'>
        <DialogHeader className='p-6 pb-4'>
          <DialogTitle className='text-2xl font-bold tracking-tight'>Question Details</DialogTitle>
          <DialogDescription>Review your question and the consultant's answer below.</DialogDescription>
        </DialogHeader>

        <ScrollArea className='max-h-[60vh] px-6 pb-6'>
          <div className='space-y-6'>
            {/* Your Question */}
            <div>
              <div className='mb-3 flex items-center justify-between'>
                <h3 className='text-lg font-semibold'>Your Question</h3>
                {/* +++ ADDED TOPIC BADGE FOR CONTEXT +++ */}
                <Badge
                  className={cn(
                    'text-xs font-medium',
                    question.topic === 'WOMENS_REPRODUCTIVE_HEALTH'
                      ? 'border-purple-500/50 bg-purple-500/10 text-purple-700'
                      : question.topic === 'CONTRACEPTION_AND_FAMILY_PLANNING'
                        ? 'border-blue-500/50 bg-blue-500/10 text-blue-700'
                        : question.topic === 'PREGNANCY_AND_MATERNITY_SUPPORT'
                          ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700'
                          : question.topic === 'STIS'
                            ? 'border-green-500/50 bg-green-500/10 text-green-700'
                            : question.topic === 'SEXUAL_HEALTH_AND_GENDER_PSYCHOLOGY'
                              ? 'border-gray-500/50 bg-gray-500/10 text-gray-700'
                              : question.topic === 'TESTING_AND_DIAGNOSTIC_SERVICES' &&
                                'border-pink-500/50 bg-pink-500/10 text-pink-700'
                  )}
                >
                  {question.topic.replace(/_/g, ' ')}
                </Badge>
              </div>
              <div className='prose prose-sm dark:prose-invert max-w-none rounded-md border bg-slate-50 p-4'>
                <blockquote>{question.question}</blockquote>
              </div>
              <div className='text-muted-foreground mt-2 text-xs'>Asked on {formatDate(question.created_at)}</div>
            </div>

            <Separator />

            {/* Consultant's Answer */}
            <div>
              <h3 className='mb-2 flex items-center gap-2 text-lg font-semibold'>
                <MessageSquare className='text-primary h-5 w-5' />
                Consultant's Answer
              </h3>
              {question.answer ? (
                <>
                  <div className='prose prose-sm dark:prose-invert max-w-none rounded-md border border-blue-200 bg-blue-50 p-4'>
                    <p>{question.answer}</p>
                  </div>
                  {question.answered_at && (
                    <div className='text-muted-foreground mt-2 text-xs'>
                      Answered on {formatDate(question.answered_at)}
                    </div>
                  )}
                </>
              ) : (
                <Alert variant='default' className='border-amber-200 bg-amber-50'>
                  <Info className='h-4 w-4 text-amber-600' />
                  <AlertTitle className='text-amber-800'>Awaiting Answer</AlertTitle>
                  <AlertDescription className='text-amber-700'>
                    This question is pending. A consultant will review and answer it shortly.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
