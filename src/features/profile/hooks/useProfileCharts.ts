/**
 * useProfileCharts
 * Fetches and transforms data for Profile screen charts.
 */

import { useMemo } from 'react';
import { useGetDashboard } from '@src/features/customer/dashboard/hooks/useDashboard';
import type { DashboardStats } from '@src/features/customer/dashboard/types';
import { useBalanceDue } from '@src/features/payments/hooks/usePayments';
import { useGetOrderOfUserById } from '@src/shared/hooks/useOrders';
import { useGetCurrentUser } from '@src/shared/hooks/useUser';
import type { productType } from '@src/api/order';

const MONTH_NAMES = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];

const STATUS_COLORS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: '#8B5CF6',
  PACKED: '#3B82F6',
  ASSIGNED_TO_CONTAINER: '#0EA5E9',
  LOADED_IN_CONTAINER: '#06B6D4',
  IN_TRANSIT: '#F59E0B',
  ARRIVED_DESTINATION: '#10B981',
  READY_FOR_PICKUP: '#22C55E',
  DELIVERED: '#059669',
  PENDING: '#6B7280',
  ACTIVE: '#22C55E',
  DRAFT: '#9CA3AF',
  CONFIRMED: '#3B82F6',
  CUSTOMS: '#F59E0B',
  CANCELLED: '#EF4444',
};

const getStatusColor = (status: string): string => STATUS_COLORS[status.toUpperCase()] || '#6B7280';

const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    RECEIVED_AT_WAREHOUSE: 'Recu',
    PACKED: 'Emballe',
    ASSIGNED_TO_CONTAINER: 'Assigne',
    LOADED_IN_CONTAINER: 'Charge',
    IN_TRANSIT: 'Transit',
    ARRIVED_DESTINATION: 'Arrive',
    READY_FOR_PICKUP: 'Retrait',
    DELIVERED: 'Livre',
    PENDING: 'En attente',
    ACTIVE: 'Actif',
    DRAFT: 'Brouillon',
    CONFIRMED: 'Confirme',
    CUSTOMS: 'Douane',
    CANCELLED: 'Annule',
  };
  return labels[status.toUpperCase()] || status;
};

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
  paymentHealth: number; // 0-100
}

export const useProfileCharts = () => {
  const { data: user } = useGetCurrentUser();
  const { data: dashboard, isLoading: dashboardLoading } = useGetDashboard();
  const { data: balanceDue, isLoading: balanceLoading } = useBalanceDue();
  const { data: orders, isLoading: ordersLoading } = useGetOrderOfUserById(user?._id ?? '');

  const isLoading = dashboardLoading || balanceLoading || ordersLoading;
  const stats = (dashboard as { stats?: DashboardStats } | undefined)?.stats;

  // ── Donut Chart: Goods by Status ──
  const donutData: DonutChartItem[] = useMemo(() => {
    const goodsByStatus = stats?.goodsByStatus;
    if (!goodsByStatus || Object.keys(goodsByStatus).length === 0) return [];

    return Object.entries(goodsByStatus)
      .filter(([, count]) => count > 0)
      .map(([status, count]) => ({
        value: count,
        color: getStatusColor(status),
        text: String(count),
        label: getStatusLabel(status),
      }));
  }, [stats]);

  // ── Bar Chart: Monthly Activity (last 6 months) ──
  const barData: BarChartItem[] = useMemo(() => {
    if (!orders?.length) return [];

    const now = new Date();
    const months: BarChartItem[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = MONTH_NAMES[d.getMonth()];

      const count = orders.filter((o: productType) => {
        const created = o.createdAt;
        if (!created) return false;
        const od = new Date(created);
        return `${od.getFullYear()}-${String(od.getMonth() + 1).padStart(2, '0')}` === monthKey;
      }).length;

      months.push({
        value: count,
        label,
        frontColor: count > 0 ? '#22C55E' : '#E5E7EB',
      });
    }

    return months;
  }, [orders]);

  // ── Financial Summary ──
  const financials: FinancialSummary | null = useMemo(() => {
    if (!balanceDue) return null;
    const totalCost = balanceDue.totalCost || 0;
    const totalPaid = balanceDue.totalPaid || 0;
    const totalDue = balanceDue.totalDue || 0;
    const paymentHealth = totalCost > 0 ? Math.round((totalPaid / totalCost) * 100) : 0;

    return { totalCost, totalPaid, totalDue, paymentHealth };
  }, [balanceDue]);

  return {
    isLoading,
    donutData,
    barData,
    financials,
    totalGoods: stats?.totalGoods ?? 0,
    totalContainers: stats?.totalContainers ?? 0,
  };
};
