import {
  MessageSquareQuote,
  Clock,
  CalendarCheck,
  Cog,
  Info,
  type LucideIcon, 
} from "lucide-react";

/**
 * The primary configuration object for different notification types.
 * This serves as the single source of truth.
 * Using 'as const' allows us to derive a strict type from it.
 */
export const NOTIFICATION_DETAILS = {
  ANSWERED_QUESTION: {
    title: "Question Answered",
    icon: MessageSquareQuote,
    style: {
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  },
  APPOINTMENT_REMINDER_30M: {
    title: "Appointment Reminder",
    icon: Clock,
    style: {
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  },
  SERVICE_REMINDER_1D: {
    title: "Service Reminder",
    icon: CalendarCheck,
    style: {
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
  },
  SYSTEM: {
    title: "System Update",
    icon: Cog,
    style: {
      bgColor: "bg-gray-200",
      iconColor: "text-gray-600",
    },
  },
  OTHER: {
    title: "General Notification",
    icon: Info,
    style: {
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  },
} as const;

/**
 * Derives the notification types from the keys of our details object.
 * This ensures the type is always in sync with the configuration.
 */
export type NotificationType = keyof typeof NOTIFICATION_DETAILS;

/**
 * Defines the shape of the style object for a notification.
 */
export type NotificationStyle = {
  title: string;
  icon: LucideIcon;
  style: {
    bgColor: string;
    iconColor: string;
  };
};

/**
 * A default style object to use as a fallback for any unknown notification types.
 * This makes the component more resilient.
 */
export const DEFAULT_NOTIFICATION_STYLE: NotificationStyle = NOTIFICATION_DETAILS.OTHER;