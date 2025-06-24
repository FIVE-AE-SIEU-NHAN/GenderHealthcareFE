import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useProfileMutations } from "@/hooks/customer/useProfileMutations";
import type { User } from "@/types/user";
import { UpdateProfilePayload } from "@/types/customer/profileTypes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { NewDatePicker } from "@/lib/DatePicker"; // Adjust path as needed

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  date_of_birth: z.date({ required_error: "Date of birth is required." }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required.",
  }),
  phone_number: z
    .string()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, {
      message: "Please enter a valid Vietnamese phone number.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface EditProfileFormProps {
  currentUser: User;
  onSuccess: () => void;
}

export function EditProfileForm({
  currentUser,
  onSuccess,
}: EditProfileFormProps) {
  const { updateProfileMutation } = useProfileMutations();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentUser.name || "",
      phone_number: currentUser.phone_number || "",
      gender:
        (currentUser.gender as "male" | "female" | "other") || null,
      date_of_birth: currentUser.date_of_birth
        ? new Date(currentUser.date_of_birth)
        : undefined,
    },
  });

  async function onSubmit(values: FormValues) {
    const changedValues: Record<string, any> = {};
    const defaults = form.formState.defaultValues!;

    for (const key of Object.keys(values) as (keyof FormValues)[]) {
      const newVal = values[key];
      const oldVal = defaults[key];

      // Special case: compare dates by ISO string
      if (newVal instanceof Date && oldVal instanceof Date) {
        if (newVal.toISOString() !== oldVal.toISOString()) {
          changedValues[key] = newVal.toISOString();
        }
      } else if (newVal !== oldVal) {
        changedValues[key] = newVal;
      }
    }

    if (Object.keys(changedValues).length === 0) {
      onSuccess();
      return;
    }

    try {
      await updateProfileMutation.mutateAsync(
        changedValues as UpdateProfilePayload
      );
      onSuccess();
    } catch (error) {
      console.error("Update profile failed:", error);
    }

    console.log(changedValues);
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="09xxxxxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date Picker */}
        <Controller
          name="date_of_birth"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <NewDatePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender Select */}
        <Controller
          name="gender"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={updateProfileMutation.isPending}>
            {updateProfileMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
