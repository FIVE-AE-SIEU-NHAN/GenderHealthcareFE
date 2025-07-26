import { useForm } from 'react-hook-form'
import { Sparkles, Flower2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { CycleFormData } from '@/types/cycle'
import ModernRating from './ModernRating'
import SleepHoursInput from './SleepHoursInput'

interface CycleFormViewProps {
    onSubmit: (data: CycleFormData) => void | Promise<void>
    initialData?: Partial<CycleFormData>
}

const ratingNames = {
    mood: 'Mood',
    libido: 'Libido',
    stress: 'Stress Level',
    energy: 'Energy'
}

export default function CycleFormView({ onSubmit, initialData }: CycleFormViewProps) {
    const form = useForm<CycleFormData>({
        defaultValues: {
            mood: 3,
            libido: 3,
            stress: 3,
            sleep: 8,
            energy: 3,
            ...(initialData || {})
        }
    })

    const handleSubmit = (data: CycleFormData) => {
        onSubmit(data)
    }

    const renderRatingField = (field: 'mood' | 'libido' | 'stress' | 'energy') => {
        const name = ratingNames[field]
        return (
            <FormField
                control={form.control}
                name={field}
                render={({ field: formField }) => (
                    <FormItem>
                        <FormControl>
                            <ModernRating
                                value={formField.value}
                                onChange={formField.onChange}
                                type={field}
                                label={name}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )
    }

    const renderSleepField = () => (
        <FormField
            control={form.control}
            name="sleep"
            rules={{
                required: 'Please enter the number of hours slept',
                min: { value: 1, message: 'The minimum sleep duration is 1 hour' },
                max: { value: 18, message: 'Sleep duration cannot exceed 18 hours' }
            }}
            render={({ field: formField, fieldState }) => (
                <FormItem>
                    <FormControl>
                        <SleepHoursInput
                            value={formField.value}
                            onChange={formField.onChange}
                            label="Sleep Hours"
                            error={fieldState.error?.message}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )

    return (
        <div className="mx-auto max-w-2xl">
            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-200/50">
                {/* Header */}
                <div className="bg-slate-800 p-8 text-white">
                    <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-white/10 p-4">
                            <Flower2 className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="mb-2 text-3xl font-bold">Update Daily Log</h1>
                            <p className="text-lg text-white/80">Rate your current well-being</p>
                        </div>
                    </div>
                </div>
                {/* Rating Form */}
                <div className="p-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                            <div className="space-y-6">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="rounded-xl bg-violet-500 p-3 text-white">
                                        <Sparkles className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800">Rate Current Status</h3>
                                </div>
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                        {renderRatingField('mood')}
                                        {renderRatingField('libido')}
                                        {renderRatingField('stress')}
                                        {renderRatingField('energy')}
                                    </div>
                                    <div className="mx-auto max-w-2xl">{renderSleepField()}</div>
                                </div>
                            </div>
                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    className="h-14 w-full rounded-xl bg-slate-800 text-xl font-bold shadow-md transition-all duration-300 hover:bg-slate-700"
                                >
                                    <Sparkles className="mr-3 h-6 w-6" />
                                    Save Daily Log
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}
