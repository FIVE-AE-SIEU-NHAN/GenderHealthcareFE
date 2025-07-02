import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneCall, Calendar, Clock, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { BsCheckCircleFill, BsXCircle } from "react-icons/bs";
import { FaHeartbeat } from "react-icons/fa";
import { CardTitle, Card } from "@/components/ui/card";

import { useAppointmentMutations } from "@/hooks/customer/useAppointmentMutations";
import { TOPIC_OPTIONS } from "@/Application/constants/topics";


// List of consultants
const consultants = [
  { id: 1, name: "Dr. Nguyen Van A", speciality: "Psychologist", img: "/images/bs1.png" },
  { id: 2, name: "Ms. Tran Thi B", speciality: "Hormone Specialist", img: "/images/bs1.png" },
  { id: 3, name: "Dr. Le Van C", speciality: "Plastic Surgeon", img: "/images/bs1.png" },
  { id: 4, name: "Dr. Pham Thi D", speciality: "Gender Consultant", img: "/images/bs1.png" },
  { id: 5, name: "Dr. Hoang Van E", speciality: "Endocrinologist", img: "/images/bs1.png" },
  { id: 6, name: "Ms. Vu Thi F", speciality: "Psychologist", img: "/images/bs1.png" },
];

// Consultation time slots
const timeSlotOptions = [
  { value: "SLOT_08_10", label: "8:00 - 10:00" },
  { value: "SLOT_10_12", label: "10:00 - 12:00" },
  { value: "SLOT_13_15", label: "13:00 - 15:00" },
  { value: "SLOT_15_17", label: "15:00 - 17:00" },
];

// Form validation schema
const formSchema = z.object({
  topic: z.string({ required_error: "Please select a consultation topic." }).min(1, "Please select a consultation topic."),
  booking_date: z.date({ required_error: "Please select a date." }),
  time_slot: z.string({ required_error: "Please select a time slot." }).min(1, "Please select a time slot."),
  agreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms of use.",
  }),
});

const ConsultantAppointmentPage = () => {
  const { bookAppointment } = useAppointmentMutations();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({ topic: "", date: "", time: "" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      booking_date: undefined,
      time_slot: "",
      agreed: false,
    }
  });

  const selectedTopicValue = form.watch("topic");
  const selectedDateValue = form.watch("booking_date");
  const selectedTimeSlotValue = form.watch("time_slot");

  const getSelectedTopic = () => TOPIC_OPTIONS.find(t => t.value === selectedTopicValue);
  const getSelectedTimeSlotLabel = () => timeSlotOptions.find(t => t.value === selectedTimeSlotValue)?.label;

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      topic: values.topic,
      booking_date: values.booking_date,
      time_slot: values.time_slot,
    };

    bookAppointment.mutate(payload, {
      onSuccess: () => {
        const topicLabel = getSelectedTopic()?.label || "";
        const timeLabel = getSelectedTimeSlotLabel() || "";

        setBookingDetails({
          topic: topicLabel,
          date: format(values.booking_date, "dd/MM/yyyy", { locale: vi }),
          time: timeLabel
        });

        setShowSuccessMessage(true);
        form.reset();

        setTimeout(() => setShowSuccessMessage(false), 10000);
      }
    });
  }

  return (
    <div
      className="flex items-center justify-center max-[1125px]:min-h-[82vh] min-[1125px]:min-h-[77vh] relative bg-blend-overlay"
      style={{
        backgroundImage:
          "url('https://benhviengreen.com/wp-content/uploads/2016/05/doctor-health-wellness-1200x480.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/70 z-0"></div>

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

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">

                {/* Dropdown to pick consultation topic */}
                <FormField control={form.control} name="topic" render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select consultation topic" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TOPIC_OPTIONS.map(topic => (
                          <SelectItem
                            key={topic.value}
                            value={topic.value}>
                            {topic.label}
                          </SelectItem>
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
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full justify-start text-left font-normal">
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
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0)) || date.getDay() === 0}
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
                            <SelectItem
                              key={slot.value}
                              value={slot.value}>
                              {slot.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>


                {/* Real-time info */}
                {getSelectedTopic() && (
                  <div className="mt-4 bg-blue-50 p-4 rounded-md">
                    {/* Topic */}
                    <p className="font-medium">Consultation topic: {" "}
                      <span className="text-[#1A3973] font-bold">
                        {getSelectedTopic()?.label}
                      </span>
                    </p>

                    {/* Date */}
                    {form.watch("booking_date") && selectedDateValue && (
                      <p className="font-medium mt-2">Date: {" "}
                        <span className="text-[#1A3973] font-bold">
                          {format(form.watch("booking_date") as Date, "dd/MM/yyyy")}
                        </span>
                      </p>
                    )}

                    {/* Time */}
                    {form.watch("booking_date") && selectedTimeSlotValue && (
                      <p className="font-medium mt-2">Time: {" "}
                        <span className="text-[#1A3973] font-bold">
                          {getSelectedTimeSlotLabel()}
                        </span>
                      </p>
                    )}
                  </div>
                )}


                {/* Terms agreement checkbox */}
                <FormField control={form.control} name="agreed" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0 mt-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>

                    <div className="space-y-1 leading-none">
                      <label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <a href="/terms-and-privacy" className="text-[#1A3973] hover:underline">Terms of Use and Privacy Policy</a>
                      </label>
                    </div>
                  </FormItem>
                )} />

                {/* Submit button */}
                <div className="mt-6">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1A3973] to-[#4F80E1] hover:from-[#15305f] hover:to-[#3a6ad0] 
                                  text-white text-lg font-semibold rounded-lg py-3 
                                  shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                    <span className="absolute inset-0 w-full h-full bg-white/10 -skew-x-12 -translate-x-full 
                                      group-hover:translate-x-full transition-transform duration-700"></span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaHeartbeat className="mr-2" />
                      <span>Book Consultant</span>
                    </div>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Success notification + Form info */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),0_0_40px_-15px_rgba(26,57,115,0.2)] max-w-lg w-full relative text-black animate-fade-in-up">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowSuccessMessage(false)}>
              <BsXCircle size={24} />
            </button>
            <div className="text-center mb-6">
              <div className="bg-green-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
                <BsCheckCircleFill className="text-green-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-bold text-green-600">Consultation Booked Successfully!</h3>
              <p className="text-gray-500 mt-1">Thank you for trusting us</p>
            </div>
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-6">
              <h4 className="font-bold text-[#1A3973] mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />Appointment Details
              </h4>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-600">Consultant:</span>
                  <span className="font-medium text-blue-600">Will be assigned</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{bookingDetails.topic}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{bookingDetails.date}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{bookingDetails.time}</span>
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm text-center mb-6">
              We will contact you to confirm your appointment as soon as possible. Please keep your phone available.
            </p>
            <Button
              className="w-full bg-gradient-to-r from-[#1A3973] to-[#4F80E1] text-white py-3 rounded-lg font-medium"
              onClick={() => setShowSuccessMessage(false)}>
              Got it
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantAppointmentPage;