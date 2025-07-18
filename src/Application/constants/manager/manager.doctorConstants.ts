// =================================================================
// ==                     DOCTOR CONSTANTS                        ==
// =================================================================

// Based on the backend StaffStatus enum
const STATUS_DEFINITIONS = [
  { id: 0, key: 'Inactive', label: 'Inactive' },
  { id: 1, key: 'Active', label: 'Active' },
] as const;


// *================================================================*
// *                       DOCTOR STATUS CONSTANTS                  *
// *================================================================*

/**
 * A namespace containing all constants related to DOCTOR STATUSES.
 */
export const DOCTOR_STATUS = {
  /**
   * Status definitions.
   * @example [{ id: 0, key: 'Inactive', label: 'Inactive' }]
   */
  DEFINITIONS: STATUS_DEFINITIONS,

  /**
   * String ('Inactive') to Number (0) (for API).
   * @example { 'Inactive': 0, 'Active': 1 }
   */
  API_MAP: STATUS_DEFINITIONS.reduce((acc, status) => {
    acc[status.key] = status.id;
    return acc;
  }, {} as Record<string, number>),

  /**
   * Number (0) to String ('Inactive') (for UI).
   * @example { 0: 'Inactive', 1: 'Active' }
   */
  UI_MAP: STATUS_DEFINITIONS.reduce((acc, status) => {
    acc[status.id] = status.label;
    return acc;
  }, {} as Record<number, string>),
  
  /**
   * An array of options formatted for faceted filter components.
   * @example [{ value: 'Inactive', label: 'Inactive' }]
   */
  FILTER_OPTIONS: STATUS_DEFINITIONS.map(status => ({
    value: status.key,
    label: status.label,
  })),
};



// *================================================================*
// *                      DOCTOR SEARCH CONSTANTS                   *
// *================================================================*
/**
 * Maps frontend search fields to backend query parameters based on users.services.ts.
 */
export const DOCTOR_SEARCH_FIELDS = {
  all: '_all',
  name: '_name_like',
  specialization: '_specialization_like',
};