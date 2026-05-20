/**
 * Support Feature - Public API
 *
 * This module provides FAQ and customer support functionality.
 */

// Screens
export { FAQScreen, HelpCenterScreen, FAQScreenSkeleton } from './screens';

// Hooks
export { useFAQ, type UseFAQReturn } from './hooks';
export { useHelpCenter } from './hooks/useHelpCenter';

// Components
export {
  FAQSearchBar,
  FAQCategoryFilter,
  FAQEmptyState,
  FAQContactButton,
  HelpQuickActions,
  HelpPopularFAQs,
  HelpMyTicketsPreview,
  HelpSearchBar,
  HelpCategoryGrid,
  HelpFAQList,
  HelpFAQCard,
  HelpFAQDetailModal,
  HelpEmptyState,
  HelpCreateTicketModal,
  HelpBookmarkedSection,
} from './components';

// Types
export type {
  FAQItem,
  FAQCategory,
  FAQFilter,
  FAQBookmark,
  SearchHistoryItem,
  FAQCategoryCount,
  FAQSearchSuggestion,
  FAQFeedbackResponse,
  FAQListResponse,
} from './types';

// Constants
export {
  FAQ_CATEGORY_LABELS,
  FAQ_CATEGORY_COLORS,
  FAQ_CATEGORY_ICONS,
} from './types';

// API
export {
  getFAQs,
  getFAQById,
  incrementFAQViews,
  submitFAQFeedback,
  getFAQSearchSuggestions,
  getFAQCategories,
  getPopularFAQs,
  seedFAQs,
  getMyTicketsPreview,
  createTicket,
  type TicketPreview,
  type CreateTicketRequest,
  type CreateTicketResponse,
} from './api';
