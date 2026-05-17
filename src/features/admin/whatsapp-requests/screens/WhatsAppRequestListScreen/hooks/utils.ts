import { WhatsAppRequestFilters, WhatsAppRequestStatus } from '../../../api/whatsappRequestApi';

export const buildRequestFilters = (
  selectedStatus: WhatsAppRequestStatus | 'all',
): WhatsAppRequestFilters =>
  selectedStatus !== 'all' ? { status: selectedStatus, limit: 50 } : { limit: 50 };
