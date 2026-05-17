/**
 * CustomerDashboardScreen
 * Billion-dollar logistics dashboard — premium, scalable, production-ready
 */

import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './CustomerDashboardScreen.styles';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useCustomerDashboard } from '../hooks/useCustomerDashboard';
import { useHideTabBarOnScroll } from '@src/shared/lib';
import { HeroSection } from '../components/HeroSection';
import { ShipmentHomeCard } from '../components/ShipmentHomeCard';
import { SmartActions } from '../components/SmartActions';
import { JourneyMap } from '../components/JourneyMap';
import { ContainerStack } from '../components/ContainerStack';
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
    user, welcomeMessage, stats, containers, shipmentHome, quickActions, activities,
    isLoading, isError, errorMessage, refresh,
    handleNotifications, handleViewAllActivity, handleActionPress,
    handleViewGoods, handleViewContainers, handleContainerPress,
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
          <HeroSection
            user={user}
            welcomeMessage={welcomeMessage}
            stats={stats}
            onViewGoods={handleViewGoods}
            onViewContainers={handleViewContainers}
            onNotifications={handleNotifications}
          />

          <ShipmentHomeCard
            shipmentHome={shipmentHome}
            onPrimaryPress={handleContainerPress}
            onViewContainers={handleViewContainers}
          />

          <SmartActions actions={quickActions} onActionPress={handleActionPress} />

          <JourneyMap goodsByStatus={stats.goodsByStatus} totalGoods={stats.totalGoods} />

          <ContainerStack containers={containers} onContainerPress={handleContainerPress} />

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
