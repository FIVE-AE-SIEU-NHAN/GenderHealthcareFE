import { useState, useMemo, useEffect } from 'react';
import { startOfWeek, endOfWeek, formatISO } from 'date-fns';
import { AlertCircle } from 'lucide-react';

import { useConsultantAppointments } from '@/hooks/consultant/useAppointments';

import { CalendarWeekView } from '@/components/Appointment Calendar/CalendarWeekView';
import { Appointment } from '@/types/consultant/appointmentTypes';
import { useOutletContext } from 'react-router-dom';
import { DashboardLayoutContext } from '@/components/layouts/Dashboard/DashboardLayout';
import VideoChatRoom from '@/components/Chats/VideoChatRoom';

export default function ConsultantAppointmentCalendar() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>();

  const [currentWeek, setCurrentWeek] = useState(new Date());

  const [activeCallRoomId, setActiveCallRoomId] = useState<string | null>(null);

  // ========== SET BREADCRUMB ==========
  useEffect(() => {
    setBreadcrumb({
      title: "Appointments Management",
      parent: "Dashboard",
      parentHref: "/consultant",
    });
  }, [setBreadcrumb]);

  // ========== CALCULATE WEEK DATE RANGE ==========
  const weekDateRange = useMemo(() => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const end = endOfWeek(currentWeek, { weekStartsOn: 1 });
    return { start, end };
  }, [currentWeek]);

  // ========== USE CONSULTANT APPOINTMENTS HOOK ==========
  const {
    data: appointmentData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useConsultantAppointments({
    startDate: formatISO(weekDateRange.start, { representation: 'date' }),
    endDate: formatISO(weekDateRange.end, { representation: 'date' }),
  });

  // ========== EXTRACT APPOINTMENTS FROM DATA ==========
  const appointments: Appointment[] = useMemo(
    () => appointmentData?.data ?? [],
    [appointmentData]
  );

  // ========== CALCULATE WEEKLY STATS ==========
  const weeklyStats = useMemo(() => {
    const totalAppointments = appointments.length;
    const pending = appointments.filter(apt => apt.status === 'PENDING').length;
    const ongoing = appointments.filter(apt => apt.status === 'ONGOING').length;
    const completed = appointments.filter(apt => apt.status === 'COMPLETED').length;
    const cancelled = appointments.filter(apt => apt.status === 'CANCELLED').length;

    return { totalAppointments, pending, ongoing, completed, cancelled };
  }, [appointments]);



  // ========== VIDEO CHAT ROOM ==========
  const handleJoinCall = (roomId: string) => {
    setActiveCallRoomId(roomId);
  };

  const handleLeaveCall = () => {
    setActiveCallRoomId(null);
  };

  // --- 4. CONDITIONAL RENDER: VIDEO CHAT OR CALENDAR ---
  if (activeCallRoomId) {
    return (
      <VideoChatRoom 
        chat_room_id={activeCallRoomId} 
        onLeave={handleLeaveCall} 
      />
    );
  }

  return (
    <div className="relative">
      {/* ========= FLOATING ELEMENTS (EFFECTS) */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute bottom-32 left-32 w-28 h-28 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse delay-2000" />

      <div className="max-h-[84vh] overflow-y-auto relative">
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          {/* ======== ERROR HANDLING ======== */}
          {isError && (
            <div role="alert" className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <div>
                <p className="font-bold">Failed to load appointments</p>
                <p className="text-sm">{(error as Error).message}</p>
              </div>
            </div>
          )}

          {/* ======== WEEKLY CALENDAR ======== */}
          <CalendarWeekView
            appointments={appointments}
            currentWeek={currentWeek}
            onWeekChange={setCurrentWeek}
            weeklyStats={weeklyStats}
            isFetching={isFetching}
            isLoading={isLoading}
            onJoinCall={handleJoinCall}
          />
        </div>
      </div>
    </div>
  );
}