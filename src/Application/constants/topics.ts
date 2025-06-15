export const TOPIC_OPTIONS: { value: string; label: string }[] = [
  { value: 'WOMENS_REPRODUCTIVE_HEALTH', label: "Women's Reproductive Health" },
  { value: 'CONTRACEPTION_AND_FAMILY_PLANNING', label: 'Contraception & Family Planning' },
  { value: 'PREGNANCY_AND_MATERNITY_SUPPORT', label: 'Pregnancy & Maternity Support' },
  { value: 'STIS', label: 'STIs (Sexually Transmitted Infections)' },
  { value: 'SEXUAL_HEALTH_AND_GENDER_PSYCHOLOGY', label: 'Sexual Health & Gender Psychology' },
  { value: 'TESTING_AND_DIAGNOSTIC_SERVICES', label: 'Testing & Diagnostic Services' },
];

// Array of the values for validation, if needed elsewhere.
export const TOPIC_VALUES = TOPIC_OPTIONS.map(option => option.value);