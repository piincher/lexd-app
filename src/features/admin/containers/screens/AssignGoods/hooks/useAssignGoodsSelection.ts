import { useState, useMemo } from 'react';
import { Goods } from '../../../../goods/types';

export const useAssignGoodsSelection = (
  filteredGoods: Goods[],
  unassignedGoods: Goods[],
  isAirContainer: boolean,
  currentContainerCBM: number,
  maxCapacity: number,
) => {
  const [selectedGoods, setSelectedGoods] = useState<string[]>([]);

  const totalSelectedCBM = useMemo(
    () =>
      selectedGoods.reduce((sum, id) => {
        const g = unassignedGoods.find((g) => g._id === id);
        return sum + (isAirContainer ? parseFloat(String(g?.weight)) || 0 : g?.actualCBM || 0);
      }, 0),
    [selectedGoods, unassignedGoods, isAirContainer],
  );

  const isOverCapacity = currentContainerCBM + totalSelectedCBM > maxCapacity;

  const toggleSelection = (goodsId: string) =>
    setSelectedGoods((prev) =>
      prev.includes(goodsId) ? prev.filter((id) => id !== goodsId) : [...prev, goodsId],
    );

  const toggleSelectAll = () =>
    setSelectedGoods(
      selectedGoods.length === filteredGoods.length ? [] : filteredGoods.map((g) => g._id),
    );

  return {
    selectedGoods,
    setSelectedGoods,
    totalSelectedCBM,
    isOverCapacity,
    toggleSelection,
    toggleSelectAll,
  };
};
