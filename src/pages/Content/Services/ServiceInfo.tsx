import React from "react";
import { Calendar, Clock, Users, User, PhoneCall, Stethoscope, Droplet, Scissors, Brain, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  name: string;
  price: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const services: Service[] = [
  { id: "consultation", name: "Tư vấn chung", price: 200000, icon: Stethoscope },
  { id: "hormone-therapy", name: "Liệu pháp hormone", price: 1500000, icon: Droplet },
  { id: "gender-affirming-surgery", name: "Phẫu thuật giới tính", price: 30000000, icon: Scissors },
  { id: "mental-health", name: "Tư vấn sức khỏe tâm thần", price: 500000, icon: Brain },
  { id: "circumcision", name: "Cắt bao quy đầu", price: 800000, icon: Mic },
  { id: "general-checkup", name: "Khám sức khỏe tổng quát", price: 300000, icon: User },
];

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

export function InfoPage() {
  const doctors = [
    { icon: Stethoscope, title: 'Bác sĩ tư vấn tổng quát', desc: 'Đánh giá ban đầu và tư vấn chuyên môn.' },
    { icon: Droplet, title: 'Bác sĩ nội tiết', desc: 'Chuyên điều trị các rối loạn hormone.' },
    { icon: Scissors, title: 'Bác sĩ phẫu thuật', desc: 'Thực hiện phẫu thuật khẳng định giới tính.' },
    { icon: Brain, title: 'Bác sĩ tâm thần', desc: 'Hỗ trợ sức khỏe tâm thần toàn diện.' },
    { icon: Clock, title: 'Bác sĩ phục hồi chức năng', desc: 'Theo dõi và hỗ trợ phục hồi chức năng.' },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 lg:p-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A3973] mb-3">
          THÔNG TIN DỊCH VỤ
        </h1>
        <div className="w-60 h-1 bg-gradient-to-r from-[#1A3973] to-[#4F80E1] mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto items-stretch">
        {/* Dịch vụ nổi bật */}
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 flex flex-col h-full">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-[#1A3973] rounded-full p-3 w-14 h-14 mb-3 flex items-center justify-center shadow-sm">
              <Stethoscope className="text-white w-6 h-6" />
            </div>
            <h2 className="text-4xl font-bold text-[#1A3973] text-center mb-2">Dịch vụ nổi bật</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#1A3973] to-[#4F80E1] mx-auto"></div>
          </div>
          <div className="flex-1 space-y-8">
            {services.map((s, idx) => (
              <div key={s.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-[#1A3973] rounded-full p-3 min-w-[50px] min-h-[50px] flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xl">{idx + 1}</span>
                  </div>
                  <s.icon className="w-6 h-6 mr-2 text-[#1A3973]" />
                  <span className="text-2xl font-bold">{s.name}</span>
                </div>
                <span className="text-xl font-bold">{formatCurrency(s.price)}</span>
              </div>
            ))}
          </div>
          {/* Kết nối với tư vấn viên */}
          <div className="flex items-center gap-4 bg-white py-3 px-5 rounded-full w-fit mx-auto mt-10 text-[#1A3973] shadow-md hover:shadow-lg hover:bg-white/90 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5">
            <div className="bg-[#1A3973] p-2 rounded-full">
              <PhoneCall className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider">Kết nối  với</p>
              <p className="text-lg font-bold">Tư vấn viên</p>
            </div>
          </div>
        </div>

        {/* Đội ngũ bác sĩ */}
        <div className="bg-gradient-to-br from-[#1A3973] to-[#4F80E1] rounded-2xl p-8 md:p-10 text-white shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 flex flex-col h-full">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-white/20 p-4 rounded-full mb-4 shadow-md">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-2">Đội ngũ Bác sĩ</h2>
            <div className="w-16 h-1 bg-white mx-auto"></div>
          </div>
          <div className="flex-1 space-y-8">
            {doctors.map((doc, idx) => (
              <div key={idx} className="flex items-start gap-5">
                <div className="bg-white/20 rounded-full p-3 flex items-center justify-center min-w-[50px] min-h-[50px] shadow-md">
                  <span className="text-xl font-bold text-white">{idx + 1}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold mb-2 flex items-center">
                    <doc.icon className="w-6 h-6 mr-3" />
                    {doc.title}
                  </p>
                  <p className="text-white/80 text-lg">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Chọn bác sĩ */}
          <div className="flex items-center gap-4 bg-white py-3 px-5 rounded-full w-fit mx-auto mt-10 text-[#1A3973] shadow-md hover:shadow-lg hover:bg-white/90 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5">
            <div className="bg-[#1A3973] p-2 rounded-full">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider">Chọn</p>
              <p className="text-lg font-bold">Bác sĩ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
