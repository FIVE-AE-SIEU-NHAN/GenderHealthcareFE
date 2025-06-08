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

const AppointmentPage = () => {
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
  
  // Dịch vụ và giá tương ứng
  const services = [
    { id: "consultation", name: "Tư vấn chung", price: 200000 },
    { id: "hormone-therapy", name: "Liệu pháp hormone", price: 1500000 },
    { id: "gender-affirming-surgery", name: "Phẫu thuật khẳng định giới tính", price: 30000000 },
    { id: "mental-health", name: "Tư vấn sức khỏe tâm thần", price: 500000 },
    { id: "voice-therapy", name: "Liệu pháp giọng nói", price: 800000 },
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
      navigate("/");
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
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A3973] mb-3">
          Dịch Vụ Chăm Sóc Sức Khỏe
        </h1>
        <div className="w-60 h-1 bg-gradient-to-r from-[#1A3973] to-[#4F80E1] mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto items-start">
        {/* Left Form Section */}
        <div className="bg-white rounded-2xl p-8 md:p-10 text-black 
                        shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_0_30px_-15px_rgba(26,57,115,0.2)] 
                        border border-white hover:shadow-[0_25px_65px_-15px_rgba(0,0,0,0.2),0_0_40px_-15px_rgba(26,57,115,0.3)] 
                        transition-all duration-300">
          <div className="relative mb-5">
            <div className="bg-[#1A3973] rounded-full p-3 w-14 h-14 mx-auto mb-3 flex items-center justify-center shadow-sm">
              <FaHeartbeat className="text-3xl text-white" />
            </div>
            
            <CardTitle className="text-3xl font-bold mb-4 text-center text-[#1A3973] text-shadow-lg">Đặt Lịch Hẹn Khám</CardTitle>
            <p className="text-sm text-gray-600 text-center mt-2">
              Hoàn thành mẫu liên hệ này để sắp xếp cuộc hẹn đầu tiên của bạn với chúng tôi!
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Số điện thoại */}
            <div className="w-full">
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Số điện thoại</Label>
              <Controller 
                name="phone"
                control={control}
                rules={{ required: "Vui lòng nhập số điện thoại" }}
                render={({ field }) => (
                  <Input 
                    placeholder="Nhập số điện thoại của bạn" 
                    type="tel" 
                    className={`w-full rounded-lg border-gray-300 ${errors.phone ? "border-red-500 ring-1 ring-red-300" : ""}`}
                    {...field}
                  />
                )}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
            </div>
            
            {/* Dịch vụ */}
            <div className="w-full">
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Dịch vụ</Label>
              <Controller
                name="service"
                control={control}
                rules={{ required: "Vui lòng chọn dịch vụ" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={`w-full rounded-lg ${errors.service ? "border-red-500 ring-1 ring-red-300" : ""}`}>
                      <SelectValue placeholder="Chọn dịch vụ" />
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
            
            {/* Chọn ngày và giờ */}
            <div className="grid grid-cols-2 gap-4">
              {/* Chọn ngày */}
              <div className="w-full">
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Ngày khám</Label>
                <Controller
                  control={control}
                  name="date"
                  rules={{ required: "Vui lòng chọn ngày" }}
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
                            {field.value ? format(field.value, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-lg border-[#1A3973]/20">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={(date) => 
                              date < new Date(new Date().setHours(0, 0, 0, 0)) || // Không chọn ngày trong quá khứ
                              date > new Date(new Date().setMonth(new Date().getMonth() + 2)) || // Không chọn ngày xa quá 2 tháng
                              date.getDay() === 0 // Không chọn Chủ nhật
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                />
                {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
              </div>
              
              {/* Chọn giờ */}
              <div className="w-full">
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Giờ khám</Label>
                <Controller
                  control={control}
                  name="time"
                  rules={{ required: "Vui lòng chọn giờ" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} disabled={!watch("date")}>
                      <SelectTrigger className={`w-full rounded-lg ${errors.time ? "border-red-500 ring-1 ring-red-300" : ""}`}>
                        <SelectValue placeholder="Chọn giờ" />
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
                  <span>Giá dịch vụ:</span>
                  <span className="text-[#1A3973] font-bold">{formatCurrency(getSelectedServicePrice())}</span>
                </p>
                {watch("date") && watch("time") && (
                  <p className="font-medium flex justify-between mt-2">
                    <span>Thời gian hẹn:</span>
                    <span className="text-[#1A3973] font-bold">
                      {format(watch("date") as Date, "dd/MM/yyyy", { locale: vi })} - {watch("time")}
                    </span>
                  </p>
                )}
              </div>
            )}

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Ghi chú</Label>
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <Textarea 
                    placeholder="Mô tả triệu chứng hoặc yêu cầu cụ thể nếu có" 
                    className="w-full rounded-lg border-gray-300 focus:ring-[#1A3973] focus:border-[#1A3973]"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex items-center space-x-3">
              <Controller
                name="agreed"
                control={control}
                rules={{ required: "Bạn cần đồng ý với điều khoản" }}
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
                Tôi đồng ý với <a href="/terms-and-privacy" className="text-[#1A3973] hover:underline">Điều khoản sử dụng và Chính sách bảo mật</a>
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
                <span>Đặt Lịch Hẹn</span>
              </div>
            </Button>
          </form>
        </div>

        {/* Right Info Section */}
        <div className="bg-gradient-to-br from-[#1A3973] to-[#4F80E1] rounded-2xl p-8 md:p-10 text-white 
                      shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_0_30px_-15px_rgba(26,57,115,0.3)] 
                      hover:shadow-[0_25px_65px_-15px_rgba(0,0,0,0.2),0_0_40px_-15px_rgba(26,57,115,0.4)]
                      transition-all duration-300">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-white/20 p-4 rounded-full mb-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]">
              <Calendar className="text-3xl w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">Quy Trình Đặt Lịch</h2>
            <div className="w-16 h-1 bg-white mx-auto"></div>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="bg-white/20 rounded-full p-3 flex items-center justify-center min-w-[50px] min-h-[50px] shadow-md">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-xl mb-2">01. Đặt Lịch Hẹn</p>
                <p className="text-white/80">Hoàn thành mẫu đặt lịch trực tuyến hoặc gọi điện cho chúng tôi để đặt lịch hẹn. Thông tin chi tiết sẽ giúp chúng tôi chuẩn bị tốt nhất cho nhu cầu của bạn.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="bg-white/20 rounded-full p-3 flex items-center justify-center min-w-[50px] min-h-[50px] shadow-md">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-xl mb-2">02. Nhận Lịch Trình</p>
                <p className="text-white/80">Chúng tôi sẽ gọi điện xác nhận và gửi thông tin chi tiết về lịch hẹn. Bạn sẽ nhận được hướng dẫn chuẩn bị và những giấy tờ cần mang theo nếu cần.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="bg-white/20 rounded-full p-3 flex items-center justify-center min-w-[50px] min-h-[50px] shadow-md">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-xl mb-2">03. Gặp Gỡ Chuyên Gia</p>
                <p className="text-white/80">Đội ngũ chuyên gia y tế của chúng tôi với kinh nghiệm và chuyên môn cao sẽ tư vấn chuyên sâu và tạo không gian an toàn, tôn trọng cho mọi người.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="bg-white/20 rounded-full p-3 flex items-center justify-center min-w-[50px] min-h-[50px] shadow-md">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-xl mb-2">04. Nhận Dịch Vụ Chăm Sóc</p>
                <p className="text-white/80">Trải nghiệm dịch vụ chất lượng cao với sự chăm sóc tận tình. Chúng tôi cam kết đồng hành cùng bạn trong toàn bộ hành trình chăm sóc sức khỏe.</p>
              </div>
            </div>
          </div>
          
          {/* Hotline Support */}
          <div className="flex items-center gap-4 bg-white py-3 px-5 rounded-full 
                      shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] 
                      w-fit mx-auto mt-10 text-[#1A3973] 
                      border border-white/80 hover:shadow-lg transition-all duration-300">
            <div className="bg-[#1A3973] p-2 rounded-full">
              <PhoneCall className="text-white w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider">Hotline Hỗ Trợ 24/7</p>
              <p className="font-bold text-lg">+84 (123) 456789</p>
            </div>
          </div>
        </div>
      </div>

      {/* Thông báo đặt lịch thành công */}
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
              <h3 className="text-2xl font-bold text-green-600">Đặt Lịch Thành Công!</h3>
              <p className="text-gray-500 mt-1">Cảm ơn bạn đã tin tưởng chúng tôi</p>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-6">
              <h4 className="font-bold text-[#1A3973] mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Chi tiết lịch hẹn
              </h4>
              
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-600">Dịch vụ:</span>
                  <span className="font-medium">{bookingDetails.service}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Ngày khám:</span>
                  <span className="font-medium">{bookingDetails.date}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Giờ khám:</span>
                  <span className="font-medium">{bookingDetails.time}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Giá dịch vụ:</span>
                  <span className="font-medium">{bookingDetails.price}</span>
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm text-center mb-6">
              Chúng tôi sẽ liên hệ để xác nhận cuộc hẹn của bạn trong thời gian sớm nhất. Vui lòng giữ điện thoại luôn trong tình trạng liên lạc được.
            </p>

            <Button
              className="w-full bg-gradient-to-r from-[#1A3973] to-[#4F80E1] text-white py-3 rounded-lg font-medium"
              onClick={() => setShowSuccessMessage(false)}
            >
              Đã hiểu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;