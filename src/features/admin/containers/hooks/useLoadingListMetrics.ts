import { useMemo } from 'react';
import { AdminLoadingListData, WeightDistribution } from '../types/packingList';

export const useLoadingListMetrics = (loadingListData: AdminLoadingListData | null) => {
  const weightDistribution = useMemo<WeightDistribution[]>(() => {
    if (!loadingListData) return [];

    const map = new Map<string, { name: string; weight: number; color: string }>();

    loadingListData.items.forEach((item) => {
      const ex = map.get(item.clientId);
      if (ex) {
        ex.weight += item.goods.weight || 0;
      } else {
        map.set(item.clientId, {
          name: item.clientName,
          weight: item.goods.weight || 0,
          color: item.clientColor,
        });
      }
    });

    const total = loadingListData.summary.totalWeight;

    return Array.from(map.entries())
      .map(([id, d]) => ({
        clientId: id,
        clientName: d.name,
        weight: d.weight,
        percentage: total > 0 ? (d.weight / total) * 100 : 0,
        color: d.color,
      }))
      .sort((a, b) => b.weight - a.weight);
  }, [loadingListData]);

  const progressPercentage =
    (loadingListData?.summary.totalItems ?? 0) > 0
      ? ((loadingListData?.summary.loadedItems ?? 0) / loadingListData!.summary.totalItems) * 100
      : 0;

  return { weightDistribution, progressPercentage };
};
