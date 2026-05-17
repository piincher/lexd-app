import { useState, useCallback } from 'react';

export const useGoodsSelection = (goods: any[]) => {
  const [selectedGoodsIds, setSelectedGoodsIds] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const toggleSelectGoods = useCallback((id: string) => {
    setSelectedGoodsIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const toggleSelectAllGoods = useCallback(() => {
    const ids = goods.map((g) => g._id).filter(Boolean);
    setSelectedGoodsIds((prev) => (prev.length === ids.length ? [] : ids));
  }, [goods]);

  const exitSelectionMode = useCallback(() => {
    setIsSelectionMode(false);
    setSelectedGoodsIds([]);
  }, []);

  return {
    selectedGoodsIds,
    isSelectionMode,
    setIsSelectionMode,
    toggleSelectGoods,
    toggleSelectAllGoods,
    exitSelectionMode,
  };
};
