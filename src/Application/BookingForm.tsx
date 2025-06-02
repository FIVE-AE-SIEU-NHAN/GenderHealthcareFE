import React, { useState, useEffect } from "react";
import { FaHeartbeat } from "react-icons/fa";
import { BsClock, BsCalendar } from "react-icons/bs";
import { Link } from 'react-router-dom';
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
  date: string;
  time: string;
  message: string;
  agreed: boolean;
}

// Định nghĩa bảng giá cho các dịch vụ
const servicePrices = {
  consultation: 200000,
  therapy: 350000,
  checkup: 500000,
  diagnosis: 600000,
  surgery: 1000000,
  followup: 250000,
};

export default function BookingForm() {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<FormData>();
  const [price, setPrice] = useState<number>(0);
  
  // Theo dõi giá trị của trường service
  const selectedService = watch("service");
  
  // Cập nhật giá khi dịch vụ được chọn thay đổi
  useEffect(() => {
    if (selectedService && selectedService in servicePrices) {
      setPrice(servicePrices[selectedService as keyof typeof servicePrices]);
    } else {
      setPrice(0);
    }
  }, [selectedService]);

  const onSubmit = (data: FormData) => {
    console.log("Booking data:", data);
    console.log("Price:", price);
  };
  
  // Hàm để định dạng giá tiền theo VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto space-y-6 p-6 bg-white shadow-2xl rounded-xl">
      <div>
        <p className="text-[#1977CC] flex items-center gap-3"><FaHeartbeat /> ĐẶT LỊCH HẸN</p>
      </div>
      <div className="text-4xl text-[#1C2359] font-bold">Đặt Dịch Vụ</div>
      
      <div className="relative">
        <Input
          placeholder="Số điện thoại"
          {...register("phone")}
          className="pr-10"
        />
        <BsTelephone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      <div className="relative">
        <Input
          placeholder="Email"
          type="email"
          {...register("email", { 
            required: "Email là bắt buộc", 
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Địa chỉ email không hợp lệ"
            }
          })}
          className={`pr-10 ${errors.email ? "border-red-500" : ""}`}
        />
        <BsEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <Controller
        control={control}
        name="service"
        rules={{ required: "Vui lòng chọn dịch vụ" }}
        render={({ field }) => (
          <div className="relative">
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className={`w-full h-11 ${errors.service ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Chọn dịch vụ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">Tư vấn - 200.000₫</SelectItem>
                <SelectItem value="therapy">Liệu pháp - 350.000₫</SelectItem>
                <SelectItem value="checkup">Kiểm tra sức khỏe - 500.000₫</SelectItem>
                <SelectItem value="diagnosis">Chẩn đoán - 600.000₫</SelectItem>
                <SelectItem value="surgery">Phẫu thuật - 1.000.000₫</SelectItem>
                <SelectItem value="followup">Tái khám - 250.000₫</SelectItem>
              </SelectContent>
            </Select>
            {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service.message}</p>}
          </div>
        )}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Input
            type="date"
            placeholder="Chọn ngày"
            {...register("date", { required: "Vui lòng chọn ngày" })}
            className={`pr-10 ${errors.date ? "border-red-500" : ""}`}
          />
          <BsCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
        </div>
        
        <Controller
          control={control}
          name="time"
          rules={{ required: "Vui lòng chọn giờ" }}
          render={({ field }) => (
            <div className="relative">
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={`w-full h-11 ${errors.time ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Chọn giờ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="08:00">08:00</SelectItem>
                  <SelectItem value="09:00">09:00</SelectItem>
                  <SelectItem value="10:00">10:00</SelectItem>
                  <SelectItem value="11:00">11:00</SelectItem>
                  <SelectItem value="13:00">13:00</SelectItem>
                  <SelectItem value="14:00">14:00</SelectItem>
                  <SelectItem value="15:00">15:00</SelectItem>
                  <SelectItem value="16:00">16:00</SelectItem>
                </SelectContent>
              </Select>
              <BsClock className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>}
            </div>
          )}
        />
      </div>

      <Textarea placeholder="Tin nhắn của bạn..." {...register("message")} className="min-h-[120px]" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox 
            id="agree" 
            {...register("agreed")} 
            className="h-4 w-4 border-gray-300 rounded text-[#1A3973] focus:ring-[#1A3973]"
          />
          <div className="flex items-center flex-wrap">
            <Label htmlFor="agree" className="text-sm text-gray-700 mr-1">Tôi đồng ý với các</Label>
            <Link 
              to={"#"} 
              className="text-sm font-medium text-[#1A3973] hover:text-[#2A59A3] transition-colors duration-300 underline"
            >
              điều khoản và điều kiện
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm text-gray-600">Phí dịch vụ:</span>
          <span className="text-xl font-bold text-right text-[#1C2359]">{formatCurrency(price)}</span>
        </div>
      </div>

      <Button 
        type="submit" 
        className="mx-auto block w-1/2 bg-[#1A3973] hover:bg-[#2A59A3] transition-colors duration-300 text-white font-semibold rounded-md"
      >
        Đặt Lịch Hẹn
      </Button>
    </form>
  );
}
