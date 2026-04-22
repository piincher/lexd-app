/**
 * ProfileChartsSection
 * Container for all profile chart components.
 */

import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useProfileCharts } from '../hooks/useProfileCharts';
import { OrderStatusDonutChart } from './OrderStatusDonutChart';
import { MonthlyActivityBarChart } from './MonthlyActivityBarChart';
import { FinancialSummaryCards } from './FinancialSummaryCards';

export const ProfileChartsSection: React.FC = () => {
  const { colors } = useAppTheme();
  const { isLoading, donutData, barData, financials, totalGoods } = useProfileCharts();

  if (isLoading) {
    return (
      <View style={{ paddingVertical: 40, alignItems: 'center' }}>
        <ActivityIndicator size="small" color={colors.primary.main} />
      </View>
    );
  }

  return (
    <View>
      <OrderStatusDonutChart data={donutData} total={totalGoods} />
      <MonthlyActivityBarChart data={barData} />
      <FinancialSummaryCards data={financials} />
    </View>
  );
};
