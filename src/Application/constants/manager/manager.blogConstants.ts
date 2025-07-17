export const BLOG_STATUS = {
  UI_MAP: {
    PUBLISHED: 'Published',
    ARCHIVED: 'Archived',
    DRAFT: 'Draft',
  },
  API_MAP: {
    Published: 'PUBLISHED',
    Archived: 'ARCHIVED',
    Draft: 'DRAFT',
  },
  FILTER_OPTIONS: [
    { label: 'Published', value: 'Published' },
    { label: 'Archived', value: 'Archived' },
    { label: 'Draft', value: 'Draft' },
  ]
};

// ================ BLOG SEARCH FIELDS ==================
export const BLOG_SEARCH_FIELDS = {
  all: '_all',
  author_name_like: '_author_name_like',
  title_like: '_title_like',
  summary_like: '_summary_like',
  content_like: '_content_like',
  section_1_like: '_section_1_like',
  section_2_like: '_section_2_like',
};