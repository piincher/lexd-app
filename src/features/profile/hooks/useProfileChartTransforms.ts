import { useMemo } from 'react';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { getStatusColor, getStatusLabel, getMonthName } from './chartHelpers';
import type { productType } from '@src/shared/types/order';
import type { DonutChartItem, BarChartItem, FinancialSummary } from './useProfileCharts';

export const useProfileChartTransforms = (
  stats: any,
  orders: productType[] | undefined,
  balanceDue: any,
) => {
  const { colors } = useAppTheme();

  const donutData: DonutChartItem[] = useMemo(() => {
    const goodsByStatus = stats?.goodsByStatus;
    if (!goodsByStatus || Object.keys(goodsByStatus).length === 0) return [];
    return Object.entries(goodsByStatus)
      .filter(([, count]) => (count as number) > 0)
      .map(([status, count]) => ({
        value: count as number,
        color: getStatusColor(status),
        text: String(count),
        label: getStatusLabel(status),
      }));
  }, [stats]);

  const barData: BarChartItem[] = useMemo(() => {
    if (!orders?.length) return [];
    const now = new Date();
    const months: BarChartItem[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = getMonthName(d.getMonth());
      const count = orders.filter((o: productType) => {
        const created = o.createdAt;
        if (!created) return false;
        const od = new Date(created);
        return `${od.getFullYear()}-${String(od.getMonth() + 1).padStart(2, '0')}` === monthKey;
      }).length;
      months.push({
        value: count,
        label,
        frontColor: count > 0 ? colors.status.success : colors.neutral[200],
      });
    }
    return months;
  }, [orders, colors]);

  const financials: FinancialSummary | null = useMemo(() => {
    if (!balanceDue) return null;
    const totalCost = balanceDue.totalCost || 0;
    const totalPaid = balanceDue.totalPaid || 0;
    const totalDue = balanceDue.totalDue || 0;
    const paymentHealth = totalCost > 0 ? Math.round((totalPaid / totalCost) * 100) : 0;
    return { totalCost, totalPaid, totalDue, paymentHealth };
  }, [balanceDue]);

  return { donutData, barData, financials };
};
