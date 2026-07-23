/**
 * useCustomerDashboard Hook
 * Consolidated hook for customer dashboard logic
 */

import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { navigationRef } from '@src/navigations/navigationRef';
import { useAuth } from '@src/store/Auth';
import type { RootStackParamList } from '@src/navigations/type';

import { useGetDashboard, useGetActivity } from './useDashboard';
import { QuickAction, DashboardStats } from '../types';
import type { DashboardContainer } from '../api/types';
import type {
  ActiveWorkSummary,
  MonthlyTrendPoint,
  NextShipmentAction,
  RewardSummary,
  ShipmentHealthItem,
  ShippingSummary,
  VipProgress,
} from '@src/shared/types/dashboard';
import {
  DEFAULT_ACTIVE_WORK,
  DEFAULT_QUICK_ACTIONS,
  DEFAULT_REWARD_SUMMARY,
  DEFAULT_SHIPPING_SUMMARY,
  DEFAULT_STATS,
  DEFAULT_VIP_PROGRESS,
  getWelcomeMessage,
} from './dashboardConstants';
import { useShipmentHome } from './useShipmentHome';

export interface UseCustomerDashboardReturn {
  user: { firstName?: string } | null | undefined;
  welcomeMessage: string;
  stats: DashboardStats;
  shippingSummary: ShippingSummary;
  monthlyTrend: MonthlyTrendPoint[];
  activeWork: ActiveWorkSummary;
  shipmentHealth: ShipmentHealthItem[];
  vipProgress: VipProgress;
  rewardSummary: RewardSummary;
  nextShipmentActions: NextShipmentAction[];
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
  handleNextShipmentAction: (action: NextShipmentAction) => void;
  handlePrepareShipment: () => void;
  handleViewShipments: () => void;
  handleViewPayments: () => void;
  handleShipmentHealthPress: (shipment: ShipmentHealthItem) => void;
  handleContainerPress: (shipment?: DashboardContainer) => void;
}

export const useCustomerDashboard = (): UseCustomerDashboardReturn => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useAuth((state) => state.user);
  const navigateRoot = useCallback((route: string) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(route as never);
    }
  }, []);

  const { data: dashboardData, isLoading: isDashboardLoading, isError, error, refetch: refetchDashboard } = useGetDashboard();
  const { data: activityData, isLoading: isActivityLoading, refetch: refetchActivity } = useGetActivity({ limit: 5 });

  const stats = dashboardData?.stats || DEFAULT_STATS;
  const shippingSummary = dashboardData?.shippingSummary || DEFAULT_SHIPPING_SUMMARY;
  const monthlyTrend = dashboardData?.monthlyTrend || [];
  const activeWork = dashboardData?.activeWork || DEFAULT_ACTIVE_WORK;
  const shipmentHealth = dashboardData?.shipmentHealth || [];
  const vipProgress = dashboardData?.vipProgress || DEFAULT_VIP_PROGRESS;
  const rewardSummary = dashboardData?.rewardSummary || DEFAULT_REWARD_SUMMARY;
  const nextShipmentActions = dashboardData?.nextShipmentActions || [];
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
    if (action.route) navigateRoot(action.route);
    else if (action.action) action.action();
  }, [navigateRoot]);
  const handleNextShipmentAction = useCallback((action: NextShipmentAction) => {
    navigateRoot(action.route);
  }, [navigateRoot]);
  const handlePrepareShipment = useCallback(() => {
    navigation.navigate('CreateTicket');
  }, [navigation]);
  /**
   * Goods and containers were two destinations for one idea. They are now one
   * tab, so the dashboard offers one way in rather than two buttons that land
   * in the same place.
   */
  const handleViewShipments = useCallback(
    () => navigation.navigate('HomeTab', { screen: 'Shipments' }),
    [navigation],
  );
  const handleViewPayments = useCallback(
    () => navigation.navigate('HomeTab', { screen: 'Payments' }),
    [navigation],
  );

  /**
   * Every shipment opens the same record. The old AIR/SEA branch sent
   * customers to two differently-shaped screens for the same question, which
   * is precisely what the unified record removed.
   */
  const openShipment = useCallback(
    (id?: string) => {
      if (!id) {
        handleViewShipments();
        return;
      }
      navigation.navigate('ShipmentDetail', { shipmentId: id, source: 'container' });
    },
    [navigation, handleViewShipments],
  );

  const handleShipmentHealthPress = useCallback(
    (shipment: ShipmentHealthItem) => openShipment(shipment.id),
    [openShipment],
  );
  const handleContainerPress = useCallback(
    (shipment?: DashboardContainer) => openShipment(shipment?.id),
    [openShipment],
  );

  return {
    user,
    welcomeMessage,
    stats,
    shippingSummary,
    monthlyTrend,
    activeWork,
    shipmentHealth,
    vipProgress,
    rewardSummary,
    nextShipmentActions,
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
    handleNextShipmentAction,
    handlePrepareShipment,
    handleViewShipments,
    handleViewPayments,
    handleShipmentHealthPress,
    handleContainerPress,
  };
};

export default useCustomerDashboard;
