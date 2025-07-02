import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Loader2, UserCircle, Save } from "lucide-react";

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
import type { User } from "@/types/user";

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

export function EditProfileForm({ currentUser, onSuccess }: EditProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentUser.name || "",
      phone_number: currentUser.phone_number || "",
      gender: (currentUser.gender as "male" | "female" | "other") || undefined,
      date_of_birth: currentUser.date_of_birth
        ? new Date(currentUser.date_of_birth)
        : undefined,
    },
  });

  const handleFakeSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Updated values (fake):", values);
      setIsSubmitting(false);
      onSuccess(); // Close dialog or show success toast, etc.
    }, 1500);
  };

  const inputStyles =
    "shadow-inner shadow-black/5 transition-[box-shadow,border-color] duration-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:shadow-primary/10";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFakeSubmit)} className="space-y-8">
        <Card className="pt-4 pb-4">
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
              {/* Name */}
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

              {/* Phone */}
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

              {/* DOB */}
              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-semibold">Date of Birth</FormLabel>
                    <FormControl>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
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

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="font-bold text-lg bg-gradient-to-br from-primary to-blue-700 text-white shadow-md hover:shadow-lg hover:scale-101 transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
