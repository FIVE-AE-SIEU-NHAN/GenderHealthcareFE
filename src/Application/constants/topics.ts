export const TOPIC_OPTIONS: { value: string; label: string; style?: string }[] = [
  {
    value: 'WOMENS_REPRODUCTIVE_HEALTH',
    label: "Women's Reproductive Health",
    style: 'border-purple-500/50 bg-purple-500/10 text-purple-700',
  },
  {
    value: 'CONTRACEPTION_AND_FAMILY_PLANNING',
    label: 'Contraception & Family Planning',
    style: 'border-blue-500/50 bg-blue-500/10 text-blue-700',
  },
  {
    value: 'PREGNANCY_AND_MATERNITY_SUPPORT',
    label: 'Pregnancy & Maternity Support',
    style: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700',
  },
  {
    value: 'STIS',
    label: 'STIs (Sexually Transmitted Infections)',
    style: 'border-teal-500/50 bg-teal-500/10 text-teal-700',
  },
  {
    value: 'SEXUAL_HEALTH_AND_GENDER_PSYCHOLOGY',
    label: 'Sexual Health & Gender Psychology',
    style: 'border-gray-500/50 bg-gray-500/10 text-gray-700',
  },
  {
    value: 'TESTING_AND_DIAGNOSTIC_SERVICES',
    label: 'Testing & Diagnostic Services',
    style: 'border-pink-500/50 bg-pink-500/10 text-pink-700',
  },
];

// Array of the values for validation, if needed elsewhere.
export const TOPIC_VALUES = TOPIC_OPTIONS.map(option => option.value);