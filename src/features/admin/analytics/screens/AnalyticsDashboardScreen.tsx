/**
 * Analytics Dashboard Screen
 * Main screen for business intelligence and analytics
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Appbar,
  Text,
  Button,
  ActivityIndicator,
  useTheme,
  FAB,
  Portal,
  Dialog,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '@src/constants/Theme';

import {
  useGetDashboard,
  useGetRevenueTrends,
  useGetContainerUtilization,
  useGetTopCustomers,
  useGetGoodsVolume,
  useGetPaymentMetrics,
  useAnalyticsInvalidation,
  useFormatCurrency,
  useFormatNumber,
} from '../hooks/useAnalytics';

import {
  KPICards,
  RevenueChart,
  ContainerUtilizationChart,
  TopCustomersChart,
  GoodsVolumeChart,
  PaymentMetrics,
} from '../components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================
// SKELETON COMPONENT
// ============================================

const DashboardSkeleton: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={styles.skeletonContainer}>
      {/* KPI Cards Skeleton */}
      <View style={styles.skeletonGrid}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <View
            key={i}
            style={[
              styles.skeletonCard,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          />
        ))}
      </View>

      {/* Charts Skeleton */}
      <View style={[styles.skeletonChart, { backgroundColor: theme.colors.surfaceVariant }]} />
      <View style={[styles.skeletonList, { backgroundColor: theme.colors.surfaceVariant }]} />
    </View>
  );
};

// ============================================
// PERIOD SELECTOR COMPONENT
// ============================================

interface PeriodSelectorProps {
  selected: string;
  onSelect: (period: string) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ selected, onSelect }) => {
  const periods = [
    { key: '7d', label: '7 jours' },
    { key: '30d', label: '30 jours' },
    { key: '90d', label: '3 mois' },
    { key: '1y', label: '1 an' },
  ];

  return (
    <View style={styles.periodSelector}>
      {periods.map((period) => (
        <TouchableOpacity
          key={period.key}
          style={[
            styles.periodButton,
            selected === period.key && styles.periodButtonActive,
          ]}
          onPress={() => onSelect(period.key)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selected === period.key && styles.periodButtonTextActive,
            ]}
          >
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// ============================================
// MAIN SCREEN COMPONENT
// ============================================

export const AnalyticsDashboardScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { invalidateAll } = useAnalyticsInvalidation();
  const formatCurrency = useFormatCurrency();
  const formatNumber = useFormatNumber();

  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Queries
  const {
    data: dashboard,
    isLoading: isLoadingDashboard,
    isError: isErrorDashboard,
    error: errorDashboard,
    refetch: refetchDashboard,
  } = useGetDashboard();

  const {
    data: revenueTrends,
    isLoading: isLoadingRevenue,
    refetch: refetchRevenue,
  } = useGetRevenueTrends({ period: selectedPeriod, groupBy: 'day' });

  const {
    data: containerUtil,
    isLoading: isLoadingContainers,
    refetch: refetchContainers,
  } = useGetContainerUtilization({ period: selectedPeriod });

  const {
    data: topCustomers,
    isLoading: isLoadingCustomers,
    refetch: refetchCustomers,
  } = useGetTopCustomers({ limit: 10, period: selectedPeriod });

  const {
    data: goodsVolume,
    isLoading: isLoadingGoods,
    refetch: refetchGoods,
  } = useGetGoodsVolume({ period: selectedPeriod });

  const {
    data: paymentMetrics,
    isLoading: isLoadingPayments,
    refetch: refetchPayments,
  } = useGetPaymentMetrics({ period: selectedPeriod });

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refetchDashboard();
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [autoRefresh, refetchDashboard]);

  // Combined loading and error states
  const isLoading =
    isLoadingDashboard ||
    isLoadingRevenue ||
    isLoadingContainers ||
    isLoadingCustomers ||
    isLoadingGoods ||
    isLoadingPayments;

  const isError = isErrorDashboard;
  const error = errorDashboard;

  // Refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      refetchDashboard(),
      refetchRevenue(),
      refetchContainers(),
      refetchCustomers(),
      refetchGoods(),
      refetchPayments(),
    ]);
    setRefreshing(false);
  };

  // Navigation handlers
  const handleViewRevenueReport = () => {
    navigation.navigate('RevenueReport' as never);
  };

  const handleViewCustomerAnalytics = () => {
    navigation.navigate('CustomerAnalytics' as never);
  };

  const handleViewContainerDetails = () => {
    navigation.navigate('ContainerList' as never);
  };

  // Export handlers
  const handleExport = (format: string) => {
    setShowExportDialog(false);
    // TODO: Implement export functionality
    console.log(`Exporting in ${format} format...`);
  };

  // Render error state
  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Tableau de Bord Analytics" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="chart-line-variant"
            size={64}
            color={theme.colors.error}
          />
          <Text style={styles.errorTitle}>Erreur de chargement</Text>
          <Text style={styles.errorText}>
            {error?.message || 'Impossible de charger les données analytiques'}
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
          title="Tableau de Bord"
          subtitle="Analytics & Business Intelligence"
        />
        <Appbar.Action
          icon={autoRefresh ? 'autorenew' : 'autorenew-off'}
          onPress={() => setAutoRefresh(!autoRefresh)}
          color={autoRefresh ? '#10B981' : undefined}
        />
        <Appbar.Action icon="refresh" onPress={handleRefresh} />
        <Appbar.Action icon="export" onPress={() => setShowExportDialog(true)} />
      </Appbar.Header>

      {/* Period Selector */}
      <View style={styles.periodSelectorContainer}>
        <PeriodSelector selected={selectedPeriod} onSelect={setSelectedPeriod} />
      </View>

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
          {/* KPI Cards */}
          {dashboard?.kpis && <KPICards data={dashboard.kpis} />}

          {/* Revenue Trend Chart */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tendance des Revenus</Text>
              <Button
                mode="text"
                onPress={handleViewRevenueReport}
                compact
                icon="chart-line"
              >
                Détails
              </Button>
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

          {/* Two Column Layout */}
          <View style={styles.twoColumn}>
            {/* Container Utilization */}
            <View style={styles.column}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Conteneurs</Text>
                <Button
                  mode="text"
                  onPress={handleViewContainerDetails}
                  compact
                >
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

            {/* Top Customers */}
            <View style={styles.column}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Clients</Text>
                <Button
                  mode="text"
                  onPress={handleViewCustomerAnalytics}
                  compact
                >
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

          {/* Goods Volume */}
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

          {/* Payment Metrics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Métriques de Paiement</Text>
            {paymentMetrics && <PaymentMetrics data={paymentMetrics} />}
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      )}

      {/* Export Dialog */}
      <Portal>
        <Dialog visible={showExportDialog} onDismiss={() => setShowExportDialog(false)}>
          <Dialog.Title>Exporter les données</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.exportText}>
              Choisissez le format d'export pour les données analytics
            </Text>
            <View style={styles.exportButtons}>
              <Button
                mode="outlined"
                onPress={() => handleExport('csv')}
                style={styles.exportButton}
                icon="file-delimited"
              >
                CSV
              </Button>
              <Button
                mode="outlined"
                onPress={() => handleExport('xlsx')}
                style={styles.exportButton}
                icon="microsoft-excel"
              >
                Excel
              </Button>
              <Button
                mode="outlined"
                onPress={() => handleExport('pdf')}
                style={styles.exportButton}
                icon="file-pdf-box"
              >
                PDF
              </Button>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowExportDialog(false)}>Annuler</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Quick Actions FAB */}
      <FAB
        icon="chart-bar"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('Reports' as never)}
        label="Rapports"
      />
    </SafeAreaView>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  periodSelectorContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[200],
  },
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  periodButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Theme.neutral[100],
  },
  periodButtonActive: {
    backgroundColor: '#3B82F6',
  },
  periodButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[600],
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  twoColumn: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  column: {
    flex: 1,
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
  // Skeleton
  skeletonContainer: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  skeletonCard: {
    width: '47%',
    height: 120,
    borderRadius: Theme.radius.lg,
  },
  skeletonChart: {
    height: 250,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.lg,
  },
  skeletonList: {
    height: 200,
    borderRadius: Theme.radius.lg,
  },
  // Export Dialog
  exportText: {
    fontSize: 14,
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.md,
  },
  exportButtons: {
    gap: Theme.spacing.sm,
  },
  exportButton: {
    marginVertical: Theme.spacing.xs,
  },
  // FAB
  fab: {
    position: 'absolute',
    right: Theme.spacing.lg,
    bottom: Theme.spacing.lg,
  },
});

export default AnalyticsDashboardScreen;
