// =================================================================
// ==                  SOURCE ĐÂY NHA MẤY BRO                     ==
// =================================================================

const STATUS_DEFINITIONS = [
  { id: 0, key: 'Active', label: 'Active' },
  { id: 1, key: 'Banned', label: 'Banned' },
] as const; // Use 'as const' for stricter typing

const ROLE_DEFINITIONS = [
  { id: 0, key: 'Admin', label: 'Admin' },
  { id: 1, key: 'Consultant', label: 'Consultant' },
  { id: 2, key: 'Manager', label: 'Manager' },
  { id: 3, key: 'Customer', label: 'Customer' },
  { id: 4, key: 'Doctor', label: 'Doctor' },
] as const;


// *================================================================*
// *                       USER STATUS CONSTANTS                    *
// *================================================================*

/**
 * A namespace containing all constants related to USER STATUSES.
 */
export const USER_STATUS = {
  /**
   * Status definitions.
   * @example [{ id: 0, key: 'Active', label: 'Active' }]
   */
  DEFINITIONS: STATUS_DEFINITIONS,

  /**
   * String ('Active') to Number (0) (for API).
   * @example { 'Active': 0, 'Banned': 1 }
   */
  API_MAP: STATUS_DEFINITIONS.reduce((acc, status) => {
    acc[status.key] = status.id;
    return acc;
  }, {} as Record<string, number>),

  /**
   * Number (0) to String ('Active') (for UI).
   * @example { 0: 'Active', 1: 'Banned' }
   */
  UI_MAP: STATUS_DEFINITIONS.reduce((acc, status) => {
    acc[status.id] = status.label;
    return acc;
  }, {} as Record<number, string>),
  
  /**
   * An array of options formatted for faceted filter components.
   * @example [{ value: 'Active', label: 'Active' }]
   */
  FILTER_OPTIONS: STATUS_DEFINITIONS.map(status => ({
    value: status.key,
    label: status.label,
  })),
};




// *================================================================*
// *                        USER ROLE CONSTANTS                     *
// *================================================================*

/**
 * A namespace containing all constants related to USER ROLES.
 */
export const USER_ROLE = {
  /**
   * Role definitions.
   */
  DEFINITIONS: ROLE_DEFINITIONS,

  /**
   * String ('Admin') to Number (0) (for API).
   * @example { 'Admin': 0, 'Consultant': 1 }
   */
  API_MAP: ROLE_DEFINITIONS.reduce((acc, role) => {
    acc[role.key] = role.id;
    return acc;
  }, {} as Record<string, number>),

  /**
   * Number (0) to String ('Admin') (for UI).
   * @example { 0: 'Admin', 1: 'Consultant' }
   */
  UI_MAP: ROLE_DEFINITIONS.reduce((acc, role) => {
    acc[role.id] = role.label;
    return acc;
  }, {} as Record<number, string>),
  
  /**
   * An array of options formatted for faceted filter components.
   * @example [{ value: 'Admin', label: 'Admin' }]
   */
  FILTER_OPTIONS: ROLE_DEFINITIONS.map(role => ({
    value: role.key,
    label: role.label,
  })),

  /**
   * An array of options formatted for form <Select> components (CreateUserForm.tsx)
   * Note: The `value` is a string as required by HTML select options
   * @example [{ value: '0', label: 'Admin' }]
   */
  SELECT_OPTIONS: ROLE_DEFINITIONS.map(role => ({
    value: String(role.id), 
    label: role.label,
  })),
};



// *================================================================*
// *                      USER SEARCH CONSTANTS                     *
// *================================================================*
/**
 * FE search fields to BE query params
 */
export const USER_SEARCH_FIELDS = {
  all: '_all',
  name: '_name_like',
  email: '_email_like',
};