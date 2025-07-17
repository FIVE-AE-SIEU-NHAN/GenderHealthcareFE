// =================================================================
// ==                      BLOG CONSTANTS                        ==
// =================================================================

const STATUS_DEFINITIONS = [
  { id: 'PUBLISHED', key: 'Published', label: 'Published' },
  { id: 'ARCHIVED', key: 'Archived', label: 'Archived' },
  { id: 'DRAFT', key: 'Draft', label: 'Draft' },
] as const;

// *================================================================*
// *                        BLOG STATUS CONSTANTS                   *
// *================================================================*

/**
 * A namespace containing all constants related to BLOG STATUSES.
 */
export const BLOG_STATUS = {
  /**
   * Status definitions.
   */
  DEFINITIONS: STATUS_DEFINITIONS,

  /**
   * String ('Published') to Enum-like ID ('PUBLISHED') for API.
   * @example { 'Published': 'PUBLISHED', 'Archived': 'ARCHIVED' }
   */
  API_MAP: STATUS_DEFINITIONS.reduce((acc, status) => {
    acc[status.key] = status.id;
    return acc;
  }, {} as Record<string, string>),

  /**
   * Enum-like ID ('PUBLISHED') to Label ('Published') for UI.
   * @example { 'PUBLISHED': 'Published', 'ARCHIVED': 'Archived' }
   */
  UI_MAP: STATUS_DEFINITIONS.reduce((acc, status) => {
    acc[status.id] = status.label;
    return acc;
  }, {} as Record<string, string>),

  /**
   * An array of options formatted for faceted filter components.
   * @example [{ value: 'Published', label: 'Published' }]
   */
  FILTER_OPTIONS: STATUS_DEFINITIONS.map(status => ({
    value: status.key,
    label: status.label,
  })),

  /**
   * An array of options formatted for form <Select> components (if needed).
   * @example [{ value: 'PUBLISHED', label: 'Published' }]
   */
  SELECT_OPTIONS: STATUS_DEFINITIONS.map(status => ({
    value: status.id,
    label: status.label,
  })),
};

// *================================================================*
// *                     BLOG SEARCH FIELDS                         *
// *================================================================*

/**
 * FE search fields to BE query params
 */
export const BLOG_SEARCH_FIELDS = {
  all: '_all',
  author_name: '_author_name_like',
  title: '_title_like',
  summary: '_summary_like',
  content: '_content_like',
  section_1: '_section_1_like',
  section_2: '_section_2_like',
};
