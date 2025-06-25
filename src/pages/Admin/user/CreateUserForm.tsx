import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  User as UserIcon,
  SendHorizonal,
  Briefcase,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserMutations } from "@/hooks/admin/useUserMutations";
import { USER_ROLE } from "@/Application/constants/admin/admin.userConstants";
import { CreateUserPayload } from "@/types/admin/userTypes";
import { TOPIC_OPTIONS } from "@/Application/constants/topics";
import { NewDatePicker } from "@/lib/DatePicker";
import { formatDate } from "@/utils/formatDate";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  gender: z.enum(['male', 'female', 'other'], { required_error: "Gender is required." }),
  phone_number: z.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, { message: "Please enter a valid Vietnamese phone number." }),
  date_of_birth: z.date({ required_error: "Date of birth is required." }),
  role: z.coerce.number({ required_error: "Role is required." }),
  specialization_1: z.string().optional(),
  specialization_2: z.string().optional(),
  certifications: z.string().optional(),
  experienceYears: z.coerce.number().optional(),
}).refine(data => {
  const IS_CONSULTANT = data.role === 1;
  if (IS_CONSULTANT) {
    return !!data.specialization_1 && !!data.certifications && data.experienceYears !== undefined;
  }
  return true;
}, {
  message: "Consultant-specific fields are required.",
  path: ['specialization_1'],
});

type CreateUserFormProps = {
  onSuccess: () => void;
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
      date_of_birth: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      ...values,
      date_of_birth: formatDate(values.date_of_birth, 'yyyy-MM-dd'),
    };
    try {
      await createUser.mutateAsync(payload as CreateUserPayload);
      onSuccess();
    } catch (error) {
      console.error("Create user mutation failed:", error);
    }
  }

  const selectedRole = form.watch("role");
  const IS_CONSULTANT = String(selectedRole) === "1";
  const selectedSpec1 = form.watch("specialization_1");

  const inputStyles = "shadow-inner shadow-black/5 transition-[box-shadow,border-color] duration-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:shadow-primary/10";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* === SECTION 1: ACCOUNT DETAILS === */}
        <Card className="pt-6 pb-6 animate-fade-in-up [animation-delay:50ms] [animation-fill-mode:backwards]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-semi-dark-blue text-lg text-shadow-md">
              <UserIcon className="h-6 w-6 text-semi-dark-blue" />
              Account Details
            </CardTitle>
            <CardDescription>Basic information for the user's account.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Full Name</FormLabel>
                <FormControl><Input className={inputStyles} placeholder="John Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl><Input type="email" className={inputStyles} placeholder="user@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Password</FormLabel>
                <FormControl><Input type="password" className={inputStyles} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="phone_number" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Phone Number</FormLabel>
                <FormControl><Input className={inputStyles} placeholder="09xxxxxxxx" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="date_of_birth" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Date of Birth</FormLabel>
                <FormControl>
                  <NewDatePicker
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="gender" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Gender</FormLabel>
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
              <FormItem className="flex"> {/* Logic preserved: className is untouched */}
                <FormLabel className="font-semibold">Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                  <FormControl><SelectTrigger className={inputStyles}><SelectValue placeholder="Select a role" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {USER_ROLE.SELECT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
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
          <Card className="pt-6 pb-6 animate-fade-in-up [animation-fill-mode:backwards]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-semi-dark-blue text-lg text-shadow-md">
                <Briefcase className="h-6 w-6 text-semi-dark-blue" />
                Consultant Profile
              </CardTitle>
              <CardDescription>These fields are required for the Consultant role.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <FormField control={form.control} name="specialization_1" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Primary Specialization</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger className={inputStyles}><SelectValue placeholder="Select a specialization" /></SelectTrigger></FormControl>
                    <SelectContent>{TOPIC_OPTIONS.map(o => (<SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>))}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="specialization_2" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Secondary Specialization (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger className={inputStyles}><SelectValue placeholder="Select a specialization" /></SelectTrigger></FormControl>
                    <SelectContent>{TOPIC_OPTIONS.map(o => (<SelectItem key={o.value} value={o.value} disabled={o.value === selectedSpec1}>{o.label}</SelectItem>))}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="certifications" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Certifications</FormLabel>
                  <FormControl><Input className={inputStyles} placeholder="e.g., PhD in Psychology" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="experienceYears" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Years of Experience</FormLabel>
                  <FormControl><Input type="number" min="0" className={inputStyles} placeholder="5" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
          </Card>
        )}

        {/* === SUBMIT BUTTON === */}
        <div className="flex justify-end animate-fade-in-up [animation-delay:300ms] [animation-fill-mode:backwards]">
          <Button
            type="submit"
            size="lg"
            disabled={createUser.isPending}
            className="font-bold text-lg bg-gradient-to-br from-primary to-blue-700 text-white shadow-md hover:shadow-lg hover:scale-101 transition-all duration-200"
          >
            {createUser.isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <SendHorizonal className="mr-2 h-5 w-5" />
            )}
            {createUser.isPending ? "Creating..." : "Create User"}
          </Button>
        </div>
      </form>
    </Form>
  );
}