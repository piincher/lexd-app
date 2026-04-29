import { useMemo } from 'react';
import { AdminLoadingListData, WeightDistribution } from '../../../types/packingList';

export const useLoadingListStats = (loadingListData: AdminLoadingListData | null) => {
  const weightDistribution = useMemo<WeightDistribution[]>(() => {
    if (!loadingListData) return [];

    const clientWeights = new Map<string, { name: string; weight: number; color: string }>();

    loadingListData.items.forEach((item) => {
      const existing = clientWeights.get(item.clientId);
      if (existing) {
        existing.weight += item.goods.weight || 0;
      } else {
        clientWeights.set(item.clientId, {
          name: item.clientName,
          weight: item.goods.weight || 0,
          color: item.clientColor,
        });
      }
    });

    const totalWeight = loadingListData.summary.totalWeight;

    return Array.from(clientWeights.entries())
      .map(([clientId, data]) => ({
        clientId,
        clientName: data.name,
        weight: data.weight,
        percentage: totalWeight > 0 ? (data.weight / totalWeight) * 100 : 0,
        color: data.color,
      }))
      .sort((a, b) => b.weight - a.weight);
  }, [loadingListData]);

  const progressPercentage = (loadingListData?.summary?.totalItems ?? 0) > 0
    ? ((loadingListData?.summary?.loadedItems ?? 0) / (loadingListData?.summary?.totalItems ?? 1)) * 100
    : 0;

  return { weightDistribution, progressPercentage };
};
