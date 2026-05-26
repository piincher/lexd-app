import { useMemo } from 'react';
import { AdminLoadingListData } from '../../../types/packingList';
import { WeightDistribution } from '../types';

export const useLoadingListStats = (loadingListData: AdminLoadingListData | null) => {
  const weightDistribution = useMemo<WeightDistribution[]>(() => {
    if (!loadingListData) return [];

    const clientWeights = new Map<string, {
      name: string;
      weight: number;
      loadedWeight: number;
      totalItems: number;
      loadedItems: number;
      color: string;
    }>();

    loadingListData.items.forEach((item) => {
      const weight = item.goods.weight || 0;
      const existing = clientWeights.get(item.clientId);
      if (existing) {
        existing.weight += weight;
        existing.totalItems += 1;
        if (item.isLoaded) {
          existing.loadedItems += 1;
          existing.loadedWeight += weight;
        }
      } else {
        clientWeights.set(item.clientId, {
          name: item.clientName,
          weight,
          loadedWeight: item.isLoaded ? weight : 0,
          totalItems: 1,
          loadedItems: item.isLoaded ? 1 : 0,
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
        totalItems: data.totalItems,
        loadedItems: data.loadedItems,
        remainingItems: data.totalItems - data.loadedItems,
        loadedWeight: data.loadedWeight,
      }))
      .sort((a, b) => b.weight - a.weight);
  }, [loadingListData]);

  const progressPercentage = (loadingListData?.summary?.totalItems ?? 0) > 0
    ? ((loadingListData?.summary?.loadedItems ?? 0) / (loadingListData?.summary?.totalItems ?? 1)) * 100
    : 0;

  return { weightDistribution, progressPercentage };
};
