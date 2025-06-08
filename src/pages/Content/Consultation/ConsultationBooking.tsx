import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneCall, Calendar, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { BsCheckCircleFill, BsXCircle } from "react-icons/bs";
import { FaHeartbeat } from "react-icons/fa";
import { CardTitle, Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

// Danh sách tư vấn viên mẫu
const consultants = [
  { id: 1, name: "TS. Nguyễn Văn A", speciality: "Bác sĩ tâm lý", img: "/images/bs1.png" },
  { id: 2, name: "ThS. Trần Thị B", speciality: "Chuyên gia hormone", img: "/images/bs1.png" },
  { id: 3, name: "BS. Lê Văn C", speciality: "Phẫu thuật tạo hình", img: "/images/bs1.png" },
  { id: 4, name: "TS. Phạm Thị D", speciality: "Tư vấn giới tính", img: "/images/bs1.png" },
  { id: 5, name: "BS. Hoàng Văn E", speciality: "Nội tiết học", img: "/images/bs1.png" },
  { id: 6, name: "ThS. Vũ Thị F", speciality: "Tâm lý học", img: "/images/bs1.png" },
];

interface FormData {
  phone: string;
  service: string;
  date: Date | undefined;
  time: string;
  note: string;
  agreed: boolean;
  consultant: string;
}

const AppointmentPage = () => {
  const { register, handleSubmit, control, watch, formState: { errors }, reset, setValue } = useForm<FormData>({
    defaultValues: {
      service: "",
      date: undefined,
      time: "",
      phone: "",
      note: "",
      agreed: false,
      consultant: "",
    }
  });
  
  // Thêm ref để cuộn đến form khi cần
  const formRef = useRef<HTMLDivElement>(null);
  
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    service: "",
    date: "",
    time: "",
    consultant: ""
  });
  
  // State để theo dõi tư vấn viên đã chọn (để hiển thị active trên UI)
  const [selectedConsultant, setSelectedConsultant] = useState<string>("");
  
  const navigate = useNavigate();
  
  // Khung giờ có sẵn
  const availableTimes = [
    "7:00 - 9:00",
    "9:00 - 11:00",
    "13:00 - 15:00",
    "15:00 - 17:00"
  ];
  
  // Dịch vụ và giá tương ứng
  const services = [
    { id: "gender-consultation", name: "Tư vấn giới tính", price: 200000 },
    { id: "mental-health", name: "Tư vấn sức khỏe tâm thần", price: 250000 },
    { id: "transition-planning", name: "Lập kế hoạch chuyển đổi", price: 350000 },
    { id: "family-consultation", name: "Tư vấn gia đình", price: 300000 },
    { id: "hormone-consultation", name: "Tư vấn hormone", price: 400000 },
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
  
  // Lấy giá dịch vụ đã chọn
  const getSelectedServicePrice = (): number => {
    const service = services.find(s => s.id === selectedService);
    return service ? service.price : 0;
  };
  
  // Lấy tên dịch vụ đã chọn
  const getSelectedServiceName = (): string => {
    const service = services.find(s => s.id === selectedService);
    return service ? service.name : "";
  };
  
  // Lấy tên chuyên gia đã chọn
  const getSelectedConsultantName = (): string => {
    const consultant = consultants.find(c => c.id.toString() === watch("consultant"));
    return consultant ? consultant.name : "";
  };
  
  // Xử lý submit form
  const onSubmit = (data: FormData) => {
    const formattedDate = data.date ? format(data.date, "dd/MM/yyyy", { locale: vi }) : "";
    const serviceName = getSelectedServiceName();
    const consultantName = getSelectedConsultantName();
    
    const bookingInfo = {
      service: serviceName,
      date: formattedDate,
      time: data.time,
      phone: data.phone,
      note: data.note,
      consultant: consultantName
    };
    
    // Lưu thông tin đặt lịch để hiển thị trong modal
    setBookingDetails({
      service: serviceName,
      date: formattedDate,
      time: data.time,
      consultant: consultantName
    });
    
    // Hiển thị thông báo thành công
    setShowSuccessMessage(true);
    
    // Reset form để đặt lịch mới
    reset();
    
    // Sau 10 giây, ẩn thông báo
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 10000);
  };
  
  // Hàm để chọn tư vấn viên và cuộn đến form
  const handleSelectConsultant = (consultantId: number) => {
    // Chuyển id thành string để phù hợp với giá trị field
    const consultantIdStr = consultantId.toString();
    
    // Cập nhật giá trị trong form
    setValue("consultant", consultantIdStr, { shouldValidate: true });
    
    // Cập nhật state để hiển thị trạng thái active
    setSelectedConsultant(consultantIdStr);
    
    // Cuộn đến form để người dùng tiếp tục điền các trường khác
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Tạo hiệu ứng highlight nhẹ cho dropdown tư vấn viên
      setTimeout(() => {
        const dropdown = document.querySelector('[data-consultant-dropdown]');
        if (dropdown) {
          dropdown.classList.add('ring-2', 'ring-[#1A3973]', 'ring-opacity-50');
          setTimeout(() => {
            dropdown.classList.remove('ring-2', 'ring-[#1A3973]', 'ring-opacity-50');
          }, 1500);
        }
      }, 500);
    }
  };
  
  return (
    <div 
      className="min-h-screen p-6 md:p-10 relative bg-blend-overlay"
      style={{
        backgroundImage: "url('/images/Banner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Thêm overlay sáng để nội dung tối hiển thị rõ hơn */}
      <div className="absolute inset-0 bg-white/70 z-0"></div>
      
      {/* Nội dung chính */}
      <div className="relative z-10">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Left Form Section */}
          <div className="md:col-span-1">
            <div 
              className="bg-white rounded-2xl p-8 text-black shadow-xl border border-gray-200 transition-all duration-300"
              ref={formRef} // Thêm ref để cuộn đến đây khi cần
            >
              <div className="text-center mb-6">
                <div className="bg-[#1A3973] rounded-full p-3 w-14 h-14 mx-auto mb-3 flex items-center justify-center shadow-sm">
                  <FaHeartbeat className="text-3xl text-white" />
                </div>
                <CardTitle className="text-3xl font-bold mb-2 text-[#1A3973] text-shadow-lg">Đặt Lịch Tư Vấn</CardTitle>
              </div>
              
              <p className="mb-6 text-sm text-gray-700 text-center">
                Hoàn thành mẫu liên hệ này để sắp xếp cuộc tư vấn đầu tiên của bạn!
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                {/* Số điện thoại */}
                <div className="w-full">
                  <Controller 
                    name="phone"
                    control={control}
                    rules={{ required: "Vui lòng nhập số điện thoại" }}
                    render={({ field }) => (
                      <Input 
                        placeholder="Số điện thoại" 
                        type="tel" 
                        className="w-full"
                        {...field}
                      />
                    )}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                </div>

                {/* Chọn tư vấn viên */}
                <div className="w-full relative">
                  <Controller
                    name="consultant"
                    control={control}
                    rules={{ required: "Vui lòng chọn tư vấn viên" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger 
                          className="w-full transition-all duration-300" 
                          data-consultant-dropdown
                        >
                          <SelectValue placeholder="Chọn tư vấn viên" />
                        </SelectTrigger>
                        <SelectContent>
                          {consultants.map(consultant => (
                            <SelectItem key={consultant.id} value={consultant.id.toString()}>
                              {consultant.name} - {consultant.speciality}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.consultant && <p className="mt-1 text-sm text-red-500">{errors.consultant.message}</p>}
                </div>
                
                {/* Dịch vụ tư vấn */}
                <div className="w-full">
                  <Controller
                    name="service"
                    control={control}
                    rules={{ required: "Vui lòng chọn loại tư vấn" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn loại tư vấn" />
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
                
                {/* Chọn ngày và giờ trong một dòng với chiều dài bằng nhau */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Chọn ngày */}
                  <div className="w-full">
                    <Controller
                      control={control}
                      name="date"
                      rules={{ required: "Vui lòng chọn ngày" }}
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4 text-[#1A3973]" />
                              {field.value ? format(field.value, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
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
                      )}
                    />
                    {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
                  </div>
                  
                  {/* Chọn giờ */}
                  <div className="w-full">
                    <Controller
                      control={control}
                      name="time"
                      rules={{ required: "Vui lòng chọn giờ" }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} disabled={!watch("date")}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn giờ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7:00 - 9:00">7h-9h</SelectItem>
                            <SelectItem value="9:00 - 11:00">9h-11h</SelectItem>
                            <SelectItem value="13:00 - 15:00">13h-15h</SelectItem>
                            <SelectItem value="15:00 - 17:00">15h-17h</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>}
                  </div>
                </div>

                {selectedService && (
                  <div className="mt-4 bg-blue-50 p-4 rounded-md">
                    <p className="font-medium">Phí tư vấn: <span className="text-[#1A3973] font-bold">{formatCurrency(getSelectedServicePrice())}</span></p>
                    {watch("date") && watch("time") && (
                      <p className="font-medium mt-2">Thời gian hẹn: <span className="text-[#1A3973] font-bold">
                        {format(watch("date") as Date, "dd/MM/yyyy", { locale: vi })} - {watch("time")}</span>
                      </p>
                    )}
                  </div>
                )}

                <Controller
                  name="note"
                  control={control}
                  render={({ field }) => (
                    <Textarea 
                      placeholder="Nội dung bạn muốn tư vấn" 
                      className="mt-4 w-full"
                      {...field}
                    />
                  )}
                />

                <div className="flex items-center space-x-2 mt-4">
                  <Controller
                    name="agreed"
                    control={control}
                    rules={{ required: "Bạn cần đồng ý với điều khoản" }}
                    render={({ field }) => (
                      <Checkbox 
                        id="terms" 
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                      />
                    )}
                  />
                  <label htmlFor="terms" className="text-sm">
                    Tôi đồng ý với <a href="/terms-and-privacy" className="text-[#1A3973] hover:underline">Điều khoản sử dụng và Chính sách bảo mật</a>
                  </label>
                </div>
                {errors.agreed && <p className="mt-1 text-sm text-red-500">{errors.agreed.message}</p>}

                <div className="mt-6">
                  <Button
                    type="submit"
                    className="mx-auto block w-full bg-gradient-to-r from-[#1A3973] to-[#2A59A3] 
                      text-white text-lg font-semibold rounded-lg px-6 py-3
                      shadow-lg hover:shadow-xl hover:-translate-y-0.5
                      transition-all duration-300 relative overflow-hidden group"
                    disabled={Object.keys(errors).length > 0}
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/10 -skew-x-12 -translate-x-full 
                      group-hover:translate-x-full transition-transform duration-700"></span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaHeartbeat className="text-lg mr-2" />
                      <span>Đặt Lịch Tư Vấn</span>
                    </div>
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Consultants Section */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-6 text-center text-[#1A3973]">Đội Ngũ Tư Vấn Viên Chuyên Nghiệp</h2>
            <p className="text-gray-700 text-center mb-10 max-w-2xl mx-auto">
              Đội ngũ tư vấn viên giàu kinh nghiệm của chúng tôi luôn sẵn sàng hỗ trợ và đồng hành cùng bạn trong hành trình tìm hiểu và khẳng định bản thân.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultants.map((consultant) => {
                // Kiểm tra xem consultant này có được chọn không
                const isSelected = selectedConsultant === consultant.id.toString();
                
                return (
                  <Card 
                    key={consultant.id} 
                    className={`border rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                              transition-all duration-300 bg-gradient-to-br from-white to-blue-50
                              ${isSelected ? 'ring-4 ring-[#1A3973] shadow-xl' : 'border-gray-100'}`}
                  >
                    {/* Thanh màu ở đầu card */}
                    <div className="h-2 bg-gradient-to-r from-[#1A3973] to-[#4F80E1]"></div>
                    
                    <div className="p-5">
                      <div className="relative">
                        {/* Vòng tròn avatar với viền */}
                        <div className={`bg-white rounded-full w-24 h-24 mx-auto mb-4 overflow-hidden 
                                      border-4 ${isSelected ? 'border-[#1A3973]' : 'border-white'} shadow-md`}>
                          <img 
                            src={consultant.img} 
                            alt={consultant.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Consultant';
                            }}
                          />
                        </div>
                        
                        {/* Badge chuyên môn */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#1A3973] text-white text-xs px-3 py-1 rounded-full">
                          {consultant.speciality}
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-lg text-center text-[#1A3973] mt-5 mb-2">
                        {consultant.name}
                      </h3>
                      
                      <div className="flex justify-center gap-2 text-gray-500 text-sm mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>Thứ 2-6</span>
                        <span className="mx-1">|</span>
                        <Clock className="w-4 h-4" />
                        <span>7h-17h</span>
                      </div>
                      
                      <div className="flex justify-center mt-4">
                        <Button 
                          variant={isSelected ? "default" : "outline"}
                          className={`rounded-full px-5 py-2 transition-colors
                                    ${isSelected 
                                      ? 'bg-[#1A3973] text-white' 
                                      : 'border-[#1A3973] text-[#1A3973] hover:bg-[#1A3973] hover:text-white'}`}
                          onClick={() => handleSelectConsultant(consultant.id)}
                        >
                          {isSelected ? 'Đã chọn' : 'Chọn tư vấn viên'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Hotline Support - màu đậm hơn cho dễ đọc */}
        <div className="flex items-center gap-2 bg-[#1A3973] p-3 rounded-lg shadow-lg 
                      w-fit ml-auto mt-10 mb-4 text-white">
          <a href="tel:+84123456789" className="bg-white p-3 rounded-full transition-colors flex items-center justify-center">
            <PhoneCall className="text-[#1A3973] w-5 h-5" />
          </a>
          <div>
            <p className="text-xs text-white/90">HOTLINE HỖ TRỢ 24H</p>
            <p className="font-bold text-white">+84 (123) 456789</p>
          </div>
        </div>
      </div>

      {/* Thông báo đặt lịch thành công */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative text-black">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowSuccessMessage(false)}
            >
              <BsXCircle size={20} />
            </button>

            <div className="text-center mb-4">
              <BsCheckCircleFill className="text-green-500 text-5xl mx-auto" />
              <h3 className="text-2xl font-bold text-black mt-2">Đặt Lịch Tư Vấn Thành Công!</h3>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="font-bold mb-2 text-black">Chi tiết lịch hẹn:</p>
              <p className="text-black"><span className="font-medium">Tư vấn viên:</span> {bookingDetails.consultant}</p>
              <p className="text-black"><span className="font-medium">Dịch vụ:</span> {bookingDetails.service}</p>
              <p className="text-black"><span className="font-medium">Ngày:</span> {bookingDetails.date}</p>
              <p className="text-black"><span className="font-medium">Giờ:</span> {bookingDetails.time}</p>
            </div>

            <p className="mt-4 text-black">
              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Chúng tôi sẽ liên hệ để xác nhận cuộc hẹn của bạn trong thời gian sớm nhất.
            </p>

            <Button
              className="mt-4 w-full bg-[#1A3973] hover:bg-[#2A59A3] text-white py-2 rounded-md transition-colors"
              onClick={() => setShowSuccessMessage(false)}
            >
              Đóng
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
