import React from "react";

import { FaHeartbeat } from "react-icons/fa";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { BsPerson, BsTelephone, BsEnvelope, BsListCheck } from "react-icons/bs";

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  agreed: boolean;
}

export default function BookingForm() {
  const { register, handleSubmit, control } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Booking data:", data);
  };

  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto space-y-6 p-6 bg-white shadow-2xl rounded-xl">
      <div>
        <p className="text-[#1977CC] flex items-center gap-3"><FaHeartbeat /> BOOK AN APPOINTMENT</p>
      </div>
      <div className="text-4xl text-[#1C2359] font-bold">Book a Service</div>
      {/* Row 1: Name & Phone */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Input
            placeholder="Name"
            {...register("name")}
            className="pr-10"
          />
          <BsPerson className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="relative">
          <Input
            placeholder="Phone Number"
            {...register("phone")}
            className="pr-10"
          />
          <BsTelephone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Email */}
      <div className="relative">
        <Input
          placeholder="Email"
          type="email"
          {...register("email")}
          className="pr-10"
        />
        <BsEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Service Select */}
      <Controller
        control={control}
        name="service"
        render={({ field }) => (
          <div className="relative">
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full h-11">
                <SelectValue placeholder="Select a Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="therapy">Therapy</SelectItem>
                <SelectItem value="checkup">Check-up</SelectItem>
                <SelectItem value="diagnosis">Diagnosis</SelectItem>
                <SelectItem value="surgery">Surgery</SelectItem>
                <SelectItem value="followup">Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      {/* Message */}
      <Textarea placeholder="Your message..." {...register("message")} className="min-h-[120px]" />

      {/* Agreement & Price Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="agree" {...register("agreed")} />
          <Label htmlFor="agree" className="text-sm">I agree to the terms and conditions</Label>
        </div>
        <span className="text-xl font-bold text-right text-shadow-lg">$0</span>
      </div>

      {/* Submit */}
      <Button type="submit" className="mx-auto block w-1/2 bg-[#1A3973] text-white font-semibold rounded-md">
        Book An Appointment
      </Button>
    </form>
  );
}
