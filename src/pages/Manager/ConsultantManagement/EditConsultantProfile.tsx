import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SendHorizonal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useConsultantMutations } from "@/hooks/manager/useConsultantMutations";
import { TOPIC_OPTIONS } from "@/Application/constants/appointment";
import { ConsultantProfile } from "@/types/consultant/profileTypes";

const formSchema = z.object({
  specialization_1: z.string().optional(),
  specialization_2: z.string().optional(),
  certifications: z.string().optional(),
  experienceYears: z.coerce.number().min(0),
});

type EditConsultantFormProps = {
  consultant: ConsultantProfile;
  onSuccess: () => void;
};

export function EditConsultantForm({ consultant, onSuccess }: EditConsultantFormProps) {
  const { updateProfile } = useConsultantMutations();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialization_1: consultant.specialization_1 || "",
      specialization_2: consultant.specialization_2 || "",
      certifications: consultant.certifications || "",
      experienceYears: consultant.experienceYears || 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const changedValues: Partial<z.infer<typeof formSchema>> = {};

    (Object.keys(values) as Array<keyof typeof values>).forEach(key => {
      const formValue = values[key];
      const originalValue = consultant[key as keyof typeof consultant];

      if (formValue !== originalValue && !(formValue === '' && (originalValue == null))) {
        (changedValues as any)[key] = formValue;
      }
    });

    if (Object.keys(changedValues).length === 0) {
      onSuccess();
      return;
    }

    try {
      await updateProfile.mutateAsync({
        consultantId: consultant.id,
        ...changedValues,
      });
      onSuccess();
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  const selectedSpec1 = form.watch("specialization_1");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="specialization_1" render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Specialization</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a specialization" /></SelectTrigger></FormControl>
                <SelectContent>
                  {TOPIC_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField control={form.control} name="specialization_2" render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Specialization</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a specialization" /></SelectTrigger></FormControl>
                <SelectContent>
                  {TOPIC_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value} disabled={option.value === selectedSpec1}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField control={form.control} name="certifications" render={({ field }) => (<FormItem><FormLabel>Certifications</FormLabel><FormControl><Input placeholder="e.g., PhD in Psychology" {...field} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={form.control} name="experienceYears" render={({ field }) => (<FormItem><FormLabel>Years of Experience</FormLabel><FormControl><Input type="number" min="0" placeholder="5" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? "Saving..." : "Save Changes"}
            {!updateProfile.isPending && <SendHorizonal className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}