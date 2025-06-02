import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Phone } from "lucide-react";

export interface FormData {
  fullName: string;
  phone: string;
  dob: Date | string; // Date object (if using DatePicker) or ISO string
  gender: "male" | "female" | "other";
  service: string; // e.g., 'general', 'sexual-health', etc.
  doctor: string;  // e.g., 'dr-smith', 'dr-jones', etc.
  shift: "7-9h" | "9-11h" | "13-15h" | "15-17h";
  message?: string;
  terms: boolean;
}


const BookingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    console.log("Signup data:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-10 bg-[url('@/assets/images/bs1.webp')] bg-cover bg-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-base 
        [&_label]:font-semibold [&_input]:h-11">

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="form-icon" />
            <Input
              id="phone"
              type="tel"
              placeholder="+1 234 567 890"
              {...register("phone")}
              className="pl-8"
            />
          </div>
        </div>

        {/* Gender & Date of Birth */}
        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="dob"
            render={({ field }) => <DatePicker field={field} />}
          />

          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full h-11 min-h-[2.75rem] px-3">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Type of Service */}
        <div className="space-y-2">
          <Label htmlFor="service">Type of Service</Label>
          <Controller
            control={control}
            name="service"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Consultation</SelectItem>
                  <SelectItem value="sexual-health">Sexual Health Checkup</SelectItem>
                  <SelectItem value="contraception">Contraceptive Advice</SelectItem>
                  <SelectItem value="std-screening">STD Screening</SelectItem>
                  <SelectItem value="counseling">Counseling</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Doctor */}
        <div className="space-y-2">
          <Label htmlFor="doctor">Doctor</Label>
          <Controller
            control={control}
            name="doctor"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                  <SelectItem value="dr-jones">Dr. Jones</SelectItem>
                  <SelectItem value="dr-lee">Dr. Lee</SelectItem>
                  <SelectItem value="dr-tan">Dr. Tan</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Shift */}
        <div className="space-y-2">
          <Label htmlFor="shift">Shift</Label>
          <Controller
            control={control}
            name="shift"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select a shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7-9h">7:00 - 9:00</SelectItem>
                  <SelectItem value="9-11h">9:00 - 11:00</SelectItem>
                  <SelectItem value="13-15h">13:00 - 15:00</SelectItem>
                  <SelectItem value="15-17h">15:00 - 17:00</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Write any concerns or details..."
            {...register("message")}
          />
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
          <Label htmlFor="terms" className="text-sm">
            I accept the <span className="underline cursor-pointer">terms and services</span>.
          </Label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="h-[45px] w-full bg-dark-blue active:bg-[#131045] active:scale-[0.99] 
      shadow-sm hover:bg-dark-blue text-lg cursor-pointer transition-all duration-200 ease-in-out"
        >
          Book Service
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
