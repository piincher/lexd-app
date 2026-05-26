/**
 * Analytics Dashboard Screen
 * Main screen for business intelligence and analytics
 */

import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAnalyticsDashboard } from '../hooks/useAnalyticsDashboard';
import { DashboardHeader } from '../components/DashboardHeader';
import { PeriodSelector } from '../components/PeriodSelector';
import { DashboardSkeleton } from '../components/DashboardSkeleton';
import { DashboardContent } from '../components/DashboardContent';
import { DashboardErrorState } from '../components/DashboardErrorState';
import { ExportDialog } from '../components/ExportDialog';
import { DashboardFAB } from '../components/DashboardFAB';
import { createStyles } from './AnalyticsDashboardScreen.styles';

export const AnalyticsDashboardScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const {
    selectedPeriod,
    setSelectedPeriod,
    isLoading,
    isError,
    error,
    handleRefresh,
    refreshing,
    showExportDialog,
    setShowExportDialog,
    handleExport,
    autoRefresh,
    setAutoRefresh,
    navigateToReports,
    navigateToContainerList,
    dashboard,
    revenueTrends,
    containerUtil,
    topCustomers,
    goodsVolume,
    paymentMetrics,
  } = useAnalyticsDashboard();

  if (isError) {
    return <DashboardErrorState error={error} onRetry={handleRefresh} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <DashboardHeader
        autoRefresh={autoRefresh}
        onToggleAutoRefresh={() => setAutoRefresh(!autoRefresh)}
        onRefresh={handleRefresh}
        onExport={() => setShowExportDialog(true)}
      />
      <View style={styles.periodSelectorContainer}>
        <PeriodSelector selected={selectedPeriod} onSelect={setSelectedPeriod} />
      </View>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <DashboardContent
          dashboard={dashboard}
          revenueTrends={revenueTrends}
          containerUtil={containerUtil}
          topCustomers={topCustomers}
          goodsVolume={goodsVolume}
          paymentMetrics={paymentMetrics}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onViewContainerDetails={navigateToContainerList}
        />
      )}
      <ExportDialog
        visible={showExportDialog}
        onDismiss={() => setShowExportDialog(false)}
        onExport={handleExport}
      />
      <DashboardFAB onPress={navigateToReports} />
    </SafeAreaView>
  );
};

export default AnalyticsDashboardScreen;
