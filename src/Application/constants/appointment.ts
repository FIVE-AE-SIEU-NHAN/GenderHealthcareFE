const TOPIC_DETAILS = {
  WOMENS_REPRODUCTIVE_HEALTH: {
    label: "Women's Reproductive Health",
    classes: {
      card: 'border-l-purple-500 bg-[#f3effe] text-purple-700',
      dot: 'bg-purple-500'
    }
  },
  CONTRACEPTION_AND_FAMILY_PLANNING: {
    label: 'Contraception & Family Planning',
    classes: {
      card: 'border-l-blue-500 bg-[#ebf3fe] text-blue-700',
      dot: 'bg-blue-500'
    }
  },
  PREGNANCY_AND_MATERNITY_SUPPORT: {
    label: 'Pregnancy & Maternity Support',
    classes: {
      card: 'border-l-yellow-500 bg-[#fdf7e6] text-yellow-700',
      dot: 'bg-yellow-500'
    }
  },
  STIS: {
    label: 'STIs (Sexually Transmitted Infections)',
    classes: {
      card: 'border-l-teal-500 bg-[#e8f8f6] text-teal-700',
      dot: 'bg-teal-500'
    }
  },
  SEXUAL_HEALTH_AND_GENDER_PSYCHOLOGY: {
    label: 'Sexual Health & Gender Psychology',
    classes: {
      card: 'border-l-gray-500 bg-[#f0f1f2] text-gray-700',
      dot: 'bg-gray-500'
    }
  },
  TESTING_AND_DIAGNOSTIC_SERVICES: {
    label: 'Testing & Diagnostic Services',
    classes: {
      card: 'border-l-pink-500 bg-[#fdedf5] text-pink-700',
      dot: 'bg-pink-500'
    }
  }
} as const

/**
 * Time slot enum matching server format
 */
export type TimeSlot =
  | 'SLOT_07_08'
  | 'SLOT_08_09'
  | 'SLOT_09_10'
  | 'SLOT_10_11'
  | 'SLOT_13_14'
  | 'SLOT_14_15'
  | 'SLOT_15_16'
  | 'SLOT_16_17'

export const timeSlotOptions = [
  { value: 'SLOT_07_08', label: '7:00 - 8:00' },
  { value: 'SLOT_08_09', label: '8:00 - 9:00' },
  { value: 'SLOT_09_10', label: '9:00 - 10:00' },
  { value: 'SLOT_10_11', label: '10:00 - 11:00' },
  { value: 'SLOT_13_14', label: '13:00 - 14:00' },
  { value: 'SLOT_14_15', label: '14:00 - 15:00' },
  { value: 'SLOT_15_16', label: '15:00 - 16:00' },
  { value: 'SLOT_16_17', label: '16:00 - 17:00' }
]

/**
 * Appointment status enum
 */
export type AppointmentStatus = 'PENDING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'

export const APPOINTMENT_STATUS_OPTIONS = ['PENDING', 'ONGOING', 'COMPLETED', 'CANCELLED'] as const

export const STATUS_STYLES = {
  PENDING: {
    label: 'Pending',
    className: 'bg-amber-50 text-amber-700 border-amber-300',
    dotColor: 'bg-amber-400'
  },
  ONGOING: {
    label: 'Ongoing',
    className: 'bg-blue-50 text-blue-700 border-blue-300',
    dotColor: 'bg-blue-400'
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
 * Healthcare topics enum
 */
export type Topic =
  | 'TESTING_AND_DIAGNOSTIC_SERVICES'
  | 'SEXUAL_HEALTH_AND_GENDER_PSYCHOLOGY'
  | 'STIS_SEXUALLY_TRANSMITTED_INFECTIONS'
  | 'PREGNANCY_AND_MATERNITY_SUPPORT'
  | 'CONTRACEPTION_AND_FAMILY_PLANNING'
  | 'WOMENS_REPRODUCTIVE_HEALTH'

export type TopicStyle = {
  label: string
  cardClasses: string
  dotClass: string
}

// TOPIC_STYLES_MAP for AppointmentCard
export const TOPIC_STYLES_MAP = new Map<Topic, TopicStyle>()

for (const [key, details] of Object.entries(TOPIC_DETAILS)) {
  const { label, classes } = details
  TOPIC_STYLES_MAP.set(key as Topic, {
    label,
    cardClasses: classes.card,
    dotClass: classes.dot
  })
}

// TOPIC_OPTIONS for consultants/questions management
export const TOPIC_OPTIONS: { value: string; label: string; style?: string }[] = Object.entries(TOPIC_DETAILS).map(
  ([value, details]) => {
    const { label, classes } = details
    return {
      value,
      label,
      style: classes.card
    }
  }
)

export const DEFAULT_TOPIC_STYLE: TopicStyle = {
  label: 'Unknown Topic',
  cardClasses: 'border-l-gray-500 bg-red-500/10 text-gray-700',
  dotClass: 'bg-gray-500'
}

export const TOPIC_VALUES = TOPIC_OPTIONS.map((option) => option.value)

export const CONSULTATION_STATUS_TRANSITIONS: Record<AppointmentStatus, AppointmentStatus[]> = {
  PENDING: ['ONGOING', 'CANCELLED'],
  ONGOING: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: []
}
