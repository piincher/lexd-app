/**
 * useProfileCharts
 * Fetches and transforms data for Profile screen charts.
 */

import { useProfileChartData } from './useProfileChartData';
import { useProfileChartTransforms } from './useProfileChartTransforms';

export interface DonutChartItem {
  value: number;
  color: string;
  text: string;
  label: string;
}

export interface BarChartItem {
  value: number;
  label: string;
  frontColor: string;
}

export interface FinancialSummary {
  totalCost: number;
  totalPaid: number;
  totalDue: number;
  paymentHealth: number;
}

export const useProfileCharts = () => {
  const { stats, balanceDue, orders, isLoading } = useProfileChartData();
  const { donutData, barData, financials } = useProfileChartTransforms(stats, orders, balanceDue);

  return {
    isLoading,
    donutData,
    barData,
    financials,
    totalGoods: stats?.totalGoods ?? 0,
    totalContainers: stats?.totalContainers ?? 0,
  };
};
