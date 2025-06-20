import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Loader2, MessageSquareQuote, Pencil } from 'lucide-react';

import type { Question } from '@/types';
import { useQuestionMutations } from '@/hooks/consultant/useQuestionMutations';

const answerSchema = z.object({
  answer: z.string().min(20, 'Answer must be at least 20 characters long.')
                   .max(1000, 'Answer cannot exceed 1000 characters.'),
});

type AnswerFormData = z.infer<typeof answerSchema>;

interface AnswerQuestionDialogProps {
  question: Question | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AnswerQuestionDialog({ question, open, onOpenChange, onSuccess }: AnswerQuestionDialogProps) {
  const { answerQuestion, editAnswer } = useQuestionMutations();

  const isEditing = !!question?.answer;
  const mutation = isEditing ? editAnswer : answerQuestion;

  const form = useForm<AnswerFormData>({
    resolver: zodResolver(answerSchema),
    // Pre-fill the form with the existing answer if available, or reset if question changes
    values: {
      answer: question?.answer || '',
    },
  });

  const onSubmit = (data: AnswerFormData) => {
    if (!question) return;

    mutation.mutate(
      { questionId: question.id, answer: data.answer },
      {
        onSuccess: () => {
          onSuccess(); 
          form.reset();
        },
      }
    );
  };

  if (!question) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl flex flex-col p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
            {isEditing ? <Pencil className="h-6 w-6" /> : <MessageSquareQuote className="h-6 w-6" />}
            {isEditing ? 'Edit Answer' : 'Answer Question'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Modify the existing answer for the question below.' : 'Provide a comprehensive answer for the question below.'}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6">
          <div className="space-y-4 py-4">
            <h3 className="font-semibold text-lg">Question Details</h3>
            <div className="prose prose-sm max-w-none dark:prose-invert bg-slate-50 border rounded-md p-4">
              <blockquote>{question.question}</blockquote>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Topic:</span>
              <Badge variant="secondary">{question.topic}</Badge>
            </div>
          </div>
          <Separator className="my-4" />
          <Form {...form}>
            <form id="answer-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" />
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Your Answer</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your detailed answer here..."
                        className="min-h-[200px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </Form>
        </ScrollArea>

        <DialogFooter className="p-6 bg-slate-50 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button type="submit" form="answer-form" disabled={mutation.isPending}>
            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Save Changes' : 'Submit Answer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}