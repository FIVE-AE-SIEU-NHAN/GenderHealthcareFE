import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneCall, Calendar, Users, User, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { BsCheckCircleFill, BsXCircle } from "react-icons/bs";
import { FaHeartbeat } from "react-icons/fa";
import { CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

interface FormData {
  phone: string;
  service: string;
  date: Date | undefined;
  time: string;
  note: string;
  agreed: boolean;
}

const BookingForm = () => {
  const { register, handleSubmit, control, watch, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      service: "",
      date: undefined,
      time: "",
      phone: "",
      note: "",
      agreed: false,
    }
  });
  
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    service: "",
    date: "",
    time: "",
    price: ""
  });
  
  const navigate = useNavigate();
  
  // Khung giờ có sẵn - đã thay đổi thành khung giờ 2 tiếng
  const availableTimes = [
    "7:00 - 9:00",
    "9:00 - 11:00",
    "13:00 - 15:00",
    "15:00 - 17:00"
  ];
  
  // Services and corresponding prices (translated to English)
  const services = [
    { id: "consultation", name: "General Consultation", price: 200000 },
    { id: "hormone-therapy", name: "Hormone Therapy", price: 1500000 },
    { id: "gender-affirming-surgery", name: "Gender Affirming Surgery", price: 30000000 },
    { id: "mental-health", name: "Mental Health Counseling", price: 500000 },
    { id: "voice-therapy", name: "Voice Therapy", price: 800000 },
  ];
  
  // Định dạng tiền tệ
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Theo dõi giá trị của trường service
  const selectedService = watch("service");
  
  // Cập nhật giá khi dịch vụ được chọn thay đổi
  const getSelectedServicePrice = (): number => {
    const service = services.find(s => s.id === selectedService);
    return service ? service.price : 0;
  };
  
  // Lấy tên dịch vụ đã chọn
  const getSelectedServiceName = (): string => {
    const service = services.find(s => s.id === selectedService);
    return service ? service.name : "";
  };
  
  // Xử lý submit form
  const onSubmit = (data: FormData) => {
    const formattedDate = data.date ? format(data.date, "dd/MM/yyyy", { locale: vi }) : "";
    const formattedPrice = formatCurrency(getSelectedServicePrice());
    const serviceName = getSelectedServiceName();
    
    const bookingInfo = {
      service: serviceName,
      date: formattedDate,
      time: data.time,
      phone: data.phone,
      note: data.note,
      price: formattedPrice,
    };
    
    // Lấy history từ localStorage
    const existingHistory = JSON.parse(localStorage.getItem("bookingHistory") || "[]");
    
    // Thêm booking mới
    const updatedHistory = [...existingHistory, bookingInfo];
    
    // Lưu trở lại vào localStorage
    localStorage.setItem("bookingHistory", JSON.stringify(updatedHistory));
    
    // Lưu booking mới nhất
    localStorage.setItem("latestBooking", JSON.stringify(bookingInfo));
    
    // Lưu thông tin đặt lịch để hiển thị trong modal
    setBookingDetails({
      service: serviceName,
      date: formattedDate,
      time: data.time,
      price: formattedPrice
    });
    
    // Hiển thị thông báo thành công
    setShowSuccessMessage(true);
    
    // Reset form để đặt lịch mới
    reset();
    
    // Sau 10 giây, ẩn thông báo và chuyển hướng
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 10000);
  };
  
  return (
    <div 
      className="min-h-screen p-6 md:p-10 lg:p-16 relative"
      style={{
        backgroundImage: "linear-gradient(135deg, rgba(240, 245, 255, 0.97), rgba(230, 240, 255, 0.95)), url('/images/medical-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Page Title */}
      <div className="text-center mb-12">
        <CardTitle className="text-4xl md:text-5xl font-bold text-[#1A3973] mb-3">Healthcare Services</CardTitle>
        <div className="w-60 h-1 bg-gradient-to-r from-[#1A3973] to-[#4F80E1] mx-auto"></div>
      </div>

      <div className="flex justify-center">
        <div className="bg-white rounded-2xl p-10 md:p-16 text-black 
                        shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_0_30px_-15px_rgba(26,57,115,0.2)] 
                        border border-white hover:shadow-[0_25px_65px_-15px_rgba(0,0,0,0.2),0_0_40px_-15px_rgba(26,57,115,0.3)] 
                        transition-all duration-300 mx-auto max-w-3xl w-full">
          <div className="relative mb-5">
            <div className="bg-[#1A3973] rounded-full p-3 w-14 h-14 mx-auto mb-3 flex items-center justify-center shadow-sm">
              <FaHeartbeat className="text-3xl text-white" />
            </div>
            
            <CardTitle className="text-3xl font-bold mb-4 text-center text-[#1A3973] text-shadow-lg">Book an Appointment</CardTitle>
            <p className="text-sm text-gray-600 text-center mt-2">
              Complete this contact form to schedule your first appointment with us!
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Phone Number */}
            <div className="w-full">
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</Label>
              <Controller 
                name="phone"
                control={control}
                rules={{ required: "Please enter your phone number" }}
                render={({ field }) => (
                  <Input 
                    placeholder="Enter your phone number" 
                    type="tel" 
                    className={`w-full rounded-lg border-gray-300 ${errors.phone ? "border-red-500 ring-1 ring-red-300" : ""}`}
                    {...field}
                  />
                )}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
            </div>
            
            {/* Service */}
            <div className="w-full">
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Service</Label>
              <Controller
                name="service"
                control={control}
                rules={{ required: "Please select a service" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={`w-full rounded-lg ${errors.service ? "border-red-500 ring-1 ring-red-300" : ""}`}>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - {formatCurrency(service.price)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service.message}</p>}
            </div>
            
            {/* Select Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Select Date */}
              <div className="w-full">
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Date</Label>
                <Controller
                  control={control}
                  name="date"
                  rules={{ required: "Please select a date" }}
                  render={({ field }) => (
                    <div className="w-full">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className={`w-full justify-start text-left font-normal rounded-lg
                              ${errors.date ? "border-red-500 ring-1 ring-red-300" : ""}`}
                          >
                            <Calendar className="mr-2 h-4 w-4 text-[#1A3973]" />
                            {field.value ? format(field.value, "dd/MM/yyyy", { locale: vi }) : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-lg border-[#1A3973]/20">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={(date) => 
                              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                              date > new Date(new Date().setMonth(new Date().getMonth() + 2)) ||
                              date.getDay() === 0
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                />
                {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
              </div>
              
              {/* Select Time */}
              <div className="w-full">
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Time</Label>
                <Controller
                  control={control}
                  name="time"
                  rules={{ required: "Please select a time" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} disabled={!watch("date")}>
                      <SelectTrigger className={`w-full rounded-lg ${errors.time ? "border-red-500 ring-1 ring-red-300" : ""}`}>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTimes.map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>}
              </div>
            </div>

            {selectedService && (
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 shadow-inner">
                <p className="font-medium flex justify-between">
                  <span>Service Price:</span>
                  <span className="text-[#1A3973] font-bold">{formatCurrency(getSelectedServicePrice())}</span>
                </p>
                {watch("date") && watch("time") && (
                  <p className="font-medium flex justify-between mt-2">
                    <span>Appointment Time:</span>
                    <span className="text-[#1A3973] font-bold">
                      {format(watch("date") as Date, "dd/MM/yyyy", { locale: vi })} - {watch("time")}
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* Note */}
            <div className="w-full">
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Note</Label>
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <Textarea 
                    placeholder="Describe your symptoms or any specific requests if any" 
                    className="w-full rounded-lg border-gray-300 focus:ring-[#1A3973] focus:border-[#1A3973]"
                    rows={4}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex items-center space-x-3">
              <Controller
                name="agreed"
                control={control}
                rules={{ required: "You must agree to the terms" }}
                render={({ field }) => (
                  <Checkbox 
                    id="terms" 
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    className="border-gray-400 text-[#1A3973] focus:ring-[#1A3973]"
                  />
                )}
              />
              <Label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the <a href="/terms-and-privacy" className="text-[#1A3973] hover:underline">Terms of Use and Privacy Policy</a>
              </Label>
            </div>
            {errors.agreed && <p className="mt-1 text-sm text-red-500">{errors.agreed.message}</p>}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1A3973] to-[#4F80E1] hover:from-[#15305f] hover:to-[#3a6ad0] 
                text-white text-lg font-semibold rounded-lg py-3 
                shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              disabled={!!Object.keys(errors).length}
            >
              <span className="absolute inset-0 w-full h-full bg-white/10 -skew-x-12 -translate-x-full 
                    group-hover:translate-x-full transition-transform duration-700"></span>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaHeartbeat className="mr-2" />
                <span>Book Appointment</span>
              </div>
            </Button>
          </form>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),0_0_40px_-15px_rgba(26,57,115,0.2)] 
                      max-w-md w-full relative text-black animate-fade-in-up">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowSuccessMessage(false)}
            >
              <BsXCircle size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="bg-green-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
                <BsCheckCircleFill className="text-green-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-bold text-green-600">Appointment Booked Successfully!</h3>
              <p className="text-gray-500 mt-1">Thank you for trusting us</p>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-6">
              <h4 className="font-bold text-[#1A3973] mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Appointment Details
              </h4>
              
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{bookingDetails.service}</span>
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
              onClick={() => setShowSuccessMessage(false)}
            >
              Got it
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;