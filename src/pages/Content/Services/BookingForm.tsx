import React, { useState, useEffect } from "react";
import { FaHeartbeat } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { BsXCircle } from "react-icons/bs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import logo from "@/assets/images/logo1.png";
import { DatePickerNormal } from "@/lib/DatePicker";

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

// Định nghĩa tên dịch vụ bằng tiếng Việt
const serviceNames = {
  consultation: "Tư vấn",
  therapy: "Liệu pháp",
  checkup: "Kiểm tra sức khỏe",
  diagnosis: "Chẩn đoán",
  surgery: "Phẫu thuật",
  followup: "Tái khám",
};

export default function BookingForm() {
  const { register, handleSubmit, control, watch, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      service: "",
      date: "",
      time: "",
      phone: "",
      message: "",
      agreed: false,
    }
  });

  const [price, setPrice] = useState<number>(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<{
    service: string;
    date: string;
    time: string;
  }>({
    service: "",
    date: "",
    time: "",
  });

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

  const navigate = useNavigate(); // Inside your component

  const onSubmit = (data: FormData) => {
    const formattedDate = data.date
      ? format(new Date(data.date), "dd/MM/yyyy")
      : "";

    const formattedPrice = formatCurrency(price);

    const bookingInfo = {
      service: serviceNames[data.service as keyof typeof serviceNames] || data.service,
      date: formattedDate,
      time: data.time,
      phone: data.phone,
      message: data.message,
      price: formattedPrice,
    };

    // ✅ Get existing history from localStorage
    const existingHistory = JSON.parse(localStorage.getItem("bookingHistory") || "[]");

    // ✅ Append new booking
    const updatedHistory = [...existingHistory, bookingInfo];

    // ✅ Save back to localStorage
    localStorage.setItem("bookingHistory", JSON.stringify(updatedHistory));

    // ✅ Also save the latest booking separately if needed
    localStorage.setItem("latestBooking", JSON.stringify(bookingInfo));

    // ✅ Update local state for display
    setBookingDetails({
      service: bookingInfo.service,
      date: bookingInfo.date,
      time: bookingInfo.time
    });

    setShowSuccessMessage(true);

    // ✅ After 10 seconds, hide message, reset form, and redirect
    setTimeout(() => {
      setShowSuccessMessage(false);
      reset();
      navigate("/"); // Redirect to homepage
    }, 10000);
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
    <>
      <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-68px)]
                    bg-[url('@/assets/images/ab1.webp')] bg-no-repeat bg-center bg-cover relative">
        <div className="overlay absolute inset-0 bg-black/20 z-0" />

        {showSuccessMessage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setShowSuccessMessage(false);
                  reset();
                }}
              >
                <BsXCircle size={20} />
              </button>

              <div className="text-center mb-4">
                <BsCheckCircleFill className="text-green-500 text-5xl mx-auto" />
                <h3 className="text-2xl font-bold text-green-600 mt-2">Đặt Lịch Thành Công!</h3>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="font-bold mb-2">Chi tiết lịch hẹn:</p>
                <p><span className="font-medium">Dịch vụ:</span> {bookingDetails.service}</p>
                <p><span className="font-medium">Ngày:</span> {bookingDetails.date}</p>
                <p><span className="font-medium">Giờ:</span> {bookingDetails.time}</p>
              </div>

              <p className="mt-4 text-gray-600">
                Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Chúng tôi sẽ gửi email xác nhận chi tiết.
              </p>

              <button
                className="mt-4 w-full bg-[#1A3973] hover:bg-[#2A59A3] text-white py-2 rounded-md transition-colors"
                onClick={() => {
                  setShowSuccessMessage(false);
                  reset();
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        <Card className="w-full max-w-xl shadow-2xl animate-fade-in-up z-10 mt-8 mb-8">
          <CardHeader className="text-center">
            <img src={logo} alt="logo" className="mx-auto w-20" />
            <CardTitle className="text-2xl font-bold text-dark-blue text-shadow-lg">
              Đơn Đặt Lịch Hẹn
            </CardTitle>
          </CardHeader>
          <CardContent className="mb-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-base 
              [&_label]:font-semibold [&_input]:h-11">
              <div>
                <p className="text-[#1977CC] flex items-center gap-3 -mt-3 mb-5 font-bold"><FaHeartbeat /> DỊCH VỤ</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Số điện thoại</Label>
                <Input
                  placeholder="090 123 4567"
                  {...register("phone", { required: "Vui lòng nhập số điện thoại" })}
                  className={`pr-10 ${errors.phone ? "border-red-500 ring-1 ring-red-300" : ""}`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              <Controller
                control={control}
                name="service"
                rules={{ required: "Vui lòng chọn dịch vụ" }}
                render={({ field }) => (
                  <div className="space-y-2 relative">
                    <Label htmlFor="service">Loại Dịch vụ</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`w-full h-11 ${errors.service ? "border-red-500 ring-1 ring-red-300" : ""}`}>
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

              <div className="grid grid-cols-2 relative">
                <div className="space-y-2">
                  <Label htmlFor="dob">Ngày Hẹn</Label>
                  <Controller
                    control={control}
                    rules={{ required: "Vui lòng chọn ngày" }}
                    name="date"
                    render={({ field }) => <DatePickerNormal field={field} error={!!errors.date} />}
                  />
                  {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
                </div>

                <div className="space-y-2 ">
                  <Label htmlFor="time">Giờ Hẹn</Label>
                  <Controller
                    control={control}
                    name="time"
                    rules={{ required: "Vui lòng chọn giờ" }}
                    render={({ field }) => (
                      <div className="relative">
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className={`w-full h-11 p-[17.2px] ${errors.time ? "border-red-500 ring-1 ring-red-300" : ""}`}>
                            <SelectValue placeholder="Chọn ca làm" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7:00 - 9:00">7h-9h</SelectItem>
                            <SelectItem value="9:00 - 11:00">9h-11h</SelectItem>
                            <SelectItem value="13:00 - 15:00">13h-15h</SelectItem>
                            <SelectItem value="15:00 - 17:00">15h-17h</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>}
                      </div>
                    )}
                  />
                </div>
              </div>

              <Textarea placeholder="Tin nhắn của bạn..." {...register("message")} className="min-h-[120px]" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Controller
                    control={control}
                    name="agreed"
                    rules={{ required: "Bạn cần đồng ý với điều khoản" }}
                    render={({ field }) => (
                      <Checkbox
                        id="agree"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="h-4 w-4 border-gray-300 rounded text-[#1A3973] focus:ring-[#1A3973]"
                      />
                    )}
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
              {errors.agreed && <p className="mt-1 text-sm text-red-500 text-center">{errors.agreed.message}</p>}

              <Button
                type="submit"
                className="mx-auto block w-3/4 md:w-2/3 bg-gradient-to-r from-[#1A3973] to-[#2A59A3] transition-all duration-300 text-white text-lg font-semibold rounded-lg px-10 py-4 shadow-lg hover:shadow-xl transform hover:translate-y-[-2px] relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaHeartbeat className="text-white text-lg mr-2" />
                  <span>Đặt Lịch Hẹn</span>
                </div>
              </Button>
            </form>
          </CardContent>
        </Card>

      </div>
    </>
  );
}