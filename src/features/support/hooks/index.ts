/**
 * Support Feature Hooks - Public API
 */

// Legacy hooks (deprecated, kept for backward compatibility)
export { useFAQ, type UseFAQReturn } from './useFAQ';
export { useFAQQuery } from './useFAQQuery';
export { useFAQFilter } from './useFAQFilter';

// New Help Center hooks
export { useHelpCenter } from './useHelpCenter';
export { useFAQSearch } from './useFAQSearch';
export { useFAQFeedback } from './useFAQFeedback';
export { useFAQBookmarks } from './useFAQBookmarks';
export { useSearchHistory } from './useSearchHistory';
export { useMyTicketsPreview, type TicketPreview } from './useMyTicketsPreview';
export { useCreateTicketInline } from './useCreateTicketInline';
