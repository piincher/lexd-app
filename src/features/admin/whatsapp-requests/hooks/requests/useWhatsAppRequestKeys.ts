import { WhatsAppRequestFilters, WhatsAppRequestStatus } from '../../api/whatsappRequestApi';

export const whatsappRequestQueryKeys = {
  all: ['whatsapp-requests'] as const,
  lists: () => [...whatsappRequestQueryKeys.all, 'list'] as const,
  list: (filters: WhatsAppRequestFilters | undefined) =>
    [...whatsappRequestQueryKeys.lists(), filters] as const,
  details: () => [...whatsappRequestQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...whatsappRequestQueryKeys.details(), id] as const,
  byStatus: (status: WhatsAppRequestStatus) => [...whatsappRequestQueryKeys.all, 'status', status] as const,
  stats: () => [...whatsappRequestQueryKeys.all, 'stats'] as const,
  customerSearch: (phone: string) => [...whatsappRequestQueryKeys.all, 'customer', phone] as const,
};
