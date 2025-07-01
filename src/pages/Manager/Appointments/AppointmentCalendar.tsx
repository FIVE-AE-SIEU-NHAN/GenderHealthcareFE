import { useState, useMemo } from 'react';
import { startOfWeek, endOfWeek, formatISO } from 'date-fns';
import { Calendar, Users, Clock, Activity, AlertCircle } from 'lucide-react';

import { useManagerAppointments } from '@/hooks/manager/useAppointments';

import { CalendarWeekView } from '@/pages/Consultant/Appointments/Calendar/CalendarWeekView';
import { Appointment } from '@/types/consultant/appointmentTypes';
import { TopicLegend } from './TopicLegend';

// A simple skeleton loader for the stat cards
const StatCardSkeleton = () => (
  <div className="relative p-6 bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-8 bg-gray-400 rounded w-1/4"></div>
  </div>
);

export default function AppointmentCalendar() {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const weekDateRange = useMemo(() => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const end = endOfWeek(currentWeek, { weekStartsOn: 1 });
    return { start, end };
  }, [currentWeek]);

  // Use the custom hook to fetch data. The component is now clean and declarative.
  const { 
    data: appointmentData, 
    isLoading, 
    isError,
    error,
    isFetching,
  } = useManagerAppointments({
    startDate: formatISO(weekDateRange.start, { representation: 'date' }),
    endDate: formatISO(weekDateRange.end, { representation: 'date' }),
  });

  // Safely extract the appointments array from the fetched data
  const appointments: Appointment[] = useMemo(
    () => appointmentData?.data?? [], 
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
          {/* CARD HEADER with Loading State */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {isLoading ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <>
                {/* Total Appointments Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl" />
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl transition-all duration-300" />
                  <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Appointments</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{weeklyStats.totalAppointments}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Calendar className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pending Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-2xl" />
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl transition-all duration-300" />
                  <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Pending</p>
                        <p className="text-3xl font-bold text-amber-600 mt-2">{weeklyStats.pending}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Clock className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cancelled Card */}
                <div className="group relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl" />
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl transition-all duration-300" />
                  <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Cancelled</p>
                        <p className="text-3xl font-bold text-red-600 mt-2">{weeklyStats.cancelled}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Activity className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Completed Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl" />
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl transition-all duration-300" />
                  <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Completed</p>
                        <p className="text-3xl font-bold text-emerald-600 mt-2">{weeklyStats.completed}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

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


          <TopicLegend />
          {/* Weekly Calendar */}
          <CalendarWeekView
            appointments={appointments}
            currentWeek={currentWeek}
            onWeekChange={setCurrentWeek}
            isFetching={isFetching}
          />
        </div>
      </div>
    </div>
  );
}