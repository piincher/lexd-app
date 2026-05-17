import { useState, useMemo, useCallback } from 'react';
import type { AirwayBillGoods } from '../../types';

export const useGoodsSelection = (goodsList: AirwayBillGoods[]) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [createBagVisible, setCreateBagVisible] = useState(false);

  const totalSelectedWeight = useMemo(() => {
    return goodsList
      .filter((g) => selectedIds.includes(g._id))
      .reduce((sum, g) => sum + (g.weight || 0), 0);
  }, [selectedIds, goodsList]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  return {
    selectedIds,
    createBagVisible,
    setCreateBagVisible,
    totalSelectedWeight,
    toggleSelection,
    clearSelection,
  };
};
