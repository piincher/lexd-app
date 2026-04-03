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
  quickActions: QuickAction[];
  activities: import('../types').ActivityItem[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  refresh: () => Promise<void>;
  handleNotifications: () => void;
  handlePayBalance: () => void;
  handleViewAllActivity: () => void;
  handleActionPress: (action: QuickAction) => void;
}

export const useCustomerDashboard = (): UseCustomerDashboardReturn => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const { data: dashboardData, isLoading: isDashboardLoading, isError, error, refetch: refetchDashboard } = useGetDashboard();
  const { data: activityData, isLoading: isActivityLoading, refetch: refetchActivity } = useGetActivity({ limit: 5 });

  const stats = dashboardData?.stats || DEFAULT_STATS;
  const quickActions = dashboardData?.quickActions?.length ? dashboardData.quickActions : DEFAULT_QUICK_ACTIONS;
  const activities = activityData?.activities || [];
  const welcomeMessage = useMemo(() => getWelcomeMessage(user?.firstName || ''), [user?.firstName]);

  const refresh = useCallback(async () => {
    await Promise.all([refetchDashboard(), refetchActivity()]);
  }, [refetchDashboard, refetchActivity]);

  const handleNotifications = useCallback(() => navigation.navigate('Notifications' as never), [navigation]);
  const handlePayBalance = useCallback(() => console.log('Payment feature removed'), [navigation]);
  const handleViewAllActivity = useCallback(() => navigation.navigate('ActivityList' as never), [navigation]);
  const handleActionPress = useCallback((action: QuickAction) => {
    if (action.route) navigation.navigate(action.route as never);
    else if (action.action) action.action();
  }, [navigation]);

  return {
    user,
    welcomeMessage,
    stats,
    quickActions,
    activities,
    isLoading: isDashboardLoading || isActivityLoading,
    isError,
    errorMessage: error?.message || 'Impossible de charger le tableau de bord',
    refresh,
    handleNotifications,
    handlePayBalance,
    handleViewAllActivity,
    handleActionPress,
  };
};

export default useCustomerDashboard;
