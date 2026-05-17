import { useGetDashboard } from '@src/shared/hooks/useDashboard';
import { useBalanceDue } from '@src/shared/hooks/useBalanceDue';
import { useGetOrderOfUserById } from '@src/shared/hooks/useOrders';
import { useGetCurrentUser } from '@src/shared/hooks/useUser';

export const useProfileChartData = () => {
  const { data: user } = useGetCurrentUser();
  const { data: dashboard, isLoading: dashboardLoading } = useGetDashboard();
  const { data: balanceDue, isLoading: balanceLoading } = useBalanceDue();
  const { data: orders, isLoading: ordersLoading } = useGetOrderOfUserById(user?._id ?? '');

  const isLoading = dashboardLoading || balanceLoading || ordersLoading;
  const stats = (dashboard as { stats?: any } | undefined)?.stats;

  return { stats, balanceDue, orders, isLoading };
};
