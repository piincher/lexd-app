import { useGetWhatsAppStats } from './useWhatsAppStatsQuery';
import { useGetPendingRequests } from './useWhatsAppPendingRequests';

export const useWhatsAppRequestStats = () => {
  const { data: statsData } = useGetWhatsAppStats();
  const { data: pendingData } = useGetPendingRequests();

  const overview = statsData?.overview || {};
  const pendingRequests = pendingData?.requests || [];

  return {
    pending: statsData?.currentQueue?.pending || 0,
    processing: statsData?.currentQueue?.processing || 0,
    total: statsData?.currentQueue?.total || 0,
    completed: overview?.COMPLETED?.total || 0,
    failed: overview?.FAILED?.total || 0,
    cancelled: overview?.CANCELLED?.total || 0,
    packingList: overview?.PENDING?.byType?.PACKING_LIST?.count || 0,
    loadingList: overview?.PENDING?.byType?.LOADING_LIST?.count || 0,
    tracking: overview?.PENDING?.byType?.TRACKING?.count || 0,
    oldestPending: pendingRequests.length > 0
      ? new Date(pendingRequests[0].requestedAt)
      : null,
  };
};
