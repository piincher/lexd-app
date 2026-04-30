import { useState, useMemo } from 'react';
import { VolumeByStatus } from '../../types';
import { statusConfig, ViewMode } from './goodsVolumeConstants';

export const useGoodsVolumeChart = (byStatus: VolumeByStatus[]) => {
  const [viewMode, setViewMode] = useState<ViewMode>('status');

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString('fr-FR');
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K`;
    }
    return amount.toLocaleString('fr-FR');
  };

  const statusChartData = useMemo(
    () =>
      byStatus
        .filter((s) => s.count > 0)
        .map((s) => ({
          label: statusConfig[s.status]?.label || s.status,
          value: s.count,
          color: statusConfig[s.status]?.color || '#6B7280',
        }))
        .sort((a, b) => b.value - a.value),
    [byStatus]
  );

  return {
    viewMode,
    setViewMode,
    formatNumber,
    formatCurrency,
    statusChartData,
  };
};
