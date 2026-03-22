/**
 * Support Feature - Public API
 * 
 * This module provides FAQ and customer support functionality.
 * 
 * @example
 * import { FAQScreen, useFAQ, FAQCategoryFilter } from '@src/features/support';
 * 
 * <FAQScreen />
 * const { data, filteredData } = useFAQ();
 */

// Screens
export { FAQScreen, FAQScreenSkeleton } from './screens';

// Hooks
export { useFAQ, type UseFAQReturn } from './hooks';

// Components
export {
  FAQSearchBar,
  FAQCategoryFilter,
  FAQItem,
  FAQEmptyState,
  FAQContactButton,
} from './components';

// Types
export type {
  FAQItem,
  FAQCategory,
  FAQCategoryInfo,
  FAQFilter,
} from './types';

// Constants
export {
  FAQ_CATEGORY_LABELS,
  FAQ_CATEGORY_COLORS,
} from './types';

// API
export {
  fetchFAQs,
  fetchFAQsByCategory,
  searchFAQs,
  fetchFAQCategories,
} from './api';
