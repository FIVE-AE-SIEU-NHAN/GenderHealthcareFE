// =================================================================
// ==                  SOURCE ĐÂY NHA MẤY BRO                     ==
// =================================================================

const STATUS_DEFINITIONS = [
  { id: 0, key: 'Online', label: 'Online' },
  { id: 1, key: 'Offline', label: 'Offline' },
] as const; 


// *================================================================*
// *                       CONSULTANT STATUS CONSTANTS                    *
// *================================================================*

/**
 * A namespace containing all constants related to CONSULTANT STATUSES.
 */
export const CONSULTANT_STATUS = {
  /**
   * Status definitions.
   * @example [{ id: 0, key: 'Online', label: 'Online' }]
   */
  DEFINITIONS: STATUS_DEFINITIONS,

  /**
   * String ('Online') to Number (0) (for API).
   * @example { 'Online': 0, 'Offline': 1 }
   */
  API_MAP: STATUS_DEFINITIONS.reduce((acc, status) => {
    acc[status.key] = status.id;
    return acc;
  }, {} as Record<string, number>),

  /**
   * Number (0) to String ('Online') (for UI).
   * @example { 0: 'Online', 1: 'Offline' }
   */
  UI_MAP: STATUS_DEFINITIONS.reduce((acc, status) => {
    acc[status.id] = status.label;
    return acc;
  }, {} as Record<number, string>),
  
  /**
   * An array of options formatted for faceted filter components.
   * @example [{ value: 'Online', label: 'Online' }]
   */
  FILTER_OPTIONS: STATUS_DEFINITIONS.map(status => ({
    value: status.key,
    label: status.label,
  })),
};



// *================================================================*
// *                      CONSULTANT SEARCH CONSTANTS                     *
// *================================================================*
/**
 * FE search fields to BE query params
 */
export const CONSULTANT_SEARCH_FIELDS = {
  all: '_all',
  name: '_name_like',
  certifications: '_certifications_like',
};