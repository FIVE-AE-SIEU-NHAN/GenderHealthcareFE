import React, { useEffect } from "react";
import {
  CalendarClock,
  Clock,
  History,
  AlertCircle,
} from "lucide-react";
import AppointmentIllustration1 from "@/assets/images/appointment1.svg";
import AppointmentIllustration2 from "@/assets/images/appointment2.svg";
import { useOutletContext } from "react-router-dom";
import { DashboardLayoutContext } from "@/components/layouts/Dashboard/DashboardLayout";
import { useCustomerAppointments } from "@/hooks/customer/useAppointments";
import { ConsultantBookingCard } from "./ConsultantBookingHistoryCard";


export default function AppointmentHistory() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>();

  useEffect(() => {
    setBreadcrumb({
      title: "Apointments History",
      parent: "Dashboard",
      parentHref: "/user",
    });
  }, [setBreadcrumb]);

  // ================ USE APPOINTMENTS HISTORY HOOK ===============
  const { data: bookingHistory, isLoading, isError, error } = useCustomerAppointments();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="relative border-l-2 border-transparent space-y-6 pl-6 max-h-[80vh] overflow-y-auto">
          <ConsultantBookingCard.Skeleton />
          <ConsultantBookingCard.Skeleton />
          <ConsultantBookingCard.Skeleton />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-red-600 bg-red-50 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <p>Error fetching history: {error.message}</p>
        </div>
      );
    }

    if (!bookingHistory || bookingHistory.length === 0) {
      return (
        <p className="text-gray-500 text-center mt-8">
          No booking history available.
        </p>
      );
    }
    return (
      <div className="relative border-l-2 border-blue-200 space-y-6 pl-6 pb-6 max-h-[80vh] overflow-y-auto">
        {bookingHistory && bookingHistory.map((booking, index) => (
            <ConsultantBookingCard key={index} booking={booking} isHighlighted={index === 0} />
          ))}
      </div>
    );
  };

  return (
    <div className="relative flex flex-col lg:flex-row gap-6 overflow-hidden max-h-[calc(84vh)]">
      {/* --- Blurred Blobs --- */}
      <div className="absolute top-26 left-86 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60 -z-1" />
      <div className="absolute bottom-20 left-86 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-50 -z-1" />
      <div className="absolute top-1/2 right-10 w-56 h-56 bg-pink-200 rounded-full blur-2xl opacity-40 z-0" />

      {/* LEFT: Rules */}
      <div className="hidden lg:flex flex-col max-w-lg bg-white rounded-lg shadow-md p-6 z-10 mt-7 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4 border-b border-blue-200 pb-2 text-center">
          Rules
        </h2>

        <div className="text-gray-700 text-md leading-relaxed space-y-4 font-bold">
          <p>1.<span className="font-normal"> Please arrive on time to ensure your schedule is not affected.</span></p>
          <p>2.<span className="font-normal"> If you need to cancel or reschedule, please notify us at least 24 hours in advance.</span></p>
          <p>3.<span className="font-normal"> Bring necessary identification documents when coming for an appointment.</span></p>
          <p>4.<span className="font-normal"> Maintain cleanliness and follow clinic regulations to ensure everyone's safety.</span></p>
          <p>5.<span className="font-normal"> Do not bring dangerous items or prohibited substances into the clinic.</span></p>
          <p>6.<span className="font-normal"> If you have symptoms of a contagious disease, please inform us beforehand for proper arrangements.</span></p>
          <p>7.<span className="font-normal"> For any questions or complaints, please contact customer service.</span></p>
          <p>8.<span className="font-normal"> The clinic reserves the right to refuse service if the rules are not followed.</span></p>
          <p>9.<span className="font-normal"> Personal information will be kept confidential according to clinic policy.</span></p>
          <p>10.<span className="font-normal"> Thank you for trusting and using our services.</span></p>
        </div>
        <Clock className="bottom-7 left-10 w-12 h-12 text-indigo-300 opacity-40 z-0 -rotate-6" />
      </div>




      {/* MIDDLE: Timeline */}
      <div className="flex-1 z-10 ml-9 mr-0 max-w-110">
        <h1 className="text-3xl font-bold mb-6 text-blue-900 flex items-center gap-2">
          <History className="w-7 h-7 text-blue-600" />
          Booking History
        </h1>
        {renderContent()}
      </div>


      {/* RIGHT: Illustration */}
      <div className="hidden lg:flex flex-col gap-20 items-center justify-center flex-1 z-10">
        <img
          src={AppointmentIllustration1}
          alt="booking illustration 1"
          className="w-full max-w-md h-auto object-contain opacity-90"
        />
        <img
          src={AppointmentIllustration2}
          alt="booking illustration 2"
          className="w-full max-w-md h-auto object-contain opacity-90"
        />
        <CalendarClock className="absolute top-10 right-32 w-16 h-16 text-blue-300 opacity-20 -z-1 rotate-12" />
      </div>
    </div>
  );
}
