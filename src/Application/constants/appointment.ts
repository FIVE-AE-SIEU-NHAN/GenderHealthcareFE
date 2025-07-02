const TOPIC_DETAILS = {
  WOMENS_REPRODUCTIVE_HEALTH: {
    label: "Women's Reproductive Health",
    color: 'purple',
  },
  CONTRACEPTION_AND_FAMILY_PLANNING: {
    label: 'Contraception & Family Planning',
    color: 'blue',
  },
  PREGNANCY_AND_MATERNITY_SUPPORT: {
    label: 'Pregnancy & Maternity Support',
    color: 'yellow',
  },
  STIS: {
    label: 'STIs (Sexually Transmitted Infections)',
    color: 'teal',
  },
  SEXUAL_HEALTH_AND_GENDER_PSYCHOLOGY: {
    label: 'Sexual Health & Gender Psychology',
    color: 'gray',
  },
  TESTING_AND_DIAGNOSTIC_SERVICES: {
    label: 'Testing & Diagnostic Services',
    color: 'pink',
  },
} as const;


/**
 * Time slot enum matching server format
 */
export type TimeSlot =
  | "SLOT_07_08"
  | "SLOT_08_09"
  | "SLOT_09_10"
  | "SLOT_10_11"
  | "SLOT_13_14"
  | "SLOT_14_15"
  | "SLOT_15_16"
  | "SLOT_16_17"

/**
 * Appointment status enum
 */
export type AppointmentStatus =
  | "PENDING"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED";


/**
 * Healthcare topics enum
 */
export type Topic =
  | "TESTING_AND_DIAGNOSTIC_SERVICES"
  | "SEXUAL_HEALTH_AND_GENDER_PSYCHOLOGY"
  | "STIS_SEXUALLY_TRANSMITTED_INFECTIONS"
  | "PREGNANCY_AND_MATERNITY_SUPPORT"
  | "CONTRACEPTION_AND_FAMILY_PLANNING"
  | "WOMENS_REPRODUCTIVE_HEALTH";


export type TopicStyle = {
  label: string;
  cardClasses: string;
  dotClass: string;
};

// TOPIC_STYLES_MAP for AppointmentCard
export const TOPIC_STYLES_MAP = new Map<Topic, TopicStyle>();

for (const [key, details] of Object.entries(TOPIC_DETAILS)) {
  const { label, color } = details;
  TOPIC_STYLES_MAP.set(key as Topic, {
    label,
    cardClasses: `border-l-${color}-500 bg-${color}-500/10 text-${color}-700`,
    dotClass: `bg-${color}-500`,
  });
}

// TOPIC_OPTIONS for consultants/questions management
export const TOPIC_OPTIONS: { value: string; label: string; style?: string }[] =
  Object.entries(TOPIC_DETAILS).map(([value, details]) => {
    const { label, color } = details;
    return {
      value,
      label,
      style: `border-${color}-500/50 bg-${color}-500/10 text-${color}-700`,
    };
  });

export const DEFAULT_TOPIC_STYLE: TopicStyle = {
  label: 'Unknown Topic',
  cardClasses: 'border-l-gray-500 bg-red-500/10 text-gray-700',
  dotClass: 'bg-gray-500',
};

export const TOPIC_VALUES = TOPIC_OPTIONS.map(option => option.value);