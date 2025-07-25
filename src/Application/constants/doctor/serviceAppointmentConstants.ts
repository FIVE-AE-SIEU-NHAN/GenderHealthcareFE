import { ServiceAppointmentStatus } from '@/types/doctor/serviceAppointmentTypes'

export interface PackageStyle {
  label: string
  cardClasses: string
  dotClass: string
}

const PACKAGE_DETAILS = {
  '83cf0d76-637e-11f0-bfde-0242ac110002': {
    label: 'Basic Male',
    classes: {
      card: 'border-l-sky-500 bg-sky-50',
      dot: 'bg-sky-500'
    }
  },
  '83cf134d-637e-11f0-bfde-0242ac110002': {
    label: 'Advanced Male',
    classes: {
      card: 'border-l-blue-700 bg-blue-50',
      dot: 'bg-blue-700'
    }
  },
  '83cf1469-637e-11f0-bfde-0242ac110002': {
    label: 'Basic Female',
    classes: {
      card: 'border-l-pink-500 bg-pink-50',
      dot: 'bg-pink-500'
    }
  },
  '83cf14e0-637e-11f0-bfde-0242ac110002': {
    label: 'Advanced Female',
    classes: {
      card: 'border-l-fuchsia-700 bg-fuchsia-50',
      dot: 'bg-fuchsia-700'
    }
  }
} as const

export const PACKAGE_STYLES_MAP = new Map<string, PackageStyle>()

for (const [key, details] of Object.entries(PACKAGE_DETAILS)) {
  PACKAGE_STYLES_MAP.set(key, {
    label: details.label,
    cardClasses: details.classes.card,
    dotClass: details.classes.dot
  })
}

export const DEFAULT_PACKAGE_STYLE: PackageStyle = {
  label: 'Unknown Package',
  cardClasses: 'border-l-gray-400 bg-gray-50',
  dotClass: 'bg-gray-500'
}

// Status options for service appointments (e.g., for a dropdown if needed in the future)
export const SERVICE_APPOINTMENT_STATUS_OPTIONS: ServiceAppointmentStatus[] = [
  'PENDING',
  'CHECKIN',
  'ONGOING',
  'INPUT_RESULTS',
  'COMPLETED',
  'CANCELLED'
]

// Styles for each service appointment status, similar to STATUS_STYLES for consultations
export const SERVICE_STATUS_STYLES: Record<
  ServiceAppointmentStatus,
  { label: string; className: string; dotColor: string }
> = {
  PENDING: {
    label: 'Pending',
    className: 'bg-amber-50 text-amber-700 border-amber-300',
    dotColor: 'bg-amber-400'
  },
  CHECKIN: {
    label: 'Checked In',
    className: 'bg-sky-50 text-sky-700 border-sky-300',
    dotColor: 'bg-sky-400'
  },
  ONGOING: {
    label: 'Ongoing',
    className: 'bg-blue-50 text-blue-700 border-blue-300',
    dotColor: 'bg-blue-400'
  },
  INPUT_RESULTS: {
    label: 'Preparing Results',
    className: 'bg-indigo-50 text-indigo-700 border-indigo-300',
    dotColor: 'bg-indigo-400'
  },
  COMPLETED: {
    label: 'Completed',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-300',
    dotColor: 'bg-emerald-400'
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-red-50 text-red-700 border-red-300',
    dotColor: 'bg-red-400'
  }
}

/**
 * Defines the strict, ordered flow for service appointment statuses.
 * The key is the current status, and the value is the next logical status.
 * `null` indicates a terminal state with no "next" step in the standard flow.
 */
export const SERVICE_STATUS_TRANSITIONS: Record<ServiceAppointmentStatus, ServiceAppointmentStatus[]> = {
  PENDING: ['CHECKIN', 'CANCELLED'],
  CHECKIN: ['ONGOING', 'CANCELLED'],
  ONGOING: ['INPUT_RESULTS', 'CANCELLED'],
  INPUT_RESULTS: [],
  COMPLETED: [],
  CANCELLED: []
}
