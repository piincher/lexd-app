import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { KPICards } from '../KPICards';
import { RevenueChart } from '../RevenueChart';
import { ContainerUtilizationChart } from '../ContainerUtilizationChart';
import { TopCustomersChart } from '../TopCustomersChart';
import { GoodsVolumeChart } from '../GoodsVolumeChart';
import { PaymentMetrics } from '../PaymentMetrics';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './DashboardContent.styles';
import type {
  DashboardData,
  RevenueTrendsData,
  ContainerUtilizationData,
  CustomerAnalyticsData,
  GoodsVolumeData,
  PaymentMetricsData,
} from '../../types';

interface DashboardContentProps {
  dashboard?: DashboardData;
  revenueTrends?: RevenueTrendsData;
  containerUtil?: ContainerUtilizationData;
  topCustomers?: CustomerAnalyticsData;
  goodsVolume?: GoodsVolumeData;
  paymentMetrics?: PaymentMetricsData;
  refreshing: boolean;
  onRefresh: () => void;
  onViewContainerDetails: () => void;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  dashboard,
  revenueTrends,
  containerUtil,
  topCustomers,
  goodsVolume,
  paymentMetrics,
  refreshing,
  onRefresh,
  onViewContainerDetails,
}) => {
  const theme = useTheme();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
        />
      }
    >
      {dashboard?.kpis && <KPICards data={dashboard.kpis} />}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tendance des Revenus</Text>
        </View>
        {revenueTrends && (
          <RevenueChart
            data={revenueTrends.current}
            comparisonData={revenueTrends.comparison}
            growth={revenueTrends.growth}
            showComparison={true}
          />
        )}
      </View>

      <View style={styles.twoColumn}>
        <View style={styles.column}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Conteneurs</Text>
            <Button mode="text" onPress={onViewContainerDetails} compact>
              Voir tout
            </Button>
          </View>
          {containerUtil && (
            <ContainerUtilizationChart
              containers={containerUtil.containers}
              byShippingLine={containerUtil.byShippingLine}
              avgFillRate={containerUtil.summary.avgFillRate}
            />
          )}
        </View>

        <View style={styles.column}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Clients</Text>
            <Button mode="text" compact>
              Voir tout
            </Button>
          </View>
          {topCustomers && (
            <TopCustomersChart
              customers={topCustomers.customers}
              maxItems={5}
            />
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Volume de Marchandises</Text>
        {goodsVolume && (
          <GoodsVolumeChart
            byStatus={goodsVolume.byStatus}
            byShippingMode={goodsVolume.byShippingMode}
            dailyTrend={goodsVolume.dailyTrend}
            summary={goodsVolume.summary}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Métriques de Paiement</Text>
        {paymentMetrics && <PaymentMetrics data={paymentMetrics} />}
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};
