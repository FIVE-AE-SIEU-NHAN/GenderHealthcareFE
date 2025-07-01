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
import { TOPIC_OPTIONS } from "@/Application/constants/appointment";

const consultants = [
  { id: 1, name: "TS. Nguyễn Văn A", speciality: "Bác sĩ tâm lý", img: "/images/bs1.png" },
  { id: 2, name: "ThS. Trần Thị B", speciality: "Chuyên gia hormone", img: "/images/bs1.png" },
  { id: 3, name: "BS. Lê Văn C", speciality: "Phẫu thuật tạo hình", img: "/images/bs1.png" },
  { id: 4, name: "TS. Phạm Thị D", speciality: "Tư vấn giới tính", img: "/images/bs1.png" },
  { id: 5, name: "BS. Hoàng Văn E", speciality: "Nội tiết học", img: "/images/bs1.png" },
  { id: 6, name: "ThS. Vũ Thị F", speciality: "Tâm lý học", img: "/images/bs1.png" },
];

const timeSlotOptions = [
  { value: "SLOT_08_10", label: "8:00 - 10:00" },
  { value: "SLOT_10_12", label: "10:00 - 12:00" },
  { value: "SLOT_13_15", label: "13:00 - 15:00" },
  { value: "SLOT_15_17", label: "15:00 - 17:00" },
];

const formSchema = z.object({
  topic: z.string({ required_error: "Vui lòng chọn chủ đề tư vấn." }).min(1, "Vui lòng chọn chủ đề tư vấn."),
  booking_date: z.date({ required_error: "Vui lòng chọn ngày hẹn." }),
  time_slot: z.string({ required_error: "Vui lòng chọn khung giờ." }).min(1, "Vui lòng chọn khung giờ."),
  agreed: z.boolean().refine(val => val === true, {
    message: "Bạn cần đồng ý với điều khoản sử dụng.",
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
    <div className="min-h-screen p-6 md:p-10 relative bg-blend-overlay" style={{ backgroundImage: "url('https://benhviengreen.com/wp-content/uploads/2016/05/doctor-health-wellness-1200x480.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <div className="absolute inset-0 bg-white/70 z-0"></div>

      <div className="relative z-10">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-1 mt-39">
            <div className="bg-white rounded-2xl p-8 text-black shadow-xl border border-gray-200 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="bg-[#1A3973] rounded-full p-3 w-14 h-14 mx-auto mb-3 flex items-center justify-center shadow-sm">
                  <FaHeartbeat className="text-3xl text-white" />
                </div>
                <CardTitle className="text-3xl font-bold mb-2 text-[#1A3973] text-shadow-lg">Đặt Lịch Tư Vấn Trực Tuyến</CardTitle>
              </div>
              <p className="mb-6 text-sm text-gray-700 text-center">Hoàn thành mẫu liên hệ này để sắp xếp cuộc tư vấn đầu tiên của bạn!</p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                  <FormField control={form.control} name="topic" render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn chủ đề tư vấn" />
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

                  <div className="grid grid-cols-2 gap-2">
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
                                {field.value ? format(field.value, "dd/MM/yyyy") : "Chọn ngày"}
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
                    <FormField control={form.control} name="time_slot" render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} value={field.value} disabled={!form.watch("booking_date")}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Chọn giờ" />
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

                  {getSelectedTopic() && (
                    <div className="mt-4 bg-blue-50 p-4 rounded-md">
                      <p className="font-medium">Dịch vụ cần tư vấn: {" "}
                        <span className="text-[#1A3973] font-bold">
                          {getSelectedTopic()?.label}
                        </span>
                      </p>
                      {form.watch("booking_date") && selectedDateValue && (
                        <p className="font-medium mt-2">Ngày hẹn: {" "}
                          <span className="text-[#1A3973] font-bold">
                            {format(form.watch("booking_date") as Date, "dd/MM/yyyy")}
                          </span>
                        </p>
                      )}
                      {form.watch("booking_date") && selectedTimeSlotValue && (
                        <p className="font-medium mt-2">Thời gian hẹn: {" "}
                          <span className="text-[#1A3973] font-bold">
                            {getSelectedTimeSlotLabel()}
                          </span>
                        </p>
                      )}
                    </div>
                  )}

                  <FormField control={form.control} name="agreed" render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0 mt-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>

                      <div className="space-y-1 leading-none">
                        <label htmlFor="terms" className="text-sm">
                          Tôi đồng ý với{" "}
                          <a href="/terms-and-privacy" className="text-[#1A3973] hover:underline">Điều khoản sử dụng và Chính sách bảo mật</a>
                        </label>
                      </div>
                    </FormItem>
                  )} />

                  <div className="mt-6">
                    <Button
                      type="submit"
                      disabled={bookAppointment.isPending}
                      className="flex items-center justify-center w-full bg-gradient-to-r from-[#1A3973] to-[#2A59A3]
                                 text-white text-lg font-semibold rounded-lg px-6 py-3 shadow-lg 
                                 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                    >

                      {bookAppointment.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          <span>ĐANG XỬ LÝ...</span>
                        </>
                      ) : (
                        <>
                          <FaHeartbeat className="text-lg mr-2" />
                          <span>Đặt Lịch Tư Vấn</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-4xl font-bold mb-6 text-center text-[#1A3973]">Đội Ngũ Tư Vấn Viên Chuyên Nghiệp</h2>
            <p className="text-gray-700 text-center mb-10 max-w-2xl mx-auto">
              Đội ngũ tư vấn viên giàu kinh nghiệm của chúng tôi luôn sẵn sàng hỗ trợ và đồng hành cùng bạn trong hành trình tìm hiểu và khẳng định bản thân.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultants.map(c =>
                <Card
                  key={c.id}
                  className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                            transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                  <div className="h-2 bg-gradient-to-r from-[#1A3973] to-[#4F80E1]"></div>
                  <div className="p-5">
                    <div className="relative">
                      <div className="bg-white rounded-full w-24 h-24 mx-auto mb-4 overflow-hidden border-4 shadow-md">
                        <img
                          src={c.img}
                          alt={c.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://png.pngtree.com/png-clipart/20240321/original/pngtree-avatar-job-doctor-flat-portrait-of-man-png-image_14640095.png';
                          }}
                        />
                      </div>

                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#1A3973] text-white text-xs px-3 py-1 rounded-full">
                        {c.speciality}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-center text-[#1A3973] mt-5 mb-2">
                      {c.name}
                    </h3>
                    <div className="flex justify-center gap-2 text-gray-500 text-sm mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>Thứ 2-6</span>
                      <span className="mx-1">|</span>
                      <Clock className="w-4 h-4" />
                      <span>7h-17h</span>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#1A3973] p-3 rounded-lg shadow-lg w-fit ml-auto mt-10 mb-4 text-white">
          <a
            href="tel:+84123456789"
            className="bg-white p-3 rounded-full transition-colors flex items-center justify-center">
            <PhoneCall className="text-[#1A3973] w-5 h-5" />
          </a>
          <div>
            <p className="text-xs text-white/90">HOTLINE HỖ TRỢ 24H</p>
            <p className="font-bold text-white">+84 (123) 456789</p>
          </div>
        </div>
      </div>

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
              <h3 className="text-2xl font-bold text-green-600">Đặt Lịch Tư Vấn Thành Công!</h3>
              <p className="text-gray-500 mt-1">Cảm ơn bạn đã tin tưởng chúng tôi</p>
            </div>
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-6">
              <h4 className="font-bold text-[#1A3973] mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />Chi tiết lịch hẹn
              </h4>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-600">Tư vấn viên:</span>
                  <span className="font-medium text-blue-600">Sẽ được chỉ định</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Dịch vụ:</span>
                  <span className="font-medium">{bookingDetails.topic}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Ngày hẹn:</span>
                  <span className="font-medium">{bookingDetails.date}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Giờ hẹn:</span>
                  <span className="font-medium">{bookingDetails.time}</span>
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm text-center mb-6">
              Chúng tôi sẽ liên hệ để xác nhận cuộc hẹn của bạn trong thời gian sớm nhất. Vui lòng giữ điện thoại luôn trong tình trạng liên lạc được.
            </p>
            <Button
              className="w-full bg-gradient-to-r from-[#1A3973] to-[#4F80E1] text-white py-3 rounded-lg font-medium"
              onClick={() => setShowSuccessMessage(false)}>
              Đã hiểu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantAppointmentPage;