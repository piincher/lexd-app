import { TicketStatus } from '../types';

export const isTicketOpen = (status: TicketStatus): boolean =>
  status === 'OPEN' || status === 'IN_PROGRESS' || status === 'WAITING_CUSTOMER';

export const isTicketResolved = (status: TicketStatus): boolean =>
  status === 'RESOLVED' || status === 'CLOSED';

export const isTicketActive = (status: TicketStatus): boolean => status !== 'CLOSED';
