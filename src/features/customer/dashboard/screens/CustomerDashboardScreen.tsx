/**
 * CustomerDashboardScreen
 * Billion-dollar logistics dashboard — premium, scalable, production-ready
 */

import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useCustomerDashboard } from '../hooks/useCustomerDashboard';
import { HeroSection } from '../components/HeroSection';
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
  const {
    user, welcomeMessage, stats, containers, quickActions, activities,
    isLoading, isError, errorMessage, refresh,
    handleNotifications, handleViewAllActivity, handleActionPress,
    handleViewGoods, handleViewContainers, handleViewSpent, handleContainerPress,
  } = useCustomerDashboard();

  if (isError) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.default }}>
        <DashboardErrorState message={errorMessage} onRetry={refresh} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.default }}>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
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
            onViewSpent={handleViewSpent}
            onNotifications={handleNotifications}
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
