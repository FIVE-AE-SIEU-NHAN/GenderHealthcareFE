import { useState, useMemo } from 'react';
import { startOfWeek, endOfWeek, formatISO } from 'date-fns';
import { AlertCircle } from 'lucide-react';

import { useConsultantAppointments } from '@/hooks/consultant/useAppointments';

import { CalendarWeekView } from '../../../components/Appointment Calendar/CalendarWeekView';
import { Appointment } from '@/types/consultant/appointmentTypes';

export default function AppointmentCalendar() {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const weekDateRange = useMemo(() => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const end = endOfWeek(currentWeek, { weekStartsOn: 1 });
    return { start, end };
  }, [currentWeek]);

  // Use the custom hook 
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

  // Safely extract the appointments array from the fetched data
  const appointments: Appointment[] = useMemo(
    () => appointmentData?.data ?? [],
    [appointmentData]
  );

  // Calculate stats from the REAL appointments data
  const weeklyStats = useMemo(() => {
    const totalAppointments = appointments.length;
    const pending = appointments.filter(apt => apt.status === 'PENDING').length;
    const ongoing = appointments.filter(apt => apt.status === 'ONGOING').length;
    const completed = appointments.filter(apt => apt.status === 'COMPLETED').length;
    const cancelled = appointments.filter(apt => apt.status === 'CANCELLED').length;

    return { totalAppointments, pending, ongoing, completed, cancelled };
  }, [appointments]);

  return (
    <div className="relative">
      {/* Floating elements remain the same */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute bottom-32 left-32 w-28 h-28 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse delay-2000" />

      <div className="max-h-[84vh] overflow-y-auto relative">
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          {/* Error State Handling */}
          {isError && (
            <div role="alert" className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <div>
                <p className="font-bold">Failed to load appointments</p>
                <p className="text-sm">{(error as Error).message}</p>
              </div>
            </div>
          )}

          {/* Weekly Calendar */}
          <CalendarWeekView
            appointments={appointments}
            currentWeek={currentWeek}
            onWeekChange={setCurrentWeek}
            weeklyStats={weeklyStats}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}