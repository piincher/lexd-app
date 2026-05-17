import { useQueryClient } from '@tanstack/react-query';
import {
  useGetWhatsAppRequests,
  useGetPendingRequests,
  useGetWhatsAppStats,
  whatsappRequestQueryKeys,
} from '../../../hooks';
import { WhatsAppRequestStatus } from '../../../api/whatsappRequestApi';
import { buildRequestFilters } from './utils';

export const useWhatsAppRequestFilter = (selectedStatus: WhatsAppRequestStatus | 'all') => {
  const queryClient = useQueryClient();
  const filters = buildRequestFilters(selectedStatus);

  const { data, isLoading, isRefetching, error, refetch } = useGetWhatsAppRequests(filters);
  const { data: pendingData } = useGetPendingRequests();
  const { data: statsData } = useGetWhatsAppStats();

  const requests = data?.requests || [];
  const pendingCount = pendingData?.requests?.length || 0;
  const stats = statsData?.currentQueue || { pending: 0, processing: 0, total: 0 };

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.all });
    await refetch();
  };

  return { requests, pendingCount, stats, isLoading, isRefetching, error, handleRefresh };
};
