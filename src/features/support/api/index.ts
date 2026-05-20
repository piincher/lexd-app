/**
 * Support Feature API - Public API
 */

export {
  getFAQs,
  getFAQById,
  incrementFAQViews,
  submitFAQFeedback,
  getFAQSearchSuggestions,
  getFAQCategories,
  getPopularFAQs,
  seedFAQs,
} from './faqApi';

export {
  getMyTicketsPreview,
  createTicket,
  type TicketPreview,
  type CreateTicketRequest,
  type CreateTicketResponse,
} from './ticketApi';

// Legacy mock exports (deprecated, kept for backward compatibility)
export { MOCK_FAQS } from './faqMockData';
