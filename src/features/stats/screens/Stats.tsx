import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, RefreshControl } from 'react-native';
import type { HomeTabScreenProps } from '@src/navigations/type';
import { withProtectedRoute } from '@src/hoc/withProtectedRoute';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAdminStats } from './hooks/useAdminStats';
import { createStatsStyles } from './StatsScreen.styles';
import { StatsHeader } from './components/StatsHeader';
import { PeriodSelector } from './components/PeriodSelector';
import { KPIGrid } from './components/KPIGrid';
import { GoodsOverview } from './components/GoodsOverview';
import { ShippingModeCard } from './components/ShippingModeCard';
import { PaymentOverview } from './components/PaymentOverview';
import { OutstandingCard } from './components/OutstandingCard';
import { TopCustomers } from './components/TopCustomers';
import { RecentPaymentsList } from './components/RecentPaymentsList';
import { StatsSkeleton } from './components/StatsSkeleton';
import { ProfitOverviewCard } from './components/ProfitOverviewCard';
import { OperationsHealthCard } from './components/OperationsHealthCard';
import { OperationsDrilldownCard } from './components/OperationsDrilldownCard';
import { StaffActivityCard } from './components/StaffActivityCard';
import { StatsErrorState } from '../components/StatsErrorState';

const Stats: React.FC<HomeTabScreenProps<'Stats'>> = () => {
  const { colors } = useAppTheme();
  const styles = createStatsStyles(colors);
  const stats = useAdminStats();

  if (stats.isLoading && !stats.refreshing) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatsSkeleton />
      </SafeAreaView>
    );
  }

  if (stats.isError) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatsErrorState onRetry={stats.refetch} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={stats.refreshing || stats.isFetchingPeriodData}
            onRefresh={stats.onRefresh}
            tintColor={colors.primary[500]}
            colors={[colors.primary[500]]}
          />
        }
      >
        {/* Command zone: header + KPIs + filter */}
        <StatsHeader firstName={stats.user?.firstName} totalOrders={stats.totalGoods} />
        <KPIGrid items={stats.kpiItems} />
        <PeriodSelector selected={stats.period} onSelect={stats.setPeriod} />

        {/* Alert zone */}
        <OutstandingCard outstanding={stats.outstanding} />

        {/* Primary data: operations */}
        <View style={styles.zone}>
          <OperationsHealthCard operations={stats.operations} isLoading={stats.isLoadingOperations} />
          <View style={styles.zoneInnerGap} />
          <OperationsDrilldownCard operations={stats.operations} isLoading={stats.isLoadingOperations} />
        </View>

        {/* Financial zone */}
        <View style={styles.zone}>
          <ProfitOverviewCard profitSummary={stats.profitSummary} isLoading={stats.isLoadingProfit} />
          <View style={styles.zoneInnerGap} />
          <PaymentOverview
            paymentMetrics={stats.paymentMetrics}
            paymentSummary={stats.paymentSummary}
            isLoading={stats.isLoadingPayments}
          />
        </View>

        {/* Logistics zone */}
        <View style={styles.zone}>
          <GoodsOverview goodsVolume={stats.goodsVolume} isLoading={stats.isLoadingGoods} />
          <View style={styles.zoneInnerGap} />
          <ShippingModeCard shippingModeCounts={stats.shippingModeCounts} />
        </View>

        {/* People zone */}
        <View style={styles.zone}>
          <TopCustomers customers={stats.topCustomers} isLoading={stats.isLoadingCustomers} />
          <View style={styles.zoneInnerGap} />
          <StaffActivityCard
            staffActivity={stats.operations?.staffActivity}
            isLoading={stats.isLoadingOperations}
          />
        </View>

        {/* Footer zone */}
        <View style={styles.footerZone}>
          <RecentPaymentsList payments={stats.recentPayments} />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default withProtectedRoute(Stats);
