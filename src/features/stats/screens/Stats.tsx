/**
 * Stats Screen - Admin Analytics Dashboard
 * SRP: State coordination and layout composition ONLY
 * Uses v2 analytics API exclusively
 */

import React, { useCallback } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { HomeTabScreenProps } from '@src/navigations/type';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { withProtectedRoute } from '@src/features/auth';

import { useAdminStats } from './hooks';
import {
  StatsHeader,
  PeriodSelector,
  KPIGrid,
  GoodsOverview,
  ShippingModeCard,
  PaymentOverview,
  OutstandingCard,
  TopCustomers,
  RecentPaymentsList,
  StatsSkeleton,
} from './components';

const Stats: React.FC<HomeTabScreenProps<'Stats'>> = () => {
  const {
    user,
    isLoading,
    isError,
    refetch,
    period,
    setPeriod,
    kpiItems,
    dashboard,
    goodsVolume,
    isLoadingGoods,
    shippingModeCounts,
    paymentMetrics,
    paymentSummary,
    isLoadingPayments,
    topCustomers,
    isLoadingCustomers,
    recentPayments,
    outstanding,
  } = useAdminStats();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // Loading state
  if (isLoading && !refreshing) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatsSkeleton />
      </SafeAreaView>
    );
  }

  // Error state
  if (isError) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Ionicons name="cloud-offline-outline" size={48} color={Theme.neutral[300]} />
          <Text style={styles.errorTitle}>Impossible de charger les donnees</Text>
          <Text style={styles.errorSubtitle}>Verifiez votre connexion et reessayez</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refetch} activeOpacity={0.7}>
            <Ionicons name="refresh" size={18} color="#FFF" />
            <Text style={styles.retryText}>Reessayer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const totalGoods = Number(goodsVolume?.summary?.totalGoods) ||
    Number(dashboard?.kpis?.goodsInTransit) || 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Theme.primary[500]}
            colors={[Theme.primary[500]]}
          />
        }
      >
        <StatsHeader
          firstName={user?.firstName}
          totalOrders={totalGoods}
        />

        <KPIGrid items={kpiItems} />

        <View style={styles.sectionGap} />

        <PeriodSelector selected={period} onSelect={setPeriod} />

        <View style={styles.sectionGap} />

        <OutstandingCard outstanding={outstanding} />

        <View style={styles.sectionGap} />

        <GoodsOverview
          goodsVolume={goodsVolume}
          isLoading={isLoadingGoods}
        />

        <View style={styles.sectionGap} />

        <ShippingModeCard shippingModeCounts={shippingModeCounts} />

        <View style={styles.sectionGap} />

        <PaymentOverview
          paymentMetrics={paymentMetrics}
          paymentSummary={paymentSummary}
          isLoading={isLoadingPayments}
        />

        <View style={styles.sectionGap} />

        <TopCustomers
          customers={topCustomers}
          isLoading={isLoadingCustomers}
        />

        <View style={styles.sectionGap} />

        <RecentPaymentsList payments={recentPayments} />

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  scrollContent: {
    flexGrow: 1,
  },
  sectionGap: {
    height: 14,
  },
  bottomPadding: {
    height: 32,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 8,
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[700],
    textAlign: 'center',
    marginTop: 8,
  },
  errorSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    textAlign: 'center',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Theme.primary[500],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  retryText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#FFF',
  },
});

export default withProtectedRoute(Stats);
