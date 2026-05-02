/**
 * useCustomerDashboard Hook
 * Consolidated hook for customer dashboard logic
 */

import { useCallback, useMemo } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '@src/store/Auth';
import type { RootStackParamList } from '@src/navigations/type';

import { useGetDashboard, useGetActivity } from './useDashboard';
import { QuickAction, DashboardStats } from '../types';
import type { DashboardContainer } from '../api/types';
import { DEFAULT_QUICK_ACTIONS, DEFAULT_STATS, getWelcomeMessage } from './dashboardConstants';
import { useShipmentHome } from './useShipmentHome';

export interface UseCustomerDashboardReturn {
  user: { firstName?: string } | null | undefined;
  welcomeMessage: string;
  stats: DashboardStats;
  containers: DashboardContainer[];
  shipmentHome: ReturnType<typeof useShipmentHome>;
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
  handleContainerPress: (shipment?: DashboardContainer) => void;
}

export const useCustomerDashboard = (): UseCustomerDashboardReturn => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useAuth((state) => state.user);

  const { data: dashboardData, isLoading: isDashboardLoading, isError, error, refetch: refetchDashboard } = useGetDashboard();
  const { data: activityData, isLoading: isActivityLoading, refetch: refetchActivity } = useGetActivity({ limit: 5 });

  const stats = dashboardData?.stats || DEFAULT_STATS;
  // Always use frontend quick actions — backend routes don't match React Navigation
  const quickActions = DEFAULT_QUICK_ACTIONS;
  const activities = activityData?.activities || [];
  const containers = dashboardData?.containers || [];
  const shipmentHome = useShipmentHome(containers, stats);
  const welcomeMessage = useMemo(() => getWelcomeMessage(user?.firstName || ''), [user?.firstName]);

  const refresh = useCallback(async () => {
    await Promise.all([refetchDashboard(), refetchActivity()]);
  }, [refetchDashboard, refetchActivity]);

  const handleNotifications = useCallback(() => navigation.navigate('Notifications'), [navigation]);
  const handleViewAllActivity = useCallback(() => navigation.navigate('ActivityList'), [navigation]);
  const handleActionPress = useCallback((action: QuickAction) => {
    if (action.route) navigation.dispatch(CommonActions.navigate({ name: action.route }));
    else if (action.action) action.action();
  }, [navigation]);
  const handleViewGoods = useCallback(() => navigation.navigate('MyGoods'), [navigation]);
  const handleViewContainers = useCallback(() => navigation.navigate('MyContainers'), [navigation]);
  const handleContainerPress = useCallback((shipment?: DashboardContainer) => {
    if (shipment?.trackingType === 'AIRWAY_BILL' || shipment?.shippingMode === 'AIR') {
      navigation.navigate('AirwayBillTracking', { airwayBillId: shipment.airwayBillId || shipment.id });
    } else if (shipment?.id) {
      navigation.navigate('ContainerTracking', { containerId: shipment.id });
    } else {
      navigation.navigate('MyContainers');
    }
  }, [navigation]);

  return {
    user,
    welcomeMessage,
    stats,
    containers,
    shipmentHome,
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
    handleContainerPress,
  };
};

export default useCustomerDashboard;
