/**
 * useCustomerDashboard Hook
 * Consolidated hook for customer dashboard logic
 */

import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@src/store/Auth';

import { useGetDashboard, useGetActivity } from './useDashboard';
import { QuickAction, DashboardStats } from '../types';
import { DEFAULT_QUICK_ACTIONS, DEFAULT_STATS, getWelcomeMessage } from './dashboardConstants';

export interface UseCustomerDashboardReturn {
  user: any;
  welcomeMessage: string;
  stats: DashboardStats;
  containers: { id: string; virtualContainerNumber: string; status: string; shippingMode?: string; shippingLine?: string; timeline?: any }[];
  quickActions: QuickAction[];
  activities: import('../types').ActivityItem[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  refresh: () => Promise<void>;
  handleNotifications: () => void;
  handleViewAllActivity: () => void;
  handleActionPress: (action: QuickAction) => void;
  handleViewGoods: () => void;
  handleViewContainers: () => void;
  handleViewSpent: () => void;
  handleContainerPress: (containerId: string) => void;
}

export const useCustomerDashboard = (): UseCustomerDashboardReturn => {
  const navigation = useNavigation<any>();
  const user = useAuth((state) => state.user);

  const { data: dashboardData, isLoading: isDashboardLoading, isError, error, refetch: refetchDashboard } = useGetDashboard();
  const { data: activityData, isLoading: isActivityLoading, refetch: refetchActivity } = useGetActivity({ limit: 5 });

  const stats = dashboardData?.stats || DEFAULT_STATS;
  // Always use frontend quick actions — backend routes don't match React Navigation
  const quickActions = DEFAULT_QUICK_ACTIONS;
  const activities = activityData?.activities || [];
  const containers = dashboardData?.containers || [];
  const welcomeMessage = useMemo(() => getWelcomeMessage(user?.firstName || ''), [user?.firstName]);

  const refresh = useCallback(async () => {
    await Promise.all([refetchDashboard(), refetchActivity()]);
  }, [refetchDashboard, refetchActivity]);

  const handleNotifications = useCallback(() => navigation.navigate('Notifications'), [navigation]);
  const handleViewAllActivity = useCallback(() => navigation.navigate('ActivityList'), [navigation]);
  const handleActionPress = useCallback((action: QuickAction) => {
    if (action.route) navigation.navigate(action.route);
    else if (action.action) action.action();
  }, [navigation]);
  const handleViewGoods = useCallback(() => navigation.navigate('MyGoods'), [navigation]);
  const handleViewContainers = useCallback(() => navigation.navigate('MyContainers'), [navigation]);
  const handleViewSpent = useCallback(() => navigation.navigate('MyPaymentHistory'), [navigation]);
  const handleContainerPress = useCallback((containerId: string) => {
    if (containerId) {
      navigation.navigate('ContainerTracking', { containerId });
    } else {
      navigation.navigate('MyContainers');
    }
  }, [navigation]);

  return {
    user,
    welcomeMessage,
    stats,
    containers,
    quickActions,
    activities,
    isLoading: isDashboardLoading || isActivityLoading,
    isError,
    errorMessage: error?.message || 'Impossible de charger le tableau de bord',
    refresh,
    handleNotifications,
    handleViewAllActivity,
    handleActionPress,
    handleViewGoods,
    handleViewContainers,
    handleViewSpent,
    handleContainerPress,
  };
};

export default useCustomerDashboard;
