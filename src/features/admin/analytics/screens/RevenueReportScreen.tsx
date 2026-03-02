/**
 * Revenue Report Screen
 * Detailed revenue analysis with export functionality
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Share,
} from 'react-native';
import {
  Appbar,
  Text,
  Card,
  Button,
  DataTable,
  useTheme,
  Menu,
  Divider,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';

import {
  useGetRevenueTrends,
  useGetDailyRevenueTrend,
  useFormatCurrency,
} from '../hooks/useAnalytics';
import { RevenueChart } from '../components';
import { DateRangePicker, DateRange } from '@src/components/DateRangePicker';

// ============================================
// MAIN COMPONENT
// ============================================

export const RevenueReportScreen: React.FC = () => {
  const theme = useTheme();
  const formatCurrency = useFormatCurrency();

  const [refreshing, setRefreshing] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });
  const [exportMenuVisible, setExportMenuVisible] = useState(false);

  // Queries
  const {
    data: revenueData,
    isLoading,
    refetch,
  } = useGetRevenueTrends({
    from: dateRange.startDate.toISOString(),
    to: dateRange.endDate.toISOString(),
    groupBy: 'day',
    compare: true,
  });

  // Refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Date range handler
  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    setDatePickerVisible(false);
  };

  // Export handlers
  const handleExportPDF = async () => {
    setExportMenuVisible(false);
    
    const html = generateReportHTML(revenueData, formatCurrency);
    
    try {
      const { uri } = await Print.printToFileAsync({ html });
      await Share.share({
        title: 'Rapport de Revenus',
        url: uri,
      });
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const handleExportExcel = () => {
    setExportMenuVisible(false);
    // TODO: Implement Excel export
    console.log('Export to Excel');
  };

  const handlePrint = async () => {
    setExportMenuVisible(false);
    
    const html = generateReportHTML(revenueData, formatCurrency);
    
    try {
      await Print.printAsync({ html });
    } catch (error) {
      console.error('Print error:', error);
    }
  };

  // Calculate totals
  const totalRevenue = revenueData?.current.reduce((sum, d) => sum + d.revenueFCFA, 0) || 0;
  const totalTransactions = revenueData?.current.reduce((sum, d) => sum + d.transactionCount, 0) || 0;
  const avgTransaction = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;
  const growthRate = revenueData?.growth?.revenueGrowth || 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Rapport de Revenus" />
        <Appbar.Action icon="calendar" onPress={() => setDatePickerVisible(true)} />
        <Menu
          visible={exportMenuVisible}
          onDismiss={() => setExportMenuVisible(false)}
          anchor={
            <Appbar.Action
              icon="export"
              onPress={() => setExportMenuVisible(true)}
            />
          }
        >
          <Menu.Item
            onPress={handleExportPDF}
            title="Exporter PDF"
            leadingIcon="file-pdf-box"
          />
          <Menu.Item
            onPress={handleExportExcel}
            title="Exporter Excel"
            leadingIcon="microsoft-excel"
          />
          <Divider />
          <Menu.Item
            onPress={handlePrint}
            title="Imprimer"
            leadingIcon="printer"
          />
          <Menu.Item
            onPress={() => Share.share({ message: generateReportSummary(revenueData, formatCurrency) })}
            title="Partager"
            leadingIcon="share-variant"
          />
        </Menu>
      </Appbar.Header>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Date Range Summary */}
        <Card style={styles.dateCard}>
          <Card.Content style={styles.dateContent}>
            <MaterialCommunityIcons name="calendar-range" size={20} color="#6B7280" />
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateLabel}>Période du rapport</Text>
              <Text style={styles.dateValue}>
                {dateRange.startDate.toLocaleDateString('fr-FR')} - {dateRange.endDate.toLocaleDateString('fr-FR')}
              </Text>
            </View>
            <Button
              mode="text"
              onPress={() => setDatePickerVisible(true)}
              compact
            >
              Modifier
            </Button>
          </Card.Content>
        </Card>

        {/* Summary Cards */}
        <View style={styles.summaryGrid}>
          <Card style={styles.summaryCard}>
            <Card.Content>
              <MaterialCommunityIcons name="cash-plus" size={24} color="#10B981" />
              <Text style={styles.summaryValue}>{formatCurrency(totalRevenue)}</Text>
              <Text style={styles.summaryLabel}>Revenu Total</Text>
            </Card.Content>
          </Card>

          <Card style={styles.summaryCard}>
            <Card.Content>
              <MaterialCommunityIcons name="swap-horizontal" size={24} color="#3B82F6" />
              <Text style={styles.summaryValue}>{totalTransactions.toLocaleString('fr-FR')}</Text>
              <Text style={styles.summaryLabel}>Transactions</Text>
            </Card.Content>
          </Card>

          <Card style={styles.summaryCard}>
            <Card.Content>
              <MaterialCommunityIcons name="cash" size={24} color="#8B5CF6" />
              <Text style={styles.summaryValue}>{formatCurrency(avgTransaction)}</Text>
              <Text style={styles.summaryLabel}>Panier Moyen</Text>
            </Card.Content>
          </Card>

          <Card style={styles.summaryCard}>
            <Card.Content>
              <MaterialCommunityIcons
                name={growthRate >= 0 ? 'trending-up' : 'trending-down'}
                size={24}
                color={growthRate >= 0 ? '#10B981' : '#EF4444'}
              />
              <Text style={[styles.summaryValue, { color: growthRate >= 0 ? '#10B981' : '#EF4444' }]}>
                {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}%
              </Text>
              <Text style={styles.summaryLabel}>Croissance</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Revenue Chart */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Évolution des Revenus</Text>
            {revenueData && (
              <RevenueChart
                data={revenueData.current}
                comparisonData={revenueData.comparison}
                growth={revenueData.growth}
                showComparison={true}
                height={250}
              />
            )}
          </Card.Content>
        </Card>

        {/* Detailed Table */}
        <Card style={styles.tableCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Détails par Jour</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title numeric>Transactions</DataTable.Title>
                <DataTable.Title numeric>Revenu</DataTable.Title>
                <DataTable.Title numeric>Moyenne</DataTable.Title>
              </DataTable.Header>

              {revenueData?.current.slice().reverse().map((day, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>
                    {new Date(day.period).toLocaleDateString('fr-FR', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                    })}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{day.transactionCount}</DataTable.Cell>
                  <DataTable.Cell numeric>{formatCurrency(day.revenueFCFA)}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {formatCurrency(day.avgTransactionFCFA)}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Date Range Picker */}
      <DateRangePicker
        visible={datePickerVisible}
        onDismiss={() => setDatePickerVisible(false)}
        onConfirm={handleDateRangeChange}
        initialRange={dateRange}
      />
    </SafeAreaView>
  );
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const generateReportHTML = (data: any, formatCurrency: (n: number) => string) => {
  const totalRevenue = data?.current.reduce((sum: number, d: any) => sum + d.revenueFCFA, 0) || 0;
  const totalTransactions = data?.current.reduce((sum: number, d: any) => sum + d.transactionCount, 0) || 0;

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #1F2937; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #E5E7EB; }
          th { background-color: #F3F4F6; font-weight: bold; }
          .summary { display: flex; gap: 20px; margin: 20px 0; }
          .summary-box { background: #F9FAFB; padding: 15px; border-radius: 8px; flex: 1; }
          .summary-label { font-size: 12px; color: #6B7280; }
          .summary-value { font-size: 20px; font-weight: bold; color: #1F2937; }
        </style>
      </head>
      <body>
        <h1>Rapport de Revenus</h1>
        <p>Généré le ${new Date().toLocaleDateString('fr-FR')}</p>
        
        <div class="summary">
          <div class="summary-box">
            <div class="summary-label">Revenu Total</div>
            <div class="summary-value">${formatCurrency(totalRevenue)}</div>
          </div>
          <div class="summary-box">
            <div class="summary-label">Transactions</div>
            <div class="summary-value">${totalTransactions}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transactions</th>
              <th>Revenu</th>
              <th>Moyenne</th>
            </tr>
          </thead>
          <tbody>
            ${data?.current.map((day: any) => `
              <tr>
                <td>${new Date(day.period).toLocaleDateString('fr-FR')}</td>
                <td>${day.transactionCount}</td>
                <td>${formatCurrency(day.revenueFCFA)}</td>
                <td>${formatCurrency(day.avgTransactionFCFA)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;
};

const generateReportSummary = (data: any, formatCurrency: (n: number) => string) => {
  const totalRevenue = data?.current.reduce((sum: number, d: any) => sum + d.revenueFCFA, 0) || 0;
  const totalTransactions = data?.current.reduce((sum: number, d: any) => sum + d.transactionCount, 0) || 0;

  return `📊 Rapport de Revenus

Revenu Total: ${formatCurrency(totalRevenue)}
Transactions: ${totalTransactions}
Période: ${data?.period?.startDate ? new Date(data.period.startDate).toLocaleDateString('fr-FR') : ''} - ${data?.period?.endDate ? new Date(data.period.endDate).toLocaleDateString('fr-FR') : ''}

Généré via ChinaLink Express`;
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  dateCard: {
    marginBottom: 16,
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateTextContainer: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    minWidth: '45%',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  chartCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  tableCard: {
    marginBottom: 16,
  },
  bottomSpacing: {
    height: 40,
  },
});

export default RevenueReportScreen;
