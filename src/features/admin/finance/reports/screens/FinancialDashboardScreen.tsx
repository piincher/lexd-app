/**
 * FinancialDashboardScreen
 * Main financial dashboard with summary cards, charts, and quick stats
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {
  Appbar,
  Text,
  Button,
  Card,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '@src/constants/Theme';

import {
  useGetDashboardSummary,
  useGetDailyRevenueTrend,
  useGetAllContainersProfitability,
  useGetTopCustomers,
  useReportsInvalidation,
  useFormatCurrency,
  useTrendIndicator,
} from '../hooks/useReports';
import {
  RevenueChart,
  SummaryCard,
  TopCustomersList,
  TopContainersList,
  ProfitMarginCard,
} from '../components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================
// SKELETON COMPONENT
// ============================================

const DashboardSkeleton: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={styles.skeletonContainer}>
      {/* Summary Cards Skeleton */}
      <View style={styles.summaryGrid}>
        {[1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={[
              styles.skeletonCard,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          />
        ))}
      </View>

      {/* Chart Skeleton */}
      <View
        style={[
          styles.skeletonChart,
          { backgroundColor: theme.colors.surfaceVariant },
        ]}
      />

      {/* Lists Skeleton */}
      <View style={styles.skeletonLists}>
        {[1, 2].map((i) => (
          <View
            key={i}
            style={[
              styles.skeletonList,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

// ============================================
// MAIN SCREEN COMPONENT
// ============================================

export const FinancialDashboardScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const formatCurrency = useFormatCurrency();
  const getTrendIndicator = useTrendIndicator();
  const { invalidateDashboard } = useReportsInvalidation();

  const [refreshing, setRefreshing] = useState(false);

  // Queries
  const {
    data: dashboard,
    isLoading: isLoadingDashboard,
    isError: isErrorDashboard,
    error: errorDashboard,
    refetch: refetchDashboard,
  } = useGetDashboardSummary();

  const {
    data: revenueTrend,
    isLoading: isLoadingTrend,
    isError: isErrorTrend,
    refetch: refetchTrend,
  } = useGetDailyRevenueTrend();

  const {
    data: topContainers,
    isLoading: isLoadingContainers,
    isError: isErrorContainers,
    refetch: refetchContainers,
  } = useGetAllContainersProfitability(5, '30d');

  const {
    data: topCustomers,
    isLoading: isLoadingCustomers,
    isError: isErrorCustomers,
    refetch: refetchCustomers,
  } = useGetTopCustomers(5, '30d');

  // Combined loading and error states
  const isLoading = isLoadingDashboard || isLoadingTrend || isLoadingContainers || isLoadingCustomers;
  const isError = isErrorDashboard || isErrorTrend || isErrorContainers || isErrorCustomers;
  const error = errorDashboard || errorTrend || errorContainers || errorCustomers;

  // Refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      refetchDashboard(),
      refetchTrend(),
      refetchContainers(),
      refetchCustomers(),
    ]);
    setRefreshing(false);
  };

  // Navigation handlers
  const handleViewDetailedReports = () => {
    navigation.navigate('RevenueReport' as never);
  };

  const handleViewContainerProfits = () => {
    navigation.navigate('ContainerProfit' as never);
  };

  const handleViewCustomerAnalytics = () => {
    navigation.navigate('CustomerAnalytics' as never);
  };

  // Real data from APIs
  const trendData = revenueTrend?.dailyTrend?.map((day: any) => ({
    date: day.date,
    revenue: day.revenueFCFA || day.revenue / 100,
    expenses: day.expensesFCFA || day.expenses / 100,
  })) || [];

  // Transform top containers data to match component expectations
  const transformedTopContainers = topContainers?.map((container: any) => ({
    containerId: container.containerId,
    containerNumber: container.containerNumber,
    revenue: container.revenueFCFA || container.revenue / 100,
    expenses: container.expensesFCFA || container.expenses / 100,
    profit: container.profitFCFA || container.profit / 100,
    profitMargin: container.profitMargin,
  })) || [];

  // Transform top customers data to match component expectations
  const transformedTopCustomers = topCustomers?.map((customer: any) => ({
    userId: customer.userId,
    name: customer.name,
    totalRevenue: customer.totalRevenueFCFA || customer.totalRevenue / 100,
  })) || [];

  // Render error state
  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Tableau de Bord Financier" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="chart-line-variant"
            size={64}
            color={theme.colors.error}
          />
          <Text style={styles.errorTitle}>Erreur de chargement</Text>
          <Text style={styles.errorText}>
            {error?.message || 'Impossible de charger les données financières'}
          </Text>
          <Button mode="contained" onPress={handleRefresh} style={styles.retryButton}>
            Réessayer
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.Content 
          title="Tableau de Bord Financier" 
          subtitle="Vue d'ensemble des performances"
        />
        <Appbar.Action icon="refresh" onPress={handleRefresh} />
      </Appbar.Header>

      {/* Main Content */}
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[theme.colors.primary]}
            />
          }
        >
          {/* Summary Cards Grid */}
          <View style={styles.summaryGrid}>
            <SummaryCard
              title="Revenus Aujourd'hui"
              amount={dashboard?.todayRevenue || 0}
              icon="cash-plus"
              trend={dashboard?.trendIndicators?.todayVsYesterday}
              trendLabel="vs hier"
              gradientColors={['#10B981', '#059669', '#047857']}
            />
            <SummaryCard
              title="Revenus ce Mois"
              amount={dashboard?.monthRevenue || 0}
              icon="calendar-month"
              trend={dashboard?.trendIndicators?.monthVsLastMonth}
              trendLabel="vs mois dernier"
              gradientColors={['#8B5CF6', '#7C3AED', '#6D28D9']}
            />
            <SummaryCard
              title="Créances"
              amount={dashboard?.outstandingReceivables || 0}
              icon="invoice-clock"
              gradientColors={['#F59E0B', '#D97706', '#B45309']}
            />
            <SummaryCard
              title="Factures en Retard"
              amount={dashboard?.overdueInvoices || 0}
              icon="alert-circle"
              currency={false}
              gradientColors={['#EF4444', '#DC2626', '#B91C1C']}
            />
          </View>

          {/* Quick Stats Row */}
          <Card style={styles.quickStatsCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Statistiques Rapides</Text>
              <View style={styles.quickStatsRow}>
                <View style={styles.quickStat}>
                  <MaterialCommunityIcons name="chart-pie" size={24} color="#3B82F6" />
                  <Text style={styles.quickStatValue}>
                    {(dashboard?.profitMargin || 0).toFixed(1)}%
                  </Text>
                  <Text style={styles.quickStatLabel}>Marge</Text>
                </View>
                <View style={styles.quickStatDivider} />
                <View style={styles.quickStat}>
                  <MaterialCommunityIcons name="cash-minus" size={24} color="#EF4444" />
                  <Text style={styles.quickStatValue}>
                    {formatCurrency(dashboard?.totalExpenses || 0)}
                  </Text>
                  <Text style={styles.quickStatLabel}>Dépenses</Text>
                </View>
                <View style={styles.quickStatDivider} />
                <View style={styles.quickStat}>
                  <MaterialCommunityIcons name="wallet" size={24} color="#10B981" />
                  <Text style={styles.quickStatValue}>
                    {formatCurrency(dashboard?.netProfit || 0)}
                  </Text>
                  <Text style={styles.quickStatLabel}>Bénéfice</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Revenue Chart */}
          <Card style={styles.chartCard}>
            <Card.Content>
              <View style={styles.chartHeader}>
                <Text style={styles.sectionTitle}>Tendance des Revenus</Text>
                <Button
                  mode="text"
                  onPress={handleViewDetailedReports}
                  compact
                >
                  Voir Plus
                </Button>
              </View>
              <RevenueChart data={trendData} height={220} />
            </Card.Content>
          </Card>

          {/* Top Containers */}
          <Card style={styles.listCard}>
            <Card.Content>
              <View style={styles.listHeader}>
                <Text style={styles.sectionTitle}>Top Conteneurs</Text>
                <Button
                  mode="text"
                  onPress={handleViewContainerProfits}
                  compact
                >
                  Voir Tout
                </Button>
              </View>
              <TopContainersList containers={transformedTopContainers} maxItems={5} />
            </Card.Content>
          </Card>

          {/* Top Customers */}
          <Card style={styles.listCard}>
            <Card.Content>
              <View style={styles.listHeader}>
                <Text style={styles.sectionTitle}>Top Clients</Text>
                <Button
                  mode="text"
                  onPress={handleViewCustomerAnalytics}
                  compact
                >
                  Voir Tout
                </Button>
              </View>
              <TopCustomersList customers={transformedTopCustomers} maxItems={5} />
            </Card.Content>
          </Card>

          {/* View Detailed Reports Button */}
          <Button
            mode="contained"
            onPress={handleViewDetailedReports}
            style={styles.detailedButton}
            icon="file-chart"
          >
            Voir les Rapports Détaillés
          </Button>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  quickStatsCard: {
    marginBottom: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  quickStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
  },
  quickStat: {
    alignItems: 'center',
    flex: 1,
  },
  quickStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginTop: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  quickStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: Theme.neutral[200],
  },
  chartCard: {
    marginBottom: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  listCard: {
    marginBottom: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    elevation: 2,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  detailedButton: {
    marginTop: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    paddingVertical: 8,
  },
  bottomSpacing: {
    height: Theme.spacing['4xl'],
  },
  // Error State
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing['3xl'],
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginTop: Theme.spacing.lg,
  },
  errorText: {
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
  },
  retryButton: {
    marginTop: Theme.spacing.xl,
  },
  // Skeleton Styles
  skeletonContainer: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  skeletonCard: {
    width: '47%',
    height: 140,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
  },
  skeletonChart: {
    height: 280,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.lg,
  },
  skeletonLists: {
    gap: Theme.spacing.lg,
  },
  skeletonList: {
    height: 200,
    borderRadius: Theme.radius.lg,
  },
});

export default FinancialDashboardScreen;
