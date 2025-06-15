import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  User as UserIcon,
  SendHorizonal,
  Briefcase,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserMutations } from "@/hooks/admin/useUserMutations";
import { USER_ROLE } from "@/Application/constants/admin/admin.userConstants";
import { CreateUserPayload } from "@/types/admin/userTypes";
import { TOPIC_OPTIONS } from "@/Application/constants/topics";

// Define the Zod schema for client-side validation.
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  gender: z.enum(['male', 'female', 'other'], { required_error: "Gender is required." }),
  phone_number: z.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, { message: "Please enter a valid Vietnamese phone number." }),
  date_of_birth: z.string().min(1, { message: "Date of birth is required." }),
  role: z.coerce.number({ required_error: "Role is required." }),

  // Optional fields for Consultants
  specialization_1: z.string().optional(),
  specialization_2: z.string().optional(),
  certifications: z.string().optional(),
  experienceYears: z.coerce.number().optional(),
}).refine(data => {
  const IS_CONSULTANT = data.role === 1; // Assuming 1 is the ID for the Consultant role.
  if (IS_CONSULTANT) {
    // If the user is a consultant, these fields become mandatory.
    return !!data.specialization_1 && !!data.certifications && data.experienceYears !== undefined;
  }
  return true;
}, {
  message: "Consultant-specific fields are required.",
  path: ['specialization_1'], // Attach the error to a relevant field.
});

type CreateUserFormProps = {
  onSuccess: () => void; // Callback to close the modal/dialog.
};

export function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const { createUser } = useUserMutations();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone_number: "",
      date_of_birth: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createUser.mutateAsync(values as CreateUserPayload);
      onSuccess();
    } catch (error) {
      console.error("Create user mutation failed:", error);
    }
  }

  const selectedRole = form.watch("role");
  const IS_CONSULTANT = String(selectedRole) === "1";

  // Watch specialization_1 to disable it in the specialization_2 dropdown
  const selectedSpec1 = form.watch("specialization_1");

  const inputStyles = "shadow-inner shadow-black/5";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* === SECTION 1: ACCOUNT DETAILS === */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserIcon /> Account Details</CardTitle>
            <CardDescription>Basic information for the user's account.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input className={inputStyles} placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" className={inputStyles} placeholder="user@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="password" render={({ field }) => (<FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" className={inputStyles} {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="phone_number" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input className={inputStyles} placeholder="09xxxxxxxx" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="date_of_birth" render={({ field }) => (<FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" className={inputStyles} {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="gender" render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger className={inputStyles}><SelectValue placeholder="Select a gender" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="role" render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                  <FormControl><SelectTrigger className={inputStyles}><SelectValue placeholder="Select a role" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {USER_ROLE.SELECT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        {/* === SECTION 2: CONSULTANT DETAILS (Conditional) === */}
        {IS_CONSULTANT && (
          <Card className="animate-in fade-in-50 duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Briefcase /> Consultant Profile</CardTitle>
              <CardDescription>These fields are required for the Consultant role.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="specialization_1"
                render={({ field }) => (
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
              <FormField
                control={form.control}
                name="specialization_2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Specialization (Optional)</FormLabel>
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
              <FormField control={form.control} name="certifications" render={({ field }) => (<FormItem><FormLabel>Certifications</FormLabel><FormControl><Input className={inputStyles} placeholder="e.g., PhD in Psychology" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="experienceYears" render={({ field }) => (<FormItem><FormLabel>Years of Experience</FormLabel><FormControl><Input type="number" min="0" className={inputStyles} placeholder="5" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </CardContent>
          </Card>
        )}

        {/* === SUBMIT BUTTON === */}
        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg" disabled={createUser.isPending}>
            {createUser.isPending ? "Creating..." : "Create User"}
            {!createUser.isPending && <SendHorizonal className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}