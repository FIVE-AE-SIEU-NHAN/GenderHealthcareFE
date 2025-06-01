export const USER_ROLES = {
  GUEST: 'guest',
  USER: 'user',
  STAFF: 'staff',
  MANAGER: 'manager',
  ADMIN: 'admin',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const isUserRole = (role: string | null): role is UserRole => {
  return Object.values(USER_ROLES).includes(role as UserRole);
};
