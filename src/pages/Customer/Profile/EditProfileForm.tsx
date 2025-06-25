import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, UserCircle, Save } from "lucide-react"; // <-- Import new icons

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
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewDatePicker } from "@/lib/DatePicker";
import { ConsultantProfile } from "@/types/consultant/profileTypes";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  date_of_birth: z.date({ required_error: "Date of birth is required." }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required.",
  }),
  phone_number: z.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, {
    message: "Please enter a valid Vietnamese phone number.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface EditProfileFormProps {
  currentUser: User | ConsultantProfile;
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
      gender: (currentUser.gender as "male" | "female" | "other") || undefined, // Use undefined for placeholder
      date_of_birth: currentUser.date_of_birth
        ? new Date(currentUser.date_of_birth)
        : undefined,
    },
  });

  // This logic remains the same as you requested
  async function onSubmit(values: FormValues) {
    const changedValues: Record<string, any> = {};
    const defaults = form.formState.defaultValues!;

    const toUTCDateISOString = (date: Date | null | undefined): string | null => {
      if (!date) return null;
      const offset = date.getTimezoneOffset();
      const adjustedDate = new Date(date.getTime() - offset * 60000);
      return adjustedDate.toISOString();
    };

    for (const key of Object.keys(values) as (keyof FormValues)[]) {
      const newVal = values[key];
      const oldVal = defaults[key];

      if (newVal instanceof Date) {
        const newDateString = toUTCDateISOString(newVal);
        const oldDateString = toUTCDateISOString(oldVal as Date);

        if (newDateString !== oldDateString) {
          changedValues[key] = newDateString;
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
  }

  const inputStyles = "shadow-inner shadow-black/5 transition-[box-shadow,border-color] duration-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:shadow-primary/10";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="animate-fade-in-up [animation-delay:100ms] [animation-fill-mode:backwards] pt-4 pb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-semi-dark-blue text-lg text-shadow-md">
              <UserCircle className="h-6 w-6 text-semi-dark-blue" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Update your personal details. Click save when you are finished.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className={inputStyles}
                        placeholder="John Doe"
                        {...field}
                      />
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
                    <FormLabel className="font-semibold">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        className={inputStyles}
                        placeholder="09xxxxxxxx"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Picker */}
              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-semibold">Date of Birth</FormLabel>
                    <FormControl>
                      <NewDatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender Select */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className={inputStyles}>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end animate-fade-in-up [animation-delay:300ms] [animation-fill-mode:backwards]">
          <Button
            type="submit"
            disabled={updateProfileMutation.isPending}
            size="lg"
            className="font-bold text-lg bg-gradient-to-br from-primary to-blue-700 text-white shadow-md hover:shadow-lg hover:scale-101 transition-all duration-200"
          >
            {updateProfileMutation.isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Save className="mr-2 h-5 w-5" />
            )}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}