import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './CustomerDashboardScreen.styles';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useCustomerDashboard } from '../hooks/useCustomerDashboard';
import { useHideTabBarOnScroll } from '@src/shared/lib';
import { DashboardHero } from '../components/DashboardHero';
import { PendingActionsRail } from '../components/PendingActionsRail';
import { PrepareNextShipmentCard } from '../components/PrepareNextShipmentCard';
import { ShipmentHealthList } from '../components/ShipmentHealthList';
import { ShippingAnalyticsPanel } from '../components/ShippingAnalyticsPanel';
import { VipProgressCard } from '../components/VipProgressCard';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { DashboardSkeleton } from '../components/DashboardSkeleton';
import { DashboardErrorState } from '../components/DashboardErrorState';

export const CustomerDashboardScreen: React.FC<
  RootStackScreenProps<'CustomerDashboard'>
> = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const { onScroll } = useHideTabBarOnScroll();
  const {
    welcomeMessage, shippingSummary, monthlyTrend, activeWork, shipmentHealth,
    vipProgress, rewardSummary, nextShipmentActions, activities,
    isLoading, isError, errorMessage, refresh,
    handleNotifications, handleViewAllActivity, handleNextShipmentAction,
    handlePrepareShipment, handleViewShipments,
    handleViewPayments, handleShipmentHealthPress,
  } = useCustomerDashboard();

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <DashboardErrorState message={errorMessage} onRetry={refresh} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refresh} tintColor={colors.primary.main} />
          }
        >
          <DashboardHero
            welcomeMessage={welcomeMessage}
            summary={shippingSummary}
            activeWork={activeWork}
            onNotifications={handleNotifications}
          />

          <PendingActionsRail
            activeWork={activeWork}
            onViewShipments={handleViewShipments}
            onViewPayments={handleViewPayments}
          />

          <ShipmentHealthList
            shipments={shipmentHealth}
            onShipmentPress={handleShipmentHealthPress}
            onViewAll={handleViewShipments}
          />

          <PrepareNextShipmentCard
            actions={nextShipmentActions}
            onActionPress={handleNextShipmentAction}
            onPreparePress={handlePrepareShipment}
          />

          <VipProgressCard vip={vipProgress} rewards={rewardSummary} />

          <ShippingAnalyticsPanel summary={shippingSummary} trend={monthlyTrend} />

          <ActivityTimeline
            activities={activities}
            showViewAll
            onViewAll={handleViewAllActivity}
            maxItems={5}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CustomerDashboardScreen;
