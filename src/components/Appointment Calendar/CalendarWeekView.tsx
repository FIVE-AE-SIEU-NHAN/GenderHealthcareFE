import { Appointment } from "@/types/consultant/appointmentTypes";
import { AppointmentCard } from "./EventCard";
import { format, startOfWeek, addDays, isSameDay, parseISO, isSameWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentStatus, TimeSlot } from "@/Application/constants/appointment";
import { TopicLegend } from "./TopicLegend";
import { WeeklyStats, WeeklyStatsHeader } from "./StatsHeader";
import { cn } from "@/lib/utils";
import { useUpdateAppointmentStatus } from "@/hooks/manager/useAppointmentsMutation";
import { useEffect, useMemo, useState } from "react";

interface CalendarWeekViewProps {
  appointments: Appointment[];
  currentWeek: Date;
  onWeekChange: (date: Date) => void;
  weeklyStats: WeeklyStats;
  isLoading?: boolean;
  isFetching?: boolean;
  onJoinCall: (roomId: string) => void; 
}

// Time slots mapping
const timeSlots: { slot: TimeSlot; displayTime: string; period: string }[] = [
  { slot: "SLOT_07_08", displayTime: "7:00 AM", period: "Morning" },
  { slot: "SLOT_08_09", displayTime: "8:00 AM", period: "Morning" },
  { slot: "SLOT_09_10", displayTime: "9:00 AM", period: "Morning" },
  { slot: "SLOT_10_11", displayTime: "10:00 AM", period: "Morning" },
  // Lunch break: slots 11-13
  { slot: "SLOT_13_14", displayTime: "1:00 PM", period: "Afternoon" },
  { slot: "SLOT_14_15", displayTime: "2:00 PM", period: "Afternoon" },
  { slot: "SLOT_15_16", displayTime: "3:00 PM", period: "Afternoon" },
  { slot: "SLOT_16_17", displayTime: "4:00 PM", period: "Afternoon" },
];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ROW_HEIGHT_PIXELS = 100; // Must match `min-h-[100px]` class
const CALENDAR_START_HOUR = 7; // Must match first time slot "SLOT_07_08"

export function CalendarWeekView({
  appointments,
  currentWeek,
  onWeekChange,
  weeklyStats,
  isLoading,
  isFetching,
  onJoinCall,
}: CalendarWeekViewProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Update the 'now' state every minute to move the timeline
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 60000); 

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); 


  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));


  const timelinePosition = useMemo(() => {
    // Calculate total minutes passed since the calendar's start time (7 AM)
    const minutesSinceStart = (now.getHours() - CALENDAR_START_HOUR) * 60 + now.getMinutes();
    
    // Calculate the top offset in pixels
    // (minutesSinceStart / 60) gives us hours passed as a decimal
    // We multiply by the row height to get the pixel offset
    const top = (minutesSinceStart / 60) * ROW_HEIGHT_PIXELS;

    return top;
  }, [now]);

  // --- 5. Determine if the timeline should be visible ---
  // Only show the timeline if the user is viewing the current week
  const showTimeline = isSameWeek(now, currentWeek, { weekStartsOn: 1 });


  const getAppointmentsForSlot = (date: Date, timeSlot: TimeSlot) => {
    return appointments.filter((apt) => {
      const aptDate = parseISO(apt.booking_date.substring(0, 10));
      return isSameDay(aptDate, date) && apt.time_slot === timeSlot;
    });
  };

  const previousWeek = () => {
    onWeekChange(addDays(currentWeek, -7));
  };

  const nextWeek = () => {
    onWeekChange(addDays(currentWeek, 7));
  };

  const updateStatusMutation = useUpdateAppointmentStatus();

  const handleStatusChange = (appointmentId: string, status: AppointmentStatus) => {
    updateStatusMutation.mutate({ appointmentId, status });
  };


  return (
    <>
      {/* CARD HEADER */}
      <WeeklyStatsHeader stats={weeklyStats} isLoading={isLoading} isFetching={isFetching} />

      {/* Topic Legend  */}
      <TopicLegend />

      {/* ========= CALENDAR ========= */}
      <div className="w-full">
        {/* Week Navigation Header */}
        <div className="flex items-center justify-between mb-2 bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Week of {format(weekStart, "MMM d, yyyy")}
              </h2>
              <p className="text-sm text-gray-600">
                {format(weekStart, "MMM d")} -{" "}
                {format(addDays(weekStart, 6), "MMM d, yyyy")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={previousWeek}
              className="p-2"
              disabled={isFetching}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextWeek}
              className="p-2"
              disabled={isFetching}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className={cn(
          "bg-white rounded-lg shadow-sm border overflow-hidden transition-opacity duration-300",
          { "opacity-60 pointer-events-none": isFetching && !isLoading }
        )}
        >
          {/* Days Header */}
          <div className="grid grid-cols-8 bg-blue-50">
            <div className="p-4 font-medium text-sm truncate text-gray-900 border-r border-b-2 border-gray-200 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Time
            </div>
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="p-4 text-center border-r border-b-2 border-gray-200 last:border-r-0"
              >
                <div className="font-medium text-sm text-gray-900 truncate">
                  {daysOfWeek[index]}
                </div>
                <div className="text-lg font-semibold text-gray-700 mt-1">
                  {format(day, "d")}
                </div>
                <div className="text-xs text-gray-500">{format(day, "MMM")}</div>
              </div>
            ))}
          </div>

          {/* Time Slots Grid */}
          <div className="relative max-h-[600px] overflow-y-auto">
            {showTimeline && (
              <div
                className="absolute z-10 grid grid-cols-8 w-full"
                style={{ top: `${timelinePosition}px` }}
              >
                {/* The dot and the time label in the first column */}
                <div className="relative flex justify-end items-center pr-2">
                   <span className="text-xs font-semibold text-blue-600 bg-white px-1">
                      {format(now, 'HH:mm')}
                   </span>
                   <div className="absolute right-[-4px] w-2 h-2 bg-blue-800 rounded-full" />
                </div>
                {/* The line spanning the next 7 columns */}
                <div className="col-span-7 h-0.5 bg-blue-500/50 self-center" />
              </div>
            )}


            {timeSlots.map((timeSlot) => (
              <div
                key={timeSlot.slot}
                className="grid grid-cols-8 border-b border-slate-300 last:border-b-0 min-h-[100px]"
              >
                {/* Time Column */}
                <div className="p-3 border-r border-slate-300 bg-gray-50 flex flex-col justify-center">
                  <div className="text-sm font-medium text-gray-700">
                    {timeSlot.displayTime}
                  </div>
                  <div className="text-xs text-gray-500">{timeSlot.period}</div>
                </div>

                {/* Day Columns */}
                {weekDays.map((day, dayIndex) => {
                  const dayAppointments = getAppointmentsForSlot(
                    day,
                    timeSlot.slot,
                  );

                  return (
                    <div
                      key={dayIndex}
                      className="p-2 border-r border-slate-300 last:border-r-0 min-h-[100px] bg-gray-50/30"
                    >
                      <div className="space-y-2">
                        {dayAppointments.map((appointment) => (
                          <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                            className="w-full relative z-20"
                            onStatusChange={(newStatus) => handleStatusChange(appointment.id, newStatus)}
                            isUpdating={
                              updateStatusMutation.isPending &&
                              updateStatusMutation.variables?.appointmentId === appointment.id
                            }
                            onJoin={onJoinCall}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
