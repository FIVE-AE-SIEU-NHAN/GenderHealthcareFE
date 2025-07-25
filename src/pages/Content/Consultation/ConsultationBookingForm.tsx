import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar, Loader2 } from "lucide-react";
import { FaHeartbeat } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { timeSlotOptions, TOPIC_OPTIONS } from "@/Application/constants/appointment";
import { CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";


// --- THAY ĐỔI 1: Cập nhật Schema để đếm ký tự ---
export const formSchema = z.object({
  topic: z.string({ required_error: "Please select a consultation topic." }).min(1, "Please select a consultation topic."),
  booking_date: z.date({ required_error: "Please select a date." }),
  time_slot: z.string({ required_error: "Please select a time slot." }).min(1, "Please select a time slot."),
  note: z.string()
    .trim()
    .refine(value => {
      if (!value) return true; // Cho phép trường rỗng
      // Thay đổi từ đếm từ sang đếm ký tự
      const charCount = value.length; 
      return charCount >= 8 && charCount <= 50;
    }, {
      // Cập nhật thông báo lỗi
      message: "The note must be between 8 and 50 characters.",
    }),
  agreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms of use.",
  }),
});

interface AppointmentFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isPending: boolean;
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, isPending, form }) => {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 2); // Allow booking up to 2 months in advance

  const selectedTopicValue = form.watch("topic");
  const selectedDateValue = form.watch("booking_date");
  const selectedTimeSlotValue = form.watch("time_slot");
  
  // --- THAY ĐỔI 2: Cập nhật logic hiển thị để đếm ký tự ---
  const noteValue = form.watch("note") || "";
  // Thay đổi từ đếm từ sang đếm ký tự
  const charCount = noteValue.length;

  const getSelectedTopic = () => TOPIC_OPTIONS.find(t => t.value === selectedTopicValue);
  const getSelectedTimeSlotLabel = () => timeSlotOptions.find(t => t.value === selectedTimeSlotValue)?.label;

  return (
    <div className="relative z-10 flex justify-center w-full">
      <div className="w-full max-w-3xl px-4 md:px-0">
        <div className="text-center mb-12">
          <CardTitle className="text-4xl md:text-5xl font-bold text-[#1A3973] mb-3">Booking Consultant</CardTitle>
          <div className="w-60 h-1 bg-gradient-to-r from-[#1A3973] to-[#4F80E1] mx-auto"></div>
        </div>
        <div className="bg-white rounded-2xl p-8 text-black shadow-xl border border-gray-200 transition-all duration-300">
          <div className="text-center mb-6">
            <div className="bg-[#1A3973] rounded-full p-3 w-14 h-14 mx-auto mb-3 flex items-center justify-center shadow-sm">
              <FaHeartbeat className="text-3xl text-white" />
            </div>
            <CardTitle className="text-3xl font-bold mb-2 text-[#1A3973] text-shadow-lg">Book an Online Consultation</CardTitle>
          </div>
          <p className="mb-6 text-sm text-gray-700 text-center">Complete this contact form to schedule your first consultation with us!</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
              {/* Dropdown to pick consultation topic */}
              <FormField control={form.control} name="topic" render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select consultation topic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TOPIC_OPTIONS.map(topic => (
                        <SelectItem key={topic.value} value={topic.value}>{topic.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Select date and time */}
              <div className="grid grid-cols-2 gap-2">
                {/* Select date */}
                <FormField control={form.control} name="booking_date" render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button type="button" variant="outline" disabled={isPending} className="w-full justify-start text-left font-normal">
                            <Calendar className="mr-2 h-4 w-4 text-[#1A3973]" />
                            {field.value ? format(field.value, "dd/MM/yyyy") : "Select date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < today || date > maxDate || date.getDay() === 0}
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Select time */}
                <FormField control={form.control} name="time_slot" render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value} disabled={!form.watch("booking_date")}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlotOptions.map(slot => (
                          <SelectItem key={slot.value} value={slot.value}>{slot.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* --- THAY ĐỔI 3: Cập nhật hiển thị và placeholder --- */}
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note for the Consultant (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        // Cập nhật placeholder
                        placeholder="Please describe your current condition..."
                        className="resize-none h-30"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-between items-center mt-1">
                      <FormMessage />
                      <p className="text-sm text-gray-500 ml-auto">
                        {/* Hiển thị số ký tự */}
                        {charCount}/50
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              {/* Real-time info */}
              {getSelectedTopic() && (
                <div className="mt-4 bg-blue-50 p-4 rounded-md">
                  <p className="font-medium">Consultation topic: <span className="text-[#1A3973] font-bold">{getSelectedTopic()?.label}</span></p>
                  {selectedDateValue && (
                    <p className="font-medium mt-2">Date: <span className="text-[#1A3973] font-bold">{format(selectedDateValue, "dd/MM/yyyy")}</span></p>
                  )}
                  {selectedTimeSlotValue && (
                    <p className="font-medium mt-2">Time: <span className="text-[#1A3973] font-bold">{getSelectedTimeSlotLabel()}</span></p>
                  )}
                  <p>Price: <span className="text-[#1A3973] font-bold">5,000₫</span></p>
                </div>
              )}

              {/* Terms agreement checkbox */}
              <FormField control={form.control} name="agreed" render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0 mt-4">
                  <FormControl>
                    <Checkbox id="agreed" checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <label htmlFor="agreed" className="text-sm cursor-pointer">
                      I agree to the{" "}
                      <a href="/terms-and-privacy" className="text-[#1A3973] hover:underline" onClick={(e) => e.stopPropagation()}>
                        Terms of Use and Privacy Policy
                      </a>
                    </label>
                  </div>
                </FormItem>
              )} />

              {/* Submit button */}
              <div className="mt-6">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-[#1A3973] to-[#4F80E1] 
                            hover:from-[#15305f] hover:to-[#3a6ad0] text-white text-lg font-semibold 
                            rounded-lg py-3 shadow-lg hover:shadow-xl transition-all duration-300 
                            relative overflow-hidden group cursor-pointer"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/10 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <div className="relative flex items-center justify-center">
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        <span>Booking...</span>
                      </>
                    ) : (
                      <>
                        <FaHeartbeat className="mr-2"/>
                        <span>Book Consultant</span>
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};