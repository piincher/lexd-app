/**
 * useStatsComputations Hook
 * SRP: Derived state computations for admin stats
 */

import { useMemo } from 'react';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  DashboardResponse,
  GoodsVolumeResponse,
  PaymentMetricsResponse,
  OperationsAnalyticsResponse,
  KPIItem,
} from '../types';

const formatCurrency = (amount: number | string | undefined | null): string => {
  const num = Number(amount) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toFixed(0);
};

export const useStatsComputations = (
  dashboard: DashboardResponse | undefined,
  goodsVolume: GoodsVolumeResponse | undefined,
  paymentMetrics: PaymentMetricsResponse | undefined,
  operations: OperationsAnalyticsResponse | undefined,
) => {
  const { colors } = useAppTheme();

  const kpiItems: KPIItem[] = useMemo(() => {
    const kpis = dashboard?.kpis;
    return [
      {
        label: 'Revenu du Mois',
        value: `${formatCurrency(kpis?.thisMonthRevenueFCFA)} F`,
        subtitle: `${formatCurrency(kpis?.thisWeekRevenueFCFA)} F cette semaine`,
        icon: 'wallet-outline',
        color: colors.status.success,
        bgColor: colors.feedback.successBg,
      },
      {
        label: 'En Transit',
        value: `${Number(kpis?.goodsInTransit) || 0}`,
        subtitle: `${Number(kpis?.activeContainers) || 0} conteneurs actifs`,
        icon: 'airplane-outline',
        color: colors.status.info,
        bgColor: colors.feedback.infoBg,
      },
      {
        label: 'Nouveaux Clients',
        value: `${Number(kpis?.newCustomersThisMonth) || 0}`,
        subtitle: 'Ce mois-ci',
        icon: 'people-outline',
        color: colors.primary.main,
        bgColor: colors.feedback.infoBg,
      },
      {
        label: 'A Recouvrer',
        value: `${formatCurrency(operations?.summary.unpaidAmount)} F`,
        subtitle: `${Number(operations?.summary.overdueInvoices) || 0} factures en retard`,
        icon: 'receipt-outline',
        color: colors.status.warning,
        bgColor: colors.feedback.warningBg,
      },
    ];
  }, [dashboard, operations, colors]);

  const shippingModeCounts = useMemo(() => {
    const byMode = goodsVolume?.byShippingMode || [];
    let air = 0;
    let sea = 0;
    byMode.forEach((m) => {
      const mode = m.shippingMode?.toLowerCase();
      if (mode === 'air' || mode === 'aerien') air += m.count;
      else if (mode === 'sea' || mode === 'maritime') sea += m.count;
    });
    return { air, sea };
  }, [goodsVolume]);

  const paymentSummary = useMemo(() => {
    const s = paymentMetrics?.summary;
    return {
      collectionRate: Number(s?.collectionRate) || 0,
      totalCollected: Number(s?.totalCollectedFCFA) || 0,
      totalOutstanding: Number(s?.totalOutstandingFCFA) || 0,
      completedTransactions: Number(s?.completedTransactions) || 0,
      totalTransactions: Number(s?.totalTransactions) || 0,
    };
  }, [paymentMetrics]);

  const totalGoods = useMemo(() => {
    return Number(goodsVolume?.summary?.totalGoods) || Number(dashboard?.kpis?.goodsInTransit) || 0;
  }, [goodsVolume, dashboard]);

  return { kpiItems, shippingModeCounts, paymentSummary, totalGoods };
};
