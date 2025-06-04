import React, { useEffect, useState } from "react";
import {
  CalendarClock,
  CalendarDays,
  Clock,
  Phone,
  Mail,
  MessageSquareText,
  History,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppointmentIllustration1 from "@/assets/images/appointment1.svg";
import AppointmentIllustration2 from "@/assets/images/appointment2.svg";
import { useOutletContext } from "react-router-dom";
import { DashboardLayoutContext } from "@/components/layouts/Dashboard/DashboardLayout";

type BookingInfo = {
  service: string;
  date: string;
  time: string;
  phone?: string;
  email?: string;
  message?: string;
};

export default function AppointmentHistory() {
  const [bookingHistory, setBookingHistory] = useState<BookingInfo[]>([]);
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>();

  useEffect(() => {
    setBreadcrumb({
      title: "Apointments History",
      parent: "Apointments",
      parentHref: "",
    });
    const stored = localStorage.getItem("bookingHistory");
    if (stored) {
      setBookingHistory(JSON.parse(stored));
    }
  }, [setBreadcrumb]);

  return (
    <div className="relative p-6 flex flex-col lg:flex-row gap-6 overflow-hidden">
      {/* --- Blurred Blobs --- */}
      <div className="absolute top-26 left-86 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60 -z-1" />
      <div className="absolute bottom-20 left-86 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-50 -z-1" />
      <div className="absolute top-1/2 right-10 w-56 h-56 bg-pink-200 rounded-full blur-2xl opacity-40 z-0" />

      {/* LEFT: Nội quy */}
      <div className="hidden lg:flex flex-col max-w-lg bg-white rounded-lg shadow-md p-6 z-10
                      max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4 border-b border-blue-200 pb-2 text-center">
          Nội quy
        </h2>

        <div className="text-gray-700 text-md leading-relaxed space-y-4 font-bold">
          <p>1.<span className="font-normal"> Vui lòng đến đúng giờ để đảm bảo lịch trình của bạn không bị ảnh hưởng.</span></p>
          <p>2.<span className="font-normal"> Nếu cần hủy hoặc thay đổi lịch hẹn, vui lòng thông báo trước ít nhất 24 giờ.</span></p>
          <p>3.<span className="font-normal"> Mang theo các giấy tờ tùy thân cần thiết khi đến khám.</span></p>
          <p>4.<span className="font-normal"> Giữ vệ sinh chung và tuân thủ quy định phòng khám để đảm bảo an toàn cho tất cả mọi người.</span></p>
          <p>5.<span className="font-normal"> Không mang theo các vật dụng nguy hiểm hoặc chất cấm khi đến phòng khám.</span></p>
          <p>6.<span className="font-normal"> Trong trường hợp có triệu chứng bệnh truyền nhiễm, vui lòng báo trước khi đến để được sắp xếp phù hợp.</span></p>
          <p>7.<span className="font-normal"> Mọi thắc mắc hoặc khiếu nại xin vui lòng liên hệ bộ phận chăm sóc khách hàng.</span></p>
          <p>8.<span className="font-normal"> Phòng khám có quyền từ chối phục vụ nếu khách hàng không tuân thủ các quy định.</span></p>
          <p>9.<span className="font-normal"> Các thông tin cá nhân sẽ được bảo mật theo chính sách của phòng khám.</span></p>
          <p>10.<span className="font-normal"> Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ của chúng tôi.</span></p>
          {/* Add more rules here if needed */}
        </div>
      </div>

      {/* MIDDLE: Timeline */}
      <div className="flex-1 z-10 ml-9 mr-0 max-w-110">
        <h1 className="text-3xl font-bold mb-6 text-blue-900 flex items-center gap-2">
          <History className="w-7 h-7 text-blue-600" />
          Lịch sử đặt hẹn
        </h1>

        {bookingHistory.length > 0 ? (
          <div className="relative border-l-2 border-blue-200 space-y-6 pl-6 max-h-[80vh] overflow-y-auto">
            {bookingHistory
              .slice()
              .reverse()
              .map((booking, index) => (
                <Card
                  key={index}
                  className={`relative shadow-sm bg-white border-blue-100 p-3 w-full lg:w-80 ${index === 0 ? "border-2 border-blue-400" : ""
                    }`}
                >
                  <div className="absolute -left-3 top-4 w-5 h-5 rounded-full bg-blue-500 border-4 border-white" />
                  <CardHeader>
                    <CardTitle className="text-blue-800 flex items-center gap-2 text-lg">
                      <CalendarClock className="w-5 h-5" />
                      {booking.service}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-gray-700">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-blue-500" />
                      <span>Ngày: <strong>{booking.date}</strong></span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Giờ: <strong>{booking.time}</strong></span>
                    </p>
                    {booking.phone && (
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-500" />
                        <span>SĐT: <strong>{booking.phone}</strong></span>
                      </p>
                    )}
                    {booking.email && (
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span>Email: <strong>{booking.email}</strong></span>
                      </p>
                    )}
                    {booking.message && (
                      <p className="flex items-start gap-2">
                        <MessageSquareText className="w-4 h-4 text-blue-500 mt-0.5" />
                        <span><strong>Ghi chú:</strong> {booking.message}</span>
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-8">
            Bạn chưa có lịch hẹn nào.
          </p>
        )}
      </div>




      {/* RIGHT: Illustration */}
      <div className="hidden lg:flex flex-col gap-20 items-center justify-center flex-1 z-10">
        <img
          src={AppointmentIllustration1}
          alt="Lịch hẹn minh họa"
          className="w-full max-w-md h-auto object-contain opacity-90"
        />
        <img
          src={AppointmentIllustration2}
          alt="Lịch hẹn minh họa"
          className="w-full max-w-md h-auto object-contain opacity-90"
        />
        <CalendarClock className="absolute top-10 right-32 w-16 h-16 text-blue-300 opacity-20 -z-1 rotate-12" />
        <Clock className="absolute bottom-12 left-10 w-12 h-12 text-indigo-300 opacity-40 z-0 -rotate-6" />
      </div>
    </div>
  );

}
