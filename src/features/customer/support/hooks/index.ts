/**
 * Support Hooks
 * Export all ticket hooks
 */

export {
  useGetTickets,
  useGetTicket,
  useCreateTicket,
  useAddMessage,
  useRateTicket,
  useUploadAttachment,
  ticketQueryKeys,
} from './useTickets';

export {
  isTicketOpen,
  isTicketResolved,
  isTicketActive,
} from './useTickets';

export { useTicketFilters } from './useTicketFilters';
