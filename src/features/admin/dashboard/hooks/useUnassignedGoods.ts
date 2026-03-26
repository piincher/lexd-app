/**
 * useUnassignedGoods - Hook for fetching and managing unassigned goods
 * SRP: Data fetching and business logic ONLY (<100 lines)
 */

import { useMemo, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUnassignedGoods, containerQueryKeys } from "@src/features/admin/containers/hooks";
import { Goods } from "@src/features/admin/goods/types";
import { ShippingMode } from "@src/features/admin/containers/types";

export interface UnassignedGoodsItem extends Goods {
  daysWaiting: number;
}

export interface GroupedUnassignedGoods {
  mode: ShippingMode;
  label: string;
  goods: UnassignedGoodsItem[];
}

export const useUnassignedGoods = (filterMode?: ShippingMode) => {
  const queryClient = useQueryClient();
  
  const { data, isLoading, isRefetching, refetch, error } = useGetUnassignedGoods(filterMode);

  const unassignedGoods: Goods[] = useMemo(() => {
    return data?.data?.goods || data?.data || [];
  }, [data]);

  const goodsWithDaysWaiting: UnassignedGoodsItem[] = useMemo(() => {
    const now = new Date();
    return unassignedGoods.map((goods) => {
      const receivedAt = goods.receivedAt ? new Date(goods.receivedAt) : new Date();
      const daysWaiting = Math.floor((now.getTime() - receivedAt.getTime()) / (1000 * 60 * 60 * 24));
      return { ...goods, daysWaiting };
    });
  }, [unassignedGoods]);

  const sortedGoods: UnassignedGoodsItem[] = useMemo(() => {
    return [...goodsWithDaysWaiting].sort((a, b) => {
      const dateA = a.receivedAt ? new Date(a.receivedAt).getTime() : 0;
      const dateB = b.receivedAt ? new Date(b.receivedAt).getTime() : 0;
      return dateA - dateB;
    });
  }, [goodsWithDaysWaiting]);

  const groupedGoods: GroupedUnassignedGoods[] = useMemo(() => {
    if (filterMode) {
      return [{
        mode: filterMode,
        label: filterMode === "AIR" ? "Air Freight" : "Sea Freight",
        goods: sortedGoods,
      }];
    }

    const airGoods = sortedGoods.filter((g) => g.shippingMode === "AIR");
    const seaGoods = sortedGoods.filter((g) => g.shippingMode === "SEA" || !g.shippingMode);

    const groups: GroupedUnassignedGoods[] = [];
    if (airGoods.length > 0) {
      groups.push({ mode: "AIR", label: "Air Freight", goods: airGoods });
    }
    if (seaGoods.length > 0) {
      groups.push({ mode: "SEA", label: "Sea Freight", goods: seaGoods });
    }
    return groups;
  }, [sortedGoods, filterMode]);

  const totalCount = sortedGoods.length;
  const oldestDays = sortedGoods.length > 0 ? sortedGoods[sortedGoods.length - 1]?.daysWaiting || 0 : 0;

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: containerQueryKeys.unassignedGoods() });
    await refetch();
  }, [queryClient, refetch]);

  return {
    groupedGoods,
    sortedGoods,
    totalCount,
    oldestDays,
    isLoading,
    isRefetching,
    error,
    handleRefresh,
  };
};

export default useUnassignedGoods;
