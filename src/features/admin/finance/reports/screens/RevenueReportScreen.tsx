/**
 * RevenueReportScreen
 * Detailed revenue analysis with charts and breakdowns
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
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '@src/constants/Theme';

import {
  useGetRevenueReport,
  useExportReport,
  useFormatCurrency,
  useReportsInvalidation,
} from '../hooks/useReports';
import { PeriodSelector, PieChart, SummaryCard } from '../components';
import { ReportPeriod, RevenueBreakdown, PaymentMethodBreakdown } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================
// HELPER COMPONENTS
// ============================================

const BreakdownBar: React.FC<{
  label: string;
  amount: number;
  total: number;
  color: string;
}> = ({ label, amount, total, color }) => {
  const formatCurrency = useFormatCurrency();
  const percentage = total > 0 ? (amount / total) * 100 : 0;

  return (
    <View style={styles.breakdownItem}>
      <View style={styles.breakdownHeader}>
        <View style={styles.breakdownLabelContainer}>
          <View style={[styles.breakdownDot, { backgroundColor: color }]} />
          <Text style={styles.breakdownLabel}>{label}</Text>
        </View>
        <Text style={styles.breakdownValue}>{formatCurrency(amount)}</Text>
      </View>
      <View style={styles.breakdownBarContainer}>
        <View
          style={[
            styles.breakdownBar,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={styles.breakdownPercent}>{(percentage || 0).toFixed(1)}%</Text>
    </View>
  );
};

// ============================================
// MAIN SCREEN COMPONENT
// ============================================

export const RevenueReportScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const formatCurrency = useFormatCurrency();
  const { invalidateRevenue } = useReportsInvalidation();

  const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriod>('MONTHLY');
  const [refreshing, setRefreshing] = useState(false);

  // Query
  const {
    data: report,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetRevenueReport(selectedPeriod);

  // Export mutation
  const exportMutation = useExportReport();

  // Refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Export handler
  const handleExport = () => {
    exportMutation.mutate({
      period: selectedPeriod,
      format: 'pdf',
    });
  };

  // Transform breakdown data for pie chart
  const getBreakdownData = (breakdown: RevenueBreakdown | undefined) => {
    if (!breakdown) return [];
    return [
      { label: 'Marchandises', value: breakdown.goodsRevenue, color: '#10B981' },
      { label: 'Expédition', value: breakdown.shippingRevenue, color: '#3B82F6' },
      { label: 'Douanes', value: breakdown.customsRevenue, color: '#F59E0B' },
      { label: 'Stockage', value: breakdown.storageRevenue, color: '#8B5CF6' },
    ].filter((item) => item.value > 0);
  };

  // Transform payment method data for pie chart
  const getPaymentData = (payment: PaymentMethodBreakdown | undefined) => {
    if (!payment) return [];
    return [
      { label: 'Solde', value: payment.balance, color: '#10B981' },
      { label: 'Carte', value: payment.card, color: '#3B82F6' },
      { label: 'Mobile Money', value: payment.mobileMoney, color: '#F59E0B' },
      { label: 'Espèces', value: payment.cash, color: '#8B5CF6' },
    ].filter((item) => item.value > 0);
  };

  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Rapport de Revenus" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Chargement du rapport...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Rapport de Revenus" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="file-document-alert"
            size={64}
            color={theme.colors.error}
          />
          <Text style={styles.errorTitle}>Erreur de chargement</Text>
          <Text style={styles.errorText}>
            {error?.message || 'Impossible de charger le rapport'}
          </Text>
          <Button mode="contained" onPress={handleRefresh} style={styles.retryButton}>
            Réessayer
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const breakdownData = getBreakdownData(report?.breakdown);
  const paymentData = getPaymentData(report?.paymentMethodBreakdown);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Rapport de Revenus" />
        <Appbar.Action icon="download" onPress={handleExport} />
      </Appbar.Header>

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
        {/* Period Selector */}
        <Card style={styles.periodCard}>
          <Card.Content>
            <Text style={styles.periodLabel}>Période</Text>
            <PeriodSelector
              selectedPeriod={selectedPeriod}
              onSelect={setSelectedPeriod}
            />
          </Card.Content>
        </Card>

        {/* Summary Cards */}
        <View style={styles.summaryGrid}>
          <SummaryCard
            title="Revenus Totaux"
            amount={report?.summary.totalRevenue || 0}
            icon="cash-plus"
            gradientColors={['#10B981', '#059669', '#047857']}
            compact
          />
          <SummaryCard
            title="Dépenses"
            amount={report?.summary.totalExpenses || 0}
            icon="cash-minus"
            gradientColors={['#EF4444', '#DC2626', '#B91C1C']}
            compact
          />
          <SummaryCard
            title="Bénéfice Net"
            amount={report?.summary.netProfit || 0}
            icon="wallet"
            gradientColors={['#3B82F6', '#2563EB', '#1D4ED8']}
            compact
          />
          <SummaryCard
            title="Marge"
            amount={report?.summary.profitMargin || 0}
            icon="chart-pie"
            currency={false}
            gradientColors={['#8B5CF6', '#7C3AED', '#6D28D9']}
            compact
          />
        </View>

        {/* Revenue Breakdown */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Répartition des Revenus</Text>
            <PieChart
              data={breakdownData}
              height={200}
              donut
              centerText={formatCurrency(report?.summary.totalRevenue || 0)}
              centerSubtext="Total"
            />
            <View style={styles.breakdownList}>
              {breakdownData.map((item, index) => (
                <BreakdownBar
                  key={index}
                  label={item.label}
                  amount={item.value}
                  total={report?.summary.totalRevenue || 1}
                  color={item.color}
                />
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Payment Methods */}
        {paymentData.length > 0 && (
          <Card style={styles.chartCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Méthodes de Paiement</Text>
              <PieChart
                data={paymentData}
                height={180}
              />
            </Card.Content>
          </Card>
        )}

        {/* Export Button */}
        <Button
          mode="contained"
          onPress={handleExport}
          style={styles.exportButton}
          icon="download"
          loading={exportMutation.isPending}
          disabled={exportMutation.isPending}
        >
          Exporter le Rapport (PDF)
        </Button>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  periodCard: {
    marginBottom: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
  },
  periodLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.md,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  chartCard: {
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
  breakdownList: {
    marginTop: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  breakdownItem: {
    gap: 6,
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  breakdownDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  breakdownLabel: {
    fontSize: 14,
    color: Theme.neutral[700],
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  breakdownBarContainer: {
    height: 8,
    backgroundColor: Theme.neutral[200],
    borderRadius: 4,
    overflow: 'hidden',
  },
  breakdownBar: {
    height: '100%',
    borderRadius: 4,
  },
  breakdownPercent: {
    fontSize: 12,
    color: Theme.neutral[500],
  },
  exportButton: {
    marginTop: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    paddingVertical: 8,
  },
  bottomSpacing: {
    height: Theme.spacing['4xl'],
  },
  // Center States
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing['3xl'],
  },
  loadingText: {
    marginTop: Theme.spacing.md,
    color: Theme.neutral[500],
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
});

export default RevenueReportScreen;
